// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/main.css";

// const ContactManagement = () => {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const res = await axios.get("https://api.99partners.in/api/contact");
//         setContacts(res.data); 
//       } catch (err) {
//         console.error("❌ Failed to fetch contacts:", err);
//       }
//     };

//     fetchContacts();
//   }, []);

//   return (
//     <div className="content-section">
//       <h2>Contact Management</h2>
//       <p>Manage customer inquiries and messages</p>

//       <h3>Contact Messages</h3>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Company</th>
//             <th>Subject</th>
//             <th>Message</th>
//           </tr>
//         </thead>
//         <tbody>
//           {contacts.map((contact, index) => (
//             <tr key={index}>
//               <td>{contact.name}</td>
//               <td>{contact.email}</td>
//               <td>{contact.company}</td>
//               <td>{contact.subject}</td>
//               <td>{contact.message}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ContactManagement;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMail, FiPhone, FiUser, FiBriefcase, FiMessageSquare } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import "../styles/main.css";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("https://api.99partners.in/api/contact");
        setContacts(res.data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-management">
      <div className="header">
        <div className="title-section">
          <h2>Contact Management</h2>
          <p>Manage customer inquiries and messages</p>
        </div>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="icon-wrapper">
            <FiMail className="icon" />
          </div>
          <div className="stat-content">
            <h3>{contacts.length}</h3>
            <p>Total Messages</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper">
            <FiUser className="icon" />
          </div>
          <div className="stat-content">
            <h3>{new Set(contacts.map(c => c.email)).size}</h3>
            <p>Unique Contacts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper">
            <FiBriefcase className="icon" />
          </div>
          <div className="stat-content">
            <h3>{new Set(contacts.filter(c => c.company).map(c => c.company)).size}</h3>
            <p>Companies</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading contacts...</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="empty-state">
          <FiMessageSquare className="empty-icon" />
          <p>No contact messages found</p>
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="contacts-table-container">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>
                  <div className="header-content">
                    <FiUser className="header-icon" />
                    <span>Name</span>
                  </div>
                </th>
                <th>
                  <div className="header-content">
                    <FiMail className="header-icon" />
                    <span>Email</span>
                  </div>
                </th>
                <th>
                  <div className="header-content">
                    <FiBriefcase className="header-icon" />
                    <span>Company</span>
                  </div>
                </th>
                <th>
                  <div className="header-content">
                    <FiMessageSquare className="header-icon" />
                    <span>Subject</span>
                  </div>
                </th>
                <th>
                  <div className="header-content">
                    <span>Message Preview</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={index}>
                  <td>
                    <div className="contact-name">
                      <span className="name">{contact.name}</span>
                      {contact.phone && (
                        <a href={`tel:${contact.phone}`} className="phone-link">
                          <FiPhone className="phone-icon" /> {contact.phone}
                        </a>
                      )}
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${contact.email}`} className="email-link">
                      {contact.email}
                    </a>
                  </td>
                  <td>{contact.company || '-'}</td>
                  <td>{contact.subject}</td>
                  <td className="message-cell">
                    <div className="message-preview">
                      {contact.message.length > 50
                        ? `${contact.message.substring(0, 50)}...`
                        : contact.message}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .contact-management {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Segoe UI', Roboto, sans-serif;
          color: #333;
        }

        .contacts-table th {
          background-color: #f9fafb;
          padding: 1rem 1.5rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .title-section h2 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        
        .title-section p {
          color: #7f8c8d;
          margin: 0;
        }
        
        .search-bar {
          position: relative;
          min-width: 300px;
        }
        
        .search-bar input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
          background-color: #f9fafb;
        }
        
        .search-bar input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          background-color: white;
        }
        
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
        
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: transform 0.2s;
        }
        
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #f0f7ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .icon {
          font-size: 1.5rem;
          color: #3b82f6;
        }
        
        .stat-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          color: #2c3e50;
        }
        
        .stat-content p {
          margin: 0;
          color: #6b7280;
          font-size: 0.9rem;
        }
        
        .contacts-table-container {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .contacts-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .contacts-table th {
          background-color: #f9fafb;
          padding: 1rem 1.5rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .contacts-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: top;
        }
        
        .contacts-table tr:last-child td {
          border-bottom: none;
        }
        
        .contacts-table tr:hover {
          background-color: #f8fafc;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .header-icon {
          font-size: 1rem;
          color: #6b7280;
        }

        .contacts-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: top;
        }
        
        .contacts-table tr:last-child td {
          border-bottom: none;
        }
        
        .contacts-table tr:hover {
          background-color: #f8fafc;
        }
        
        /* Contact Name Styles */
        .contact-name {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .name {
          font-weight: 500;
        }
        
        .phone-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.85rem;
          text-decoration: none;
        }
        
        .phone-link:hover {
          color: #3b82f6;
        }
        
        /* Email Link Styles */
        .email-link {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .email-link:hover {
          text-decoration: underline;
        }
        
        /* Message Preview Styles */
        .message-preview {
          color: #6b7280;
          font-size: 0.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 300px;
          display: inline-block;
        }
        
        /* ... (keep all your other existing styles) */
        
        @media (max-width: 768px) {
          .contacts-table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
          
          .contacts-table th,
          .contacts-table td {
            padding: 0.75rem 1rem;
          }
        }
        
        .email-link {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .email-link:hover {
          text-decoration: underline;
        }
        
        .message-cell {
          max-width: 300px;
        }
        
        .message-preview {
          color: #6b7280;
          font-size: 0.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        
        .empty-icon {
          font-size: 3rem;
          color: #d1d5db;
          margin-bottom: 1rem;
        }
        
        .empty-state p {
          color: #6b7280;
          margin-bottom: 1rem;
        }
        
        .clear-search {
          background: none;
          border: none;
          color: #3b82f6;
          cursor: pointer;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 6px;
        }
        
        .clear-search:hover {
          background-color: #f0f7ff;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-bar {
            min-width: 100%;
          }
          
          .stats-cards {
            grid-template-columns: 1fr;
          }
          
          .contacts-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactManagement;