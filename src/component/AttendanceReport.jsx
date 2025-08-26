import React, { useState, useEffect, useRef } from "react";
import Layout from "./Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFileExcel,
  faPrint,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    late: 0,
    leave: 0,
  });

const useDatePicker = () => {
  const ref = useRef(null);

  const openPicker = () => {
    if (ref.current) {
      ref.current.showPicker(); // 👈 Calendar force open karega
    }
  };

  return { ref, openPicker };
};

  useEffect(() => {
    loadAttendanceData();
    const interval = setInterval(loadAttendanceData, 3000); // real-time check
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, dateRange, statusFilter, attendanceData]);

  const loadAttendanceData = () => {
    const data = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendanceData(data);
    calculateStats(data);
  };

  const calculateStats = (data) => {
    const stats = { present: 0, absent: 0, late: 0, leave: 0 };
    data.forEach((record) => {
      const status = record.status?.toLowerCase();
      if (stats[status] !== undefined) stats[status]++;
    });
    setStats(stats);
  };

  const filterData = () => {
  let filtered = [...attendanceData];

  // Search filter
  if (searchTerm) {
    filtered = filtered.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Date range filter
  if (dateRange.startDate && dateRange.endDate) {
    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate >= new Date(dateRange.startDate) &&
        itemDate <= new Date(dateRange.endDate)
      );
    });
  }

  // Status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter(
      (item) => item.status.toLowerCase() === statusFilter
    );
  }

  // 🔥 Newest first sorting
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  setFilteredData(filtered);
};


  // ✅ Export CSV
  const exportCSV = () => {
    const headers = [
      "Employee ID",
      "Name",
      "Date",
      "Check-in",
      "Check-out",
      "Hours",
      "Status",
    ];
    const rows = filteredData.map((item) =>
      [item.id, item.name, item.date, item.checkIn, item.checkOut, item.hours, item.status]
        .map((field) => `"${field}"`)
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "attendance_report.csv";
    link.click();
  };

  // ✅ Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Attendance Report", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [
        ["Employee ID", "Name", "Date", "Check-in", "Check-out", "Hours", "Status"],
      ],
      body: filteredData.map((emp) => [
        emp.id,
        emp.name,
        emp.date,
        emp.checkIn,
        emp.checkOut,
        emp.hours,
        emp.status,
      ]),
      theme: "grid",
      headStyles: { fillColor: [8, 27, 41], textColor: [14, 239, 255] },
    });

    doc.save("attendance_report.pdf");
  };

  const printReport = () => window.print();

  const startDate = useDatePicker();
  const endDate = useDatePicker();

  return (
    <Layout>
      <div className="space-y-6 bg-[#081b29] p-6 rounded-xl border border-[#0ef]/10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#0ef]">Attendance Report</h2>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="bg-[#0ef]/20 hover:bg-[#0ef]/30 text-[#0ef] px-4 py-2 rounded-lg 
                flex items-center gap-2 border border-[#0ef]/20 transition"
            >
              <FontAwesomeIcon icon={faFileExcel} />
              CSV
            </button>
            <button
              onClick={exportPDF}
              className="bg-[#0ef]/20 hover:bg-[#0ef]/30 text-[#0ef] px-4 py-2 rounded-lg 
                flex items-center gap-2 border border-[#0ef]/20 transition"
            >
              <FontAwesomeIcon icon={faDownload} />
              PDF
            </button>
            <button
              onClick={printReport}
              className="bg-[#0ef]/20 hover:bg-[#0ef]/30 text-[#0ef] px-4 py-2 rounded-lg 
                flex items-center gap-2 border border-[#0ef]/20 transition"
            >
              <FontAwesomeIcon icon={faPrint} />
              Print
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-[#081b29]/80 border border-[#0ef]/20 
                rounded-lg text-white placeholder-gray-400 focus:border-[#0ef] transition"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0ef]/50"
            />
          </div>
          <input
          ref={startDate.ref}
            type="date"
            onClick={startDate.openPicker}
            value={dateRange.startDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, startDate: e.target.value })
            }
            
            className="px-4 py-2 bg-[#081b29]/80 border border-[#0ef]/20 rounded-lg text-white focus:border-[#0ef] transition"
          />
          <input
            ref={endDate.ref}
            type="date"
            value={dateRange.endDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, endDate: e.target.value })
            }
            onClick={endDate.openPicker}
            className="px-4 py-2 bg-[#081b29]/80 border border-[#0ef]/20 rounded-lg text-white focus:border-[#0ef] transition"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#081b29]/80 border border-[#0ef]/20 rounded-lg text-white focus:border-[#0ef] transition"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="leave">Leave</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#081b29]/60 p-4 rounded-xl border border-[#0ef]/20">
            <h3 className="text-2xl font-bold text-[#0ef]">{stats.present}</h3>
            <p className="text-gray-400">Present Today</p>
          </div>
          <div className="bg-[#081b29]/60 p-4 rounded-xl border border-red-500/20">
            <h3 className="text-2xl font-bold text-red-400">{stats.absent}</h3>
            <p className="text-gray-400">Absent</p>
          </div>
          <div className="bg-[#081b29]/60 p-4 rounded-xl border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-yellow-400">{stats.late}</h3>
            <p className="text-gray-400">Late</p>
          </div>
          <div className="bg-[#081b29]/60 p-4 rounded-xl border border-blue-500/20">
            <h3 className="text-2xl font-bold text-blue-400">{stats.leave}</h3>
            <p className="text-gray-400">On Leave</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-[#0ef]/20">
          <table className="w-full text-sm text-white">
            <thead className="bg-[#081b29] border-b border-[#0ef]/50 text-[#0ef]">
              <tr>
                {["Employee ID", "Name", "Date", "Check-in", "Check-out", "Hours", "Status"].map(
                  (col) => (
                    <th key={col} className="px-4 py-3 text-left font-semibold">
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0ef]/10">
              {filteredData.length > 0 ? (
                filteredData.map((emp) => (
                  <tr
                    key={`${emp.id}-${emp.date}`}
                    className="hover:bg-[#0ef]/5 transition"
                  >
                    <td className="px-4 py-3">{emp.id}</td>
                    <td className="px-4 py-3">{emp.name}</td>
                    <td className="px-4 py-3">{emp.date}</td>
                    <td className="px-4 py-3">{emp.checkIn}</td>
                    <td className="px-4 py-3">{emp.checkOut}</td>
                    <td className="px-4 py-3">{emp.hours}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                          ${
                            emp.status === "Present"
                              ? "bg-[#0ef]/10 text-[#0ef]"
                              : emp.status === "Absent"
                              ? "bg-red-500/10 text-red-400"
                              : emp.status === "Late"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-blue-500/10 text-blue-400"
                          }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    No records found 🚫
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceReport;
