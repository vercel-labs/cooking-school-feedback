# Documentation Patterns for Agent-Friendly APIs

These patterns make API documentation easy for AI agents to parse and use correctly.

## Why agents need different docs

Human developers skim docs, infer patterns, and fill in gaps from experience. Agents read docs literally. If the docs are ambiguous, the agent will guess wrong. If an error case is undocumented, the agent won't know how to recover.

Agent-friendly docs are explicit, structured, and example-heavy.

## Formatting rules

### Endpoints

Always include the HTTP method and full path on their own line in a code block:

```
GET /api/feedback
```

Not inline like "Send a GET request to the feedback endpoint." Agents parse the code block reliably. Prose descriptions of URLs are error-prone.

### Parameters as tables

Use markdown tables for query parameters and request body fields. Always include:

- Parameter name
- Type
- Whether it's required or optional
- A short description

```markdown
| Parameter   | Type   | Required | Description              |
|-------------|--------|----------|--------------------------|
| courseSlug  | string | no       | Filter by course slug    |
```

Agents parse tables into structured data. Bullet lists of parameters are harder to extract reliably.

### Example requests with curl

Use curl for all example requests. Include:

- The full URL (with localhost or base URL)
- All required headers
- The request body for POST/PUT/PATCH

```bash
curl -X POST "http://localhost:3000/api/feedback" \
  -H "Content-Type: application/json" \
  -d '{"courseSlug": "knife-skills", "lessonSlug": "dicing-onions", "rating": 5, "comment": "Great lesson", "author": "Alex"}'
```

Agents can execute curl commands directly. Abstract descriptions like "send a JSON body with the feedback fields" leave too much to interpretation.

### Example responses as JSON blocks

Show the complete response body, not a truncated version. Include:

- All fields, even if some seem obvious
- Realistic values (not placeholder data)
- The correct JSON structure (arrays vs objects)

### Every error case gets its own block

Document each error response separately with:

- The HTTP status code
- The condition that triggers it
- The exact response body

```markdown
**Error response (400) — missing fields:**

\`\`\`json
{
  "error": "Missing required fields: courseSlug, lessonSlug, rating, comment, author"
}
\`\`\`
```

Agents need to know what error shapes to expect so they can handle them programmatically.

### Schema section

End the docs with a schema section that lists every data type as a table:

```markdown
## Schema

### Feedback

| Field       | Type   | Description                        |
|-------------|--------|------------------------------------|
| id          | string | Unique identifier (e.g. "fb-001")  |
| rating      | number | Integer from 1 to 5                |
```

This gives agents a quick reference for the shape of data they'll send and receive.

### Workflow examples

End the docs with a Workflows section after the schema. Each workflow is a numbered sequence of API calls that accomplish a real task.

Include:

- A descriptive name for the workflow (e.g. "Investigate low-rated feedback for a course")
- Numbered steps, each with the method + path in inline code and a short explanation of why that call is made
- Real parameter values from the seed data
- 2-3 workflows that cover the most common multi-step tasks

Workflows show agents how endpoints chain together. Endpoint docs answer "how do I call this?" Workflows answer "how do I accomplish this?"

```markdown
## Workflows

### Investigate low-rated feedback for a course

1. `GET /api/feedback/summary?courseSlug=knife-skills` — check the average rating and total entries
2. `GET /api/feedback?courseSlug=knife-skills&minRating=1` — pull all low-rated entries
3. `GET /api/feedback/fb-003` — get the full details on a specific entry
```

## Anti-patterns to avoid

- **Prose-only descriptions** of endpoints (no code blocks with method + path)
- **Truncated responses** with `...` or "and so on"
- **Missing error cases** (agents will not know how to recover)
- **Generic placeholder data** in examples ("string", "number" instead of real values)
- **Undocumented query parameters** (agents won't discover them by experimentation)
