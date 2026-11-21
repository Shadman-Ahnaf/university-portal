
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  Eye,
  Pencil,
  ChevronDown,
} from "lucide-react";

type Student = {
  id: string;
  name: string;
  email: string;
  department: string;
  program: string;
  admissionTerm: string;
  status: "Active" | "Inactive";
};

const initialStudents: Student[] = [
  {
    id: "26103001",
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    department: "CSE",
    program: "BSc in CSE",
    admissionTerm: "Fall 2026",
    status: "Active",
  },
  {
    id: "26103002",
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    department: "CSE",
    program: "BSc in CSE",
    admissionTerm: "Fall 2026",
    status: "Active",
  },
  {
    id: "26104001",
    name: "Tanvir Hasan",
    email: "tanvir@example.com",
    department: "EEE",
    program: "BSc in EEE",
    admissionTerm: "Fall 2026",
    status: "Inactive",
  },
  {
    id: "26105001",
    name: "Sadia Islam",
    email: "sadia@example.com",
    department: "BBA",
    program: "BBA",
    admissionTerm: "Spring 2026",
    status: "Active",
  },
  {
    id: "26106001",
    name: "Fahim Rahman",
    email: "fahim@example.com",
    department: "Civil",
    program: "BSc in Civil Engineering",
    admissionTerm: "Spring 2026",
    status: "Active",
  },
];

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "All" ||
        student.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [students, search, departmentFilter, statusFilter]);

  const activeCount = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveCount = students.length - activeCount;

  const toggleStatus = (id: string) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "Active" ? "Inactive" : "Active",
            }
          : student
      )
    );
  };

  const stats = [
    {
      label: "Total Students",
      value: students.length,
      icon: Users,
      color: "text-[#167D8D]",
      bg: "bg-[#167D8D]/10",
    },
    {
      label: "Active Students",
      value: activeCount,
      icon: UserCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Inactive Students",
      value: inactiveCount,
      icon: UserX,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#102E46]">
            Students
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage student records and accounts
          </p>
        </div>

        <Link
          to="/admin/students/add"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#167D8D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#126875] focus:outline-none focus:ring-2 focus:ring-[#167D8D] focus:ring-offset-2"
        >
          <Plus size={18} />
          Add Student
        </Link>
      </div>

      {/* Statistics */}
      <section
        aria-label="Student statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {label}
              </p>
              <div className={`rounded-lg p-2.5 ${bg} ${color}`}>
                <Icon size={20} aria-hidden="true" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-[#102E46]">
              {value}
            </p>
          </div>
        ))}
      </section>

      {/* Student records */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Search and filters */}
        <div className="space-y-4 border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-base font-semibold text-[#102E46]">
              Student Records
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1 sm:w-72">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, ID or email..."
                  aria-label="Search students by name, ID or email"
                  className="min-h-11 w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/15"
                />
              </div>

              <div className="relative">
                <select
                  value={departmentFilter}
                  onChange={(event) =>
                    setDepartmentFilter(event.target.value)
                  }
                  aria-label="Filter by department"
                  className="min-h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-600 outline-none focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/15 sm:w-40"
                >
                  <option value="All">All Departments</option>
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                  <option value="BBA">BBA</option>
                  <option value="Civil">Civil</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter by student status"
                  className="min-h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-600 outline-none focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/15 sm:w-36"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500" aria-live="polite">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">
                  Student
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Student ID
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Department
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Admission Term
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Status
                </th>
                <th scope="col" className="px-5 py-4 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">
                      {student.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {student.email}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-600">
                    {student.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-700">
                      {student.department}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {student.program}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {student.admissionTerm}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        student.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/students/${student.id}`}
                        aria-label={`View ${student.name}`}
                        title="View student"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#167D8D] focus:outline-none focus:ring-2 focus:ring-[#167D8D]"
                      >
                        <Eye size={17} />
                      </Link>

                      <Link
                        to={`/admin/students/${student.id}/edit`}
                        aria-label={`Edit ${student.name}`}
                        title="Edit student"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#167D8D] focus:outline-none focus:ring-2 focus:ring-[#167D8D]"
                      >
                        <Pencil size={17} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => toggleStatus(student.id)}
                        aria-label={`${
                          student.status === "Active" ? "Deactivate" : "Activate"
                        } ${student.name}`}
                        title={
                          student.status === "Active"
                            ? "Deactivate account"
                            : "Activate account"
                        }
                        className="rounded-lg px-2 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-[#167D8D] focus:outline-none focus:ring-2 focus:ring-[#167D8D]"
                      >
                        {student.status === "Active" ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile records */}
        <div className="divide-y divide-slate-100 md:hidden">
          {filteredStudents.map((student) => (
            <article key={student.id} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-800">
                    {student.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {student.id}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    student.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-400">Department</p>
                  <p className="mt-1 font-medium text-slate-700">
                    {student.department}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Admission Term</p>
                  <p className="mt-1 font-medium text-slate-700">
                    {student.admissionTerm}
                  </p>
                </div>
              </div>

              <p className="break-all text-xs text-slate-500">
                {student.email}
              </p>

              <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                <Link
                  to={`/admin/students/${student.id}`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#167D8D]"
                >
                  <Eye size={15} />
                  View
                </Link>

                <Link
                  to={`/admin/students/${student.id}/edit`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#167D8D]"
                >
                  <Pencil size={15} />
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() => toggleStatus(student.id)}
                  className="min-h-10 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#167D8D]"
                >
                  {student.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredStudents.length === 0 && (
          <div className="px-5 py-14 text-center">
            <Users size={30} className="mx-auto text-slate-300" />
            <p className="mt-3 font-medium text-slate-700">
              No students found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
