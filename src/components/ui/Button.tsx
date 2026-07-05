import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
}

const variantClasses = {
  default:
    "bg-primary-500 hover:bg-primary-600 text-white shadow-warm hover:shadow-lg",
  secondary:
    "bg-secondary-500 hover:bg-secondary-600 text-white shadow-soft",
  outline:
    "border-2 border-gray-200 hover:border-primary-200 text-gray-600 hover:text-primary-600 hover:bg-primary-50/50",
  ghost:
    "text-gray-600 hover:text-primary-600 hover:bg-primary-50",
};

const sizeClasses = {
  default: "h-10 px-5 py-2 text-sm",
  sm: "h-8 px-4 text-xs",
  lg: "h-12 px-8 text-base",
  xl: "h-14 px-10 text-lg",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button };