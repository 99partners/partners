import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css"; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showSubscribedOnly, setShowSubscribedOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [usersRes, newsletterRes] = await Promise.all([
          axios.get("https://api.99partners.in/api/users"),
          axios.get("https://api.99partners.in/api/newsletter")
        ]);

        const usersList = usersRes.data;
        const newsletterList = newsletterRes.data;

        const combinedUsers = [...usersList];

        newsletterList.forEach((n) => {
          const alreadyExists = usersList.some((u) => u.email === n.email);
          if (!alreadyExists) {
            combinedUsers.push({
              displayName: "(Guest Subscriber)",
              email: n.email,
              newsletter: "subscribed"
            });
          }
        });

        const merged = combinedUsers.map((user) => {
          const isSubscribed = newsletterList.some((n) => n.email === user.email);
          return {
            ...user,
            newsletter: isSubscribed ? "subscribed" : "unsubscribed"
          };
        });

        setUsers(merged);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const filteredUsers = showSubscribedOnly
    ? users.filter((user) => user.newsletter === "subscribed")
    : users;

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div className="content-section" style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>User Management</h2>
      <p>Manage your application users and newsletter subscriptions.</p>

      <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <label style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            checked={showSubscribedOnly}
            onChange={() => setShowSubscribedOnly(!showSubscribedOnly)}
          />
          {" "}Show only newsletter subscribers
        </label>
      </div>

      <table
        className="data-table"
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead style={{ backgroundColor: "#f5f5f5" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Newsletter</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.displayName || "N/A"}</td>
                <td>{user.email}</td>
                <td
                  style={{
                    color:
                      user.newsletter === "subscribed" ? "green" : "#888",
                    fontWeight:
                      user.newsletter === "subscribed" ? "bold" : "normal"
                  }}
                >
                  {user.newsletter === "subscribed" ? "Subscribed ✅" : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;