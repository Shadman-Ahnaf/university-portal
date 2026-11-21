
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CourseRegistrationCompletedCourses from "./pages/course-registration/CompletedCourses";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/student/Dashboard";
import StudentModule from "./pages/student/StudentModule";
import ParticularInformation from "./pages/student/ParticularInformation";
import SemesterResults from "./pages/student/SemesterResults";
import ClassRoutine from "./pages/student/ClassRoutine";
import ExamRoutine from "./pages/student/ExamRoutine";
import BusSchedule from "./pages/student/BusSchedule";
import CompletedCourses from "./pages/student/CompletedCourses";
import CISForm from "./pages/student/CISForm";
import FacultyLists from "./pages/course-registration/FacultyLists";
import CourseSchedule from "./pages/course-registration/CourseSchedule";
import CourseRegistrationLayout from "./layouts/CourseRegistrationLayout";
import CourseEnrollment from "./pages/course-registration/CourseEnrollment";
import EnrolledCourses from "./pages/course-registration/EnrolledCourses";

import PaymentLayout from "./layouts/PaymentLayout";
import PaymentHome from "./pages/payment/PaymentHome";
import Transactions from "./pages/payment/Transactions";
import OtherFeeTransactions from "./pages/payment/OtherFeeTransactions";









import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students/Students";
import AddStudent from "./pages/admin/Students/AddStudent";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login role="student" />} />
        <Route path="/admin-login" element={<Login role="admin" />} />
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
</Route>
        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route
          path="/student/particular-information"
          element={<ParticularInformation />}
        />
        <Route path="/student/results" element={<SemesterResults />} />
        <Route path="/student/cis" element={<SemesterResults />} />
        <Route
          path="/student/cis/:courseCode/:section"
          element={<CISForm />}
        />

        <Route path="/student/class-routine" element={<ClassRoutine />} />
        <Route path="/student/exam-routine" element={<ExamRoutine />} />
        <Route path="/student/bus-schedule" element={<BusSchedule />} />
        <Route
          path="/student/completed-courses"
          element={<CompletedCourses />}
        />
        <Route
  path="/student/course-registration"
  element={<CourseRegistrationLayout />}
>
  <Route index element={<CourseEnrollment />} />
  <Route path="enrolled-courses" element={<EnrolledCourses />} />
  <Route
    path="completed-courses"
    element={<CourseRegistrationCompletedCourses />}
  />
  <Route path="faculty-lists" element={<FacultyLists />} />
  <Route path="schedule" element={<CourseSchedule />} />
</Route>

        <Route path="/student/payment" element={<PaymentLayout />}>
          <Route index element={<PaymentHome />} />
          <Route path="transactions" element={<Transactions />} />
          <Route
            path="other-fee-transactions"
            element={<OtherFeeTransactions />}
          />
        </Route>
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="students" element={<Students />} />
</Route>
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="students" element={<Students />} />
  <Route path="students/add" element={<AddStudent />} />
</Route>
        <Route path="/student/:module" element={<StudentModule />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
