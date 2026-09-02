import { client } from "@/sanity/client";
import {
  allProjectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from "@/sanity/queries";

export type Project = {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string[];
  role: string;
  timeline: string;
  tags: string[];
  image: string;
  accent: string;
  links: { label: string; href: string }[];
  highlights: string[];
};

type RawProject = Omit<
  Project,
  "description" | "tags" | "links" | "highlights" | "image" | "accent"
> & {
  description: string[] | null;
  tags: string[] | null;
  links: { label: string; href: string }[] | null;
  highlights: string[] | null;
  image: string | null;
  accent: string | null;
};

function normalizeProject(project: RawProject): Project {
  return {
    ...project,
    description: project.description ?? [],
    tags: project.tags ?? [],
    links: project.links ?? [],
    highlights: project.highlights ?? [],
    image: project.image ?? "",
    accent: project.accent ?? "#6366f1",
  };
}

export async function getProjects(): Promise<Project[]> {
  const projects: RawProject[] = await client.fetch(
    allProjectsQuery,
    {},
    { next: { revalidate: 60 } }
  );
  return projects.map(normalizeProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  const project: RawProject | null = await client.fetch(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );
  return project ? normalizeProject(project) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return client.fetch(projectSlugsQuery, {}, { next: { revalidate: 60 } });
}
