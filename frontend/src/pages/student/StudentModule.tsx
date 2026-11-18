
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import Card from "../../components/ui/Card";
import StudentLayout from "../../layouts/StudentLayout";

const moduleNames: Record<string, string> = {
  "particular-information": "Particular Information",
  "course-registration": "Course Registration",
  results: "Semester Results",
  "class-routine": "Class Routine",
  "exam-routine": "Exam Routine",
  "completed-courses": "Completed Courses",
  "result-verification": "Result Verification",
  payments: "Payment Information",
  "account-status": "Account Status",
  "bus-schedule": "Bus Schedule",
  "course-evaluation": "Course Evaluation (CIS)",
};

export default function StudentModule() {
  const { module } = useParams();
  const title = module ? moduleNames[module] : undefined;

  return (
    <StudentLayout>
      <div className="mb-6">
        <Link
          to="/student/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-700"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>

      <Card padding="large" className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Construction size={27} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          {title ?? "Student Service"}
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
          This module is part of the student portal. Its interface and
          functionality will be developed in the upcoming implementation
          stages.
        </p>
      </Card>
    </StudentLayout>
  );
}
