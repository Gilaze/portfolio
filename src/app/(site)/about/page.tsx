import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Ethan Kim",
};

const experience = [
  {
    role: "Software Engineering Intern",
    org: "Company Name",
    period: "Summer 2025",
    description:
      "Placeholder: shipped a feature end-to-end, improved a key metric, and worked closely with a small team.",
  },
  {
    role: "Teaching Assistant, Data Structures",
    org: "University Name",
    period: "2024 — 2025",
    description:
      "Placeholder: led weekly discussion sections and office hours for ~120 students, held weekly.",
  },
  {
    role: "B.S. Computer Science",
    org: "University Name",
    period: "Expected 2027",
    description: "Placeholder: relevant coursework, GPA, honors, or focus areas.",
  },
];

const skillGroups = [
  { label: "Languages", items: ["TypeScript", "Python", "Go", "SQL", "Java"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL", "Redis"] },
  { label: "Tools", items: ["Docker", "AWS", "Git", "CI/CD"] },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">About</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Hi, I&apos;m Ethan.</h1>

      <div className="mt-8 space-y-5 text-black/70 dark:text-white/70">
        <p>
          Placeholder bio: I&apos;m a software engineer who likes working across
          the stack — from designing APIs and data models to building the
          interfaces people actually use. I care about writing code that is
          easy to reason about, and about shipping things that work reliably
          under real conditions.
        </p>
        <p>
          Outside of coursework and internships, I like exploring side
          projects that force me to learn something new, whether that&apos;s a
          new language, a systems concept, or a corner of the stack I
          haven&apos;t touched before. Replace this paragraph with your real
          story — what got you into software, what you&apos;re curious about,
          and what kind of role you&apos;re looking for next.
        </p>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-bold tracking-tight">Skills</h2>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-semibold text-black/50 dark:text-white/50">
                {group.label}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 px-3 py-1 text-sm text-black/70 dark:border-white/15 dark:text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-bold tracking-tight">Experience &amp; education</h2>
        <ol className="mt-6 space-y-8 border-l border-black/10 pl-6 dark:border-white/15">
          {experience.map((item) => (
            <li key={`${item.role}-${item.org}`} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-500" />
              <p className="text-xs font-medium uppercase tracking-wide text-black/40 dark:text-white/40">
                {item.period}
              </p>
              <h3 className="mt-1 font-semibold">{item.role}</h3>
              <p className="text-sm text-black/50 dark:text-white/50">{item.org}</p>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <a
          href="mailto:ethan._.kim00@berkeley.edu"
          className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85 dark:bg-white dark:text-black"
        >
          Get in touch
        </a>
        <a
          href="#"
          className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
        >
          Download resume
        </a>
      </div>
    </div>
  );
}
