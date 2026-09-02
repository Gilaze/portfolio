import Link from "next/link";
import type { Project } from "@/data/projects";

export default function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-black/10 bg-white transition-all hover:shadow-xl hover:shadow-black/5 sm:grid-cols-2 dark:border-white/10 dark:bg-white/5"
    >
      <div
        className="aspect-[8/5] w-full overflow-hidden sm:aspect-auto"
        style={!project.image ? { backgroundColor: project.accent } : undefined}
      >
        {project.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover object-left transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: project.accent }}
        >
          Featured project
        </p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{project.title}</h3>
        <p className="mt-3 text-black/60 dark:text-white/60">{project.tagline}</p>

        <ul className="mt-5 space-y-1.5 text-sm text-black/60 dark:text-white/60">
          {project.highlights.slice(0, 2).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-black/30 dark:bg-white/30" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          View case study
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
