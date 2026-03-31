import { NextResponse } from "next/server";

// TODO: Create an llms-full.txt file that includes the complete API documentation
// in a single response. Unlike llms.txt (which is an index with links),
// llms-full.txt contains everything an agent needs in one fetch.
// Include:
// - H1 with the project name
// - Blockquote with a one-line summary
// - Description paragraph
// - All endpoint documentation (signatures, parameters, examples, errors)
// - Schema section
// - Workflows section

const llmsFullTxt = `# Cooking Course Feedback API

TODO: Add your complete documentation here.
`;

export async function GET() {
  return new NextResponse(llmsFullTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
