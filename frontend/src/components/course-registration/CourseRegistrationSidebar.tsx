
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  ClipboardList,
  CheckCircle2,
  Users,
  CalendarDays,
} from "lucide-react";

const menuItems = [
  {
    name: "Course Enrollment",
    path: "/student/course-registration",
    icon: BookOpen,
  },
  {
    name: "Enrolled Courses",
    path: "/student/course-registration/enrolled-courses",
    icon: ClipboardList,
  },
  {
    name: "Completed Courses",
    path: "/student/course-registration/completed-courses",
    icon: CheckCircle2,
  },
  {
    name: "Faculty Lists",
    path: "/student/course-registration/faculty-lists",
    icon: Users,
  },
  {
    name: "Schedule",
    path: "/student/course-registration/schedule",
    icon: CalendarDays,
  },
];

export default function CourseRegistrationSidebar() {
  return (
    <aside className="flex h-full w-full flex-col bg-[#102E46] text-white">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <BookOpen size={21} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Course Portal</h2>
            <p className="text-xs text-slate-300">Registration Services</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-6">
        <p className="mb-4 px-3 text-[10px] font-semibold tracking-[0.18em] text-slate-400">
          COURSE MENU
        </p>

        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/student/course-registration"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                isActive
                  ? "bg-[#167D8D] font-medium text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="text-xs text-slate-400">University Course Portal</p>
        <p className="mt-1 text-[11px] text-slate-500">Student Services</p>
      </div>
    </aside>
  );
}
