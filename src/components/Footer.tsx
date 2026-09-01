export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-black/50 sm:flex-row dark:text-white/50">
        <p>&copy; {new Date().getFullYear()} Ethan Kim. Built with Next.js &amp; Tailwind.</p>
        <div className="flex gap-5">
          <a href="mailto:ethan._.kim00@berkeley.edu" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Email
          </a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            GitHub
          </a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
