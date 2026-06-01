export default function SkillsSection() {
  return (
    <section className="border-t border-white/5 bg-gradient-to-b from-purple-950/20 to-transparent py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Expertise</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">Skills & Technologies</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            A multidisciplinary toolkit spanning computational biology, data science, and AI development.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Languages & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {["Python", "R", "Hugging Face", "PyTorch Model Training", "GitHub"].map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">AI & Machine Learning</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "LLM Prompt Engineering", color: "purple" },
                { label: "Model Training", color: "teal" },
                { label: "Rubric Evaluation", color: "purple" },
                { label: "Statistical Modeling", color: "teal" },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    color === "purple"
                      ? "border-purple-500/25 bg-purple-500/10 text-purple-300"
                      : "border-teal-500/25 bg-teal-500/10 text-teal-300"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Life Sciences</h3>
            <div className="flex flex-wrap gap-2">
              {["Genomics", "Proteomics", "Bioinformatics", "Forensic Sciences"].map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
