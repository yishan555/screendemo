#!/usr/bin/env python3
"""
Validate refined PRD completeness.

Usage:
    python validate_spec.py refined-prd.md
"""

import re
import sys


def check_required_sections(content):
    """Check if all required sections are present."""
    required = [
        r'#.*Document Overview',
        r'#.*Product Context',
        r'#.*Scene Breakdown',
        r'#.*Scene Specifications',
        r'#.*Developer Handoff Checklist'
    ]

    missing = []
    for pattern in required:
        if not re.search(pattern, content, re.IGNORECASE):
            missing.append(pattern.replace(r'#.*', '').strip())

    return missing


def check_scene_completeness(content):
    """Check if scenes have all required subsections."""
    # Find all scenes
    scene_pattern = r'###\s+SCENE-\d+:(.+?)(?=###\s+SCENE-|##\s+Cross-Scene|$)'
    scenes = re.findall(scene_pattern, content, re.DOTALL)

    required_subsections = [
        'Scene Overview',
        'User Scenarios',
        'Functional Requirements',
        'Input Specifications',
        'Output Specifications',
        'Acceptance Criteria'
    ]

    incomplete_scenes = []

    for idx, scene_content in enumerate(scenes, 1):
        missing = []
        for subsection in required_subsections:
            if subsection not in scene_content:
                missing.append(subsection)

        if missing:
            # Extract scene name
            name_match = re.match(r'\s*(.+?)\n', scene_content)
            scene_name = name_match.group(1).strip() if name_match else f"Scene {idx}"
            incomplete_scenes.append({
                'scene': scene_name,
                'missing': missing
            })

    return incomplete_scenes


def check_input_output_specs(content):
    """Check if input/output specifications follow the format."""
    issues = []

    # Find Input Specifications sections
    input_sections = re.findall(
        r'\*\*Input Specifications?\*\*:?\s*(.+?)(?=\*\*|###|##)',
        content,
        re.DOTALL | re.IGNORECASE
    )

    for idx, section in enumerate(input_sections, 1):
        # Check for required fields: Format, Source, Required
        if 'Format:' not in section:
            issues.append(f"Input spec {idx} missing 'Format' field")
        if 'Source:' not in section:
            issues.append(f"Input spec {idx} missing 'Source' field")
        if 'Required:' not in section:
            issues.append(f"Input spec {idx} missing 'Required' field")

    # Find Output Specifications sections
    output_sections = re.findall(
        r'\*\*Output Specifications?\*\*:?\s*(.+?)(?=\*\*|###|##)',
        content,
        re.DOTALL | re.IGNORECASE
    )

    for idx, section in enumerate(output_sections, 1):
        # Check for required fields: Format, Success State
        if 'Format:' not in section:
            issues.append(f"Output spec {idx} missing 'Format' field")
        if 'Success State' not in section and 'Success:' not in section:
            issues.append(f"Output spec {idx} missing 'Success State' field")

    return issues


def check_acceptance_criteria(content):
    """Check if acceptance criteria follow Given-When-Then format."""
    issues = []

    # Find Acceptance Criteria sections
    ac_sections = re.findall(
        r'\*\*Acceptance Criteria\*\*:?\s*(.+?)(?=\*\*|###|##)',
        content,
        re.DOTALL | re.IGNORECASE
    )

    for idx, section in enumerate(ac_sections, 1):
        # Check for Given-When-Then pattern
        has_given = 'Given' in section or 'given' in section
        has_when = 'When' in section or 'when' in section
        has_then = 'Then' in section or 'then' in section

        if not (has_given and has_when and has_then):
            issues.append(
                f"Acceptance criteria {idx} missing Given-When-Then format"
            )

    return issues


def check_clarification_markers(content):
    """Check for remaining [NEEDS CLARIFICATION] markers."""
    markers = re.findall(r'\[NEEDS CLARIFICATION:([^\]]+)\]', content)
    return markers


def check_scene_dependencies(content):
    """Check if scene dependency matrix exists."""
    has_priority_matrix = bool(re.search(
        r'Scene Priority Matrix',
        content,
        re.IGNORECASE
    ))

    has_implementation_order = bool(re.search(
        r'Implementation Order',
        content,
        re.IGNORECASE
    ))

    return has_priority_matrix, has_implementation_order


def validate_prd(file_path):
    """Run all validation checks."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    print("=" * 60)
    print(f"Validating: {file_path}")
    print("=" * 60)

    all_passed = True

    # Check 1: Required sections
    print("\n1. Checking required sections...")
    missing_sections = check_required_sections(content)
    if missing_sections:
        print("  ✗ Missing sections:")
        for section in missing_sections:
            print(f"    - {section}")
        all_passed = False
    else:
        print("  ✓ All required sections present")

    # Check 2: Scene completeness
    print("\n2. Checking scene completeness...")
    incomplete_scenes = check_scene_completeness(content)
    if incomplete_scenes:
        print("  ✗ Incomplete scenes:")
        for scene in incomplete_scenes:
            print(f"    - {scene['scene']}:")
            for missing in scene['missing']:
                print(f"      • Missing: {missing}")
        all_passed = False
    else:
        print("  ✓ All scenes have required subsections")

    # Check 3: Input/Output specifications
    print("\n3. Checking input/output specifications...")
    io_issues = check_input_output_specs(content)
    if io_issues:
        print("  ✗ Input/Output specification issues:")
        for issue in io_issues:
            print(f"    - {issue}")
        all_passed = False
    else:
        print("  ✓ Input/Output specifications are complete")

    # Check 4: Acceptance criteria
    print("\n4. Checking acceptance criteria...")
    ac_issues = check_acceptance_criteria(content)
    if ac_issues:
        print("  ✗ Acceptance criteria issues:")
        for issue in ac_issues:
            print(f"    - {issue}")
        all_passed = False
    else:
        print("  ✓ Acceptance criteria follow proper format")

    # Check 5: Clarification markers
    print("\n5. Checking for unresolved clarifications...")
    markers = check_clarification_markers(content)
    if markers:
        print("  ⚠ Unresolved clarifications found:")
        for marker in markers:
            print(f"    - {marker.strip()}")
        all_passed = False
    else:
        print("  ✓ No unresolved clarifications")

    # Check 6: Scene dependencies
    print("\n6. Checking scene dependencies...")
    has_matrix, has_order = check_scene_dependencies(content)
    if not has_matrix:
        print("  ✗ Missing: Scene Priority Matrix")
        all_passed = False
    else:
        print("  ✓ Scene Priority Matrix present")

    if not has_order:
        print("  ✗ Missing: Implementation Order")
        all_passed = False
    else:
        print("  ✓ Implementation Order present")

    # Final verdict
    print("\n" + "=" * 60)
    if all_passed:
        print("✓ VALIDATION PASSED")
        print("  The refined PRD is complete and ready for development.")
    else:
        print("✗ VALIDATION FAILED")
        print("  Please address the issues above before proceeding.")
    print("=" * 60)

    return all_passed


def main():
    if len(sys.argv) != 2:
        print("Usage: python validate_spec.py refined-prd.md")
        sys.exit(1)

    input_file = sys.argv[1]

    passed = validate_prd(input_file)
    sys.exit(0 if passed else 1)


if __name__ == '__main__':
    main()
