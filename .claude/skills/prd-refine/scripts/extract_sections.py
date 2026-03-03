#!/usr/bin/env python3
"""
Extract sections and structure from markdown file.

Usage:
    python extract_sections.py input.md
"""

import re
import sys
import json


def extract_frontmatter(content):
    """Extract YAML frontmatter if present."""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if match:
        return match.group(1), content[match.end():]
    return None, content


def extract_sections(content):
    """
    Extract sections from markdown content.

    Returns:
        List of dicts with 'level', 'title', 'content'
    """
    sections = []
    lines = content.split('\n')
    current_section = None
    current_content = []

    for line in lines:
        # Check if line is a heading
        heading_match = re.match(r'^(#{1,6})\s+(.+)$', line)

        if heading_match:
            # Save previous section if exists
            if current_section:
                current_section['content'] = '\n'.join(current_content).strip()
                sections.append(current_section)

            # Start new section
            level = len(heading_match.group(1))
            title = heading_match.group(2).strip()
            current_section = {
                'level': level,
                'title': title,
                'content': ''
            }
            current_content = []
        else:
            # Add line to current content
            if current_section is not None:
                current_content.append(line)

    # Don't forget last section
    if current_section:
        current_section['content'] = '\n'.join(current_content).strip()
        sections.append(current_section)

    return sections


def build_hierarchy(sections):
    """Build hierarchical structure from flat list of sections."""
    if not sections:
        return []

    root = []
    stack = []

    for section in sections:
        # Create section node
        node = {
            'level': section['level'],
            'title': section['title'],
            'content': section['content'],
            'children': []
        }

        # Pop stack until we find a parent
        while stack and stack[-1]['level'] >= section['level']:
            stack.pop()

        # Add to parent or root
        if stack:
            stack[-1]['children'].append(node)
        else:
            root.append(node)

        # Push to stack
        stack.append(node)

    return root


def analyze_prd(sections):
    """Analyze PRD structure and extract key information."""
    analysis = {
        'total_sections': len(sections),
        'headings': {},
        'has_images': False,
        'has_tables': False,
        'potential_scenes': [],
        'unclear_areas': []
    }

    # Count headings by level
    for section in sections:
        level = section['level']
        analysis['headings'][f'h{level}'] = analysis['headings'].get(f'h{level}', 0) + 1

        content = section['content']

        # Check for images
        if '![' in content or '<img' in content:
            analysis['has_images'] = True

        # Check for tables
        if '|' in content and '---' in content:
            analysis['has_tables'] = True

        # Identify potential scenes (sections with "flow", "process", "功能", etc.)
        title_lower = section['title'].lower()
        if any(keyword in title_lower for keyword in ['flow', 'process', 'feature', 'scene', '功能', '流程', '场景']):
            analysis['potential_scenes'].append(section['title'])

        # Identify unclear areas (sections with "TBD", "TODO", "待定", etc.)
        if any(marker in content for marker in ['TBD', 'TODO', 'FIXME', '待定', '待确认', '???']):
            analysis['unclear_areas'].append(section['title'])

    return analysis


def main():
    if len(sys.argv) != 2:
        print("Usage: python extract_sections.py input.md")
        sys.exit(1)

    input_file = sys.argv[1]

    # Read file
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter
    frontmatter, body = extract_frontmatter(content)

    # Extract sections
    sections = extract_sections(body)

    # Build hierarchy
    hierarchy = build_hierarchy(sections)

    # Analyze
    analysis = analyze_prd(sections)

    # Output JSON
    output = {
        'file': input_file,
        'frontmatter': frontmatter,
        'sections': sections,
        'hierarchy': hierarchy,
        'analysis': analysis
    }

    print(json.dumps(output, indent=2, ensure_ascii=False))


if __name__ == '__main__':
    main()
