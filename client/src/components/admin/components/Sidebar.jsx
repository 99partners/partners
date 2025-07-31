// import React from "react";
// import "../styles/main.css";

// const Sidebar = ({ activeTab, setActiveTab }) => {
//   return (
//     <aside className="sidebar">
//       <h1 className="sidebar-title">99 Partners</h1>

//       <div className="sidebar-section">
//         <h2>MAIN MENU</h2>
//         <ul>
//           <li
//             className={activeTab === "Dashboard" ? "active" : ""}
//             onClick={() => setActiveTab("Dashboard")}
//           >
//             Dashboard
//           </li>
//           <li
//             className={activeTab === "Users" ? "active" : ""}
//             onClick={() => setActiveTab("Users")}
//           >
//             Users
//           </li>
//         </ul>
//       </div>

//       <div className="sidebar-section">
//         <h2>CONTENT MANAGEMENT</h2>
//         <ul>
//           <li
//             className={activeTab === "Blog" ? "active" : ""}
//             onClick={() => setActiveTab("Blog")}
//           >
//             Blog
//           </li>
//           <li
//             className={activeTab === "Contact" ? "active" : ""}
//             onClick={() => setActiveTab("Contact")}
//           >
//             Contact
//           </li>
//           <li
//             className={activeTab === "Partner" ? "active" : ""}
//             onClick={() => setActiveTab("Partner")}
//           >
//             Partner
//           </li>
//         </ul>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/main.css";
import {
  FaTachometerAlt,
  FaUsers,
  FaBlog,
  FaEnvelope,
  FaHandshake,
  FaSignOutAlt
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <img src="/logo.png" alt="99 Partners Logo" className="sidebar-logo" />
        <h1 className="sidebar-title">99 Partners</h1>
      </div>
      
      <div className="sidebar-sections">
        {/* MAIN MENU SECTION */}
        <div className="sidebar-section">
          <h2 className="sidebar-section-title">MAIN MENU</h2>
          <ul>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
                end
              >
                <FaTachometerAlt className="sidebar-link-icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <FaUsers className="sidebar-link-icon" />
                <span>Users</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CONTENT MANAGEMENT SECTION */}
        <div className="sidebar-section">
          <h2 className="sidebar-section-title">CONTENT MANAGEMENT</h2>
          <ul>
            <li>
              <NavLink
                to="/admin/blogs"
                className={({ isActive }) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <FaBlog className="sidebar-link-icon" />
                <span>Blog</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/contacts"
                className={({ isActive }) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <FaEnvelope className="sidebar-link-icon" />
                <span>Contact</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/partners"
                className={({ isActive }) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <FaHandshake className="sidebar-link-icon" />
                <span>Partner</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;