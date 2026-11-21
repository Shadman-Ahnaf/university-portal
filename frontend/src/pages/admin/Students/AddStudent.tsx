
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  GraduationCap,
  LockKeyhole,
  Save,
} from "lucide-react";

type FormData = {
  studentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  presentAddress: string;
  permanentAddress: string;
  department: string;
  program: string;
  admissionDate: string;
  admissionTerm: string;
  level: string;
  semester: string;
  username: string;
  password: string;
  status: string;
};

const initialForm: FormData = {
  studentId: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  presentAddress: "",
  permanentAddress: "",
  department: "",
  program: "",
  admissionDate: "",
  admissionTerm: "",
  level: "",
  semester: "",
  username: "",
  password: "",
  status: "Active",
};

function FormSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div className="rounded-lg bg-[#167D8D]/10 p-2.5 text-[#167D8D]">
          <Icon size={19} aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-semibold text-[#102E46]">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-slate-500">{description}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  children,
}: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}) {
  const id = `student-${name}`;

  return (
    <div className="min-w-0 space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="ml-1 text-red-600" aria-hidden="true">*</span>}
      </label>

      {children ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          required={required}
          className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/15"
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          required={required}
          placeholder={placeholder}
          autoComplete="off"
          className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/15"
        />
      )}
    </div>
  );
}

export default function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [success, setSuccess] = useState(false);

  const updateField = (name: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Demo only: no database or permanent storage is connected yet.
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => navigate("/admin/students");

  return (
    <div className="mx-auto max-w-[1100px] space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Link
          to="/admin/students"
          className="inline-flex min-h-9 items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#167D8D] focus:outline-none focus:ring-2 focus:ring-[#167D8D] rounded"
        >
          <ArrowLeft size={17} />
          Back to Students
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-[#102E46]">
            Add Student
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create a new student record and account
          </p>
        </div>
      </div>

      {success && (
        <div
          role="status"
          className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-semibold text-emerald-800">
              Form submitted successfully
            </p>
            <p className="mt-1 text-sm text-emerald-700">
              This is a frontend demo. The student has not been saved to a database.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="min-h-10 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
          >
            Back to Students
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Personal information */}
        <FormSection
          title="Personal Information"
          description="Student's basic identity and contact details"
          icon={UserRound}
        >
          <Field
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={updateField}
            placeholder="Enter first name"
            required
          />

          <Field
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={updateField}
            placeholder="Enter last name"
            required
          />

          <Field
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={updateField}
            required
          />

          <Field
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={updateField}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </Field>

          <Field
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={updateField}
            placeholder="+8801XXXXXXXXX"
            required
          />

          <Field
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="student@example.com"
            required
          />

          <div className="sm:col-span-2">
            <Field
              label="Present Address"
              name="presentAddress"
              value={form.presentAddress}
              onChange={updateField}
              placeholder="Enter present address"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Field
              label="Permanent Address"
              name="permanentAddress"
              value={form.permanentAddress}
              onChange={updateField}
              placeholder="Enter permanent address"
            />
          </div>
        </FormSection>

        {/* Academic information */}
        <FormSection
          title="Academic Information"
          description="Admission and academic placement"
          icon={GraduationCap}
        >
          <Field
            label="Student ID"
            name="studentId"
            value={form.studentId}
            onChange={updateField}
            placeholder="e.g. 26103001"
            required
          />

          <Field
            label="Department"
            name="department"
            value={form.department}
            onChange={updateField}
            required
          >
            <option value="">Select department</option>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="EEE">Electrical & Electronic Engineering</option>
            <option value="Civil">Civil Engineering</option>
            <option value="BBA">Business Administration</option>
          </Field>

          <Field
            label="Program"
            name="program"
            value={form.program}
            onChange={updateField}
            required
          >
            <option value="">Select program</option>
            <option value="BSc in CSE">BSc in CSE</option>
            <option value="BSc in EEE">BSc in EEE</option>
            <option value="BSc in Civil Engineering">BSc in Civil Engineering</option>
            <option value="BBA">BBA</option>
          </Field>

          <Field
            label="Admission Date"
            name="admissionDate"
            type="date"
            value={form.admissionDate}
            onChange={updateField}
            required
          />

          <Field
            label="Admission Term"
            name="admissionTerm"
            value={form.admissionTerm}
            onChange={updateField}
            required
          >
            <option value="">Select admission term</option>
            <option value="Spring 2026">Spring 2026</option>
            <option value="Summer 2026">Summer 2026</option>
            <option value="Fall 2026">Fall 2026</option>
            <option value="Spring 2027">Spring 2027</option>
          </Field>

          <Field
            label="Current Level"
            name="level"
            value={form.level}
            onChange={updateField}
            required
          >
            <option value="">Select level</option>
            {[1, 2, 3, 4].map((level) => (
              <option key={level} value={String(level)}>
                Level {level}
              </option>
            ))}
          </Field>

          <Field
            label="Current Semester"
            name="semester"
            value={form.semester}
            onChange={updateField}
            required
          >
            <option value="">Select semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
              <option key={semester} value={String(semester)}>
                Semester {semester}
              </option>
            ))}
          </Field>
        </FormSection>

        {/* Account information */}
        <FormSection
          title="Account Information"
          description="Login credentials for the student portal"
          icon={LockKeyhole}
        >
          <Field
            label="Username"
            name="username"
            value={form.username}
            onChange={updateField}
            placeholder="Enter login username"
            required
          />

          <Field
            label="Temporary Password"
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            placeholder="Set temporary password"
            required
          />

          <Field
            label="Account Status"
            name="status"
            value={form.status}
            onChange={updateField}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Field>
        </FormSection>

        {/* Actions */}
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-5 sm:flex-row">
          <button
            type="button"
            onClick={handleCancel}
            className="min-h-11 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#167D8D] focus:ring-offset-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#167D8D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#126875] focus:outline-none focus:ring-2 focus:ring-[#167D8D] focus:ring-offset-2"
          >
            <Save size={17} />
            Create Student
          </button>
        </div>
      </form>
    </div>
  );
}
