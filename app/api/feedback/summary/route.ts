import { NextRequest, NextResponse } from "next/server";
import { getAllFeedback } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const courseSlug = searchParams.get("courseSlug");

  let feedback = await getAllFeedback();

  if (courseSlug) {
    feedback = feedback.filter((fb) => fb.courseSlug === courseSlug);
  }

  if (feedback.length === 0) {
    return NextResponse.json({
      totalEntries: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      courses: [],
    });
  }

  const avgRating =
    feedback.reduce((sum, fb) => sum + fb.rating, 0) / feedback.length;

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>;
  for (const fb of feedback) {
    distribution[fb.rating]++;
  }

  const courseMap = new Map<string, { total: number; sum: number; count: number }>();
  for (const fb of feedback) {
    const existing = courseMap.get(fb.courseSlug) ?? { total: 0, sum: 0, count: 0 };
    existing.total++;
    existing.sum += fb.rating;
    existing.count++;
    courseMap.set(fb.courseSlug, existing);
  }

  const courses = [...courseMap.entries()].map(([slug, data]) => ({
    courseSlug: slug,
    totalEntries: data.total,
    averageRating: Math.round((data.sum / data.count) * 10) / 10,
  }));

  return NextResponse.json({
    totalEntries: feedback.length,
    averageRating: Math.round(avgRating * 10) / 10,
    ratingDistribution: distribution,
    courses,
  });
}
