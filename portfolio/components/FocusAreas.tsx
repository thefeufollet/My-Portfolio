const areas = [
  {
    title: "AI & LLM Training",
    description:
      "Rubric-based model evaluation, prompt engineering, and quality assurance for biology-focused AI systems.",
    color: "purple" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
  },
  {
    title: "Genomics & Bioinformatics",
    description:
      "Analyzing genomic datasets, building pipelines, and applying computational methods to life sciences research.",
    color: "teal" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    ),
  },
  {
    title: "Statistical Modeling",
    description:
      "Rigorous data analysis using R, Python, and statistical methods to extract meaningful insights from complex datasets.",
    color: "purple" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
];

export default function FocusAreas() {
  return (
    <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((area, i) => (
        <div
          key={area.title}
          className={`card-hover rounded-2xl border border-white/5 bg-white/[0.02] p-6 ${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
        >
          <div
            className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${
              area.color === "purple" ? "bg-purple-500/10 text-purple-400" : "bg-teal-500/10 text-teal-400"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {area.icon}
            </svg>
          </div>
          <h3 className="font-semibold text-white">{area.title}</h3>
          <p className="mt-2 text-sm text-gray-500">{area.description}</p>
        </div>
      ))}
    </div>
  );
}
