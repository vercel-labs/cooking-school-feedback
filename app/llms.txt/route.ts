import { NextResponse } from "next/server";

const llmsTxt = `# Cooking Course Feedback API

> API for submitting and retrieving student feedback on cooking course lessons.

This API serves feedback data for a cooking course platform. Students can submit ratings and comments on individual lessons, retrieve feedback filtered by course or rating, and view aggregate statistics.

## API Documentation

- [API Docs](/api/docs): Full endpoint reference with parameters, examples, and error cases
- [API Docs (Markdown)](/api/docs.md): Same documentation in .md format
- [Full Documentation](/llms-full.txt): Complete API docs in a single file

## Endpoints

- [List feedback](/api/feedback): GET all feedback entries, with optional filtering
- [Get feedback by ID](/api/feedback/:id): GET a single feedback entry
- [Submit feedback](/api/feedback): POST a new feedback entry
- [Feedback summary](/api/feedback/summary): GET aggregate statistics
`;

export async function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
