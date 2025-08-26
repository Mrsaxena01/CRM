import React, { useState } from "react";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faClockRotateLeft,
  faCheck,
  faTimes,
  faSpinner,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

function Leaves() {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "John Doe",
      type: "Sick Leave",
      startDate: "2025-08-26",
      endDate: "2025-08-27",
      days: 2,
      reason: "Medical appointment",
      status: "Pending"
    }
    // Add more sample data as needed
  ]);

  return (
    <Layout>
      <div className="space-y-6 bg-[#081b29]/40 p-6 rounded-xl backdrop-blur-sm border border-[#0ef]/10">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#0ef]">Leave Management</h2>
          <button className="bg-[#0ef] hover:bg-[#0ef]/80 text-[#081b29] px-6 py-2 rounded-lg 
            flex items-center gap-2 transition-all duration-300 font-semibold">
            <FontAwesomeIcon icon={faCalendarPlus} />
            Apply Leave
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#081b29]/60 p-4 rounded-xl border border-[#0ef]/20">
            <h3 className="text-2xl font-bold text-[#0ef]">12</h3>
            <p className="text-gray-400">Total Leaves</p>
          </div>
          <div className="bg-[#081b29]/60 p-4 rounded-xl border border-green-500/20">
            <h3 className="text-2xl font-bold text-green-400">8</h3>
            <p className="text-gray-400">Approved</p>
          </div>
          <div className="bg-[#081b29]/60 p-4 rounded-xl border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-yellow-400">2</h3>
            <p className="text-gray-400">Pending</p>
          </div>
          <div className="bg-[#081b29]/60 p-4 rounded-xl border border-red-500/20">
            <h3 className="text-2xl font-bold text-red-400">2</h3>
            <p className="text-gray-400">Rejected</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search leave requests..."
            className="w-full px-4 py-2 pl-10 bg-[#081b29]/80 border border-[#0ef]/20 
              rounded-lg text-white placeholder-gray-400 focus:outline-none 
              focus:border-[#0ef] transition-all duration-300"
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0ef]/50" 
          />
        </div>

        {/* Leave Requests Table */}
        <div className="overflow-x-auto rounded-lg border border-[#0ef]/20">
          <table className="w-full text-sm text-white">
            <thead className="bg-[#081b29] text-[#0ef]">
              <tr>
                <th className="px-4 py-4 text-left font-semibold">Employee</th>
                <th className="px-4 py-4 text-left font-semibold">Type</th>
                <th className="px-4 py-4 text-left font-semibold">Start Date</th>
                <th className="px-4 py-4 text-left font-semibold">End Date</th>
                <th className="px-4 py-4 text-left font-semibold">Days</th>
                <th className="px-4 py-4 text-left font-semibold">Reason</th>
                <th className="px-4 py-4 text-left font-semibold">Status</th>
                <th className="px-4 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0ef]/10">
              {leaveRequests.map((request) => (
                <tr 
                  key={request.id}
                  className="hover:bg-[#081b29]/60 transition-all duration-300"
                >
                  <td className="px-4 py-4">{request.employeeName}</td>
                  <td className="px-4 py-4">{request.type}</td>
                  <td className="px-4 py-4">{request.startDate}</td>
                  <td className="px-4 py-4">{request.endDate}</td>
                  <td className="px-4 py-4">{request.days}</td>
                  <td className="px-4 py-4">{request.reason}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${request.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                        request.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3">
                      <button className="p-1.5 hover:text-green-400 transition-all duration-300
                        hover:shadow-[0_0_10px_rgba(0,255,0,0.3)] rounded-md">
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button className="p-1.5 hover:text-red-400 transition-all duration-300
                        hover:shadow-[0_0_10px_rgba(255,0,0,0.3)] rounded-md">
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                      <button className="p-1.5 hover:text-[#0ef] transition-all duration-300
                        hover:shadow-[0_0_10px_rgba(0,238,255,0.3)] rounded-md">
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Leaves;