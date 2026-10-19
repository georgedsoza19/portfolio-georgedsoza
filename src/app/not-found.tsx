import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you’re looking for doesn’t exist on ${site.name}’s portfolio.`,
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="hero-grid pointer-events-none absolute inset-0 opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/4 right-0 h-80 w-80 rounded-full bg-accent-soft blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-soft blur-3xl"
        />

        <Container className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-24 text-center sm:py-32">
          <Logo size={56} priority />

          <p
            aria-hidden
            className="mt-8 font-display text-7xl font-bold tracking-tight text-accent/25 sm:text-8xl"
          >
            404
          </p>

          <p className="mt-2 text-xs font-semibold tracking-[0.22em] text-accent uppercase">
            Page not found
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            This route doesn’t exist
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            The page may have moved, or the link is outdated. Return home or
            reach out if you were expecting something here.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/">
              Back to home
              <ArrowRightIcon />
            </Button>
            <Button href="/#contact" variant="secondary">
              Get in touch
            </Button>
          </div>

          <nav
            aria-label="Popular sections"
            className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={`/${item.href}`}
                className="focus-ring text-muted transition hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
