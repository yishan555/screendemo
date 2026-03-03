---
name: prd-refine
description: Refine and break down a PRD document into clear, actionable specifications with scene breakdown. Downloads images from URLs, processes markdown, interacts with user for clarifications, and generates comprehensive developer-ready documentation with input/output specifications.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion, TodoWrite
---

# PRD Refinement and Scene Breakdown

Transform a product requirements document (PRD) into a comprehensive, developer-ready specification with clear scene breakdown, input/output specifications, and acceptance criteria.

## Quick Start

```bash
/prd-refine path/to/prd.md
```

Or just the filename (will search current directory):

```bash
/prd-refine DTS数据管理 PRD.md
```

## What This Skill Does

This skill takes a raw PRD and:

1. Downloads and organizes all images locally
2. Analyzes the PRD to understand requirements
3. Asks clarifying questions interactively
4. Breaks down into implementable scenes
5. Generates comprehensive specifications with:
   - Clear input/output specs for each scene
   - Testable acceptance criteria
   - Dependency mapping
   - Implementation order suggestions

## Workflow

The skill follows this structured process:

```
PRD Refinement Process:
- [ ] Step 1: Locate and read PRD file
- [ ] Step 2: Extract and download images
- [ ] Step 3: Analyze PRD content
- [ ] Step 4: Clarify ambiguities with user
- [ ] Step 5: Break down into scenes
- [ ] Step 6: Generate refined PRD
- [ ] Step 7: Create summary report
- [ ] Step 8: Validate completeness
```

## Step-by-Step Process

### Step 1: Locate and Read the PRD File

**If full path provided**: Read directly

**If filename only**: Search using Glob
```bash
# Will search for: **/*filename*
```

**If multiple matches**: Ask user to select

**If not found**: Suggest similar filenames

### Step 2: Extract and Download Images

The skill will:

1. Create `newprd/` directory for all output files
2. Create `newprd/prdimages/` subdirectory for images
3. Scan PRD for images:
   - Markdown syntax: `![alt](url)`
   - HTML tags: `<img src="url" />`
   - Direct image URLs
   - Special URL formats (BOS links, internal services)
4. Download each image with descriptive names
5. Update PRD references to local paths
6. Create backup of original PRD

**Special URL Support**:
- 百度BOS链接: `https://bj.bcebos.com/prod-public-open/cfe-global/images/...`
- 内部服务链接: `https://cfe-doc-backend.inner.chj.cloud/api/v1/analysis/file?file_key=feishu-service/...`
- URLs with image extensions in query parameters

**Image naming convention**:
```
section-name-description.ext

Examples:
- user-flow-login-process.png
- architecture-system-diagram.jpg
- wireframe-dashboard-layout.png
```

**Download script** (`scripts/download_images.py`):
```bash
python scripts/download_images.py prd.md newprd/prdimages/
```

See script implementation below for details.

### Step 3: Analyze and Understand PRD

The skill analyzes:

**Core Components**:
- Product goals and objectives
- Target users and stakeholders
- Core features and functionality
- Success metrics and KPIs

**Key Information**:
- Business context and background
- Problem statement
- Solution approach
- Dependencies and constraints

**Ambiguities**:
- Unclear requirements
- Missing user flow details
- Undefined acceptance criteria
- Vague non-functional requirements

### Step 4: Communicate with User for Clarification

**Question Format**:

The skill will present questions using AskUserQuestion tool:

```markdown
## [Scene/Topic Name]

**Context**: [Relevant PRD excerpt]

**Question**: [Specific question]

**Why this matters**: [Impact explanation]

**Options**:
- Option A: [Description] - [Implications]
- Option B: [Description] - [Implications]
- Other: [User provides custom answer]
```

**Batch questioning**: Max 4 questions at a time

**Iteration**: Continues until all critical ambiguities resolved

**Documentation**: All Q&A saved to `prd-clarifications.md`

### Step 5: Scene Breakdown

**What is a Scene?**

A scene is a cohesive unit of functionality from a user's perspective:
- Maps to a user journey or workflow
- Self-contained with clear boundaries
- Appropriately sized (1-3 days of development)
- Has clear entry and exit points

**Examples**: "User Registration", "Product Search", "Admin Dashboard"

**For Each Scene, the skill defines**:

