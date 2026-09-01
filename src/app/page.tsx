import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import { projects } from "@/data/projects";

const skills = [
  "TypeScript",
  "React / Next.js",
  "Python",
  "Node.js",
  "PostgreSQL",
  "Go",
  "Docker",
  "AWS",
];

const socials = [
  { label: "Email", href: "mailto:ethan._.kim00@berkeley.edu" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Home() {
  const [featured, ...rest] = projects;
  const secondary = rest.slice(0, 2);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-black/60 dark:border-white/15 dark:text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open to new opportunities
        </div>

        <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Hi, I&apos;m Ethan — a software engineer building fast, thoughtful
          products.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-black/60 dark:text-white/60">
          I&apos;m a computer science student and full-stack developer who enjoys
          turning ambiguous problems into clean, reliable software — from
          real-time systems to machine learning pipelines.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85 dark:bg-white dark:text-black"
          >
            View my projects
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            About me
          </Link>

          <div className="ml-1 flex items-center gap-4 text-sm font-medium text-black/50 dark:text-white/50">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-black/70 dark:border-white/15 dark:text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Selected work</h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            View all &rarr;
          </Link>
        </div>

        <FeaturedProjectCard project={featured} />

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {secondary.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight">
              Curious about the details?
            </h2>
            <p className="mt-3 text-black/60 dark:text-white/60">
              Read more about my background, experience, and the tools I
              reach for day to day.
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85 dark:bg-white dark:text-black"
          >
            More about me
          </Link>
        </div>
      </section>
    </div>
  );
}
