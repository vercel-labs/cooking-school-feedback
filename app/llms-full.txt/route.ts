import { NextResponse } from "next/server";

const llmsFullTxt = `# Cooking Course Feedback API

> API for submitting and retrieving student feedback on cooking course lessons.

This API serves feedback data for a cooking course platform. Students can submit ratings and comments on individual lessons, retrieve feedback filtered by course or rating, and view aggregate statistics.

## Endpoints

### List feedback

\`\`\`
GET /api/feedback
\`\`\`

Returns all feedback entries. Supports optional query parameters for filtering.

**Query parameters:**

| Parameter    | Type   | Description                          |
|--------------|--------|--------------------------------------|
| courseSlug   | string | Filter by course slug                |
| lessonSlug   | string | Filter by lesson slug                |
| minRating    | number | Only return entries rated >= value   |

**Example request:**

\`\`\`bash
curl "http://localhost:3000/api/feedback?courseSlug=knife-skills"
\`\`\`

**Example response:**

\`\`\`json
[
  {
    "id": "fb-001",
    "courseSlug": "knife-skills",
    "lessonSlug": "the-claw-grip",
    "rating": 5,
    "comment": "Finally understand why my onion cuts were uneven. The claw grip changed everything.",
    "author": "Priya Sharma",
    "createdAt": "2026-03-01T10:30:00Z"
  }
]
\`\`\`

### Get feedback by ID

\`\`\`
GET /api/feedback/:id
\`\`\`

Returns a single feedback entry.

**Example request:**

\`\`\`bash
curl "http://localhost:3000/api/feedback/fb-001"
\`\`\`

**Example response:**

\`\`\`json
{
  "id": "fb-001",
  "courseSlug": "knife-skills",
  "lessonSlug": "the-claw-grip",
  "rating": 5,
  "comment": "Finally understand why my onion cuts were uneven. The claw grip changed everything.",
  "author": "Priya Sharma",
  "createdAt": "2026-03-01T10:30:00Z"
}
\`\`\`

**Error response (404):**

\`\`\`json
{
  "error": "Feedback with id \\"fb-999\\" not found"
}
\`\`\`

### Submit feedback

\`\`\`
POST /api/feedback
\`\`\`

Creates a new feedback entry. The \`id\` and \`createdAt\` fields are generated automatically.

**Request body (JSON):**

| Field       | Type   | Required | Description                     |
|-------------|--------|----------|---------------------------------|
| courseSlug  | string | yes      | Slug of the course              |
| lessonSlug  | string | yes      | Slug of the lesson              |
| rating      | number | yes      | Rating from 1 to 5              |
| comment     | string | yes      | Feedback text                   |
| author      | string | yes      | Name of the person              |

**Example request:**

\`\`\`bash
curl -X POST "http://localhost:3000/api/feedback" \\
  -H "Content-Type: application/json" \\
  -d '{
    "courseSlug": "bread-baking",
    "lessonSlug": "scoring-dough",
    "rating": 5,
    "comment": "The lame technique demo was incredibly helpful.",
    "author": "Alex Turner"
  }'
\`\`\`

**Example response (201):**

\`\`\`json
{
  "id": "fb-011",
  "courseSlug": "bread-baking",
  "lessonSlug": "scoring-dough",
  "rating": 5,
  "comment": "The lame technique demo was incredibly helpful.",
  "author": "Alex Turner",
  "createdAt": "2026-03-06T12:00:00Z"
}
\`\`\`

**Error response (400) — missing fields:**

\`\`\`json
{
  "error": "Missing required fields: courseSlug, lessonSlug, rating, comment, author"
}
\`\`\`

**Error response (400) — invalid rating:**

\`\`\`json
{
  "error": "Rating must be a number between 1 and 5"
}
\`\`\`

### Get summary

\`\`\`
GET /api/feedback/summary
\`\`\`

Returns aggregate statistics across all feedback. Optionally filter by course.

**Query parameters:**

| Parameter   | Type   | Description            |
|-------------|--------|------------------------|
| courseSlug  | string | Filter by course slug  |

**Example request:**

\`\`\`bash
curl "http://localhost:3000/api/feedback/summary"
\`\`\`

**Example response:**

\`\`\`json
{
  "totalEntries": 10,
  "averageRating": 4.2,
  "ratingDistribution": {
    "1": 0,
    "2": 1,
    "3": 1,
    "4": 3,
    "5": 5
  },
  "courses": [
    {
      "courseSlug": "knife-skills",
      "totalEntries": 5,
      "averageRating": 4.4
    },
    {
      "courseSlug": "bread-baking",
      "totalEntries": 4,
      "averageRating": 4.0
    },
    {
      "courseSlug": "pasta-from-scratch",
      "totalEntries": 1,
      "averageRating": 4.0
    }
  ]
}
\`\`\`

## Schema

### Feedback

| Field       | Type   | Description                              |
|-------------|--------|------------------------------------------|
| id          | string | Unique identifier (e.g. "fb-001")        |
| courseSlug  | string | Slug of the course                       |
| lessonSlug  | string | Slug of the lesson                       |
| rating      | number | Integer from 1 to 5                      |
| comment     | string | Feedback text                            |
| author      | string | Name of the person                       |
| createdAt   | string | ISO 8601 timestamp                       |

## Workflows

### Investigate low-rated feedback for a course

1. \`GET /api/feedback/summary?courseSlug=knife-skills\` — check the average rating and total entries
2. \`GET /api/feedback?courseSlug=knife-skills&minRating=1\` — pull all low-rated entries
3. \`GET /api/feedback/fb-003\` — get the full details on a specific entry

### Submit and verify new feedback

1. \`POST /api/feedback\` — submit the feedback entry with all required fields
2. \`GET /api/feedback/:id\` — fetch the newly created entry using the \`id\` from the POST response
3. \`GET /api/feedback/summary?courseSlug=bread-baking\` — check updated stats for the course

### Compare feedback across courses

1. \`GET /api/feedback/summary\` — get aggregate stats for all courses
2. \`GET /api/feedback?courseSlug=knife-skills\` — pull all feedback for the top-rated course
3. \`GET /api/feedback?courseSlug=bread-baking\` — pull all feedback for comparison
`;

export async function GET() {
  return new NextResponse(llmsFullTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
