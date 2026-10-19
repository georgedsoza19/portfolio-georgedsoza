import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";

function footerSocialIcon(label: string) {
  const key = label.toLowerCase();
  if (key.includes("linkedin")) return <LinkedInIcon size={16} />;
  if (key.includes("github")) return <GitHubIcon size={16} />;
  return null;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Logo size={40} />
          <div>
            <p className="font-display text-lg font-semibold text-text">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-muted">
              {site.title} · {site.location}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {site.social.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring inline-flex items-center gap-1.5 text-muted transition hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerSocialIcon(link.label)}
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="focus-ring inline-flex items-center gap-1.5 text-muted transition hover:text-accent"
          >
            <MailIcon size={16} />
            Email
          </a>
          <a
            href="#contact"
            className="focus-ring text-muted transition hover:text-accent"
          >
            Contact
          </a>
        </div>
        <p className="text-xs text-muted">
          © {site.copyrightYear} {site.name}. Built with Next.js.
        </p>
      </Container>
    </footer>
  );
}
