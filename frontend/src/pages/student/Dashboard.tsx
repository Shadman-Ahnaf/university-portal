
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Wallet,
  UserRound,
  History,
  FileCheck,
  Bus,
  ClipboardCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import StudentLayout from "../../layouts/StudentLayout";

const modules = [
  {
    title: "Particular Information",
    description: "View your personal details and academic profile.",
    path: "/student/particular-information",
    icon: UserRound,
    color: "bg-blue-100 text-blue-700",
    accent: "border-t-blue-500",
  },
  {
    title: "Course Registration",
    description: "Explore course offerings and complete semester enrollment.",
    path: "/student/course-registration",
    icon: BookOpen,
    color: "bg-teal-100 text-teal-700",
    accent: "border-t-teal-500",
  },
  {
    title: "Semester Results",
    description: "Access your semester grades and academic performance.",
    path: "/student/results",
    icon: GraduationCap,
    color: "bg-violet-100 text-violet-700",
    accent: "border-t-violet-500",
  },
  {
    title: "Class Routine",
    description: "View your class schedule, rooms and timings.",
    path: "/student/class-routine",
    icon: CalendarDays,
    color: "bg-orange-100 text-orange-700",
    accent: "border-t-orange-500",
  },
  {
    title: "Exam Routine",
    description: "Check examination dates and schedules.",
    path: "/student/exam-routine",
    icon: ClipboardList,
    color: "bg-indigo-100 text-indigo-700",
    accent: "border-t-indigo-500",
  },
  {
    title: "Payment Information",
    description: "Review invoices, outstanding dues and payment history.",
    path: "/student/payments",
    icon: Wallet,
    color: "bg-amber-100 text-amber-700",
    accent: "border-t-amber-500",
  },
  {
    title: "Completed Courses",
    description: "Review your completed courses and academic history.",
    path: "/student/completed-courses",
    icon: History,
    color: "bg-emerald-100 text-emerald-700",
    accent: "border-t-emerald-500",
  },
  {
    title: "Bus Schedule",
    description: "Find university transportation schedules and details.",
    path: "/student/bus-schedule",
    icon: Bus,
    color: "bg-cyan-100 text-cyan-700",
    accent: "border-t-cyan-500",
  },
  {
    title: "Course Evaluation (CIS)",
    description: "Submit course instruction and faculty evaluations.",
    path: "/student/course-evaluation",
    icon: ClipboardCheck,
    color: "bg-rose-100 text-rose-700",
    accent: "border-t-rose-500",
  },
];

export default function Dashboard() {
  return (
    <StudentLayout>
      <div className="space-y-7">
        <section className="rounded-xl border border-slate-200 bg-white px-5 py-6 sm:px-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-teal-700">
                STUDENT SERVICES
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Academic Services
              </h1>
            </div>

            <div className="hidden h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-blue-700 text-white sm:flex">
              <GraduationCap size={29} />
            </div>
          </div>
        </section>

        <section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <Link
                  key={module.path}
                  to={module.path}
                  className="block h-full"
                >
                  <Card
                    className={`h-full border border-slate-200 border-t-[3px] ${module.accent}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${module.color}`}>
                        <Icon size={21} strokeWidth={1.9} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold leading-5 text-slate-800">
                            {module.title}
                          </h3>

                          <ArrowUpRight
                            size={17}
                            className="shrink-0 text-slate-400"
                          />
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </StudentLayout>
  );
}
