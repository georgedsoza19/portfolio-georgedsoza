import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            description="Highlights from recent roles. Live demos and screenshots can be added when public assets are available."
          />
        </Reveal>

        <div className="mt-12 space-y-4">
          {site.projects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.05}>
              <article className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-semibold text-text">
                        {project.name}
                      </h3>
                      {project.placeholder ? (
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted uppercase">
                          Media placeholder
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {project.summary}
                    </p>
                    <p className="mt-4 text-sm text-accent">
                      {project.technologies.map((tech) => `#${tech}`).join(" ")}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-3 text-sm">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        className="focus-ring text-muted hover:text-accent"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        className="focus-ring text-muted hover:text-accent"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
