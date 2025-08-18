import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { bottts, initials } from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { number } from "zod";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: "bottts" | "initials";
  alt?: string;
  initialsFontSize?: number;
  size?:number; // optional control
}

export const GeneratedAvatar = ({
  seed,
  className,
  variant,
  alt,
  size,
}: GeneratedAvatarProps) => {
  // normalize seed for consistency
  const normalizedSeed = seed?.toString().trim();

  const avatar = useMemo(() => {
    if (variant === "bottts") {
      return createAvatar(bottts, { seed: normalizedSeed });
    }
    return createAvatar(initials, {
      seed: normalizedSeed,
      fontWeight: 500,
      fontSize: 50,
    });
  }, [normalizedSeed, variant]);

  // memoize the data URI
  const uri = useMemo(() => avatar.toDataUri(), [avatar]);

  return (
    <Avatar className={cn("rounded-full overflow-hidden inline-block", className)} style={{ width: size, height: size }}aria-label={alt ?? `${seed} avatar`}>
      <AvatarImage src={uri} alt={alt ?? `${seed} avatar`} className="w-full h-full object-cover" />
      <AvatarFallback className="w-full h-full flex items-center justify-center">{(seed || "").charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
