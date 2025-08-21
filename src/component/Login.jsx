import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000] px-4 sm:px-6 py-8">
      <img 
        src="../public/BIREENA-INFO-TECH.jpg" 
        alt="" 
        className="w-48 sm:w-56 md:w-70" 
      />

      <a href="/" className="text-lg sm:text-xl md:text-2xl p-4 sm:p-6 md:p-8 text-white text-center">
        <span className="text-[#0ef]">BIREENA</span> OFFICE MANAGEMENT
      </a>

      <div className="w-full max-w-[90%] sm:max-w-[400px] md:max-w-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md">
        <h2 className="text-2l sm:text-2l font-bold text-center text-[#0ef] mb-4 sm:mb-6">
          Sign in to start your session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-[#0ef] mb-2 text-sm sm:text-base">
              Email/Phone
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email/Phone"
              required
              className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white text-black text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#0ef]"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#0ef] mb-2 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white text-black text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#0ef]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-[#0ef] text-[#081b29] font-semibold hover:bg-white transition-all mt-2 sm:mt-3 text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}