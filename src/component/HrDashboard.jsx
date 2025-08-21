import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import StatCard from "./StatCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserCheck,
  faCalendarTimes,
  faClipboardList,
  faUserClock,
  faFileSignature,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";

function HRDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setStats({
      hrName: "Sonu",
      totalEmployees: 120,
      newHires: 5,
      leavesToday: 8,
      pendingApprovals: 4,
      interviewsScheduled: 3,
      trainingsOngoing: 2,
      resignationsThisMonth: 1,
      complianceTasks: 6,
    });

    setActivities([
      { id: 1, description: "3 leave requests submitted", timestamp: "9:45 AM" },
      { id: 2, description: "Interview scheduled with candidate A", timestamp: "10:30 AM" },
      { id: 3, description: "Training session started", timestamp: "11:15 AM" },
    ]);
  }, []);

  if (!stats) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020d18] via-[#061626] to-[#081b29]">
          <p className="text-white text-lg animate-pulse">Loading HR Dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#020d18] via-[#061626] to-[#081b29] p-10 rounded-lg relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/5 shadow-md">
            <h2 className="text-xl font-semibold text-white">
              Welcome back, {stats.hrName}!
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              Here's your HR overview for today.
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Employees" value={stats.totalEmployees} icon={faUsersCog} secondaryText={`${stats.newHires} new hires`} colorTheme="success" />
            <StatCard title="Leaves Today" value={stats.leavesToday} icon={faCalendarTimes} secondaryText="Pending approvals" colorTheme="warning" />
            <StatCard title="Interviews Scheduled" value={stats.interviewsScheduled} icon={faUserPlus} secondaryText="Today" colorTheme="info" />
            <StatCard title="Trainings Ongoing" value={stats.trainingsOngoing} icon={faClipboardList} secondaryText="Active sessions" colorTheme="purple" />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Pending Approvals" value={stats.pendingApprovals} icon={faFileSignature} colorTheme="danger" />
            <StatCard title="Resignations This Month" value={stats.resignationsThisMonth} icon={faUserClock} colorTheme="warning" />
            <StatCard title="Compliance Tasks" value={stats.complianceTasks} icon={faUserCheck} colorTheme="info" />
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/5 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">Recent HR Activity</h3>
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <div key={activity.id} className="border-l-2 border-[#0ef]/30 pl-4 py-2 hover:border-[#0ef] transition-colors">
                    <p className="text-sm text-gray-200">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">No recent HR activities</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HRDashboard;