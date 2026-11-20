
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileCheck2, LockKeyhole } from "lucide-react";
import StudentLayout from "../../layouts/StudentLayout";

const STORAGE_KEY = "student-cis-submissions";

const student = {
  name: "Shadman Ahnaf",
  studentId: "23103012",
  program: "BCSE",
  semester: "Fall 2026",
};

const results = [
  { code: "CSE 401", title: "Software Engineering", credit: "3.0", grade: "A" },
  { code: "CSE 403", title: "Microprocessor and Assembly Language", credit: "3.0", grade: "A-" },
  { code: "CSE 405", title: "Artificial Intelligence", credit: "3.0", grade: "B+" },
  { code: "CSE 407", title: "Database Management Systems", credit: "3.0", grade: "A+" },
  { code: "CSE 409", title: "Computer Networks", credit: "3.0", grade: "B" },
  { code: "CSE 411", title: "Technical Writing", credit: "1.5", grade: "B-" },
];

const gradingScale = [
  { grade: "A+", point: "4.00" },
  { grade: "A", point: "3.70" },
  { grade: "A-", point: "3.50" },
  { grade: "B+", point: "3.25" },
  { grade: "B", point: "3.00" },
  { grade: "B-", point: "2.75" },
  { grade: "C+", point: "2.50" },
  { grade: "C", point: "2.25" },
  { grade: "C-", point: "2.00" },
  { grade: "D+", point: "1.75" },
  { grade: "D", point: "1.50" },
  { grade: "F", point: "0.00" },
  { grade: "W", point: "0.00" },
  { grade: "I", point: "0.00" },
];

export default function SemesterResults() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch {
        setCompleted([]);
      }
    }
  }, []);

  const allCompleted = results.every((course) =>
    completed.includes(course.code)
  );

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Semester Results
          </h1>
          <span className="w-fit rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800">
            {student.semester}
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-7">
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-slate-400">Name</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {student.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">Student ID</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {student.studentId}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500">Program</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {student.program}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-1.5 py-3 sm:px-5 sm:py-4">
            <h2 className="font-semibold text-slate-800">Course Results</h2>

            {allCompleted ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <FileCheck2 size={14} />
                Results Unlocked
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                <LockKeyhole size={14} />
                CIS Required
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[9px] uppercase tracking-wide text-slate-500 sm:text-xs">
                  <th className="w-10 px-1.5 py-3 font-semibold sm:w-16 sm:px-5 sm:py-4">No.</th>
                  <th className="px-1.5 py-3 font-semibold sm:px-5 sm:py-4">Course Code</th>
                  <th className="px-1.5 py-3 font-semibold sm:px-5 sm:py-4">Course Title</th>
                  <th className="px-1.5 py-3 text-center font-semibold sm:px-5 sm:py-4">Credit Hours</th>
                  <th className="px-1.5 py-3 text-center font-semibold sm:px-5 sm:py-4">Grade</th>
                  <th className="px-1.5 py-3 text-center font-semibold sm:px-5 sm:py-4">CIS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {results.map((course, index) => {
                  const isDone = completed.includes(course.code);

                  return (
                    <tr key={course.code} className="hover:bg-slate-50/70">
                      <td className="px-1.5 py-3 text-[10px] text-slate-500 sm:px-5 sm:py-4 sm:text-sm">
                        {index + 1}
                      </td>

                      <td className="whitespace-nowrap px-1.5 py-3 text-[10px] font-semibold text-slate-700 sm:px-5 sm:py-4 sm:text-sm">
                        {course.code}
                      </td>

                      <td className="px-1.5 py-3 text-[10px] text-slate-700 sm:px-5 sm:py-4 sm:text-sm">
                        {course.title}
                      </td>

                      <td className="px-1.5 py-3 text-center text-[10px] text-slate-600 sm:px-5 sm:py-4 sm:text-sm">
                        {course.credit}
                      </td>

                      <td className="px-1.5 py-3 text-center sm:px-5 sm:py-4">
                        {allCompleted ? (
                          <span className="inline-flex min-w-10 items-center justify-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-black sm:text-sm">
                            <span className="inline-flex w-3 justify-center">
                              {course.grade.charAt(0)}
                            </span>
                            <span className="inline-flex w-3 justify-center">
                              {course.grade.slice(1)}
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      <td className="px-1.5 py-3 text-center sm:px-5 sm:py-4">
                        {isDone ? (
                          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-50 px-2 py-1.5 text-[9px] font-semibold text-emerald-700 sm:px-3 sm:text-xs">
                            <FileCheck2 size={12} />
                            Done
                          </span>
                        ) : (
                          <Link
                            to={`/student/cis/${encodeURIComponent(course.code)}/A`}
                            className="inline-flex whitespace-nowrap items-center justify-center rounded-md bg-[#102E46] px-2 py-2 text-[9px] font-semibold text-white hover:bg-[#194665] sm:rounded-lg sm:px-3 sm:text-xs"
                          >
                            Fill CIS
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!allCompleted ? (
            <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>CIS Completion</span>
                <span className="font-semibold text-slate-900">
                  {completed.filter((code) => results.some((course) => course.code === code)).length} / {results.length}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all"
                  style={{
                    width: `${(results.filter((course) => completed.includes(course.code)).length / results.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 border-t border-slate-200 bg-slate-50 px-1.5 py-3 sm:px-5 sm:py-4">
              <span className="text-sm font-semibold text-slate-700">
                Semester GPA
              </span>
              <span className="text-xl font-bold tabular-nums text-black">
                SGPA: 3.58
              </span>
            </div>
          )}
        </div>

        {allCompleted && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">
              Grading Point Scale
            </h2>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {gradingScale.map((item) => (
                <div
                  key={item.grade}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
                    item.grade === "F"
                      ? "border-red-100 bg-red-50"
                      : item.grade === "W" || item.grade === "I"
                        ? "border-slate-200 bg-slate-50"
                        : "border-slate-100 bg-slate-50/70"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${
                      item.grade === "F" ? "text-red-700" : "text-slate-700"
                    }`}
                  >
                    {item.grade}
                  </span>
                  <span className="text-sm font-medium tabular-nums text-slate-500">
                    {item.point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
