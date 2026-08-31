import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStore } from "@/lib/assessment/store";
import { generateResults } from "@/lib/assessment/results";
import { ResultsView } from "@/components/assessment/ResultsView";

export const metadata: Metadata = {
  title: "Your Results",
  robots: { index: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function AssessmentResultsPage({ params }: PageProps) {
  const { id } = await params;
  const submission = await getStore().get(id);

  if (!submission || submission.status !== "completed" || !submission.track || !submission.scores || !submission.leakage) {
    notFound();
  }

  // Marking `resultsViewedAt` (and the bot-guard around it) is deferred
  // until a real store exists — this route's copy of the submission is a
  // one-off decode, not a row anything else can later ask "was this ever
  // viewed?" about. See store.ts.

  const results = generateResults(submission.track, submission.scores, submission.leakage, submission.answers);

  return (
    <main id="top" className="flex-1">
      <section className="px-6 pt-[18vh] pb-[14vh] md:px-10 md:pt-[22vh]">
        <div className="mx-auto max-w-[900px]">
          <ResultsView results={results} submission={submission} />
        </div>
      </section>
    </main>
  );
}
