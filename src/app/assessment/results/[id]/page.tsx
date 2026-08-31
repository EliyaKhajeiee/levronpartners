import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getStore } from "@/lib/assessment/store";
import { generateResults } from "@/lib/assessment/results";
import { ResultsView } from "@/components/assessment/ResultsView";

export const metadata: Metadata = {
  title: "Your Results",
  robots: { index: false },
};

type PageProps = { params: Promise<{ id: string }> };

/** Crude bot guard so a link-preview crawler doesn't count as the visitor opening their results. */
const BOT_UA = /bot|crawler|spider|slurp|preview|slack|facebookexternalhit|whatsapp|linkedinbot|discordbot|telegrambot/i;

export default async function AssessmentResultsPage({ params }: PageProps) {
  const { id } = await params;
  const submission = await getStore().get(id);

  if (!submission || submission.status !== "completed" || !submission.track || !submission.scores || !submission.leakage) {
    notFound();
  }

  const headerList = await headers();
  const userAgent = headerList.get("user-agent") ?? "";
  if (!submission.resultsViewedAt && !BOT_UA.test(userAgent)) {
    await getStore().update(id, { resultsViewedAt: new Date().toISOString() });
  }

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