#### Scene Overview
- Scene ID (SCENE-001, SCENE-002, etc.)
- Scene name
- Brief description
- User goal
- Priority (P0/P1/P2)

#### User Scenarios
- Primary user flow (step-by-step)
- Alternative flows
- Edge cases and error scenarios
- Entry points (how users arrive)
- Exit points (where users go after)

#### Functional Requirements
- Numbered for reference (FR-001-001, FR-001-002, etc.)
- Specific and unambiguous
- Testable
- Independent or with clear dependencies

#### Input Specifications ⭐

Clear definition of all inputs:

```
Input: [Input Name]
- Format: [Data type, format specification]
- Source: [User input / System / External API]
- Required: [Yes/No]
- Validation: [Validation rules]
- Default: [Default value if any]
- Example: [Concrete example]
```

**Example**:
```
Input: User Email
- Format: String, valid email address (RFC 5322)
- Source: User input via form field
- Required: Yes
- Validation: Must be unique in system, max 254 chars
- Default: None
- Example: user@example.com
```

#### Output Specifications ⭐

Clear definition of all outputs:

```
Output: [Output Name]
- Format: [Data structure, format]
- Destination: [UI display / Database / API response]
- Success State: [Success response structure]
- Error States: [All possible error responses]
- UI Display: [How it appears to user]
```

**Example**:
```
Output: Registration Confirmation
- Format: JSON response + UI notification
- Destination: API response + Frontend UI
- Success State:
  {
    "status": "success",
    "userId": "uuid-string",
    "message": "Account created successfully"
  }
- Error States:
  - Email already exists (400)
  - Invalid email format (422)
  - Server error (500)
- UI Display: Green success banner with "Welcome!" message
```

#### Data Requirements
- Data entities involved
- Data relationships
- Data constraints
- Data lifecycle (CRUD operations)

#### Acceptance Criteria

**Format**: Given-When-Then scenarios

**Coverage**: Happy paths + error cases

**Example**:
```
AC-001: User Registration Success
  Given: A new user on registration page
  When: They submit valid email and password
  Then: Account is created
  And: Confirmation email is sent within 30 seconds
  And: User is redirected to onboarding page

AC-002: Duplicate Email Handling
  Given: A user trying to register
  When: They submit an email that already exists
  Then: Registration fails with clear error message
  And: Existing account is not modified
  And: User is prompted to login instead
```

#### Dependencies
- Other scenes required first
- External systems/APIs
- Shared components

#### UI/UX Requirements (if applicable)
- Screen layouts
- Interaction patterns
- Responsive behavior
- Accessibility requirements
- References to mockups

#### Non-Functional Requirements
- Performance targets (response time, throughput)
- Security requirements
- Scalability considerations
- Compliance requirements

#### Edge Cases and Error Handling
- All identified edge cases
- Error scenarios and expected behavior
- Validation failures
- System failure recovery

#### Open Questions
- Any remaining clarifications needed
- Marked with [NEEDS CLARIFICATION: question]

#### Scene Dependency Matrix

Visual map showing:
- Dependencies between scenes
- Critical path scenes
- Suggested implementation order

### Step 6: Generate Refined PRD Document

**Output location**: `newprd/[original-filename]-refined.md`

All files will be placed in the `newprd/` directory:
- Refined PRD: `newprd/[filename]-refined.md`
- Images: `newprd/prdimages/`
- Clarifications: `newprd/prd-clarifications.md`
- Summary: `newprd/prd-refine-summary.md`
- Backup: `newprd/[original].backup`

**Document structure**:

