import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

/**
 * Mockup brand mark — cream monogram + teal accent.
 * Inverts to dark on light theme so it stays visible.
 */
export function Logo({ className, size = 44, priority = false }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={cn(
        "shrink-0 object-contain [filter:brightness(0)] dark:[filter:none]",
        className,
      )}
    />
  );
}
