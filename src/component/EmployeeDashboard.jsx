import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClipboardList,
  faUser,
  faClock,
  faChartLine,
  faCalendarAlt,
  faBriefcase,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeNow, setTimeNow] = useState(new Date());
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  useEffect(() => {
    loadEmployeeData();
    loadTodayAttendance();
    
    // Update time every minute
    const timer = setInterval(() => {
      setTimeNow(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const loadEmployeeData = () => {
    // Simulate API call for employee data
    setTimeout(() => {
      setEmployee({
        id: "EMP001",
        name: "John Doe",
        role: "Software Developer",
        department: "Development",
        tasksToday: 5,
        tasksCompleted: 2,
        attendance: "90%",
        leaves: {
          total: 24,
          taken: 12,
          remaining: 12
        },
        currentMonth: {
          present: 18,
          absent: 2,
          late: 1
        }
      });
      setLoading(false);
    }, 1000);
  };

  const loadTodayAttendance = () => {
    const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = attendance.find(
      record => record.date === today && record.employeeId === 'EMP001'
    );

    if (todayRecord) {
      setCheckInTime(todayRecord.checkIn);
      setCheckOutTime(todayRecord.checkOut);
      
      // Add to activities if not already present
      const checkInActivity = {
        id: Date.now(),
        type: 'check-in',
        description: `Checked in at ${todayRecord.checkIn}`,
        timestamp: todayRecord.checkIn,
        status: todayRecord.status === 'Late' ? 'warning' : 'success'
      };
      
      if (todayRecord.checkOut) {
        const checkOutActivity = {
          id: Date.now() + 1,
          type: 'check-out',
          description: `Checked out at ${todayRecord.checkOut}`,
          timestamp: todayRecord.checkOut,
          status: 'success'
        };
        setActivities([checkOutActivity, checkInActivity]);
      } else {
        setActivities([checkInActivity]);
      }
    }
  };

  const handleCheckIn = () => {
    if (checkInTime) {
      alert('Already checked in for today!');
      return;
    }

    const now = new Date();
    const checkInTimeStr = now.toLocaleTimeString();
    const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    
    const newRecord = {
      id: `${employee.id}-${now.toISOString().split('T')[0]}`,
      employeeId: employee.id,
      name: employee.name,
      date: now.toISOString().split('T')[0],
      checkIn: checkInTimeStr,
      checkOut: '',
      hours: '0',
      status: now.getHours() >= 9 ? 'Late' : 'Present'
    };

    attendance.push(newRecord);
    localStorage.setItem('attendance', JSON.stringify(attendance));
    
    setCheckInTime(checkInTimeStr);
    
    // Add to activities
    const newActivity = {
      id: Date.now(),
      type: 'check-in',
      description: `Checked in at ${checkInTimeStr}`,
      timestamp: checkInTimeStr,
      status: now.getHours() >= 9 ? 'warning' : 'success'
    };
    
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleCheckOut = () => {
    if (!checkInTime) {
      alert('Please check in first!');
      return;
    }

    if (checkOutTime) {
      alert('Already checked out for today!');
      return;
    }

    const now = new Date();
    const checkOutTimeStr = now.toLocaleTimeString();
    
    // Update attendance record
    const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    const today = new Date().toISOString().split('T')[0];
    
    const updatedAttendance = attendance.map(record => {
      if (record.date === today && record.employeeId === employee.id) {
        const checkInDate = new Date(`${record.date} ${record.checkIn}`);
        const hours = ((now - checkInDate) / (1000 * 60 * 60)).toFixed(2);
        
        return {
          ...record,
          checkOut: checkOutTimeStr,
          hours: hours
        };
      }
      return record;
    });

    localStorage.setItem('attendance', JSON.stringify(updatedAttendance));
    setCheckOutTime(checkOutTimeStr);

    // Add to activities
    const newActivity = {
      id: Date.now(),
      type: 'check-out',
      description: `Checked out at ${checkOutTimeStr}`,
      timestamp: checkOutTimeStr,
      status: 'success'
    };

    setActivities(prev => [newActivity, ...prev]);
  };

  const StatCard = ({ title, value, icon, secondaryText }) => (
    <div className="bg-[#081b29]/60 p-6 rounded-xl border border-[#0ef]/20 hover:border-[#0ef]/40 transition-all">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-[#0ef]/10 text-[#0ef]`}>
          <FontAwesomeIcon icon={icon} className="text-xl" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-xl font-bold text-white mt-1">{value}</h3>
          {secondaryText && (
            <p className="text-[#0ef] text-xs mt-1">{secondaryText}</p>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center space-y-4">
            <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-[#0ef]" />
            <p className="text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 bg-[#081b29] p-6 rounded-xl backdrop-blur-sm border border-[#0ef]/10">
        {/* Welcome Section */}
        <div className="bg-[#081b29]/60 rounded-xl p-6 border border-[#0ef]/10">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, <span className="text-[#0ef]">{employee.name}</span>!
              </h1>
              <p className="text-gray-400 mt-1">
                {timeNow.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCheckIn}
                disabled={checkInTime}
                className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2
                  ${checkInTime 
                    ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed border-gray-500/30' 
                    : 'bg-[#0ef]/10 hover:bg-[#0ef]/20 text-[#0ef] border-[#0ef]/30 hover:border-[#0ef]/60'
                  } border`}
              >
                <FontAwesomeIcon icon={faCalendarCheck} />
                {checkInTime ? `Checked In: ${checkInTime}` : 'Check In'}
              </button>
              
              <button
                onClick={handleCheckOut}
                disabled={!checkInTime || checkOutTime}
                className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2
                  ${!checkInTime || checkOutTime
                    ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed border-gray-500/30'
                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30 hover:border-red-500/60'
                  } border`}
              >
                <FontAwesomeIcon icon={faClock} />
                {checkOutTime ? `Checked Out: ${checkOutTime}` : 'Check Out'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Tasks"
            value={`${employee.tasksCompleted}/${employee.tasksToday}`}
            icon={faClipboardList}
            secondaryText="Tasks Completed"
          />
          <StatCard
            title="Attendance Rate"
            value={employee.attendance}
            icon={faChartLine}
            secondaryText="This Month"
          />
          <StatCard
            title="Leave Balance"
            value={employee.leaves.remaining}
            icon={faCalendarAlt}
            secondaryText={`${employee.leaves.taken} leaves taken`}
          />
          <StatCard
            title="Department"
            value={employee.department}
            icon={faBriefcase}
            secondaryText={employee.role}
          />
        </div>

        {/* Activity Timeline */}
        <div className="bg-[#081b29]/60 rounded-xl p-6 border border-[#0ef]/10">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div 
                  key={activity.id}
                  className={`border-l-2 pl-4 py-2 transition-all
                    ${activity.status === 'warning' 
                      ? 'border-yellow-500/30 hover:border-yellow-500' 
                      : 'border-[#0ef]/30 hover:border-[#0ef]'}`}
                >
                  <p className="text-gray-300">{activity.description}</p>
                  <p className="text-sm text-[#0ef]/60 mt-1">{activity.timestamp}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No activities recorded today</p>
            )}
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="bg-[#081b29]/60 rounded-xl p-6 border border-[#0ef]/10">
          <h2 className="text-xl font-semibold text-white mb-6">Monthly Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#081b29]/40 p-4 rounded-lg border border-[#0ef]/20">
              <div className="text-2xl font-bold text-[#0ef]">{employee.currentMonth.present}</div>
              <div className="text-gray-400 text-sm">Days Present</div>
            </div>
            <div className="bg-[#081b29]/40 p-4 rounded-lg border border-red-500/20">
              <div className="text-2xl font-bold text-red-400">{employee.currentMonth.absent}</div>
              <div className="text-gray-400 text-sm">Days Absent</div>
            </div>
            <div className="bg-[#081b29]/40 p-4 rounded-lg border border-yellow-500/20">
              <div className="text-2xl font-bold text-yellow-400">{employee.currentMonth.late}</div>
              <div className="text-gray-400 text-sm">Late Arrivals</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}