import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    name?: string;
    size?: "xs" | "sm" | "md" | "lg";
  }
>(({ className, name, size = "md", ...props }, ref) => {
  if (name) {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const sizes = {
      xs: "h-6 w-6 text-[9px]",
      sm: "h-7 w-7 text-[10px]",
      md: "h-9 w-9 text-xs",
      lg: "h-12 w-12 text-sm",
    };
    const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const color = COLORS[hash % COLORS.length];
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn("relative flex shrink-0 overflow-hidden rounded-full", sizes[size], className)}
      >
        <AvatarPrimitive.Fallback
          className={cn("flex h-full w-full items-center justify-center rounded-full font-bold text-white", color)}
        >
          {initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const COLORS = [
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-amber-500",
];

export function InitialsAvatar({
  name,
  size = "md",
  className = "",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const sizes = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-12 w-12 text-sm" };
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const color = COLORS[hash % COLORS.length];
  return (
    <Avatar className={cn(sizes[size], className)}>
      <AvatarFallback className={cn(color, "text-white font-bold")}>{initials}</AvatarFallback>
    </Avatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback };

export function TintedIcon({
  icon,
  tone = "emerald",
  className = "",
}: {
  icon: ReactNode;
  tone?: "emerald" | "violet" | "sky" | "amber" | "rose" | "slate" | "orange";
  className?: string;
}) {
  const tones: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
    sky: "bg-sky-50 text-sky-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    slate: "bg-slate-100 text-slate-700",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
        tones[tone],
        className,
      )}
    >
      {icon}
    </span>
  );
}
