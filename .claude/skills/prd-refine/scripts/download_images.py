#!/usr/bin/env python3
"""
Download images from a markdown file and update references to local paths.

Usage:
    python download_images.py input.md output_dir/
"""

import re
import sys
import os
from urllib.parse import urlparse
from urllib.request import urlretrieve, Request, urlopen
from urllib.error import URLError, HTTPError


def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text[:50]  # Limit length


def extract_images(markdown_content):
    """
    Extract all image references from markdown content.
    Returns list of (match_text, url, alt_text) tuples.
    """
    images = []

    # Markdown image syntax: ![alt](url)
    md_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    for match in re.finditer(md_pattern, markdown_content):
        alt_text = match.group(1)
        url = match.group(2)
        if is_image_url(url):
            images.append((match.group(0), url, alt_text))

    # HTML img tags: <img src="url" />
    html_pattern = r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>'
    for match in re.finditer(html_pattern, markdown_content, re.IGNORECASE):
        url = match.group(1)
        if is_image_url(url):
            # Try to extract alt text
            alt_match = re.search(r'alt=["\']([^"\']+)["\']', match.group(0))
            alt_text = alt_match.group(1) if alt_match else ''
            images.append((match.group(0), url, alt_text))

    return images


def is_image_url(url):
    """Check if URL appears to be an image."""
    if url.startswith(('http://', 'https://')):
        # Check for explicit image extensions
        ext = os.path.splitext(urlparse(url).path)[1].lower()
        if ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp']:
            return True

        # Special cases: URLs that might be images but don't have extensions
        # 百度BOS图片链接
        if 'bcebos.com' in url and '/images/' in url:
            return True

        # 内部服务图片链接（feishu-service, cfe等）
        if any(keyword in url for keyword in ['feishu-service', 'cfe-doc-backend', 'file?file_key=']):
            return True

        # 如果URL包含明确的图片格式参数
        if any(fmt in url.lower() for fmt in ['jpg', 'jpeg', 'png', 'gif', 'webp']):
            return True

    return False


def get_section_context(markdown_content, image_position):
    """Get the section heading before an image position."""
    # Find all headings before the image
    lines = markdown_content[:image_position].split('\n')
    for line in reversed(lines):
        if line.startswith('#'):
            heading = line.lstrip('#').strip()
            return slugify(heading)
    return 'image'


def generate_filename(url, alt_text, section, index, existing_files):
    """Generate a descriptive filename for the image."""
    # Get extension from URL
    ext = os.path.splitext(urlparse(url).path)[1].lower()

    # If no extension, try to infer from URL or query parameters
    if not ext or ext not in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp']:
        # Check if file extension is in query params or URL
        if '.jpg' in url.lower() or 'jpg' in url.lower():
            ext = '.jpg'
        elif '.png' in url.lower() or 'png' in url.lower():
            ext = '.png'
        elif '.jpeg' in url.lower() or 'jpeg' in url.lower():
            ext = '.jpeg'
        elif '.gif' in url.lower():
            ext = '.gif'
        elif '.webp' in url.lower():
            ext = '.webp'
        else:
            ext = '.png'  # Default fallback

    # Build filename from context
    parts = []
    if section and section != 'image':
        parts.append(section)
    if alt_text:
        parts.append(slugify(alt_text))

    if not parts:
        parts.append('image')

    # Add index if needed to avoid collisions
    base_name = '-'.join(parts)
    filename = f"{base_name}{ext}"

    # Handle duplicates
    counter = 1
    while filename in existing_files:
        filename = f"{base_name}-{counter}{ext}"
        counter += 1

    return filename


def download_image(url, output_path, timeout=30):
    """Download image from URL to output path."""
    try:
        # Add headers to avoid 403 errors
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        req = Request(url, headers=headers)

        with urlopen(req, timeout=timeout) as response:
            with open(output_path, 'wb') as out_file:
                out_file.write(response.read())

        return True, None
    except HTTPError as e:
        return False, f"HTTP {e.code}: {e.reason}"
    except URLError as e:
        return False, f"URL error: {e.reason}"
    except Exception as e:
        return False, str(e)


def process_markdown_images(input_file, output_dir):
    """
    Process markdown file: download images and update references.

    Returns:
        dict with 'success', 'failed', 'updated_content'
    """
    # Read input file
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Extract images
    images = extract_images(content)

    if not images:
        print("No images found in markdown file.")
        return {
            'success': [],
            'failed': [],
            'updated_content': content
        }

    print(f"Found {len(images)} images to download...")

    # Download images
    success_downloads = []
    failed_downloads = []
    existing_files = set()
    updated_content = content

    for idx, (match_text, url, alt_text) in enumerate(images, 1):
        # Get section context
        position = content.find(match_text)
        section = get_section_context(content, position)

        # Generate filename
        filename = generate_filename(url, alt_text, section, idx, existing_files)
        existing_files.add(filename)

        output_path = os.path.join(output_dir, filename)

        print(f"\n[{idx}/{len(images)}] Downloading: {filename}")
        print(f"  URL: {url}")

        # Download
        success, error = download_image(url, output_path)

        if success:
            print(f"  ✓ Success")
            success_downloads.append({
                'url': url,
                'filename': filename,
                'path': output_path
            })

            # Update content with local path
            local_ref = f"./{os.path.basename(output_dir)}/{filename}"
            if match_text.startswith('!['): # Markdown syntax
                new_ref = f"![{alt_text}]({local_ref})"
            else:  # HTML syntax
                new_ref = f'<img src="{local_ref}" alt="{alt_text}" />'

            updated_content = updated_content.replace(match_text, new_ref, 1)
        else:
            print(f"  ✗ Failed: {error}")
            failed_downloads.append({
                'url': url,
                'filename': filename,
                'error': error
            })

    return {
        'success': success_downloads,
        'failed': failed_downloads,
        'updated_content': updated_content
    }


def main():
    if len(sys.argv) != 3:
        print("Usage: python download_images.py input.md output_dir/")
        sys.exit(1)

    input_file = sys.argv[1]
    output_dir = sys.argv[2].rstrip('/')

    if not os.path.exists(input_file):
        print(f"Error: Input file not found: {input_file}")
        sys.exit(1)

    print(f"Processing: {input_file}")
    print(f"Output directory: {output_dir}")
    print("-" * 60)

    # Process images
    result = process_markdown_images(input_file, output_dir)

    # Print summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Successfully downloaded: {len(result['success'])}")
    print(f"Failed downloads: {len(result['failed'])}")

    if result['success']:
        print("\n✓ Successfully downloaded:")
        for item in result['success']:
            print(f"  - {item['filename']}")

    if result['failed']:
        print("\n✗ Failed downloads:")
        for item in result['failed']:
            print(f"  - {item['filename']}: {item['error']}")
            print(f"    URL: {item['url']}")

    # Save updated content (with .updated extension for safety)
    if result['success']:
        updated_file = input_file + '.updated'
        with open(updated_file, 'w', encoding='utf-8') as f:
            f.write(result['updated_content'])
        print(f"\n✓ Updated markdown saved to: {updated_file}")
        print("  Review and rename to replace original if satisfied.")


if __name__ == '__main__':
    main()
