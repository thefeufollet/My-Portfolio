export type Project = {
  id: string;
  title: string;
  description: string;
  tag: string;
  tags: string[];
  url: string;
  github: string;
};

export const SITE = {
  name: "Camille Darley",
  title: "Professional AI Trainer",
  email: "camilledarleypi@gmail.com",
  photo: "/images/profile.jpg",
  linkedin: "https://www.linkedin.com/in/camilledarley/",
  github: "https://github.com/thefeufollet",
  location: "George Mason University · Fairfax, VA",
  projects: [
    {
      id: "project-1",
      title: "Biology LLM Prompt Engineering",
      description:
        "Designed and refined prompts for large language models applied to biology research questions. Built rubric-based evaluation criteria to assess model accuracy on domain-specific scientific tasks.",
      tag: "AI Training",
      tags: ["Prompt Design", "Rubric QA", "Biology"],
      url: "#",
      github: "#",
    },
    {
      id: "project-2",
      title: "Genomic Data Analysis Pipeline",
      description:
        "Developed reproducible workflows in R and Python for processing and analyzing genomic datasets. Applied statistical modeling to identify patterns and generate research-ready outputs.",
      tag: "Bioinformatics",
      tags: ["R", "Python", "Genomics"],
      url: "#",
      github: "https://github.com/thefeufollet/Bioinformatics",
    },
    {
      id: "project-3",
      title: "Statistical Modeling in Life Sciences",
      description:
        "Applied advanced statistical methods to biological datasets, translating complex experimental results into clear, actionable insights for research and publication.",
      tag: "Data Science",
      tags: ["Statistics", "R", "Visualization"],
      url: "#",
      github: "#",
    },
    {
      id: "project-4",
      title: "PhD Research — George Mason University",
      description:
        "Ongoing doctoral research in bioinformatics, exploring computational approaches to genomics, proteomics, and the application of machine learning to life sciences problems.",
      tag: "Research",
      tags: ["Bioinformatics", "Machine Learning", "GMU"],
      url: "#",
      github: "#",
    },
  ] satisfies Project[],
} as const;

export function hasLink(url: string) {
  return url && url !== "#";
}
