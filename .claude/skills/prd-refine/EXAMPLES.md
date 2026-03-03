# Usage Examples

## Example 1: Basic PRD Refinement

### Input PRD
`ecommerce-prd.md` - A simple e-commerce product requirements document

### Run the skill
```bash
/prd-refine ecommerce-prd.md
```

### Process
1. Skill reads the PRD
2. Finds 12 images, downloads to `prdimages/`
3. Asks 5 clarification questions:
   - Q1: Should guest checkout be allowed?
   - Q2: What payment methods to support?
   - Q3: How to handle inventory conflicts?
   - Q4: Email verification required?
   - Q5: Shipping address validation level?
4. User responds to questions
5. Skill identifies 8 scenes:
   - SCENE-001: User Registration
   - SCENE-002: Product Browse & Search
   - SCENE-003: Shopping Cart
   - SCENE-004: Checkout Process
   - SCENE-005: Payment Processing
   - SCENE-006: Order Confirmation
   - SCENE-007: Order Tracking
   - SCENE-008: User Profile Management

### Output Files
```
project/
├── ecommerce-prd.md.backup
├── ecommerce-prd-refined.md         # 45 pages, complete specs
├── prd-clarifications.md             # 5 Q&A documented
├── prd-refine-summary.md
└── prdimages/
    ├── user-flow-registration.png
    ├── user-flow-checkout.png
    ├── wireframe-product-list.png
    ├── wireframe-cart.png
    ├── ... (8 more images)
```

### Key Insights from Refined PRD
- Implementation order: SCENE-001 → SCENE-002 → SCENE-003 → SCENE-004 → ...
- Critical path: Registration → Browse → Cart → Checkout
- SCENE-004 (Checkout) depends on SCENE-001, 002, 003
- Estimated complexity: 6-8 weeks for P0 scenes

---

## Example 2: Complex Data Platform PRD

### Input PRD
`【DFX】DTS数据管理 PRD_副本.md` - Complex data management system (Chinese)

### Run the skill
```bash
/prd-refine "【DFX】DTS数据管理 PRD_副本.md"
```

### Process
1. Skill reads 80-page PRD with technical diagrams
2. Finds 20 images (architecture diagrams, flow charts, UI mockups)
3. Downloads all images with contextual names:
   - `architecture-system-overview.png`
   - `data-flow-ingestion-pipeline.png`
   - `ui-parameter-management-screen.png`
   - etc.
4. Asks 8 clarification questions across 2 rounds:
   - Round 1: Data model questions (4 questions)
   - Round 2: Permission and workflow questions (4 questions)
5. Identifies 15 scenes across data lifecycle

### Scenes Identified
```
Priority | Scene ID   | Scene Name                      | Complexity | Dependencies
---------|------------|---------------------------------|------------|-------------
P0       | SCENE-001  | Data Source Configuration       | High       | None
P0       | SCENE-002  | Parameter Group Management      | High       | SCENE-001
P0       | SCENE-003  | Factor Definition & Mapping     | High       | SCENE-002
P0       | SCENE-004  | Data Ingestion Pipeline         | Very High  | SCENE-001,003
P0       | SCENE-005  | Data Validation & Quality Check | High       | SCENE-004
P1       | SCENE-006  | Parameter Versioning            | Medium     | SCENE-002,003
P1       | SCENE-007  | Audit Log & Change Tracking     | Medium     | All P0
P1       | SCENE-008  | Data Export & Reporting         | Medium     | SCENE-004,005
P1       | SCENE-009  | User Permission Management      | Low        | None
P1       | SCENE-010  | Batch Operations                | High       | SCENE-002,003
P2       | SCENE-011  | Data Visualization Dashboard    | Medium     | SCENE-005,008
P2       | SCENE-012  | Alert & Notification System     | Medium     | SCENE-005
P2       | SCENE-013  | Data Archival & Cleanup         | Low        | SCENE-004
P2       | SCENE-014  | API Integration Layer           | High       | All P0
P2       | SCENE-015  | System Health Monitoring        | Medium     | All scenes
```

### Sample Scene Specification: SCENE-003

