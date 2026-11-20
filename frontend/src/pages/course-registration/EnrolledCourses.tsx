
import { useEffect, useState } from "react";
import {
  Clock,
  Trash2,
  CheckCircle2,
  BookOpen,
  Lock,
  AlertCircle,
} from "lucide-react";
import {
  REGISTRATION_END,
  STORAGE_KEY,
  OFFERING_FINISHED_KEY,
} from "../../constants/courseRegistration";

interface EnrolledCourse {
  courseCode: string;
  title: string;
  section: string;
  faculty: string;
  day: string;
  startTime: number;
  endTime: number;
  timeLabel: string;
  availableSeats: number;
  isRetake: boolean;
}

function getTimeRemaining() {
  const difference = Math.max(0, REGISTRATION_END - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
  };
}

function getSavedCourses(): EnrolledCourse[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as EnrolledCourse[]) : [];
  } catch {
    return [];
  }
}

export default function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] =
    useState<EnrolledCourse[]>(getSavedCourses);

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  const [offeringFinished, setOfferingFinished] = useState(
    () => localStorage.getItem(OFFERING_FINISHED_KEY) === "true"
  );

  const [notice, setNotice] = useState("");

  const student = {
    name: "Shadman Ahnaf",
    id: "23103012",
    cgpa: "3.57",
    program: "BCSE",
  };

  const registrationOpen =
    Date.now() < REGISTRATION_END && !offeringFinished;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const handleDelete = (course: EnrolledCourse) => {
    if (offeringFinished) return;

    const updatedCourses = enrolledCourses.filter(
      (item) =>
        !(
          item.courseCode === course.courseCode &&
          item.section === course.section
        )
    );

    setEnrolledCourses(updatedCourses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCourses));

    setNotice(`${course.courseCode} has been removed from your enrolled courses.`);
  };

  const handleFinishOffering = () => {
    if (offeringFinished) return;

    const confirmed = window.confirm(
      "You wont be able to add/delete any course after finishing the offering"
    );

    if (!confirmed) return;

    localStorage.setItem(OFFERING_FINISHED_KEY, "true");
    setOfferingFinished(true);
    setNotice("Course offering has been successfully finished.");
  };

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-[#102E46]">
          Enrolled Courses
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage your selected courses for the current semester.
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Current Registration
              </p>
              <h3 className="mt-1 text-lg font-semibold text-[#102E46]">
                Fall 2026
              </h3>
            </div>

            <div className="rounded-lg bg-emerald-50 px-4 py-3">
              {offeringFinished ? (
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Lock size={16} />
                  Offering Finished
                </div>
              ) : registrationOpen ? (
                <>
                  <p className="text-xs font-medium text-emerald-700">
                    Registration closes in
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    {[
                      { value: timeLeft.days, label: "Days" },
                      { value: timeLeft.hours, label: "Hours" },
                      { value: timeLeft.minutes, label: "Minutes" },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <p className="text-xl font-bold tabular-nums text-emerald-800">
                          {String(item.value).padStart(2, "0")}
                        </p>
                        <p className="text-[10px] text-emerald-700">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm font-semibold text-red-700">
                  Registration Closed
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-4">
            {[
              { label: "Student Name", value: student.name },
              { label: "Student ID", value: student.id },
              { label: "CGPA", value: student.cgpa },
              { label: "Program", value: student.program },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="mt-1 break-words text-sm font-semibold text-[#102E46]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {notice && (
        <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <p>{notice}</p>
          <button
            onClick={() => setNotice("")}
            className="ml-auto text-emerald-700"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h3 className="font-semibold text-[#102E46]">
              Selected Course List
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              {enrolledCourses.length} course
              {enrolledCourses.length !== 1 ? "s" : ""} selected
            </p>
          </div>

          {offeringFinished && (
            <span className="flex w-fit items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600">
              <Lock size={14} />
              Editing Locked
            </span>
          )}
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
            <BookOpen size={32} className="text-gray-300" />
            <h4 className="mt-3 text-sm font-semibold text-[#102E46]">
              No Courses Enrolled
            </h4>
            <p className="mt-1 text-xs text-gray-500">
              Your selected courses will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-[#F7F8FA]">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <th className="px-5 py-4">Course</th>
                    <th className="px-5 py-4">Section</th>
                    <th className="px-5 py-4">Faculty</th>
                    <th className="px-5 py-4">Day and Time</th>
                    <th className="px-5 py-4">Type</th>
                    {!offeringFinished && (
                      <th className="px-5 py-4 text-center">Action</th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {enrolledCourses.map((course) => (
                    <tr
                      key={`${course.courseCode}-${course.section}`}
                      className="text-sm text-gray-700"
                    >
                      <td className="px-5 py-5">
                        <p className="font-semibold text-[#102E46]">
                          {course.courseCode}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {course.title}
                        </p>
                      </td>

                      <td className="px-5 py-5">{course.section}</td>

                      <td className="px-5 py-5 font-medium">
                        {course.faculty}
                      </td>

                      <td className="px-5 py-5">
                        <p>{course.day}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {course.timeLabel}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        {course.isRetake ? (
                          <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                            Retake
                          </span>
                        ) : (
                          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                            Regular
                          </span>
                        )}
                      </td>

                      {!offeringFinished && (
                        <td className="px-5 py-5 text-center">
                          <button
                            onClick={() => handleDelete(course)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-gray-100 md:hidden">
              {enrolledCourses.map((course) => (
                <div
                  key={`${course.courseCode}-${course.section}`}
                  className="space-y-4 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#102E46]">
                        {course.courseCode}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {course.title}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-md bg-[#EAF2F7] px-2.5 py-1 text-xs font-semibold text-[#102E46]">
                      Section {course.section}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Faculty</p>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {course.faculty}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Course Type</p>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {course.isRetake ? "Retake" : "Regular"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Day</p>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {course.day}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {course.timeLabel}
                      </p>
                    </div>
                  </div>

                  {!offeringFinished && (
                    <button
                      onClick={() => handleDelete(course)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete Course
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h3 className="font-semibold text-[#102E46]">
            Finish Course Offering
          </h3>
          <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
            Once you finish the offering, your selected courses will be locked.
            You will no longer be able to add or delete courses.
          </p>
        </div>

        {offeringFinished ? (
          <span className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-600">
            <Lock size={16} />
            Offering Finished
          </span>
        ) : (
          <button
            onClick={handleFinishOffering}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#102E46] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#194563]"
          >
            <CheckCircle2 size={17} />
            Finish Course Offering
          </button>
        )}
      </section>
    </div>
  );
}
