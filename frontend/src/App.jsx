import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorSignup from "./pages/DoctorSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import LoginDashboard from "./pages/LoginDashboard";
import ErrorPage from "./pages/Error";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Doctor Routes */}
        <Route path="/doctorLogin" element={<DoctorLogin />} />
        <Route path="/doctorSignup" element={<DoctorSignup />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />

        {/* User Routes */}
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/patientDashboard" element={<PatientDashboard />} />

        {/* Login Dashboard */}
        <Route path="/loginDashboard" element={<LoginDashboard />} />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </>
  );
};
export default App;
