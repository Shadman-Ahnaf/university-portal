
import StudentLayout from "../../layouts/StudentLayout";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const courses = [
  { code: "CSE 101", title: "Introduction to Computer Science", section: "A", grade: "A", credit: "3.0", attempt: "Regular" },
  { code: "MAT 101", title: "Differential Calculus", section: "B", grade: "B+", credit: "3.0", attempt: "Regular" },
  { code: "ENG 101", title: "English Composition", section: "A", grade: "A-", credit: "3.0", attempt: "Regular" },
  { code: "CSE 103", title: "Structured Programming", section: "A", grade: "F", credit: "3.0", attempt: "Regular" },
  { code: "PHY 101", title: "Physics", section: "B", grade: "B", credit: "3.0", attempt: "Regular" },
  { code: "MAT 103", title: "Integral Calculus", section: "A", grade: "B-", credit: "3.0", attempt: "Regular" },
  { code: "CSE 103", title: "Structured Programming", section: "C", grade: "A", credit: "3.0", attempt: "Retake" },
  { code: "CSE 105", title: "Object Oriented Programming", section: "A", grade: "A-", credit: "3.0", attempt: "Regular" },
  { code: "EEE 101", title: "Basic Electrical Engineering", section: "B", grade: "B+", credit: "3.0", attempt: "Regular" },
  { code: "CSE 201", title: "Data Structures", section: "A", grade: "A", credit: "3.0", attempt: "Regular" },
  { code: "MAT 201", title: "Linear Algebra", section: "B", grade: "C+", credit: "3.0", attempt: "Regular" },
  { code: "CSE 203", title: "Digital Logic Design", section: "A", grade: "B", credit: "3.0", attempt: "Regular" },
  { code: "CSE 205", title: "Algorithms", section: "B", grade: "B+", credit: "3.0", attempt: "Regular" },
  { code: "CSE 207", title: "Database Management Systems", section: "A", grade: "A", credit: "3.0", attempt: "Regular" },
  { code: "STA 201", title: "Statistics and Probability", section: "A", grade: "C", credit: "3.0", attempt: "Regular" },
  { code: "CSE 301", title: "Operating Systems", section: "B", grade: "B-", credit: "3.0", attempt: "Regular" },
  { code: "CSE 303", title: "Computer Networks", section: "A", grade: "A-", credit: "3.0", attempt: "Regular" },
  { code: "CSE 305", title: "Software Engineering", section: "B", grade: "B+", credit: "3.0", attempt: "Regular" },
  { code: "MAT 201", title: "Linear Algebra", section: "C", grade: "A", credit: "3.0", attempt: "Improvement" },
  { code: "CSE 307", title: "Artificial Intelligence", section: "A", grade: "A+", credit: "3.0", attempt: "Regular" },
];

export default function CompletedCourses() {
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Course History", 14, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("University Student Portal", 14, 27);

    autoTable(doc, {
      startY: 35,
      head: [[
        "No.",
        "Course Code",
        "Course Title",
        "Section",
        "Grade",
        "Credit Hours",
        "Attempt",
      ]],
      body: courses.map((course, index) => [
        index + 1,
        course.code,
        course.title,
        course.section,
        course.grade,
        course.credit,
        course.attempt,
      ]),
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [16, 46, 70],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 248, 252],
      },
    });

    doc.save("course-history.pdf");
  };

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Course History
          </h1>

          <button
            type="button"
            onClick={downloadPDF}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#102E46] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#193F5D] sm:px-4"
          >
            <FileDown size={18} />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-800">
              Completed Course Records
            </h2>
            <span className="text-xs font-medium text-slate-500">
              {courses.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="w-14 px-5 py-4 font-semibold">No.</th>
                  <th className="px-5 py-4 font-semibold">Course Code</th>
                  <th className="px-5 py-4 font-semibold">Course Title</th>
                  <th className="px-5 py-4 text-center font-semibold">Section</th>
                  <th className="px-5 py-4 text-center font-semibold">Grade</th>
                  <th className="px-5 py-4 text-center font-semibold">Credit Hours</th>
                  <th className="px-5 py-4 text-center font-semibold">Attempt</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {courses.map((course, index) => (
                  <tr
                    key={`${course.code}-${course.section}-${course.attempt}-${index}`}
                    className="hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                      {course.code}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {course.title}
                    </td>

                    <td className="px-5 py-4 text-center text-sm text-slate-600">
                      {course.section}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex min-w-10 justify-center rounded-md bg-slate-100 px-2.5 py-1 text-sm font-bold text-black">
                        {course.grade}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center text-sm text-slate-600">
                      {course.credit}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
                          course.attempt === "Retake"
                            ? "bg-amber-50 text-amber-700"
                            : course.attempt === "Improvement"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {course.attempt}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
