
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import {
  X,
  Users,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  REGISTRATION_END,
  STORAGE_KEY,
  OFFERING_FINISHED_KEY,
} from "../../constants/courseRegistration";

function getTimeRemaining() {
  const difference = Math.max(0, REGISTRATION_END - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
  };
}

interface Course {
  courseCode: string;
  title: string;
  section: string;
  faculty: string;
  day: string;
  startTime: number;
  endTime: number;
  timeLabel: string;
  availableSeats: number;
}

interface EnrolledCourse extends Course {
  isRetake: boolean;
}

const initialCourses: Course[] = [
  {
    courseCode: "CSE 401",
    title: "Software Engineering",
    section: "A",
    faculty: "MRA",
    day: "Sunday",
    startTime: 540,
    endTime: 630,
    timeLabel: "09:00 AM - 10:30 AM",
    availableSeats: 12,
  },
  {
    courseCode: "CSE 403",
    title: "Microprocessor and Assembly Language",
    section: "B",
    faculty: "SKH",
    day: "Sunday",
    startTime: 600,
    endTime: 690,
    timeLabel: "10:00 AM - 11:30 AM",
    availableSeats: 8,
  },
  {
    courseCode: "CSE 405",
    title: "Artificial Intelligence",
    section: "A",
    faculty: "NAT",
    day: "Monday",
    startTime: 660,
    endTime: 750,
    timeLabel: "11:00 AM - 12:30 PM",
    availableSeats: 15,
  },
  {
    courseCode: "CSE 407",
    title: "Database Management Systems",
    section: "A",
    faculty: "FAR",
    day: "Tuesday",
    startTime: 540,
    endTime: 630,
    timeLabel: "09:00 AM - 10:30 AM",
    availableSeats: 6,
  },
  {
    courseCode: "CSE 409",
    title: "Computer Networks",
    section: "B",
    faculty: "TAS",
    day: "Wednesday",
    startTime: 780,
    endTime: 870,
    timeLabel: "01:00 PM - 02:30 PM",
    availableSeats: 10,
  },
  {
    courseCode: "CSE 411",
    title: "Technical Writing",
    section: "A",
    faculty: "RKH",
    day: "Thursday",
    startTime: 600,
    endTime: 690,
    timeLabel: "10:00 AM - 11:30 AM",
    availableSeats: 4,
  },
];

function getSavedCourses(): EnrolledCourse[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as EnrolledCourse[]) : [];
  } catch {
    return [];
  }
}

function isOfferingFinished() {
  return localStorage.getItem(OFFERING_FINISHED_KEY) === "true";
}

export default function CourseEnrollment() {
  const [courses, setCourses] = useState(initialCourses);
  const [enrolledCourses, setEnrolledCourses] =
    useState<EnrolledCourse[]>(getSavedCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isRetake, setIsRetake] = useState("No");
  const [feedback, setFeedback] = useState("");
  const [notice, setNotice] = useState("");
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);
  const [offeringFinished, setOfferingFinished] = useState(
    isOfferingFinished
  );
  const [registrationOpen, setRegistrationOpen] = useState(
    Date.now() < REGISTRATION_END && !isOfferingFinished()
  );
const [search, setSearch] = useState("");
  const student = {
    name: "Shadman Ahnaf",
    id: "23103012",
    cgpa: "3.57",
    program: "BCSE",
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      const finished = isOfferingFinished();

      setTimeLeft(getTimeRemaining());
      setOfferingFinished(finished);
      setRegistrationOpen(Date.now() < REGISTRATION_END && !finished);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);
