"use client";

import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-primary font-semibold hover:bg-accent-light border border-accent hover:border-accent-light",
  secondary:
    "bg-primary text-white font-semibold hover:bg-primary-light border border-primary",
  outline:
    "bg-transparent text-primary font-semibold border border-primary hover:bg-primary hover:text-white",
  ghost:
    "bg-transparent text-charcoal font-medium hover:text-accent border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs tracking-widest",
  md: "px-7 py-3.5 text-sm tracking-widest",
  lg: "px-9 py-4 text-sm tracking-widest",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2 uppercase
          transition-all duration-200 font-body active:scale-95
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
