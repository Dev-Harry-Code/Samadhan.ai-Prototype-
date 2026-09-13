import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white shadow-sm shadow-primary-600/25 hover:bg-primary-700 active:scale-[0.98]",
        primary:
          "bg-primary-600 text-white shadow-sm shadow-primary-600/25 hover:bg-primary-700 active:scale-[0.98]",
        secondary:
          "bg-white text-slate-700 ring-1 ring-slate-900/10 hover:bg-slate-50 hover:ring-slate-900/20 active:scale-[0.98]",
        ghost: "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900",
        danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-600/25",
        dark: "bg-slate-900 text-white hover:bg-slate-800",
        tealBanner:
          "bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg active:scale-[0.99]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-6 text-[15px] gap-2 rounded-2xl",
        icon: "h-9 w-9",
      },
      round: {
        none: "",
        full: "rounded-full",
        "2xl": "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      round: "none",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, round, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, round, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
