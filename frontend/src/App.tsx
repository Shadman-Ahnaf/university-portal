
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/student/Dashboard";
import StudentModule from "./pages/student/StudentModule";
import ParticularInformation from "./pages/student/ParticularInformation";
import SemesterResults from "./pages/student/SemesterResults";
import ClassRoutine from "./pages/student/ClassRoutine";
import ExamRoutine from "./pages/student/ExamRoutine";
import BusSchedule from "./pages/student/BusSchedule";
import CompletedCourses from "./pages/student/CompletedCourses";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login role="student" />} />

        <Route
          path="/admin-login"
          element={<Login role="admin" />}
        />

        <Route
          path="/student/dashboard"
          element={<Dashboard />}
        />
        <Route path="/student/results" element={<SemesterResults />} />

        <Route
          path="/student/:module"
          element={<StudentModule />}
        />
        <Route path="/student/class-routine" element={<ClassRoutine />} />
<Route path="/student/exam-routine" element={<ExamRoutine />} />
<Route path="/student/bus-schedule" element={<BusSchedule />} />
<Route path="/student/completed-courses" element={<CompletedCourses />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
        <Route
  path="/student/particular-information"
  element={<ParticularInformation />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
