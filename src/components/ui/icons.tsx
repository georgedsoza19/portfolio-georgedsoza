import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  size?: number;
};

function baseProps(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true as const,
    className: cn("shrink-0", className),
  };
}

export function LogoMark({ className, size = 36 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className={cn("text-text", className)}
    >
      <path
        d="M12 6.5h12.5a8 8 0 0 1 8 8V22"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M32.5 26v1.5a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8V14.5A8 8 0 0 1 16 6.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M25.5 16.2c-.9-1.4-2.5-2.3-4.4-2.3-2.9 0-5.1 2.2-5.1 5.3s2.2 5.3 5.1 5.3c1.7 0 3.2-.7 4.1-1.9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M21.2 19.2h5.4v3.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31.2" cy="31.2" r="2.4" className="fill-accent" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownloadIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M12 4v11M8 11l4 4 4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparklesIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M12 3.5 13.2 8.3 18 9.5l-4.8 1.2L12 15.5l-1.2-4.8L6 9.5l4.8-1.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 14.5 19.1 16.4 21 17l-1.9.6-.6 1.9-.6-1.9L16 17l1.9-.6.6-1.9Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SendIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M4.5 11.2 19.2 4.4c.6-.3 1.2.3.9.9l-6.8 14.7c-.3.6-1.2.5-1.4-.2l-1.7-5.3-5.3-1.7c-.7-.2-.8-1.1-.2-1.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m11.2 12.8 7.2-7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChatBubbleIcon({ className, size = 22 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M5 7.2A3.2 3.2 0 0 1 8.2 4h7.6A3.2 3.2 0 0 1 19 7.2v5.1A3.2 3.2 0 0 1 15.8 15.5H11l-3.8 3.2v-3.2H8.2A3.2 3.2 0 0 1 5 12.3V7.2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9 9h6M9 12h3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MailIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="m5.5 8 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M7.2 4.8h2.4l1.2 3-1.5 1.5a11 11 0 0 0 5.4 5.4l1.5-1.5 3 1.2v2.4c0 .7-.6 1.3-1.3 1.2A14.5 14.5 0 0 1 4.8 6.1c-.1-.7.5-1.3 1.2-1.3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedInIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8 11v5M8 8.2v.1M11.2 16v-3.2c0-1.5 2.6-1.6 2.6 0V16M11.2 11v1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GitHubIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.6-.2.6-.4v-1.5c-2.4.5-2.9-1-2.9-1-.4-.9-.9-1.2-.9-1.2-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.7 1.3 2 1 2.5.7.1-.5.3-.9.5-1.1-1.9-.2-3.9-1-3.9-4.3 0-.9.3-1.7.9-2.3-.1-.2-.4-1.2.1-2.4 0 0 .7-.2 2.4.9a8.2 8.2 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.2.1 2.4.6.6.9 1.4.9 2.3 0 3.3-2 4.1-3.9 4.3.3.3.6.8.6 1.6v2.3c0 .2.2.5.6.4A8.5 8.5 0 0 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
