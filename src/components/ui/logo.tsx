import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

/**
 * Mockup brand mark — cream monogram + teal accent.
 * Forced dark in light mode via `.logo-mark` in globals.css.
 */
export function Logo({ className, size = 44, priority = false }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={cn("logo-mark shrink-0 object-contain", className)}
    />
  );
}
