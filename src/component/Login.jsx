import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Owner");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRedirect(true);
  };

  const getDashboardRoute = () => {
    switch (role) {
      case "Owner":
        return "/OwnerDashboard";
      case "HR":
        return "/HRDashboard";
      case "Employee":
        return "/EmployeeDashboard";
      default:
        return "/";
    }
  };

  if (redirect) {
    return <Navigate to={getDashboardRoute()} state={{ email, role }} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000] px-4 py-8">
      <img src="../public/BIREENA-INFO-TECH.jpg" alt="" className="w-48" />
      <a href="/" className="text-xl p-6 text-white text-center">
        <span className="text-[#0ef]">BIREENA</span> OFFICE MANAGEMENT
      </a>

      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md">
        <h2 className="text-2l font-bold text-center text-[#0ef] mb-6">
          Sign in to start your session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Modern Role Toggle */}
          <div>
            <label className="block text-[#0ef] mb-2">Login as</label>
            <div className="flex justify-between bg-white rounded-full p-1">
              {["Owner", "HR", "Employee"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                    role === r
                      ? "bg-[#0ef] text-[#081b29]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[#0ef] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-[#0ef]"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#0ef] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-[#0ef]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-[#0ef] text-[#081b29] font-semibold hover:bg-white transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}