import { NextRequest, NextResponse } from "next/server";

// TODO: Import getAllFeedback from @/lib/data

export async function GET(request: NextRequest) {
  // TODO: Get all feedback, optionally filtered by courseSlug query param
  // TODO: Calculate totalEntries, averageRating, ratingDistribution (1-5)
  // TODO: Group stats by course
  // TODO: Return the summary as JSON
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
