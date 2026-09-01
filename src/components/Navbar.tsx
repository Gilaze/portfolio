"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Ethan Kim
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                    active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-black/70 dark:text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10 sm:hidden dark:border-white/15"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
          </div>
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-black/5 px-6 pb-4 text-sm font-medium sm:hidden dark:border-white/10">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-2 py-2 ${
                    active
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-black/70 dark:text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
