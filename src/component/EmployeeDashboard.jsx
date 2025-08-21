import React from "react";

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#081b29] p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0ef]">Employee Dashboard</h1>
        <button className="bg-[#0ef] text-[#081b29] px-4 py-2 rounded-lg hover:bg-white transition">
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <section className="mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Welcome, Employee!</h2>
          <p className="text-gray-700">Here’s what’s happening today:</p>
        </div>
      </section>

      {/* Dashboard Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Attendance */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-gray-600">Check-in: 9:00 AM</p>
          <p className="text-gray-600">Check-out: 6:00 PM</p>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Today's Tasks</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Update client records</li>
            <li>Submit weekly report</li>
            <li>Attend team meeting at 3 PM</li>
          </ul>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
          <p className="text-gray-700">Name: John Doe</p>
          <p className="text-gray-700">Role: Employee</p>
          <p className="text-gray-700">Department: Sales</p>
        </div>
      </section>
    </div>
  );
}