const filteredCourses = courses.filter((course) =>
  course.courseCode.toLowerCase().includes(search.toLowerCase().trim())
);
  const openEnrollment = (course: Course) => {
    if (Date.now() >= REGISTRATION_END || isOfferingFinished()) {
      setRegistrationOpen(false);
      setOfferingFinished(isOfferingFinished());
      return;
    }

    setSelectedCourse(course);
    setIsRetake("No");
    setFeedback("");
  };

  const closeEnrollment = () => {
    setSelectedCourse(null);
    setFeedback("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCourse) return;

    if (Date.now() >= REGISTRATION_END || isOfferingFinished()) {
      const finished = isOfferingFinished();

      setOfferingFinished(finished);
      setRegistrationOpen(false);
      setFeedback(
        finished
          ? "Course offering has already been finished. You cannot add or delete courses."
          : "Course registration has closed."
      );
      return;
    }

    if (selectedCourse.availableSeats <= 0) {
      setFeedback("No available seats remain in this section.");
      return;
    }

    const alreadyEnrolled = enrolledCourses.some(
      (course) =>
        course.courseCode === selectedCourse.courseCode &&
        course.section === selectedCourse.section
    );

    if (alreadyEnrolled) {
      setFeedback("You are already enrolled in this course section.");
      return;
    }

    const conflict = enrolledCourses.find(
      (course) =>
        course.day === selectedCourse.day &&
        selectedCourse.startTime < course.endTime &&
        selectedCourse.endTime > course.startTime
    );

    if (conflict) {
      setFeedback(
        `Schedule conflict: ${conflict.courseCode} (${conflict.section}) is already scheduled on ${conflict.day}, ${conflict.timeLabel}. Please choose another section or course.`
      );
      return;
    }

    const newEnrollment: EnrolledCourse = {
      ...selectedCourse,
      isRetake: isRetake === "Yes",
    };

    const updatedEnrollments = [...enrolledCourses, newEnrollment];

    setEnrolledCourses(updatedEnrollments);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEnrollments));

    setCourses((current) =>
      current.map((course) =>
        course.courseCode === selectedCourse.courseCode &&
        course.section === selectedCourse.section
          ? { ...course, availableSeats: course.availableSeats - 1 }
          : course
      )
    );

    setNotice(
      `${selectedCourse.courseCode} - ${selectedCourse.section} has been added to your demo enrolled courses.`
    );

    closeEnrollment();
  };

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-[#102E46]">
          Course Enrollment
        </h2>
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
                <p className="text-sm font-semibold text-gray-700">
                  Offering Finished
                </p>
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
            <X size={17} />
          </button>
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
<div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
  <h3 className="font-bold text-[#102E46]">
    Available Course Offerings
  </h3>

  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by course code..."
      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/10 sm:w-64"
    />
  </div>
</div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#F7F8FA]">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Course Code</th>
                <th className="px-5 py-4">Section</th>
                <th className="px-5 py-4">Faculty</th>
                <th className="px-5 py-4">Day and Time</th>
                <th className="px-5 py-4 text-center">Available Seats</th>
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((course) => {
                const isEnrolled = enrolledCourses.some(
                  (item) =>
                    item.courseCode === course.courseCode &&
                    item.section === course.section
                );

                return (
                  <tr
                    key={`${course.courseCode}-${course.section}`}
                    className="text-sm text-gray-700 transition hover:bg-gray-50/70"
                  >
                    <td className="whitespace-nowrap px-5 py-5 font-semibold text-[#102E46]">
                      {course.courseCode}
                      <p className="mt-1 text-xs font-normal text-gray-500">
                        {course.title}
                      </p>
                    </td>

                    <td className="px-5 py-5">{course.section}</td>

                    <td className="px-5 py-5 font-medium">
                      {course.faculty}
                    </td>

                    <td className="whitespace-nowrap px-5 py-5">
                      <p>{course.day}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {course.timeLabel}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-center">
                      <span
                        className={`font-semibold tabular-nums ${
                          course.availableSeats <= 5
                            ? "text-amber-600"
                            : "text-gray-700"
                        }`}
                      >
                        {course.availableSeats}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-center">
                      <button
                        disabled={
                          isEnrolled ||
                          course.availableSeats <= 0 ||
                          !registrationOpen ||
                          offeringFinished
                        }
                        onClick={() => openEnrollment(course)}
                        className="whitespace-nowrap rounded-lg bg-[#102E46] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#194563] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                      >
                        {isEnrolled
                          ? "Enrolled"
                          : offeringFinished
                            ? "Finished"
                            : !registrationOpen
                              ? "Closed"
                              : course.availableSeats <= 0
                                ? "Full"
                                : "Enroll"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-gray-100 md:hidden">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourses.some(
              (item) =>
                item.courseCode === course.courseCode &&
                item.section === course.section
            );

            return (
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
                    <p className="text-xs text-gray-500">Available Seats</p>
                    <p
                      className={`mt-1 text-sm font-semibold ${
                        course.availableSeats <= 5
                          ? "text-amber-600"
                          : "text-gray-800"
                      }`}
                    >
                      {course.availableSeats}
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

                <button
                  disabled={
                    isEnrolled ||
                    course.availableSeats <= 0 ||
                    !registrationOpen ||
                    offeringFinished
                  }
                  onClick={() => openEnrollment(course)}
                  className="w-full rounded-lg bg-[#102E46] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#194563] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                >
                  {isEnrolled
                    ? "Enrolled"
                    : offeringFinished
                      ? "Offering Finished"
                      : !registrationOpen
                        ? "Registration Closed"
                        : course.availableSeats <= 0
                          ? "Full"
                          : "Enroll in This Course"}
                </button>
              </div>
            );
          })}
        </div>

      </section>

      {selectedCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enrollment-title"
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-7">
              <div>
                <h2
                  id="enrollment-title"
                  className="text-lg font-semibold text-[#102E46]"
                >
                  Course Enrollment
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Review the course information before submitting.
                </p>
              </div>

              <button
                onClick={closeEnrollment}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close enrollment"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Course Code</p>
                  <p className="mt-1 text-sm font-semibold text-[#102E46]">
                    {selectedCourse.courseCode}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Section</p>
                  <p className="mt-1 text-sm font-semibold text-[#102E46]">
                    {selectedCourse.section}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-500">Course Title</p>
                  <p className="mt-1 text-sm font-semibold text-[#102E46]">
                    {selectedCourse.title}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-500">Day and Time</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedCourse.day}, {selectedCourse.timeLabel}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <p className="mb-3 text-sm font-medium text-gray-700">
                  Is this a Retake Course?
                </p>

                <div className="flex gap-3">
                  {["No", "Yes"].map((option) => (
                    <label
                      key={option}
                      className={`flex min-w-24 cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition ${
                        isRetake === option
                          ? "border-[#167D8D] bg-[#167D8D]/5 text-[#102E46]"
                          : "border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="retake"
                        value={option}
                        checked={isRetake === option}
                        onChange={(e) => setIsRetake(e.target.value)}
                        className="accent-[#167D8D]"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {feedback && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <p>{feedback}</p>
                </div>
              )}

              <div className="flex justify-center border-t border-gray-100 pt-5">
                <button
                  type="submit"
                  disabled={!registrationOpen || offeringFinished}
                  className="w-full rounded-lg bg-[#102E46] px-10 py-3 text-sm font-semibold text-white transition hover:bg-[#194563] disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
                >
                  Submit Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
