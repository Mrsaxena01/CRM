// src/context/AttendanceContext.jsx
import React, { createContext, useState } from "react";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  // ✅ Check-in function
  const checkIn = (employee) => {
    const newRecord = {
      id: attendanceData.length + 1,
      name: employee.name,
      date: new Date().toISOString().split("T")[0],
      checkIn: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      checkOut: "-",
      hours: "0h",
      status: "Present",
    };
    setAttendanceData([...attendanceData, newRecord]);
  };

  // ✅ Check-out function
  const checkOut = (employeeId) => {
    setAttendanceData((prev) =>
      prev.map((record) =>
        record.name === employeeId && record.checkOut === "-"
          ? {
              ...record,
              checkOut: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              hours: "8h", 
            }
          : record
      )
    );
  };

  return (
    <AttendanceContext.Provider value={{ attendanceData, checkIn, checkOut }}>
      {children}
    </AttendanceContext.Provider>
  );
};
