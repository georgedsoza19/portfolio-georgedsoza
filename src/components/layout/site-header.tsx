"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DownloadIcon, LogoMark } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const sectionIds = site.nav.map((item) => item.href.replace("#", ""));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition",
        scrolled
          ? "border-border bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="focus-ring flex items-center gap-2.5 text-text"
          onClick={() => setOpen(false)}
          aria-label={`${site.name} home`}
        >
          <LogoMark size={34} />
          <span className="hidden font-display text-lg font-bold tracking-tight sm:inline">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring text-sm font-medium transition",
                  active === id
                    ? "text-accent"
                    : "text-muted hover:text-text",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button href={site.resumePath} variant="secondary" download>
            Resume
            <DownloadIcon />
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex w-4 flex-col gap-1">
              <span className="h-0.5 w-full bg-text" />
              <span className="h-0.5 w-full bg-text" />
              <span className="h-0.5 w-full bg-text" />
            </span>
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-surface md:hidden"
        >
          <Container className="flex flex-col gap-2 py-4">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-text hover:bg-accent-soft"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              href={site.resumePath}
              variant="secondary"
              className="mt-2"
              download
            >
              Download resume
              <DownloadIcon />
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
