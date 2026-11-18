
import { Mail, Phone, MapPin, CalendarDays } from "lucide-react";
import StudentLayout from "../../layouts/StudentLayout";

const student = {
  name: "Shadman Ahnaf",
  studentId: "23103012",
  program: "B.Sc. in Computer Science and Engineering",
  contact: "+880 1712-345678",
  cgpa: "3.72",
  semester: "Fall 2026",
  guardianCell: "+880 1812-345678",
  email: "shadman.ahnaf@example.com",
  address: "Uttara, Dhaka, Bangladesh",
  dateOfBirth: "15 March 2002",
  admissionSemester: "Spring 2023",
};

const details = [
  { label: "Student ID", value: student.studentId },
  { label: "Program", value: student.program },
  { label: "Contact Number", value: student.contact, icon: Phone },
  {
    label: "CGPA",
    value: `${student.cgpa} (${student.semester})`,
  },
  { label: "Guardian Cell", value: student.guardianCell, icon: Phone },
  { label: "Email Address", value: student.email, icon: Mail },
  { label: "Date of Birth", value: student.dateOfBirth, icon: CalendarDays },
  { label: "Admission Semester", value: student.admissionSemester },
  { label: "Present Address", value: student.address, icon: MapPin },
];

export default function ParticularInformation() {
  return (
    <StudentLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <p className="text-sm font-medium text-blue-700">
            Student Profile
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Particular Information
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Your personal and academic information.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-6 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-8">
            <img
              src="https://i.pravatar.cc/300?img=12"
              alt="Student portrait"
              className="h-32 w-28 shrink-0 rounded-xl border border-slate-200 object-cover"
            />

            <div className="min-w-0">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                {student.name}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                {student.program}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  Student
                </span>
                <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                  ID: {student.studentId}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {details.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`min-w-0 border-b border-slate-100 px-5 py-5 sm:px-8 ${
                    index % 2 === 0 ? "sm:border-r" : ""
                  } ${
                    index === details.length - 1
                      ? "sm:col-span-2 sm:border-r-0"
                      : ""
                  }`}
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>

                  <div className="mt-2 flex min-w-0 items-start gap-2">
                    {Icon && (
                      <Icon
                        size={17}
                        className="mt-0.5 shrink-0 text-blue-700"
                        strokeWidth={1.8}
                      />
                    )}
                    <p className="break-words text-sm font-semibold leading-6 text-slate-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 px-5 py-3 sm:px-8">
            <p className="text-xs text-slate-500">
              Information displayed here is maintained by the university administration.
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
