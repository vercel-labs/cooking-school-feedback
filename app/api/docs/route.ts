import { NextResponse } from "next/server";

// TODO: Write the markdown documentation string for your API
// Include: every endpoint, query params, request bodies, example requests/responses,
// error cases, and the schema section.
// Consult the doc-patterns reference in your skill folder for formatting rules.

const docs = `# Feedback API

TODO: Document your API here.
`;

export async function GET() {
  return new NextResponse(docs, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
