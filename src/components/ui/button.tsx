import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent text-accent-ink hover:brightness-110 shadow-[var(--shadow)]",
  secondary:
    "border border-border bg-transparent text-text hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-accent",
} as const;

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  download?: boolean | string;
  "aria-label"?: string;
};

export function Button({
  children,
  className,
  variant = "primary",
  href,
  type = "button",
  onClick,
  disabled,
  download,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  if (href) {
    const external =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      Boolean(download);

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          download={download}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
