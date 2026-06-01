import type { Metadata } from "next";
import ProfilePhoto from "@/components/ProfilePhoto";
import FocusAreas from "@/components/FocusAreas";
import SkillsSection from "@/components/SkillsSection";

export const metadata: Metadata = {
  title: "About | Camille Darley",
  description: "Learn about Camille Darley's background in bioinformatics, AI training, and life sciences research.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/5 pt-32 pb-16 md:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">About Me</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
            Where science meets artificial intelligence
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
            <ProfilePhoto variant="square" className="mx-auto lg:mx-0" />
            <div className="space-y-4 leading-relaxed text-gray-400">
              <p>
                My background includes hands-on experience with LLM prompt engineering for biology research and
                rubric-based model training, as well as proficiency in R, Python, and statistical modeling.
              </p>
              <p>
                I&apos;m passionate about bridging scientific knowledge with emerging technologies. I am eager to learn
                and grow in the fields of bioinformatics, proteomics, genomics, forensic sciences, machine learning,
                and artificial intelligence.
              </p>
              <p>
                As a Professional AI Trainer, I focus on developing high-quality training data and evaluation
                frameworks that help language models reason accurately about complex biological and scientific
                domains.
              </p>
            </div>
          </div>

          <FocusAreas />
        </div>
      </section>

      <SkillsSection />
    </>
  );
}
