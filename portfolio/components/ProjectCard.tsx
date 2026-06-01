import { hasLink, type Project } from "@/lib/site";
import { ExternalLinkIcon, GitHubIcon } from "@/components/icons";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const badgeClass =
    index % 2 === 0
      ? "rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400"
      : "rounded-full bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400";

  const liveLink = hasLink(project.url);
  const githubLink = hasLink(project.github);

  return (
    <article id={project.id} className="card-hover group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-7">
      <div className="mb-4 flex items-center justify-between">
        <span className={badgeClass}>{project.tag}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <span key={tag} className="text-xs text-gray-600">
            {i > 0 && " · "}
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-5">
        {liveLink ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 px-4 py-1.5 text-xs font-medium text-teal-300 transition hover:bg-teal-500/10"
          >
            <ExternalLinkIcon className="h-3.5 w-3.5" />
            View project
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-gray-500"
          >
            <ExternalLinkIcon className="h-3.5 w-3.5" />
            View project
          </span>
        )}
        {githubLink ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 px-4 py-1.5 text-xs font-medium text-purple-300 transition hover:bg-purple-500/10"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            GitHub
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-gray-500"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            GitHub
          </span>
        )}
      </div>
    </article>
  );
}
