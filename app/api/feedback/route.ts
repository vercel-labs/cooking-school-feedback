import { NextRequest, NextResponse } from "next/server";

// TODO: Import data utilities from @/lib/data

export async function GET(request: NextRequest) {
  // TODO: Get all feedback
  // TODO: Support optional query params: courseSlug, lessonSlug, minRating
  // TODO: Return filtered results as JSON
  return NextResponse.json([]);
}

export async function POST(request: NextRequest) {
  // TODO: Parse the request body
  // TODO: Validate required fields: courseSlug, lessonSlug, rating, comment, author
  // TODO: Validate rating is a number between 1 and 5
  // TODO: Add the feedback and return it with status 201
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
