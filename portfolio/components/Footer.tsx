import { SITE } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-gray-600">&copy; 2026 {SITE.name}. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 transition hover:text-purple-400"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-600 transition hover:text-teal-400"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <p className="text-sm text-gray-600">{SITE.title} · Bioinformatics PhD Student</p>
        </div>
      </div>
    </footer>
  );
}
