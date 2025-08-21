import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faProjectDiagram,
  faCalendarCheck,
  faClock,
  faTasks,
  faCalendarAlt,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";

// Card Component with dynamic colors
const StatCard = ({ title, value, icon, secondaryText, colorTheme = "primary" }) => {
  const getColorClasses = (theme) => {
    switch (theme) {
      case "success":
        return {
          bg: "bg-emerald-500",
          hoverBg: "hover:bg-emerald-400",
          shadow: "hover:shadow-emerald-500/40",
          border: "border-emerald-500",
          iconBg: "bg-white/20",
          hoverIconBg: "hover:bg-white/30",
          text: "text-white",
          iconText: "text-white"
        };
      case "warning":
        return {
          bg: "bg-amber-500",
          hoverBg: "hover:bg-amber-400",
          shadow: "hover:shadow-amber-500/40",
          border: "border-amber-500",
          iconBg: "bg-white/20",
          hoverIconBg: "hover:bg-white/30",
          text: "text-white",
          iconText: "text-white"
        };
      case "danger":
        return {
          bg: "bg-red-500",
          hoverBg: "hover:bg-red-400",
          shadow: "hover:shadow-red-500/40",
          border: "border-red-500",
          iconBg: "bg-white/20",
          hoverIconBg: "hover:bg-white/30",
          text: "text-white",
          iconText: "text-white"
        };
      case "info":
        return {
          bg: "bg-blue-500",
          hoverBg: "hover:bg-blue-400",
          shadow: "hover:shadow-blue-500/40",
          border: "border-blue-500",
          iconBg: "bg-white/20",
          hoverIconBg: "hover:bg-white/30",
          text: "text-white",
          iconText: "text-white"
        };
      case "purple":
        return {
          bg: "bg-purple-500",
          hoverBg: "hover:bg-purple-400",
          shadow: "hover:shadow-purple-500/40",
          border: "border-purple-500",
          iconBg: "bg-white/20",
          hoverIconBg: "hover:bg-white/30",
          text: "text-white",
          iconText: "text-white"
        };
      default: // primary
        return {
          bg: "bg-[#0ef]",
          hoverBg: "hover:bg-[#0ef]/90",
          shadow: "hover:shadow-[#0ef]/40",
          border: "border-[#0ef]",
          iconBg: "bg-[#081b29]/20",
          hoverIconBg: "hover:bg-[#081b29]/30",
          text: "text-[#081b29]",
          iconText: "text-[#081b29]"
        };
    }
  };

  const colors = getColorClasses(colorTheme);

  return (
    <div className={`${colors.bg} rounded-lg p-4 flex items-center gap-4 
      ${colors.hoverBg} hover:scale-105 hover:shadow-xl ${colors.shadow} 
      transition-all duration-300 ${colors.border} shadow-lg relative z-0`}>
      <div className={`p-3 rounded-full ${colors.iconBg} shrink-0 
        ${colors.hoverIconBg} transition-colors duration-300`}>
        <FontAwesomeIcon icon={icon} className={`${colors.iconText} text-lg 
          hover:animate-pulse hover:scale-110 transition-transform duration-300`} />
      </div>
      <div>
        <h3 className={`${colors.text} text-xs font-medium truncate opacity-90 
          hover:opacity-100 transition-opacity duration-300`}>{title}</h3>
        <p className={`text-xl font-bold ${colors.text} mt-1 
          hover:scale-110 transition-transform duration-300`}>{value || "0"}</p>
        {secondaryText && (
          <p className={`text-xs ${colors.text} opacity-75 mt-1 truncate 
            hover:opacity-90 transition-opacity duration-300`}>{secondaryText}</p>
        )}
      </div>
    </div>
  );
};

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Mock stats data
    setStats({
      userName: "Sonu",
      totalProjects: 12,
      activeProjects: 5,
      totalEmployees: 20,
      presentToday: 18,
      completedTasks: 40,
      ongoingTasks: 8,
      pendingLeaves: 3,
      thisMonthLeaves: 6,
      lateToday: 2,
    });

    // Mock activities
    setActivities([
      { id: 1, description: "New project created", timestamp: "10:30 AM" },
      { id: 2, description: "2 employees marked present", timestamp: "11:00 AM" },
      { id: 3, description: "Task completed by John", timestamp: "12:15 PM" },
    ]);
  }, []);

  if (!stats) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020d18] via-[#061626] to-[#081b29]">
          <p className="text-white text-lg animate-pulse">Loading Dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Fixed positioning - navbar के पीछे रहने के लिए */}
      <div className="min-h-screen bg-gradient-to-br from-[#020d18] via-[#061626] to-[#081b29] p-10 pt-15 rounded-lg relative z-10">
        {/* pt-24 navbar के लिए proper space, z-index remove किया */}
        
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/5 shadow-md">
            <h2 className="text-xl font-semibold text-white">
              Welcome back, {stats.userName}!
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              Here's your business overview for today.
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Projects"
              value={stats.totalProjects}
              icon={faProjectDiagram}
              secondaryText={`${stats.activeProjects} active`}
              colorTheme="primary"
            />
            <StatCard
              title="Team Members"
              value={stats.totalEmployees}
              icon={faUsers}
              secondaryText={`${stats.presentToday} present`}
              colorTheme="success"
            />
            <StatCard
              title="Tasks"
              value={stats.completedTasks}
              icon={faTasks}
              secondaryText={`${stats.ongoingTasks} ongoing`}
              colorTheme="info"
            />
            <StatCard
              title="Leaves"
              value={stats.pendingLeaves}
              icon={faCalendarAlt}
              secondaryText={`${stats.thisMonthLeaves} this month`}
              colorTheme="warning"
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Attendance Today"
              value={`${stats.presentToday}/${stats.totalEmployees}`}
              icon={faCalendarCheck}
              colorTheme="success"
            />
            <StatCard 
              title="Late Arrivals" 
              value={stats.lateToday} 
              icon={faUserClock}
              colorTheme="danger"
            />
            <StatCard
              title="Pending Approvals"
              value={stats.pendingLeaves}
              icon={faClock}
              colorTheme="purple"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/5 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border-l-2 border-[#0ef]/30 pl-4 py-2 hover:border-[#0ef] transition-colors"
                  >
                    <p className="text-sm text-gray-200">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No recent activities
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;