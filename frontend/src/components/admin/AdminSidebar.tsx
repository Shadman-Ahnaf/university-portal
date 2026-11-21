
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  CalendarDays,
  BookOpen,
  ClipboardList,
  CalendarClock,
  FileText,
  Wallet,
  Megaphone,
  Settings,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Students", path: "/admin/students", icon: Users },
  { label: "Faculty", path: "/admin/faculty", icon: GraduationCap },
  { label: "Departments & Programs", path: "/admin/departments", icon: Building2 },
  { label: "Academic Terms", path: "/admin/academic-terms", icon: CalendarDays },
  { label: "Courses", path: "/admin/courses", icon: BookOpen },
  { label: "Course Registration", path: "/admin/registration", icon: ClipboardList },
  { label: "Class Routine", path: "/admin/class-routine", icon: CalendarClock },
  { label: "Exam Routine", path: "/admin/exam-routine", icon: FileText },
  { label: "Results", path: "/admin/results", icon: FileText },
  { label: "Payments", path: "/admin/payments", icon: Wallet },
  { label: "Announcements", path: "/admin/announcements", icon: Megaphone },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({
  isOpen,
  onClose,
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        aria-label="Admin sidebar"
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          bg-[#102E46] text-white transition-transform duration-200
          lg:static lg:z-auto lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div>
            <h1 className="text-lg font-semibold">University Portal</h1>
            <p className="text-xs text-slate-300">Administration</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Admin navigation"
          className="flex-1 space-y-1 overflow-y-auto px-3 py-5"
        >
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors
                focus:outline-none focus:ring-2 focus:ring-white
                ${
                  isActive
                    ? "bg-[#167D8D] font-medium text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={19} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-xs text-slate-400">
            University Administration
          </p>
        </div>
      </aside>
    </>
  );
}
