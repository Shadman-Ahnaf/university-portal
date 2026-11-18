
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/student/Dashboard";
import StudentModule from "./pages/student/StudentModule";
import ParticularInformation from "./pages/student/ParticularInformation";
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

        <Route
          path="/student/:module"
          element={<StudentModule />}
        />

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
