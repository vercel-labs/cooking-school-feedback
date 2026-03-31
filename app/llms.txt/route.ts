import { NextResponse } from "next/server";

// TODO: Create an llms.txt file following the spec from llmstxt.org
// Include:
// - H1 with the project name
// - Blockquote with a one-line summary
// - Description paragraph
// - H2 sections with markdown links to your API endpoints and docs

const llmsTxt = `# Cooking Course Feedback API

TODO: Add your llms.txt content here.
`;

export async function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
