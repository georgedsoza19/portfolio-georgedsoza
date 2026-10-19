import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Technical toolkit"
            description="Grouped by how I use them day to day — not a laundry list of logos."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {site.skills.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-display text-lg font-semibold text-text">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="rounded-2xl border border-border bg-accent-soft p-6">
            <h3 className="font-display text-lg font-semibold text-text">
              Achievements
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {site.achievements.map((item) => (
                <li key={item} className="list-disc marker:text-accent ml-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
