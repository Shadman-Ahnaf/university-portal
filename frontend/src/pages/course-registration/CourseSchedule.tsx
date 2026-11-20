
import { useEffect, useState } from "react";
import { STORAGE_KEY } from "../../constants/courseRegistration";

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

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getEnrolledCourses(): EnrolledCourse[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as EnrolledCourse[]) : [];
  } catch {
    return [];
  }
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;

  return `${formattedHour}:${String(remainingMinutes).padStart(2, "0")} ${period}`;
}

export default function CourseSchedule() {
  const [courses, setCourses] = useState<EnrolledCourse[]>(getEnrolledCourses);

  useEffect(() => {
    const updateSchedule = () => {
      setCourses(getEnrolledCourses());
    };

    window.addEventListener("storage", updateSchedule);
    window.addEventListener("focus", updateSchedule);

    return () => {
      window.removeEventListener("storage", updateSchedule);
      window.removeEventListener("focus", updateSchedule);
    };
  }, []);

  const sortedCourses = [...courses].sort((a, b) => {
    const dayDifference =
      weekDays.indexOf(a.day) - weekDays.indexOf(b.day);

    if (dayDifference !== 0) return dayDifference;

    return a.startTime - b.startTime;
  });

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-[#102E46]">
        Schedule
      </h2>

      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
        {sortedCourses.length === 0 ? (
          <div className="px-5 py-16 text-center text-sm text-gray-500">
            No schedule available
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[520px] table-fixed text-left">
              <thead className="bg-[#102E46]">
                <tr className="text-xs font-semibold uppercase tracking-wider text-white">
                  <th className="w-[28%] px-4 py-4 sm:px-6">
                    Course Code
                  </th>
                  <th className="w-[17%] px-4 py-4 sm:px-6">
                    Section
                  </th>
                  <th className="w-[20%] px-4 py-4 sm:px-6">
                    Date
                  </th>
                  <th className="w-[35%] px-4 py-4 sm:px-6">
                    Time
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {sortedCourses.map((course, index) => (
                  <tr
                    key={`${course.courseCode}-${course.section}`}
                    className={`text-sm text-gray-700 transition hover:bg-[#F4F8FA] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"
                    }`}
                  >
                    <td className="break-words px-4 py-5 font-semibold text-[#102E46] sm:px-6">
                      {course.courseCode}
                    </td>

                    <td className="px-4 py-5 sm:px-6">
                      {course.section}
                    </td>

                    <td className="px-4 py-5 sm:px-6">
                      {course.day}
                    </td>

                    <td className="whitespace-nowrap px-4 py-5 sm:px-6">
                      {formatTime(course.startTime)} -{" "}
                      {formatTime(course.endTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
