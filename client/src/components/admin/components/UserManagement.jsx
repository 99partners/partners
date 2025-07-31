// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/main.css"; 

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [showSubscribedOnly, setShowSubscribedOnly] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const [usersRes, newsletterRes] = await Promise.all([
//           axios.get("https://api.99partners.in/api/users"),
//           axios.get("https://api.99partners.in/api/newsletter")
//         ]);

//         const usersList = usersRes.data;
//         const newsletterList = newsletterRes.data;

//         const combinedUsers = [...usersList];

//         newsletterList.forEach((n) => {
//           const alreadyExists = usersList.some((u) => u.email === n.email);
//           if (!alreadyExists) {
//             combinedUsers.push({
//               displayName: "(Guest Subscriber)",
//               email: n.email,
//               newsletter: "subscribed"
//             });
//           }
//         });

//         const merged = combinedUsers.map((user) => {
//           const isSubscribed = newsletterList.some((n) => n.email === user.email);
//           return {
//             ...user,
//             newsletter: isSubscribed ? "subscribed" : "unsubscribed"
//           };
//         });

//         setUsers(merged);
//       } catch (err) {
//         console.error("Failed to fetch data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   const filteredUsers = showSubscribedOnly
//     ? users.filter((user) => user.newsletter === "subscribed")
//     : users;

//   if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

//   return (
//     <div className="content-section" style={{ padding: "20px" }}>
//       <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>User Management</h2>
//       <p>Manage your application users and newsletter subscriptions.</p>

//       <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
//         <label style={{ marginRight: "10px" }}>
//           <input
//             type="checkbox"
//             checked={showSubscribedOnly}
//             onChange={() => setShowSubscribedOnly(!showSubscribedOnly)}
//           />
//           {" "}Show only newsletter subscribers
//         </label>
//       </div>

//       <table
//         className="data-table"
//         border="1"
//         cellPadding="10"
//         style={{ width: "100%", borderCollapse: "collapse" }}
//       >
//         <thead style={{ backgroundColor: "#f5f5f5" }}>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Newsletter</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user, index) => (
//               <tr key={index}>
//                 <td>{user.displayName || "N/A"}</td>
//                 <td>{user.email}</td>
//                 <td
//                   style={{
//                     color:
//                       user.newsletter === "subscribed" ? "green" : "#888",
//                     fontWeight:
//                       user.newsletter === "subscribed" ? "bold" : "normal"
//                   }}
//                 >
//                   {user.newsletter === "subscribed" ? "Subscribed ✅" : "-"}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">No users found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiCheck, FiX } from "react-icons/fi";
import "../styles/main.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [usersRes, newsletterRes] = await Promise.all([
          axios.get("https://api.99partners.in/api/users"),
          axios.get("https://api.99partners.in/api/newsletter")
        ]);

        const usersList = usersRes.data;
        const newsletterList = newsletterRes.data;

        // Regular users (from users endpoint)
        const regularUsers = usersList.map(user => ({
          ...user,
          type: "user",
          subscribed: newsletterList.some(n => n.email === user.email)
        }));

        // Subscribers who aren't regular users
        const guestSubscribers = newsletterList
          .filter(n => !usersList.some(u => u.email === n.email))
          .map(subscriber => ({
            displayName: "Guest Subscriber",
            email: subscriber.email,
            type: "subscriber",
            subscribed: true
          }));

        setUsers(regularUsers);
        setSubscribers(guestSubscribers);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="user-management-container">
      <div className="header-section">
        <h2><FiUser className="icon" /> User Management</h2>
        <p>Manage your application users and newsletter subscriptions</p>
      </div>

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <FiUser /> Registered Users ({users.length})
        </button>
        <button
          className={`tab-button ${activeTab === "subscribers" ? "active" : ""}`}
          onClick={() => setActiveTab("subscribers")}
        >
          <FiMail /> Newsletter Subscribers ({subscribers.length + users.filter(u => u.subscribed).length})
        </button>
      </div>

      {activeTab === "users" ? (
        <div className="table-container">
          <h3><FiUser /> Registered Users</h3>
          {users.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subscription Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={`user-${index}`}>
                    <td>{user.displayName || "N/A"}</td>
                    <td>{user.email}</td>
                    <td className={user.subscribed ? "subscribed" : "unsubscribed"}>
                      {user.subscribed ? (
                        <><FiCheck /> Subscribed</>
                      ) : (
                        <><FiX /> Not Subscribed</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p>No registered users found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="table-container">
          <h3><FiMail /> Newsletter Subscribers</h3>
          <div className="subscription-stats">
            <div className="stat-card">
              <h4>Total Subscribers</h4>
              <p>{subscribers.length + users.filter(u => u.subscribed).length}</p>
            </div>
            <div className="stat-card">
              <h4>Registered Users</h4>
              <p>{users.filter(u => u.subscribed).length}</p>
            </div>
            <div className="stat-card">
              <h4>Guest Subscribers</h4>
              <p>{subscribers.length}</p>
            </div>
          </div>

          <h4>Registered User Subscribers</h4>
          {users.filter(u => u.subscribed).length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => u.subscribed).map((user, index) => (
                  <tr key={`sub-user-${index}`}>
                    <td>{user.displayName || "N/A"}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p>No registered users are subscribed</p>
            </div>
          )}

          <h4>Guest Subscribers</h4>
          {subscribers.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr key={`sub-${index}`}>
                    <td>{subscriber.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p>No guest subscribers found</p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .user-management-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header-section {
          margin-bottom: 2rem;
        }

        .header-section h2 {
          font-size: 1.8rem;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .header-section p {
          color: #7f8c8d;
          font-size: 1rem;
        }

        .icon {
          vertical-align: middle;
        }

        .tab-container {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
        }

        .tab-button {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .tab-button:hover {
          color: #3b82f6;
        }

        .tab-button.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }

        .table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .table-container h3 {
          font-size: 1.25rem;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .table-container h4 {
          font-size: 1.1rem;
          color: #374151;
          margin: 1.5rem 0 1rem 0;
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
        }

        .user-table th {
          background-color: #f9fafb;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
        }

        .user-table td {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: middle;
        }

        .user-table tr:hover {
          background-color: #f9fafb;
        }

        .subscribed {
          color: #10b981;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .unsubscribed {
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .subscription-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          text-align: center;
        }

        .stat-card h4 {
          font-size: 1.3rem;
          color: #687286ff;
        }

        .stat-card p {
          font-size: 1.5rem;
          font-weight: 600;
          color: #000;
          margin: 0;
        }

        .empty-state {
          padding: 2rem;
          text-align: center;
          color: #6b7280;
          background: #f9fafb;
          border-radius: 8px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          gap: 1rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(59, 130, 246, 0.1);
          border-radius: 50%;
          border-top-color: #3b82f6;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .tab-container {
            flex-direction: column;
          }

          .tab-button {
            justify-content: center;
          }

          .subscription-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default UserManagement;