#### Scene Overview
- **Scene ID**: SCENE-003
- **Name**: Factor Definition & Mapping
- **Priority**: P0
- **Description**: Allow users to define data factors with hierarchical structure and map them to data sources

#### Input Specifications

**Input 1: Factor Definition**
- Format: JSON object
- Source: User input via factor management form
- Required: Yes
- Validation:
  - factorName: String, 1-50 chars, alphanumeric + underscore
  - factorCode: String, unique across system
  - dataType: Enum ['string', 'number', 'boolean', 'date']
  - parentFactorId: UUID or null (for hierarchy)
  - description: String, max 500 chars
- Default: parentFactorId = null (root level factor)
- Example:
  ```json
  {
    "factorName": "用户年龄",
    "factorCode": "USER_AGE",
    "dataType": "number",
    "parentFactorId": "uuid-parent-user-info",
    "description": "用户的年龄信息"
  }
  ```

**Input 2: Source Mapping Configuration**
- Format: JSON object
- Source: User selection + input via mapping interface
- Required: Yes
- Validation:
  - sourceId: UUID, must exist in SCENE-001 data sources
  - sourceFieldPath: String, JSONPath expression
  - transformRule: Optional transformation function
  - validationRule: Optional validation expression
- Example:
  ```json
  {
    "sourceId": "uuid-source-crm",
    "sourceFieldPath": "$.customer.age",
    "transformRule": "parseInt(value)",
    "validationRule": "value >= 0 && value <= 150"
  }
  ```

#### Output Specifications

**Output 1: Factor Creation Confirmation**
- Format: JSON response + UI notification
- Destination: API response (201 Created) + Frontend UI
- Success State:
  ```json
  {
    "status": "success",
    "factorId": "uuid-new-factor",
    "factorCode": "USER_AGE",
    "createdAt": "2025-01-16T14:30:00Z",
    "message": "Factor created successfully"
  }
  ```
- Error States:
  - Factor code already exists (409 Conflict)
    ```json
    {
      "status": "error",
      "code": "DUPLICATE_FACTOR_CODE",
      "message": "Factor code USER_AGE already exists"
    }
    ```
  - Invalid parent factor (404 Not Found)
  - Validation failure (422 Unprocessable Entity)
  - Server error (500 Internal Server Error)
- UI Display:
  - Success: Green toast notification "因子创建成功"
  - Error: Red toast with specific error message
  - Factor appears in factor tree immediately

**Output 2: Factor Hierarchy Update**
- Format: WebSocket event broadcast
- Destination: All connected clients viewing factor tree
- Success State:
  ```json
  {
    "event": "factor.created",
    "factorId": "uuid-new-factor",
    "parentFactorId": "uuid-parent",
    "position": "after-sibling-uuid"
  }
  ```
- UI Display: Factor tree auto-refreshes with animation

#### Acceptance Criteria

**AC-001: Factor Creation Success**
```
Given: A user with factor management permission
When: They submit a valid factor definition
Then: Factor is created in database
And: Factor appears in factor tree within 2 seconds
And: Success notification is displayed
And: Factor is persisted with correct hierarchy
```

**AC-002: Duplicate Factor Code Prevention**
```
Given: A factor with code "USER_AGE" already exists
When: User tries to create another factor with code "USER_AGE"
Then: Creation fails with clear error message
And: Existing factor is highlighted in the tree
And: User is prompted to use a different code
```

**AC-003: Hierarchical Relationship Validation**
```
Given: A user defining a child factor
When: They select a parent factor
Then: System validates parent exists and is compatible
And: Circular dependency is prevented
And: Maximum depth of 5 levels is enforced
```

**AC-004: Source Mapping Validation**
```
Given: A factor mapped to a data source
When: Source field path is provided
Then: System validates JSONPath syntax
And: Test data is used to verify path accessibility
And: Transformation rule is validated for safety (no eval)
```

#### Dependencies
- SCENE-001: Data source must be configured first
- SCENE-002: Parameter groups needed for organization

#### Non-Functional Requirements
- Performance: Factor creation completes in < 1 second
- Scalability: Support up to 10,000 factors in tree
- Concurrency: Handle 50 concurrent factor edits
- Data Integrity: ACID compliance for factor operations

