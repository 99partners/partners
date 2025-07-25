import React from "react";
import "../styles/main.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Blog Management', path: '/admin/blogs' },
    { label: 'Partnership Applications', path: '/admin/partners' },
    { label: 'User Management', path: '/admin/users' },
    { label: 'Contact Management', path: '/admin/contacts' },
  ];

  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">99 Partners</h1>

      <div className="sidebar-section">
        <h2>MAIN MENU</h2>
        <ul>
          <li
            className={activeTab === "Dashboard" ? "active" : ""}
            onClick={() => setActiveTab("Dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeTab === "Users" ? "active" : ""}
            onClick={() => setActiveTab("Users")}
          >
            Users
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h2>CONTENT MANAGEMENT</h2>
        <ul>
          <li
            className={activeTab === "Blog" ? "active" : ""}
            onClick={() => setActiveTab("Blog")}
          >
            Blog
          </li>
          <li
            className={activeTab === "Contact" ? "active" : ""}
            onClick={() => setActiveTab("Contact")}
          >
            Contact
          </li>
          <li
            className={activeTab === "Partner" ? "active" : ""}
            onClick={() => setActiveTab("Partner")}
          >
            Partner
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
