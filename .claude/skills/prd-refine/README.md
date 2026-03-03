# PRD Refine Skill

A Claude Code skill for refining and breaking down Product Requirements Documents (PRDs) into clear, actionable specifications with comprehensive scene breakdown.

## Features

- **Automated Image Management**: Downloads images from URLs (including BOS and internal service links) and organizes them locally in `newprd/` directory
- **Interactive Clarification**: Asks targeted questions to resolve ambiguities
- **Scene-Based Breakdown**: Decomposes PRD into implementable scenes with clear boundaries
- **Complete Specifications**: Generates detailed input/output specs and acceptance criteria
- **Validation**: Ensures completeness before handoff to development

## Quick Start

```bash
/prd-refine path/to/your-prd.md
```

## What Gets Generated

After running the skill, you'll have:

```
project/
└── newprd/                               # All output in this directory
    ├── [original-prd].md.backup          # Original PRD backup
    ├── [original-prd]-refined.md         # Refined PRD with complete specs
    ├── prd-clarifications.md             # All clarification Q&A
    ├── prd-refine-summary.md             # Process summary and metrics
    └── prdimages/                         # All downloaded images
        ├── scene-1-user-flow.png
        ├── scene-2-architecture.jpg
        └── ...
```

## Key Capabilities

### 1. Image Processing
- Extracts all image URLs from markdown
- Supports special URL formats:
  - 百度BOS: `https://bj.bcebos.com/prod-public-open/...`
  - 内部服务: `https://cfe-doc-backend.inner.chj.cloud/...`
  - URLs with extensions in query parameters
- Downloads with descriptive naming
- Updates references to local paths (in `newprd/prdimages/`)
- Handles failures gracefully

### 2. PRD Analysis
- Identifies core components and features
- Extracts business context
- Spots ambiguities and missing details
- Groups related functionality into scenes

### 3. Interactive Clarification
- Asks up to 4 questions per batch
- Provides context and options
- Documents all decisions
- Iterates until clarity achieved

### 4. Scene Breakdown
Each scene includes:
- Scene overview (ID, priority, description)
- User scenarios (primary flow, alternatives, edge cases)
- Functional requirements (numbered, testable)
- **Input specifications** (format, validation, examples)
- **Output specifications** (success/error states, UI display)
- Data requirements
- Acceptance criteria (Given-When-Then format)
- Dependencies and constraints
- UI/UX requirements
- Non-functional requirements
- Error handling

### 5. Quality Assurance
- Scene dependency mapping
- Implementation order suggestions
- Completeness validation
- Developer handoff checklist

## Scripts

The skill includes Python scripts for execution:

### `download_images.py`
Downloads images from markdown URLs with retry logic:
```bash
python scripts/download_images.py input.md newprd/prdimages/
```

**Supports**:
- Standard image URLs with extensions
- 百度BOS links (bcebos.com)
- Internal service URLs (cfe-doc-backend, feishu-service)
- URLs with extensions in query parameters

### `extract_sections.py`
Extracts and analyzes markdown structure:
```bash
python scripts/extract_sections.py input.md
```

### `validate_spec.py`
Validates refined PRD completeness:
```bash
python scripts/validate_spec.py refined-prd.md
```

## Best Practices

### Input Specifications Should Include:
- Data type and format (e.g., "String, valid email RFC 5322")
- Source (user input, system, API)
- Required vs optional
- Validation rules
- Default values
- Concrete examples

### Output Specifications Should Include:
- Output format and structure
- Destination (UI, database, API)
- Success state definition
- All possible error states
- UI display requirements

### Acceptance Criteria Should:
- Use Given-When-Then format
- Be testable and unambiguous
- Cover happy paths and error cases
- Include specific metrics (time, count, percentage)
- Avoid implementation details

## Common Pitfalls to Avoid

❌ **Too Vague**: "System should be fast"
✅ **Specific**: "Search results return in < 2 seconds"

❌ **Implementation-Focused**: "Use Redux for state"
✅ **Behavior-Focused**: "User selections persist during session"

❌ **Untestable**: "UI should look good"
✅ **Testable**: "UI matches mockup #123"

❌ **Missing Error Cases**: Only happy path
✅ **Complete**: All error scenarios documented

❌ **Ambiguous Inputs**: "User data"
✅ **Specific**: "User email (string, RFC 5322, required)"

## Examples

### Simple E-commerce
**Input**: Basic e-commerce PRD
**Output**: 8 scenes (Registration, Search, Cart, Checkout, etc.)

### Complex Data Platform
**Input**: 【DFX】DTS数据管理 PRD
**Output**: 15 scenes with comprehensive dependency matrix

## Troubleshooting

### Images Fail to Download
Check `prd-refine-summary.md` for failed URLs. Manually download if needed.

### PRD File Not Found
Provide full path or use Glob pattern to search.

### Too Many Questions
Answer what you can, defer others. Skill makes reasonable assumptions.

### Scene Granularity
Provide guidance: "Create larger scenes" or "Break down smaller"

## Requirements

- Python 3.6+
- No external dependencies (uses stdlib only)

## File Structure

```
~/.claude/skills/prd-refine/
├── SKILL.md                    # Main skill definition
├── README.md                   # This file
└── scripts/
    ├── download_images.py      # Image download utility
    ├── extract_sections.py     # Markdown analysis
    └── validate_spec.py        # Validation checks
```

## Version

1.0.0 - Initial release

## License

Created for use with Claude Code.
