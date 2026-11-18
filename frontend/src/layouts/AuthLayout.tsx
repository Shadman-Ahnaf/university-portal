
import type { ReactNode } from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";
import Logo from "../components/common/Logo";

interface AuthLayoutProps {
  children: ReactNode;
  portalName: string;
  portalType: "student" | "admin";
}

export default function AuthLayout({
  children,
  portalName,
  portalType,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-teal-950 p-12 text-white lg:flex xl:p-16">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10">
          <Logo light subtitle="UNIVERSITY MANAGEMENT SYSTEM" />

          <div className="mt-24 max-w-xl">
            <p className="mb-5 text-xs font-bold tracking-[0.25em] text-teal-300">
              UNIVERSITY MANAGEMENT SYSTEM
            </p>

            <h1 className="text-5xl font-extrabold leading-tight xl:text-6xl">
              Your academic journey,
              <span className="block text-teal-300">all in one place.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-slate-300">
              A centralized digital platform for managing academic activities,
              university services and essential information.
            </p>

            <div className="mt-12 space-y-5 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-teal-300" />
                Secure access to university services
              </div>

              <div className="flex items-center gap-3">
                <GraduationCap size={20} className="text-teal-300" />
                Your academic information, organized
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between text-xs tracking-widest text-slate-400">
          <span>UNIVERSITY PORTAL</span>
          <span>EST. 2026</span>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <Logo
              subtitle={
                portalType === "admin"
                  ? "ADMINISTRATION PORTAL"
                  : "STUDENT PORTAL"
              }
            />
          </div>

          <div className="mb-9">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brand-700">
              WELCOME BACK
            </p>

            <h2 className="text-3xl font-extrabold text-slate-900">
              {portalName}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your credentials to access your account.
            </p>
          </div>

          {children}

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 sm:justify-start">
            <ShieldCheck size={17} className="text-brand-600" />
            Your information is protected by secure access.
          </div>

          <div className="mt-14 border-t border-slate-200 pt-6 text-center text-xs leading-6 text-slate-400">
            <p>Need assistance? Contact University IT Support.</p>
            <p>© 2026 University Portal. All rights reserved.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
