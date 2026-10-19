import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Overview"
            description={site.summary}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {site.focusAreas.map((area, index) => (
            <Reveal key={area.title} delay={index * 0.08}>
              <article className="h-full rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
                <h3 className="font-display text-lg font-semibold text-text">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {area.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
