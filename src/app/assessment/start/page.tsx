import type { Metadata } from "next";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";

export const metadata: Metadata = {
  title: "Free Assessment",
  robots: { index: false },
};

export default function AssessmentStartPage() {
  return (
    <main id="top" className="flex-1">
      <section className="px-6 pt-[18vh] pb-[14vh] md:px-10 md:pt-[22vh]">
        <div className="mx-auto max-w-[640px]">
          <AssessmentWizard />
        </div>
      </section>
    </main>
  );
}
