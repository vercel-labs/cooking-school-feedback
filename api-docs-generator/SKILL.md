---
name: api-docs-generator
description: Generates agent-friendly markdown documentation for API routes. Use when user says "generate docs", "document this API", "create API documentation", or "make docs for my endpoints".
---

# API Docs Generator

Generate comprehensive, agent-friendly markdown documentation for API route handlers in a Next.js App Router project.

## Instructions

### Step 1: Discover API routes

Search the project for all route handler files:

```
Glob for **/api/**/route.ts and **/api/**/route.js
```

List all discovered routes and confirm with the user before proceeding.

### Step 2: Analyze each route

For each route file, extract:

- HTTP methods exported (GET, POST, PUT, DELETE, PATCH)
- URL path (derived from the file path, e.g. `app/api/feedback/[id]/route.ts` becomes `/api/feedback/:id`)
- Query parameters (look for `searchParams.get()` calls)
- Request body shape (look for `request.json()` destructuring)
- Response shapes (look for `NextResponse.json()` calls)
- Error responses (look for non-200 status codes)
- Validation rules (look for conditionals that return error responses)

### Step 3: Read the types

Look for a types file referenced by the route handlers. Extract the TypeScript interfaces and use them to build the schema table in the docs.

### Step 4: Generate the markdown

Produce a single markdown document following this structure. Consult `references/doc-patterns.md` for the formatting rules.

```markdown
# [API Name]

Base URL: `/api/[base]`

## Endpoints

### [Action name]

[Method] [Path]

[Description]

**Query parameters:** (if applicable, as a table)
**Request body:** (if applicable, as a table)
**Example request:** (curl command)
**Example response:** (JSON block)
**Error responses:** (each error case with status code and body)

## Schema

### [Type name]

[Table of fields with type and description]

## Workflows

### [Task name]

[Numbered steps showing how endpoints chain together to accomplish a real task]
```

### Step 5: Write the file

Save the generated markdown to `app/api/docs/route.ts` as a route handler that returns the markdown string with `Content-Type: text/markdown; charset=utf-8`.

Ask the user to confirm the output location before writing.

## Quality checklist

Before finishing, verify the generated docs include:

- [ ] Every endpoint has at least one example request (curl) and response (JSON)
- [ ] Every error case is documented with its status code
- [ ] Query parameters and request body fields list their types and whether they are required
- [ ] The schema section matches the actual TypeScript types
- [ ] The markdown renders correctly (no broken tables or unclosed code blocks)
- [ ] At least 2 workflow examples showing how endpoints chain together for real tasks
