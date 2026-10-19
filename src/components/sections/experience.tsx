import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Work experience"
            description="Roles spanning senior frontend delivery, full-stack fintech, and product engineering across web and mobile."
          />
        </Reveal>

        <ol className="relative mt-14 space-y-10 border-l border-border pl-8">
          {site.experience.map((job, index) => (
            <Reveal key={`${job.company}-${job.start}`} delay={index * 0.06}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[2.4rem] h-3 w-3 rounded-full bg-accent ring-4 ring-bg"
                />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-text">
                      {job.company}
                    </h3>
                    <p className="text-sm text-muted">
                      {job.role} · {job.location}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-accent">
                    {job.start} – {job.end}
                  </p>
                </div>
                {job.products?.length ? (
                  <p className="mt-3 text-sm text-muted">
                    Products: {job.products.join(", ")}
                  </p>
                ) : null}
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {job.highlights.map((point) => (
                    <li key={point} className="list-disc marker:text-accent">
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs tracking-wide text-accent uppercase">
                  {job.technologies.join(" · ")}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
