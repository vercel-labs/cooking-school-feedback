import { NextRequest, NextResponse } from "next/server";
import { getAllFeedback, addFeedback } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const courseSlug = searchParams.get("courseSlug");
  const lessonSlug = searchParams.get("lessonSlug");
  const minRating = searchParams.get("minRating");

  let feedback = await getAllFeedback();

  if (courseSlug) {
    feedback = feedback.filter((fb) => fb.courseSlug === courseSlug);
  }

  if (lessonSlug) {
    feedback = feedback.filter((fb) => fb.lessonSlug === lessonSlug);
  }

  if (minRating) {
    const min = parseInt(minRating, 10);
    feedback = feedback.filter((fb) => fb.rating >= min);
  }

  return NextResponse.json(feedback);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { courseSlug, lessonSlug, rating, comment, author } = body;

  if (!courseSlug || !lessonSlug || !rating || !comment || !author) {
    return NextResponse.json(
      { error: "Missing required fields: courseSlug, lessonSlug, rating, comment, author" },
      { status: 400 }
    );
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating must be a number between 1 and 5" },
      { status: 400 }
    );
  }

  const entry = await addFeedback({ courseSlug, lessonSlug, rating, comment, author });
  return NextResponse.json(entry, { status: 201 });
}
