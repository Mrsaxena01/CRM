import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000]">
      <img src="../public/BIREENA-INFO-TECH.jpg" alt="" className="w-70" />

       <a  href="/" className="text-2xl p-8 text-white"> <span className="text-[#0ef]">BIREENA</span>  OFFICE MANAGEMENT</a>

      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md">
       

        <h2 className="text-3l font-bold text-center text-[#0ef] mb-6">
          Sign in to start your session
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-[#0ef] mb-2">Email/Phone</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email/Phone"
              required
              className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-[#0ef]"
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
              className="w-full px-4 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-[#0ef]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-[#0ef] text-[#081b29] font-semibold hover:bg-white transition-all mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
