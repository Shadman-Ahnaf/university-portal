
import { useState } from "react";
import type { ReactNode } from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";
import StudentSidebar from "../components/common/StudentSidebar";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Student Portal
              </p>
              <p className="hidden text-xs text-slate-400 sm:block">
                University Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-600" />
            </button>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                S
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-slate-800">
                  Student Name
                </p>
                <p className="text-[11px] text-slate-500">Student</p>
              </div>

              <ChevronDown size={15} className="hidden text-slate-400 sm:block" />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white px-5 py-4 text-center text-xs text-slate-500">
          © 2026 University Student Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
