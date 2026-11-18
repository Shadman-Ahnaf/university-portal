
import StudentLayout from "../../layouts/StudentLayout";

const student = {
  name: "Shadman Ahnaf",
  studentId: "23103012",
  program: "BCSE",
};

const semester = "Fall 2025";

const routine = [
  { date: "10 December 2025", time: "09:00 AM - 12:00 PM", code: "CSE 401 (A)", room: "501, Seat 12" },
  { date: "13 December 2025", time: "09:00 AM - 12:00 PM", code: "CSE 403 (B)", room: "402, Seat 08" },
  { date: "16 December 2025", time: "01:00 PM - 04:00 PM", code: "CSE 405 (A)", room: "302, Seat 15" },
  { date: "19 December 2025", time: "09:00 AM - 12:00 PM", code: "CSE 407 (A)", room: "501, Seat 21" },
  { date: "22 December 2025", time: "01:00 PM - 04:00 PM", code: "CSE 409 (B)", room: " 403, Seat 05" },
];

export default function ExamRoutine() {
  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-white shadow-sm">
          <div className="bg-[#102E46] px-5 py-7 text-center text-white sm:py-9">
            <h1 className="text-2xl font-bold tracking-wide sm:text-3xl">
              Exam Routine
            </h1>
            <p className="mt-2 text-sm font-medium text-blue-200">
              {semester}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-3 sm:px-7">
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
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-800">Examination Schedule</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] border-collapse text-left">
              <thead>
                <tr className="bg-[#102E46] text-xs uppercase tracking-wide text-white">
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Time</th>
                  <th className="px-5 py-4 font-semibold">Course Code (Section)</th>
                  <th className="px-5 py-4 font-semibold">Room & Seat Number</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {routine.map((item, index) => (
                  <tr key={`${item.code}-${index}`} className="hover:bg-blue-50/40">
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-700">
                      {item.date}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {item.time}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                      {item.code}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {item.room}
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
