import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubscribers: 0,
    totalBlogs: 0,
    totalPartners: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://api.99partners.in/api/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="content-section">
      <h2>Dashboard</h2>
      <p>Welcome back! Here's the latest data from your admin panel.</p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="stat-card">
          <h3>Total Subscribers</h3>
          <p>{stats.totalSubscribers}</p>
        </div>

        <div className="stat-card">
          <h3>Total Blogs</h3>
          <p>{stats.totalBlogs}</p>
        </div>

        <div className="stat-card">
          <h3>Total Partners</h3>
          <p>{stats.totalPartners}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
