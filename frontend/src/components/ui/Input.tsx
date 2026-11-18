
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  icon,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-600/10">
        {icon && <span className="shrink-0 text-slate-400">{icon}</span>}

        <input
          id={id}
          className={`w-full min-w-0 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
