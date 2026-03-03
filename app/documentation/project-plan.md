# API Roadmap

## EPIC 1 — Core API Infrastructure & Standards

**Goal:** Establish a production-grade, versioned, validated API foundation with consistent behavior.

### Story 1.1 — Versioned API Structure

**As a** developer
**I want** all endpoints under a versioned namespace
**So that** future changes don’t break consumers.

**Acceptance Criteria**

- [ ] All endpoints are under `/api/v1/...`
- [ ] Unsupported HTTP methods return `405`
- [ ] All endpoints return JSON
- [ ] All responses include a consistent envelope format

### Story 1.2 — Standardized Error & Response Contracts

**As an** API consumer
**I want** consistent success and error response shapes
**So that** I can build reliable integrations.

**Acceptance Criteria**

- [ ] Success responses use `{ data, meta }`
- [ ] Errors use `{ error: { code, message, details? } }`
- [ ] Validation errors return `422`
- [ ] Not-found returns `404`
- [ ] Conflicts return `409`

### Story 1.3 — OpenAPI 3.1 Specification & Docs

**As a** developer
**I want** a formal OpenAPI spec and interactive docs
**So that** the API is self-documenting and testable.

**Acceptance Criteria**

- [ ] `/openapi.json` returns full OpenAPI `3.1` spec
- [ ] `/docs` renders interactive documentation
- [ ] All endpoints are fully described
- [ ] Example requests and responses are included
- [ ] Spec matches actual implementation

## EPIC 2 — Naming Profiles (Configuration Layer)

**Goal:** Allow structured configuration of cultural naming rules and selection weights.

### Story 2.1 — Profile CRUD

**As an** admin
**I want** to create, update, and delete naming profiles
**So that** I can define different naming systems.

**Acceptance Criteria**

- [ ] Create, list, retrieve, update, delete profile endpoints
- [ ] Each profile includes:
  - [ ] `slug`
  - [ ] `display name`
  - [ ] `enabled` flag
  - [ ] `selection weight`
  - [ ] `ordering rules`
  - [ ] `default count distributions`
- [ ] Duplicate slugs rejected

### Story 2.2 — Profile Count & Ordering Rules

**As an** admin
**I want** configurable given-name and surname count distributions
**So that** each profile behaves realistically.

**Acceptance Criteria**

- [ ] Profiles support:
  - [ ] default given-name distribution
  - [ ] default surname distribution
  - [ ] ordering rules
  - [ ] separator rules
- [ ] Distribution probabilities must validate to `1.0`
- [ ] Disabled profiles are excluded from generation

## EPIC 3 — Name Source Data Management

**Goal:** Provide full control over name part datasets.

### Story 3.1 — Given Name CRUD

**As an** admin
**I want** to manage given names per profile
**So that** generation uses controlled datasets.

**Acceptance Criteria**

- [ ] Create, list, update, delete given names
- [ ] Fields include:
  - [ ] `value`
  - [ ] `weight` (optional)
  - [ ] `enabled` flag
- [ ] Disabled entries excluded from generation

### Story 3.2 — Surname CRUD

**As an** admin
**I want** to manage surnames per profile
**So that** generation uses structured surname datasets.

**Acceptance Criteria**

- [ ] Same CRUD behavior as given names
- [ ] Supports bulk import endpoint
- [ ] Duplicate handling defined (reject or flag)

## EPIC 4 — Random Name Generation Engine

**Goal:** Deliver a configurable, weighted, reproducible name generation API.

### Story 4.1 — Single Random Name Endpoint

**As an** API consumer
**I want** to request one random name
**So that** I can use the service quickly.

**Acceptance Criteria**

- [ ] `GET /api/v1/names/random`
- [ ] Supports:
  - [ ] profile selection
  - [ ] `profile=any` (weighted selection)
  - [ ] `givenNameCount` override
  - [ ] `surnameCount` override
- [ ] Returns structured name parts and metadata
- [ ] Returns selected profile in response

### Story 4.2 — Batch Name Generation

**As an** API consumer
**I want** to generate multiple names in one request
**So that** I can create datasets efficiently.

**Acceptance Criteria**

- [ ] `POST /api/v1/names/generate`
- [ ] Accepts:
  - [ ] `profile` or weighted any
  - [ ] `count`
  - [ ] count overrides
  - [ ] optional `seed`
- [ ] Returns array of structured names
- [ ] Enforces maximum batch size

### Story 4.3 — Deterministic Seed Support

**As a** developer
**I want** deterministic generation via seed
**So that** I can reproduce outputs for testing and benchmarking.

**Acceptance Criteria**

- [ ] Same seed + same request = same output
- [ ] Different seed produces different results
- [ ] Seed included in response metadata
