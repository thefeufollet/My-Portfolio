import Link from "next/link";
import ProfilePhoto from "@/components/ProfilePhoto";
import ContactSection from "@/components/ContactSection";
import { SITE } from "@/lib/site";
import { ArrowRightIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <>
      <section className="hero-glow relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-purple-600/25 blur-3xl" />
          <div className="absolute right-1/4 bottom-10 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
                Bioinformatics PhD Student · George Mason University
              </p>

              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                Professional
                <span className="gradient-text"> AI Trainer</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-gray-400 md:text-xl">
                I&apos;m a bioinformatics PhD student at George Mason University with a strong foundation in genomics,
                data analysis, and AI applications in life sciences. I bridge scientific knowledge with emerging
                technologies.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-teal-600 px-7 py-3 font-semibold text-white transition hover:from-purple-500 hover:to-teal-500"
                >
                  View my work
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 font-semibold text-gray-300 transition hover:border-teal-500/40 hover:text-white"
                >
                  Learn more
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="text-sm text-gray-500">Find me on</span>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 transition hover:border-purple-400/50 hover:text-purple-200"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-300 transition hover:border-teal-400/50 hover:text-teal-200"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>

            <ProfilePhoto variant="circle" className="mx-auto lg:mx-0" />
          </div>

          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "PhD", label: "Bioinformatics", color: "purple" },
              { value: "R & Python", label: "Core languages", color: "teal" },
              { value: "LLM", label: "Prompt engineering", color: "purple" },
              { value: "AI", label: "Model training", color: "teal" },
            ].map(({ value, label, color }) => (
              <div
                key={label}
                className={`rounded-2xl border bg-white/[0.03] p-5 ${
                  color === "purple" ? "border-purple-500/10" : "border-teal-500/10"
                }`}
              >
                <p className={`text-2xl font-bold ${color === "purple" ? "text-purple-400" : "text-teal-400"}`}>
                  {value}
                </p>
                <p className="mt-1 text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
