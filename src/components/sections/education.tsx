import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Education" title="Background" />
        </Reveal>
        <div className="mt-10 space-y-4">
          {site.education.map((item) => (
            <Reveal key={item.degree}>
              <article className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-display text-xl font-semibold text-text">
                  {item.degree}
                </h3>
                <p className="mt-2 text-muted">
                  {item.school} · {item.year}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
