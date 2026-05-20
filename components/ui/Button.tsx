"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-white text-primary font-semibold hover:bg-white/90 border border-white",
  secondary:
    "bg-primary text-white font-semibold hover:bg-primary-light border border-primary",
  outline:
    "bg-transparent text-primary font-semibold border border-primary hover:bg-primary hover:text-white",
  ghost:
    "bg-transparent text-charcoal font-medium hover:text-primary border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs tracking-[0.15em]",
  md: "px-7 py-3.5 text-xs tracking-[0.15em]",
  lg: "px-9 py-4 text-xs tracking-[0.15em]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 uppercase transition-all duration-200 font-body active:scale-95",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
