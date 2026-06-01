import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects | Camille Darley",
  description: "Selected projects in bioinformatics, AI training, and data science by Camille Darley.",
};

export default function ProjectsPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Portfolio</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">Selected Projects</h1>
          </div>
          <p className="max-w-sm text-sm text-gray-500">
            Research and training work at the intersection of biology, data science, and AI. Update links in{" "}
            <code className="text-purple-400">lib/site.ts</code>.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SITE.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