```markdown
# [Product Name] - Refined PRD

**Version**: 1.0
**Date**: [Current Date]
**Original PRD**: [Link to original]
**Clarifications**: [Link to prd-clarifications.md]

---

## Document Overview

### Purpose
[Clear statement of what this PRD specifies]

### Scope
**In Scope**: [List what's included]
**Out of Scope**: [List what's excluded]

### Success Metrics
[Measurable criteria for success]

---

## Product Context

### Business Background
[Context from original PRD, clarified]

### Problem Statement
[Clear problem definition]

### Solution Overview
[High-level solution approach]

### Target Users
[User personas and needs]

### Assumptions
[Documented assumptions]

### Dependencies
[External dependencies]

---

## Scene Breakdown

### Scene Priority Matrix

| Priority | Scene ID | Scene Name | Complexity | Dependencies |
|----------|----------|------------|------------|--------------|
| P0       | SCENE-001| [Name]    | High       | None         |
| P0       | SCENE-002| [Name]    | Medium     | SCENE-001    |
| P1       | SCENE-003| [Name]    | Low        | SCENE-001    |

### Implementation Order
[Recommended order with rationale]

---

## Scene Specifications

### SCENE-001: [Scene Name]

[Complete scene spec with all sections above]

---

[Continue for all scenes...]

---

## Cross-Scene Considerations

### Shared Components
[Components used across scenes]

### Shared Data Models
[Data structures used across scenes]

### Common UI Patterns
[Reusable UI components]

### Global Non-Functional Requirements
[Requirements applying to all scenes]

---

## Appendices

### Appendix A: Glossary
[Term definitions]

### Appendix B: References
[Links to related docs]

### Appendix C: Change Log
[Document changes]

---

## Developer Handoff Checklist

- [ ] All scenes have clear input/output specs
- [ ] All acceptance criteria are testable
- [ ] All dependencies documented
- [ ] All ambiguities resolved
- [ ] All images downloaded locally
- [ ] UI/UX specs include mockups
- [ ] Error handling defined
- [ ] Non-functional requirements specified
- [ ] Implementation order suggested
```

### Step 7: Generate Summary Document

Creates `prd-refine-summary.md`:

```markdown
# PRD Refinement Summary

## Original PRD
- File: [path]
- Size: [size]
- Last Modified: [date]

## Refinement Process

### Images Processed
- Total Found: [count]
- Successfully Downloaded: [count]
- Failed: [count] (see details below)
- Directory: `./prdimages/`

### Clarifications
- Questions Asked: [count]
- Iterations: [count]
- Document: `prd-clarifications.md`

### Scene Breakdown
- Total Scenes: [count]
- P0 Scenes: [count]
- P1 Scenes: [count]
- P2 Scenes: [count]

## Output Files

1. **Refined PRD**: `[filename]`
2. **Clarifications**: `prd-clarifications.md`
3. **Images**: `./prdimages/` ([count] files)
4. **Backup**: `[original].backup`
5. **Summary**: `prd-refine-summary.md` (this file)

## Key Findings

### Complexity Assessment
[Overall complexity rating and rationale]

### Critical Dependencies
[List of critical dependencies]

### Recommended Implementation Order
[Suggested order with reasoning]

## Next Steps

1. Review refined PRD with stakeholders
2. Prioritize scenes if needed
3. Begin technical planning for P0 scenes
4. Set up development environment
5. Start implementation

## Recommendations

[Specific recommendations for the team]
```

### Step 8: Final Validation

Before completion, validates:

- [ ] All images downloaded or failures documented
- [ ] All clarification questions answered
- [ ] Every scene has complete specifications
- [ ] All input/output specs are clear
- [ ] All acceptance criteria are testable
- [ ] Scene dependencies documented
- [ ] Implementation order suggested
- [ ] Original PRD backed up
- [ ] All files in correct locations

## Best Practices

### Scene Identification

**Good scenes** are:
- User-centric (meaningful user action)
- Self-contained (minimal dependencies)
- Appropriately sized (1-3 days dev)
- Clear boundaries (defined entry/exit)

### Input/Output Specifications

**Be specific**:
- ❌ "User data" → ✅ "User email (string, RFC 5322 format, required)"
- ❌ "Response" → ✅ "JSON with status code, user ID, timestamp"

**Include format details**:
- Data types
- Validation rules
- Example values
- Source/destination
- Required vs optional

### Acceptance Criteria

**Make them testable**:
- ❌ "System should be fast" → ✅ "Search returns results in < 2 seconds"
- ❌ "UI should look good" → ✅ "UI matches mockup #123"
- ❌ "Handle errors gracefully" → ✅ "Show error message and log to system on API failure"

**Use Given-When-Then**:
- Clear preconditions (Given)
- Specific actions (When)
- Measurable outcomes (Then)

### Common Pitfalls to Avoid

1. ❌ Too vague → ✅ Specific and measurable
2. ❌ Implementation-focused → ✅ Behavior-focused
3. ❌ Untestable → ✅ Testable
4. ❌ Missing error cases → ✅ All error scenarios
5. ❌ Ambiguous inputs → ✅ Fully specified

## Output Files Created

After running this skill, you'll have:

