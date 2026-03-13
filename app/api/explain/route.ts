import { NextResponse } from "next/server";
import { generateExplanation } from "@/lib/aiClient";

export async function POST(req: Request) {

  try {

    const body = await req.json();
    const topic = body.topic;

    if (!topic) {
      return NextResponse.json(
        { error: "Topic required" },
        { status: 400 }
      );
    }

    const explanation = await generateExplanation(topic);

    return NextResponse.json({ explanation });

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );

  }
}