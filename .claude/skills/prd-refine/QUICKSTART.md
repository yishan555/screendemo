# PRD Refine Skill - Quick Start Guide

## Installation

The skill is already installed at:
```
~/.claude/skills/prd-refine/
```

## Usage

```bash
/prd-refine path/to/your-prd.md
```

## What It Does

Transforms a raw PRD into a developer-ready specification with:
- ✅ Downloaded and organized images
- ✅ Clear scene breakdown
- ✅ Complete input/output specifications
- ✅ Testable acceptance criteria
- ✅ Implementation roadmap

## Expected Workflow

### Step 1: Invoke the Skill
```bash
/prd-refine 【DFX】DTS数据管理 PRD_副本.md
```

### Step 2: Wait for Analysis
The skill will:
- Read your PRD
- Extract and download images
- Analyze content and structure
- Identify potential scenes

### Step 3: Answer Clarification Questions
The skill asks up to 4 questions at a time:

```
Question 1: User Permission Model
Context: The PRD mentions "admin" and "user" roles...
Question: Should there be additional roles like "auditor" or "operator"?

Options:
A. Just Admin and User (simple 2-role model)
B. Add Auditor role (read-only access to logs)
C. Full RBAC with custom permissions
```

Answer with: "A" or "B" or "C" or provide custom answer

### Step 4: Review Scene Breakdown
The skill presents identified scenes:

```
I've identified 8 scenes:
- SCENE-001: User Registration (P0)
- SCENE-002: Data Import (P0)
- SCENE-003: Parameter Management (P0)
- ... (5 more)

Does this breakdown make sense?
```

### Step 5: Receive Output
After completion, you get:

```
✓ PRD Refinement Complete!

Output files created:
1. dts-data-management-refined.md (85 pages)
2. prd-clarifications.md (12 Q&A)
3. prd-refine-summary.md
4. prdimages/ (18 images)
5. Original PRD backed up

Summary:
- 8 scenes identified
- 18 images downloaded
- 12 clarifications made
- All input/output specs complete
- Ready for technical design phase

Next steps:
1. Review refined PRD with team
2. Validate with: python scripts/validate_spec.py
3. Begin technical design for P0 scenes
```

## Output Structure

```
your-project/
├── original-prd.md.backup              ← Original preserved
├── original-prd-refined.md             ← Complete refined PRD
├── prd-clarifications.md               ← All Q&A documented
├── prd-refine-summary.md               ← Process summary
└── prdimages/                           ← All images local
    ├── scene-1-user-flow.png
    ├── scene-2-architecture.jpg
    └── ...
```

## Refined PRD Contents

### Document Overview
- Purpose, scope, success metrics

### Product Context
- Business background, problem, solution, users

### Scene Breakdown
- Priority matrix
- Implementation order

### Scene Specifications (for each scene)
- Scene overview
- User scenarios
- Functional requirements
- **Input specifications** ⭐
- **Output specifications** ⭐
- Data requirements
- Acceptance criteria
- Dependencies
- UI/UX requirements
- Non-functional requirements
- Edge cases and error handling

### Cross-Scene Considerations
- Shared components
- Shared data models
- Common UI patterns
- Global requirements

### Appendices
- Glossary, references, change log

### Developer Handoff Checklist
- Validation checklist

## Key Features

### 1. Complete Input Specifications
Every scene defines inputs with:
```
Input: User Email
- Format: String, valid email (RFC 5322)
- Source: User input via form
- Required: Yes
- Validation: Must be unique, max 254 chars
- Default: None
- Example: user@example.com
```

### 2. Complete Output Specifications
Every scene defines outputs with:
```
Output: Registration Confirmation
- Format: JSON + UI notification
- Destination: API response + Frontend
- Success State: { status: "success", userId: "..." }
- Error States: Duplicate email (409), Invalid (422), Server (500)
- UI Display: Green success banner
```

### 3. Testable Acceptance Criteria
```
AC-001: User Registration Success
Given: A new user on registration page
When: They submit valid email and password
Then: Account is created
And: Confirmation email sent within 30 seconds
And: User redirected to onboarding
```

## Validation

After generation, validate completeness:

```bash
cd ~/.claude/skills/prd-refine
python scripts/validate_spec.py /path/to/your-refined-prd.md
```

Expected output:
```
============================================================
Validating: your-refined-prd.md
============================================================

1. Checking required sections...
  ✓ All required sections present

2. Checking scene completeness...
  ✓ All scenes have required subsections

3. Checking input/output specifications...
  ✓ Input/Output specifications are complete

4. Checking acceptance criteria...
  ✓ Acceptance criteria follow proper format

5. Checking for unresolved clarifications...
  ✓ No unresolved clarifications

6. Checking scene dependencies...
  ✓ Scene Priority Matrix present
  ✓ Implementation Order present

============================================================
✓ VALIDATION PASSED
  The refined PRD is complete and ready for development.
============================================================
```

## Tips for Success

### Before Running
- Ensure your PRD has clear section headings
- Include mockups/wireframes as image URLs
- Document known constraints

### During Clarification
- Answer thoughtfully - answers shape the entire spec
- Provide concrete examples
- If unsure, ask for more context
- Use "defer" for low-priority questions

### After Generation
- Review scene-by-scene
- Run validation script
- Share with technical team
- Use as basis for technical design

## Common Issues

### "PRD file not found"
**Solution**: Provide full path or ensure file is in current directory

### "Too many images failing"
**Solution**: Check internet connection, some sites may block automated downloads

### "Too many clarification questions"
**Solution**: Answer what you can, mark others as "defer", skill will make reasonable assumptions

### "Scene breakdown too granular/broad"
**Solution**: Provide guidance: "Create larger scenes" or "Break into smaller pieces"

## Advanced Usage

### Custom Image Directory
During execution, modify the image directory path when prompted

### Partial Refinement
Tell the skill to focus only on specific sections:
> "Focus only on user management sections"

### Re-run Specific Steps
If you want to revise:
- Clarifications: Re-answer questions differently
- Scene breakdown: Provide different grouping guidance
- Specs: Add more detail to specific scenes

## Example Session

```bash
$ /prd-refine ecommerce-prd.md

Reading PRD file...
✓ Found 45 sections, 12 images

Downloading images...
✓ Downloaded 12/12 images to prdimages/

Analyzing PRD...
✓ Identified 8 potential scenes

I have some clarification questions...

Question 1: Guest Checkout
Context: PRD mentions "users can purchase"
Should guest checkout (without registration) be allowed?
A. Yes, allow guest checkout
B. No, require registration
C. Allow guest, but encourage registration

Your answer: A

Question 2: Payment Methods
Which payment methods should be supported?
A. Credit cards only
B. Credit cards + PayPal
C. Credit cards + PayPal + Digital wallets

Your answer: C

... (3 more questions)

Creating scene breakdown...
✓ 8 scenes identified

Generating specifications...
✓ SCENE-001: User Registration (complete)
✓ SCENE-002: Product Browse (complete)
... (6 more scenes)

✓ All done!

Files created:
- ecommerce-prd-refined.md (52 pages)
- prd-clarifications.md
- prd-refine-summary.md
- prdimages/ (12 images)

Validating...
✓ All checks passed

Ready for development!
```

## Questions?

Check these files:
- `README.md` - Full documentation
- `EXAMPLES.md` - Detailed examples
- `SKILL.md` - Complete skill specification

## Version

1.0.0

Enjoy refining your PRDs! 🚀
