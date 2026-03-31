import { NextRequest, NextResponse } from "next/server";
import { getFeedbackById } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const feedback = await getFeedbackById(id);

  if (!feedback) {
    return NextResponse.json(
      { error: `Feedback with id "${id}" not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(feedback);
}
