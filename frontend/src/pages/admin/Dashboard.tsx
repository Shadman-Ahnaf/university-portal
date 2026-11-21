
import {
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  UserPlus,
  Plus,
  ClipboardList,
  FileCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Wallet,
  MoreHorizontal,
} from "lucide-react";

const statistics = [
  {
    title: "Total Students",
    value: "1,250",
    change: "+48 this semester",
    icon: Users,
  },
  {
    title: "Faculty Members",
    value: "48",
    change: "Across all departments",
    icon: GraduationCap,
  },
  {
    title: "Active Courses",
    value: "36",
    change: "Current academic term",
    icon: BookOpen,
  },
  {
    title: "Departments",
    value: "08",
    change: "Academic departments",
    icon: Building2,
  },
];

const quickActions = [
  { title: "Add Student", icon: UserPlus },
  { title: "Add Faculty", icon: GraduationCap },
  { title: "Create Course", icon: Plus },
  { title: "Publish Results", icon: FileCheck },
];

const recentStudents = [
  {
    id: "26103001",
    name: "Rahim Ahmed",
    department: "CSE",
    date: "20 Nov 2026",
    status: "Active",
  },
  {
    id: "26103002",
    name: "Nusrat Jahan",
    department: "CSE",
    date: "19 Nov 2026",
    status: "Active",
  },
  {
    id: "26104001",
    name: "Tanvir Hasan",
    department: "EEE",
    date: "18 Nov 2026",
    status: "Pending",
  },
  {
    id: "26105001",
    name: "Sadia Islam",
    department: "BBA",
    date: "17 Nov 2026",
    status: "Active",
  },
];

function StatCard({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="rounded-lg bg-[#167D8D]/10 p-2.5 text-[#167D8D]">
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>

      <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#102E46]">
        {value}
      </h3>

      <p className="mt-1 text-xs text-slate-500">{change}</p>
    </div>
  );
}

function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold text-[#102E46]">{title}</h2>
      {action && (
        <button
          type="button"
          className="text-sm font-medium text-[#167D8D] hover:text-[#102E46] focus:outline-none focus:ring-2 focus:ring-[#167D8D] rounded"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#102E46]">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Saturday, November 21, 2026
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
          <CalendarDays size={17} />
          <span>Fall 2026</span>
        </div>
      </div>

      {/* Statistics */}
      <section aria-label="University statistics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <SectionHeading title="Quick Actions" />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {quickActions.map(({ title, icon: Icon }) => (
            <button
              key={title}
              type="button"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#167D8D] hover:bg-[#167D8D]/5 focus:outline-none focus:ring-2 focus:ring-[#167D8D]"
            >
              <div className="rounded-lg bg-[#102E46] p-2.5 text-white">
                <Icon size={19} aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {title}
              </span>
              <ArrowUpRight
                size={16}
                className="ml-auto shrink-0 text-slate-400"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Registration and payment overview */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Registration */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <SectionHeading title="Course Registration" action="Manage" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-[#102E46]">
                Fall 2026
              </p>
              <p className="mt-1 text-sm text-slate-500">
                CSE Department
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={14} />
              Active
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Registered Students</p>
              <p className="mt-1 text-xl font-bold text-[#102E46]">186</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Registration Deadline</p>
              <p className="mt-1 text-xl font-bold text-[#102E46]">
                22 Nov
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <Clock size={16} />
            <span>Closes tomorrow</span>
          </div>
        </div>

        {/* Payments */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <SectionHeading title="Payment Overview" action="View Payments" />

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#167D8D]/10 p-3 text-[#167D8D]">
              <Wallet size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Total Collected</p>
              <p className="text-2xl font-bold text-[#102E46]">
                ৳ 12,50,000
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-emerald-50 p-3">
              <p className="text-xs text-emerald-700">Paid Invoices</p>
              <p className="mt-1 text-xl font-bold text-emerald-800">
                1,120
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3">
              <p className="text-xs text-amber-700">Pending Invoices</p>
              <p className="mt-1 text-xl font-bold text-amber-800">
                85
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent students */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 p-5">
          <SectionHeading title="Recent Admissions" action="View All" />
          <button
            type="button"
            aria-label="More admission options"
            className="mb-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#167D8D]"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Student</th>
                <th scope="col" className="px-5 py-3 font-medium">Student ID</th>
                <th scope="col" className="px-5 py-3 font-medium">Department</th>
                <th scope="col" className="px-5 py-3 font-medium">Admission Date</th>
                <th scope="col" className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                    {student.name}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {student.id}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {student.department}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {student.date}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        student.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
