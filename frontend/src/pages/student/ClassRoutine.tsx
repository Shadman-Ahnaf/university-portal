
import StudentLayout from "../../layouts/StudentLayout";

const student = {
  name: "Shadman Ahnaf",
  studentId: "23103012",
  program: "BCSE",
};

const semester = "Fall 2025";

const routine = [
  { code: "CSE 401 (A)", day: "Sunday", time: "09:00 AM - 10:30 AM", room: "501" },
  { code: "CSE 403 (B)", day: "Monday", time: "10:30 AM - 12:00 PM", room: "402" },
  { code: "CSE 405 (A)", day: "Tuesday", time: "01:00 PM - 02:30 PM", room: "Lab 302" },
  { code: "CSE 407 (A)", day: "Wednesday", time: "09:00 AM - 10:30 AM", room: "501" },
  { code: "CSE 409 (B)", day: "Thursday", time: "11:00 AM - 12:30 PM", room: "403" },
];

export default function ClassRoutine() {
  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="overflow-hidden rounded-xl border border-sky-200 bg-white shadow-sm">
          <div className="bg-sky-500 px-5 py-7 text-center text-white sm:py-9">
            <h1 className="text-2xl font-bold tracking-wide sm:text-3xl">
              Class Routine
            </h1>
            <p className="mt-2 text-sm font-medium text-sky-100">
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
            <h2 className="font-semibold text-slate-800">Weekly Class Schedule</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead>
                <tr className="bg-sky-50 text-xs uppercase tracking-wide text-sky-800">
                  <th className="px-5 py-4 font-semibold">Course Code (Section)</th>
                  <th className="px-5 py-4 font-semibold">Day</th>
                  <th className="px-5 py-4 font-semibold">Time</th>
                  <th className="px-5 py-4 font-semibold">Room</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {routine.map((item, index) => (
                  <tr key={`${item.code}-${index}`} className="hover:bg-sky-50/40">
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                      {item.code}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.day}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {item.time}
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
