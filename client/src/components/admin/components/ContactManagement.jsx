import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/contact");
        setContacts(res.data); 
      } catch (err) {
        console.error("❌ Failed to fetch contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="content-section">
      <h2>Contact Management</h2>
      <p>Manage customer inquiries and messages</p>

      <h3>Contact Messages</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.company}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactManagement;
