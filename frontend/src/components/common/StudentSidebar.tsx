
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  BookOpen,
  ClipboardList,
  GraduationCap,
  CalendarDays,
  Wallet,
  Bus,
  History,
  ClipboardCheck,
  X,
} from "lucide-react";
import Logo from "./Logo";

interface StudentSidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
      { label: "Particular Information", path: "/student/particular-information", icon: UserRound },
    ],
  },
  {
    title: "ACADEMICS",
    items: [
      { label: "Course Registration", path: "/student/course-registration", icon: BookOpen },
      { label: "Semester Results", path: "/student/results", icon: GraduationCap },
      { label: "Class Routine", path: "/student/class-routine", icon: CalendarDays },
      { label: "Exam Routine", path: "/student/exam-routine", icon: ClipboardList },
      { label: "Completed Courses", path: "/student/completed-courses", icon: History },
    ],
  },
  {
    title: "STUDENT SERVICES",
    items: [
      { label: "Payment Information", path: "/student/payments", icon: Wallet },
      { label: "Bus Schedule", path: "/student/bus-schedule", icon: Bus },
      { label: "Course Evaluation (CIS)", path: "/student/course-evaluation", icon: ClipboardCheck },
    ],
  },
];

export default function StudentSidebar({
  open,
  onClose,
}: StudentSidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#25445D] bg-[#102E46] transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 bg-[#0B1D33] px-6">
          <Logo light subtitle="STUDENT PORTAL" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Signed in as
          </p>
          <p className="mt-2 text-sm font-bold text-white">
            Student Name
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Student ID: —
          </p>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {navigation.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.15em] text-slate-400">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                          isActive
                            ? "bg-teal-500/15 text-teal-300 font-semibold"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      <Icon size={18} strokeWidth={1.8} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-[11px] text-slate-400">
            University Student Portal
          </p>
        </div>
      </aside>
    </>
  );
}
