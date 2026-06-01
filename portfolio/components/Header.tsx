"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from "@/components/icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-white">
          Camille<span className="text-teal-400">.</span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-gray-400 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition hover:text-teal-400 ${isActive(href) ? "text-teal-400" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-purple-400"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-teal-400"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <Link
            href="/#contact"
            className="rounded-full bg-gradient-to-r from-purple-600 to-teal-600 px-5 py-2 text-sm font-semibold text-white transition hover:from-purple-500 hover:to-teal-500"
          >
            Get in touch
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/5 bg-slate-950/95 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-400">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block py-1 transition hover:text-teal-400 ${isActive(href) ? "text-teal-400" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-purple-500/30 py-2.5 text-sm font-medium text-purple-300 transition hover:bg-purple-500/10"
            >
              LinkedIn
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-teal-500/30 py-2.5 text-sm font-medium text-teal-300 transition hover:bg-teal-500/10"
            >
              GitHub
            </a>
          </div>
          <Link
            href="/#contact"
            className="mt-3 block rounded-full bg-gradient-to-r from-purple-600 to-teal-600 py-2.5 text-center text-sm font-semibold text-white"
            onClick={() => setMenuOpen(false)}
          >
            Get in touch
          </Link>
        </div>
      )}
    </header>
  );
}