```
project/
└── newprd/                                # All output in this directory
    ├── [original-prd].md.backup          # Original PRD backup
    ├── [original-prd]-refined.md         # Refined PRD with scenes
    ├── prd-clarifications.md             # All Q&A documented
    ├── prd-refine-summary.md             # Process summary
    └── prdimages/                         # Downloaded images
        ├── scene-1-user-flow.png
        ├── scene-2-architecture.jpg
        └── ...
```

## Supporting Scripts

This skill uses helper scripts in `scripts/`:

### `download_images.py`

Downloads images from URLs found in markdown:

```bash
python scripts/download_images.py input.md newprd/prdimages/
```

**Features**:
- Extracts all image URLs from markdown
- Supports special URL formats (BOS, internal services)
- Handles URLs without explicit extensions
- Generates descriptive filenames
- Downloads with retry logic
- Updates markdown references
- Logs successes and failures

**Supported URL types**:
- Standard image URLs with extensions
- 百度BOS: `https://bj.bcebos.com/prod-public-open/...`
- 内部服务: `https://cfe-doc-backend.inner.chj.cloud/...`
- URLs with extensions in query parameters

### `extract_sections.py`

Extracts sections from markdown for analysis:

```bash
python scripts/extract_sections.py input.md
```

**Output**: JSON with section structure

### `validate_spec.py`

Validates refined PRD completeness:

```bash
python scripts/validate_spec.py refined-prd.md
```

**Checks**:
- All required sections present
- Input/output specs complete
- Acceptance criteria well-formed
- No [NEEDS CLARIFICATION] markers remain

## Advanced Usage

### Custom Image Directory

The skill automatically uses `newprd/prdimages/` directory:

```bash
# This is handled automatically, but you can manually run:
mkdir -p newprd/prdimages
python scripts/download_images.py prd.md newprd/prdimages/
```

### Skip Image Download

If you want to skip image downloading:
```markdown
User instruction: "Skip image download step"
```

### Re-run Clarifications Only

If you need to revisit clarifications:
```bash
/prd-refine [prd-file] --clarify-only
```

## Troubleshooting

### Images Fail to Download

Check the summary for failed URLs. Common issues:

1. **Special URL formats**: The script now supports BOS and internal service URLs
2. **Missing extensions**: The script infers extensions from URL content
3. **Network/auth issues**: For internal URLs requiring authentication:
   ```bash
   # Manually download if needed
   curl -L "FAILED_URL" -o newprd/prdimages/manual-download.png
   ```

All downloaded images are in `newprd/prdimages/` directory.

### PRD File Not Found

Search for similar filenames:
```bash
find . -name "*PRD*.md"
```

### Too Many Clarification Questions

The skill limits questions to 4 per batch. If you're getting overwhelmed:
- Answer what you can
- Mark others as "defer" for later
- Skill will make reasonable assumptions

### Scene Breakdown Too Granular/Broad

Provide guidance:
```markdown
User instruction: "Create larger scenes covering full user journeys"
```
or
```markdown
User instruction: "Break down into smaller, more focused scenes"
```

## Examples

### Example 1: Simple E-commerce PRD

**Input**: `ecommerce-prd.md`

**Output**:
- 8 scenes identified (Registration, Search, Cart, Checkout, etc.)
- 12 images downloaded
- 5 clarification questions asked
- Complete refined PRD with input/output specs

### Example 2: Complex Data Platform PRD

**Input**: `【DFX】DTS数据管理 PRD_副本.md`

**Output** (all in `newprd/` directory):
- 15 scenes identified across data management workflows
- 20 images organized by section (supports BOS and internal service URLs)
- 8 clarification rounds
- Comprehensive scene dependency matrix
- Implementation timeline suggestion

## Tips for Best Results

1. **Provide Complete PRD**: More detail = fewer clarifications needed
2. **Include Mockups**: Visual references dramatically improve specs
3. **Answer Questions Thoughtfully**: Your answers shape the entire spec
4. **Review Incrementally**: Check each scene as it's generated
5. **Iterate**: Run multiple times to refine further if needed

## Notes

- This is an iterative process - expect multiple clarification rounds
- Goal is developer-ready documentation
- When in doubt, the skill will ask rather than assume
- Focus is on clarity and completeness
- Use TodoWrite to track progress throughout

---

Ready to refine your PRD? Just run:

```bash
/prd-refine your-prd-file.md
```
