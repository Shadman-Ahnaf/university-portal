
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "small" | "medium" | "large";
}

const paddingStyles = {
  none: "",
  small: "p-4",
  medium: "p-5 sm:p-6",
  large: "p-6 sm:p-8",
};

export default function Card({
  children,
  padding = "medium",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
