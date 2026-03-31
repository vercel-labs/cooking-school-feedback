import { NextResponse } from "next/server";

// TODO: Serve the same markdown documentation as /api/docs
// This route provides a .md URL path so agents can request docs
// with an explicit markdown extension.

const docs = `# Feedback API

TODO: Add your API documentation here.
`;

export async function GET() {
  return new NextResponse(docs, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
