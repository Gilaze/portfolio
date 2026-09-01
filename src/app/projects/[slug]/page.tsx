import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Ethan Kim`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <Link
        href="/projects"
        className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        &larr; All projects
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="aspect-[8/5] w-full object-cover"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-black/60 dark:text-white/60">
            {project.tagline}
          </p>
        </div>
        <div className="flex gap-3">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-6 border-y border-black/10 py-6 sm:grid-cols-2 dark:border-white/10">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
            Role
          </dt>
          <dd className="mt-1 text-sm text-black/70 dark:text-white/70">{project.role}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
            Timeline
          </dt>
          <dd className="mt-1 text-sm text-black/70 dark:text-white/70">
            {project.timeline}
          </dd>
        </div>
      </dl>

      <div className="mt-8 space-y-5 text-black/70 dark:text-white/70">
        {project.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold tracking-tight">Highlights</h2>
        <ul className="mt-4 space-y-2">
          {project.highlights.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-black/70 dark:text-white/70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
