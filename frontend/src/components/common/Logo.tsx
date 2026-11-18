
import { GraduationCap } from "lucide-react";

interface LogoProps {
  light?: boolean;
  compact?: boolean;
  subtitle?: string;
}

export default function Logo({
  light = false,
  compact = false,
  subtitle = "UNIVERSITY PORTAL",
}: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          light
            ? "border border-white/15 bg-white/10 text-white"
            : "bg-brand-50 text-brand-700"
        }`}
      >
        <GraduationCap size={27} />
      </div>

      {!compact && (
        <div>
          <p className={`font-heading text-sm font-extrabold tracking-wide ${light ? "text-white" : "text-slate-900"}`}>
            UNIVERSITY
          </p>
          <p className={`text-[10px] font-semibold tracking-[0.16em] ${light ? "text-slate-400" : "text-slate-500"}`}>
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
