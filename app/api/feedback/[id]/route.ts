import { NextRequest, NextResponse } from "next/server";

// TODO: Import getFeedbackById from @/lib/data

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // TODO: Look up feedback by id
  // TODO: Return 404 if not found
  // TODO: Return the feedback entry as JSON
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
