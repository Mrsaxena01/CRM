import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';

// Components
import Navbar from './component/Navbar';
import Slider from './component/Slider';
import Footer from './component/Footer';

// Pages
import Login from './component/Login';
import OwnerDashboard from './component/OwnerDashboard';
import Users from './component/Users';
import Setting from './component/Setting';
import Project from './component/Project';
import Leaves from './component/Leaves';
import AttendanceReport from './component/AttendanceReport';
import AttendanceSummary from './component/AttendanceSummary';
import NotFound from './component/NotFound';
import HRDashboard from './component/HrDashboard';
import EmployeeDashboard from './component/EmployeeDashboard';

// Protected Route Wrapper
const ProtectedRoute = () => {
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Main Layout (with Sidebar, Navbar and Footer)
const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Slider />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 mt-10 mb-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

// Auth Layout (for Login and NotFound pages)
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/ownerdashboard" element={<OwnerDashboard />} />
              <Route path="/hrdashboard" element={<HRDashboard />} />
              <Route path="/employeedashboard" element={<EmployeeDashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/project" element={<Project />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/attendanceReport" element={<AttendanceReport />} />
              <Route path="/attendanceSummary" element={<AttendanceSummary />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route element={<AuthLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;