import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStore } from "@/lib/assessment/store";
import { generateResults } from "@/lib/assessment/results";
import { PrintActionPlan } from "@/components/assessment/PrintActionPlan";

export const metadata: Metadata = {
  title: "Action Plan",
  robots: { index: false },
};

type PageProps = { params: Promise<{ id: string }> };

/** Standalone, printable document — does not mark results as viewed (that's the interactive page's job). */
export default async function AssessmentPrintPage({ params }: PageProps) {
  const { id } = await params;
  const submission = await getStore().get(id);

  if (!submission || submission.status !== "completed" || !submission.track || !submission.scores || !submission.leakage) {
    notFound();
  }

  const results = generateResults(submission.track, submission.scores, submission.leakage, submission.answers);

  return <PrintActionPlan results={results} submission={submission} />;
}