### Output Files
```
project/
├── 【DFX】DTS数据管理 PRD_副本.md.backup
├── dts-data-management-refined.md    # 120 pages, extremely detailed
├── prd-clarifications.md              # 8 Q&A with context
├── prd-refine-summary.md              # Comprehensive metrics
└── prdimages/
    ├── architecture-system-overview.png
    ├── data-flow-ingestion-pipeline.png
    ├── data-model-er-diagram.png
    ├── ui-parameter-management-screen.png
    ├── ... (16 more images)
```

### Key Insights
- 15 scenes identified across 3 priority levels
- Complex dependency graph with critical path through SCENE-001 → 002 → 003 → 004 → 005
- Estimated 12-16 weeks for P0 scenes (5 scenes)
- 6 shared data models identified
- 8 common UI components specified
- 23 API endpoints mapped out
- Security requirements documented per scene

---

## Example 3: Quick PRD with Minimal Images

### Input PRD
`admin-dashboard-prd.md` - Simple admin dashboard (no images)

### Run the skill
```bash
/prd-refine admin-dashboard-prd.md
```

### Process
1. No images found - skips image download
2. Asks 3 clarification questions
3. Identifies 4 scenes
4. Generates complete specs

### Output
- 4 scenes with full specifications
- No images directory created
- Quick turnaround (< 5 minutes of interaction)

---

## Example 4: Using with Custom Parameters

### Scenario: Large PRD, only want specific sections refined

```bash
# User provides guidance during process
/prd-refine large-system-prd.md
```

During clarification, user says:
> "Focus only on the user management and authentication sections for now"

Skill adapts:
- Only creates scenes for specified sections
- Marks other sections as "Out of Scope"
- Generates partial refined PRD with clear boundaries
- Suggests follow-up refinement for remaining sections

---

## Tips for Best Results

### 1. Prepare Your PRD
Before running the skill:
- Include mockups or wireframes as images
- Structure with clear headings (H1, H2, H3)
- Document known constraints and assumptions
- List success metrics

### 2. During Clarification
- Answer questions thoughtfully - they shape the entire spec
- If unsure, ask for more context
- Use "defer" for low-priority questions
- Provide concrete examples when possible

### 3. After Generation
- Review refined PRD section by section
- Validate input/output specs with technical team
- Verify acceptance criteria with QA team
- Use as basis for technical design discussions

### 4. Iteration
You can run the skill multiple times:
- First pass: High-level scene breakdown
- Second pass: Detailed specs for priority scenes
- Third pass: Edge cases and error handling

---

## Common Workflows

### Workflow 1: Full PRD Refinement (Recommended)
```bash
1. /prd-refine original-prd.md
2. Answer clarification questions
3. Review refined PRD
4. Run validation: python scripts/validate_spec.py refined-prd.md
5. Share with team for technical design
```

### Workflow 2: Iterative Refinement
```bash
1. /prd-refine prd.md  # First pass - basic scenes
2. Review and identify gaps
3. /prd-refine prd.md  # Second pass - more detail
4. Validate and finalize
```

### Workflow 3: Scene-by-Scene Approach
```bash
1. /prd-refine prd.md  # Generate initial structure
2. Focus on P0 scenes first
3. Get technical feedback on P0 specs
4. Iterate on P1/P2 scenes later
```

---

## Measuring Success

After using the skill, you should have:

✅ **Clear Scene Boundaries**: Each scene is self-contained
✅ **Complete Input Specs**: Developers know exactly what data to expect
✅ **Complete Output Specs**: Developers know exactly what to produce
✅ **Testable Criteria**: QA can write test cases directly from acceptance criteria
✅ **Dependency Map**: Clear implementation order
✅ **No Ambiguities**: All [NEEDS CLARIFICATION] markers resolved
✅ **Local Images**: No external dependencies for viewing PRD

**Quality Metrics**:
- Refined PRD passes validation script: `python scripts/validate_spec.py`
- Developers can start technical design without asking clarifying questions
- QA can draft test plan from acceptance criteria
- Product manager can demo scenarios to stakeholders

That's the power of the PRD Refine skill!
