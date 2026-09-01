import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:border-white/10 dark:bg-white/5"
    >
      <div className="aspect-[8/5] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-1.5 text-sm text-black/60 dark:text-white/60">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          View project
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
