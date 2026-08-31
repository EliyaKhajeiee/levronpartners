import { NextResponse } from "next/server";
import { getStore } from "@/lib/assessment/store";
import type { Track } from "@/lib/assessment/types";

export const runtime = "nodejs";

const VALID_TRACKS: Track[] = ["construction", "home_services"];

/** Creates a submission as soon as the visitor has picked an industry. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { track, answers } = (body ?? {}) as { track?: unknown; answers?: unknown };

  if (track !== undefined && !VALID_TRACKS.includes(track as Track)) {
    return NextResponse.json({ error: "Unrecognized track." }, { status: 400 });
  }

  const submission = await getStore().create({
    track: track as Track | undefined,
    answers: (answers as Record<string, string>) ?? {},
  });

  return NextResponse.json({ id: submission.id });
}
