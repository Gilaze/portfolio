import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Ethan Kim",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Projects</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Things I&apos;ve built</h1>
      <p className="mt-4 max-w-xl text-black/60 dark:text-white/60">
        Select a project to see the write-up: the problem, my approach, and
        what I learned.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
