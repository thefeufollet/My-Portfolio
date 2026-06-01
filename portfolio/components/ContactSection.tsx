import { SITE } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export default function ContactSection() {
  return (
    <section id="contact" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/50 via-slate-900 to-teal-900/40 p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Contact</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">Let&apos;s connect</h2>
            <p className="mt-4 max-w-xl text-gray-400">
              Interested in collaborating on bioinformatics research, AI training projects, or data-driven life sciences
              work? I&apos;d love to hear from you.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-teal-600 px-7 py-3.5 font-semibold text-white transition hover:from-purple-500 hover:to-teal-500"
              >
                <MailIcon className="h-5 w-5" />
                {SITE.email}
              </a>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 transition hover:text-purple-200"
                >
                  <LinkedInIcon className="h-5 w-5" />
                  LinkedIn
                </a>
                <span className="text-gray-700">·</span>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition hover:text-teal-200"
                >
                  <GitHubIcon className="h-5 w-5" />
                  GitHub
                </a>
                <span className="text-gray-700">·</span>
                <p className="text-sm text-gray-500">{SITE.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
