
import { useState } from "react";
import type { Dispatch, SetStateAction, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import StudentLayout from "../../layouts/StudentLayout";

const STORAGE_KEY = "student-cis-submissions";

const student = {
  name: "Shadman Ahnaf",
  id: "221030XX",
  program: "BCSE",
};

const courseDetails: Record<string, { title: string; section: string }> = {
  "CSE 401": { title: "Software Engineering", section: "A" },
  "CSE 403": { title: "Microprocessor and Assembly Language", section: "A" },
  "CSE 405": { title: "Artificial Intelligence", section: "A" },
  "CSE 407": { title: "Database Management Systems", section: "A" },
  "CSE 409": { title: "Computer Networks", section: "A" },
  "CSE 411": { title: "Technical Writing", section: "A" },
};
const teacherQuestions = [
  "The teacher demonstrated adequate knowledge of the subject.",
  "The teacher explained topics clearly and effectively.",
  "The teacher was well prepared for each class.",
  "The teacher encouraged student participation.",
  "The teacher was punctual and maintained class discipline.",
  "The teacher used effective teaching methods.",
  "The teacher responded to students' questions appropriately.",
  "The teacher provided useful feedback on student performance.",
  "The teacher treated students fairly and respectfully.",
  "The teacher completed the course according to the schedule.",
];

const courseQuestions = [
  "The course objectives and learning outcomes were clearly defined.",
  "The course materials were relevant and helpful.",
  "All planned topics were adequately covered.",
  "The course content was organized logically.",
  "The course helped improve my knowledge and skills.",
];

const options = [
  "Most Satisfactory",
  "Satisfactory",
  "Neutral",
  "Average",
  "Below Average",
];

const creditRanges = Array.from({ length: 11 }, (_, i) => {
  const start = i * 15 + 1;
  const end = Math.min(start + 14, 160);
  return `${start}-${end}`;
});

export default function CISForm() {
  const { courseCode, section } = useParams();
  const navigate = useNavigate();

  const code = courseCode ? decodeURIComponent(courseCode) : "";
  const course = courseDetails[code];

  const [creditRange, setCreditRange] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [teacherAnswers, setTeacherAnswers] = useState<string[]>(Array(10).fill(""));
  const [courseAnswers, setCourseAnswers] = useState<string[]>(Array(5).fill(""));
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const wordCount = comment.trim() ? comment.trim().split(/\s+/).length : 0;

  const updateAnswer = (
    setter: Dispatch<SetStateAction<string[]>>,
    current: string[],
    index: number,
    value: string
  ) => {
    const updated = [...current];
    updated[index] = value;
    setter(updated);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!creditRange || !cgpa || teacherAnswers.some((answer) => !answer) ||
        courseAnswers.some((answer) => !answer)) {
      setError("Please complete all required fields.");
      return;
    }

    if (wordCount < 10 || wordCount > 100) {
      setError("Your comment must contain between 10 and 100 words.");
      return;
    }

    const key = `${code}-${section}`;
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[];

    if (!saved.includes(key)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved, key]));
    }

    navigate("/student/results");
  };

  if (!course) {
    return (
      <StudentLayout>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="font-semibold text-slate-800">Course not found</h1>
          <Link to="/student/results" className="mt-4 inline-block text-sm font-semibold text-blue-700">
            Return to Results
          </Link>
        </div>
      </StudentLayout>
    );
  }

  const renderQuestions = (
    title: string,
    questions: string[],
    answers: string[],
    setter: Dispatch<SetStateAction<string[]>>
  ) => (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-bold text-slate-800">{title}</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {questions.map((question, index) => (
          <div key={question} className="space-y-3 px-5 py-5">
            <p className="text-sm font-medium leading-6 text-slate-800">
              <span className="mr-2 text-slate-400">{index + 1}.</span>
              {question}
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {options.map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-xs transition ${
                    answers[index] === option
                      ? "border-[#102E46] bg-slate-100 font-semibold text-[#102E46]"
                      : "border-slate-200 text-slate-600 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${title}-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => updateAnswer(setter, answers, index, option)}
                    className="accent-[#102E46]"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <StudentLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-3">
          <Link
            to="/student/results"
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Back to results"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Course Exit Survey (CIS)</h1>
            <p className="text-sm text-slate-500">Course evaluation form</p>
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="bg-[#102E46] px-5 py-4 text-white">
            <h2 className="font-bold">Student Information</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-slate-500">Name</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{student.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Student ID</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{student.id}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Program</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{student.program}</p>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-xs font-medium text-slate-500">Course Being Evaluated</p>
            <p className="mt-1 text-sm font-bold text-slate-800">
              {code} — {course.title} <span className="font-normal text-slate-500">({section || course.section})</span>
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 font-bold text-slate-800">Student Information</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                How many credits have you completed?
              </label>
              <select
                value={creditRange}
                onChange={(e) => setCreditRange(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#102E46]"
              >
                <option value="">Select completed credits</option>
                {creditRanges.map((range) => (
                  <option key={range} value={range}>{range} credits</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Current CGPA</label>
              <input
                type="number"
                min="0"
                max="4"
                step="0.01"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                required
                placeholder="e.g. 3.50"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#102E46]"
              />
            </div>
          </div>
        </section>

        {renderQuestions("Teacher Evaluation", teacherQuestions, teacherAnswers, setTeacherAnswers)}
        {renderQuestions("Course Evaluation", courseQuestions, courseAnswers, setCourseAnswers)}

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-bold text-slate-800">Additional Comments</h2>
          <label htmlFor="cis-comment" className="mt-4 block text-sm font-medium text-slate-700">
            Suggestions to improve the course or teaching experience
          </label>
          <textarea
            id="cis-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Write your comments here..."
            className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#102E46]"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Minimum 10 words, maximum 100 words</span>
            <span className={wordCount > 100 ? "font-semibold text-red-600" : ""}>
              {wordCount}/100 words
            </span>
          </div>
        </section>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link
            to="/student/results"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#102E46] px-6 py-3 text-sm font-semibold text-white hover:bg-[#194665]"
          >
            <CheckCircle2 size={17} /> Submit CIS
          </button>
        </div>
      </form>
    </StudentLayout>
  );
}
