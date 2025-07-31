// // export default PartnerManagement;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/main.css";

// const PartnerManagement = () => {
//   const [partners, setPartners] = useState([]);

//   useEffect(() => {
//     const fetchPartners = async () => {
//       try {
//         const res = await axios.get("https://api.99partners.in/api/join");
//         setPartners(res.data);
//       } catch (err) {
//         console.error("Failed to fetch partners:", err);
//       }
//     };

//     fetchPartners();
//   }, []);

//   return (
//     <div className="content-section">
//       <h2>Partner Management</h2>
//       <p>Manage business partnerships and collaborations</p>

//       <div className="partner-columns">
//         {partners.map((partner, index) => (
//           <div className="partner-card" key={index}>
//             {/* Contact Information */}
//             <p><strong>Name:</strong> {partner.name}</p>
//             <p><strong>Designation:</strong> {partner.designation}</p>
//             <p><strong>Company:</strong> {partner.company}</p>
//             <p><strong>Email:</strong> {partner.email}</p>
//             <p><strong>Phone:</strong> {partner.phone}</p>
//             <p>
//               <strong>Website:</strong>{" "}
//               {partner.website ? (
//                 <a href={partner.website} target="_blank" rel="noopener noreferrer">Visit</a>
//               ) : "—"}
//             </p>

//             {/* Business Information */}
//             <p><strong>Business Type:</strong> {partner.businessType}</p>
//             {partner.businessType === "Other" && (
//               <p><strong>Other Business Type:</strong> {partner.otherBusinessType}</p>
//             )}
//             <p><strong>Business Description:</strong> {partner.businessDescription}</p>
//             <p><strong>Products/Services:</strong> {partner.productsServices}</p>
//             <p><strong>Years in Operation:</strong> {partner.yearsInOperation}</p>

//             {/* Partnership Goals */}
//             <p><strong>Partnership Reason:</strong> {partner.partnershipReason}</p>
//             <p><strong>Partnership Type:</strong> {partner.partnershipType}</p>
//             {partner.partnershipType === "Other" && (
//               <p><strong>Other Partnership Type:</strong> {partner.otherPartnershipType}</p>
//             )}
//             <p><strong>Target Audience:</strong> {partner.targetAudience}</p>
//             <p><strong>Collaboration Vision:</strong> {partner.collaborationVision}</p>

//             {/* Supporting Info */}
//             <p><strong>Additional Comments:</strong> {partner.additionalComments}</p>
            
//              {partner.businessProposal && (
//               <p>
//                 <strong>Business Proposal:</strong>{" "}
//                 <a
//                   href={`https://api.99partners.in/api/join/${partner._id}/business-proposal`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Proposal
//                 </a>
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PartnerManagement;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FiUser, FiBriefcase, FiMail, FiPhone, FiGlobe, 
  FiFileText, FiTarget, FiUsers, FiClock, FiMessageSquare 
} from "react-icons/fi";
import { FaSearch, FaRegHandshake } from "react-icons/fa";
import "../styles/main.css";

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get("https://api.99partners.in/api/join");
        setPartners(res.data);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.businessType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="partner-management">
      <div className="header">
        <div className="title-section">
          <h2>Partner Management</h2>
          <p>Manage business partnerships and collaborations</p>
        </div>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="icon-wrapper">
            <FiUser className="icon" />
          </div>
          <div className="stat-content">
            <h3>{partners.length}</h3>
            <p>Total Partners</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper">
            <FiBriefcase className="icon" />
          </div>
          <div className="stat-content">
            <h3>{new Set(partners.map(p => p.company)).size}</h3>
            <p>Unique Companies</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper">
            <FaRegHandshake className="icon" />
          </div>
          <div className="stat-content">
            <h3>{new Set(partners.map(p => p.partnershipType)).size}</h3>
            <p>Partnership Types</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading partners...</p>
        </div>
      ) : filteredPartners.length === 0 ? (
        <div className="empty-state">
          <FiUser className="empty-icon" />
          <p>No partners found</p>
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
        <div className="partner-grid">
          {filteredPartners.map((partner, index) => (
            <div 
              className={`partner-card ${expandedCard === index ? 'expanded' : ''}`}
              key={index}
            >
              <div 
                className="card-header"
                onClick={() => toggleExpand(index)}
              >
                <div className="partner-avatar">
                  {partner.name.charAt(0).toUpperCase()}
                </div>
                <div className="partner-info">
                  <h3>{partner.name}</h3>
                  <p>{partner.designation} at {partner.company}</p>
                </div>
                <div className="expand-icon">
                  {expandedCard === index ? '−' : '+'}
                </div>
              </div>

              <div className="card-content">
                <div className="info-section">
                  <h4><FiUser className="section-icon" /> Contact Information</h4>
                  <div className="info-row">
                    <FiMail className="info-icon" />
                    <span>{partner.email}</span>
                  </div>
                  <div className="info-row">
                    <FiPhone className="info-icon" />
                    <span>{partner.phone || 'Not provided'}</span>
                  </div>
                  <div className="info-row">
                    <FiGlobe className="info-icon" />
                    <span>
                      {partner.website ? (
                        <a href={partner.website} target="_blank" rel="noopener noreferrer">
                          Visit website
                        </a>
                      ) : 'Not provided'}
                    </span>
                  </div>
                </div>

                <div className="info-section">
                  <h4><FiBriefcase className="section-icon" /> Business Information</h4>
                  <div className="info-row">
                    <span className="info-label">Business Type:</span>
                    <span>{partner.businessType}</span>
                  </div>
                  {partner.businessType === "Other" && (
                    <div className="info-row">
                      <span className="info-label">Other Type:</span>
                      <span>{partner.otherBusinessType}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-label">Description:</span>
                    <span>{partner.businessDescription}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Products/Services:</span>
                    <span>{partner.productsServices}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Years in Operation:</span>
                    <span>{partner.yearsInOperation}</span>
                  </div>
                </div>

                <div className="info-section">
                  <h4><FaRegHandshake className="section-icon" /> Partnership Goals</h4>
                  <div className="info-row">
                    <span className="info-label">Partnership Reason:</span>
                    <span>{partner.partnershipReason}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Partnership Type:</span>
                    <span>{partner.partnershipType}</span>
                  </div>
                  {partner.partnershipType === "Other" && (
                    <div className="info-row">
                      <span className="info-label">Other Type:</span>
                      <span>{partner.otherPartnershipType}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-label">Target Audience:</span>
                    <span>{partner.targetAudience}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Collaboration Vision:</span>
                    <span>{partner.collaborationVision}</span>
                  </div>
                </div>

                <div className="info-section">
                  <h4><FiMessageSquare className="section-icon" /> Additional Information</h4>
                  <div className="info-row">
                    <span className="info-label">Comments:</span>
                    <span>{partner.additionalComments || 'None'}</span>
                  </div>
                  {partner.businessProposal && (
                    <div className="info-row">
                      <span className="info-label">Business Proposal:</span>
                      <a
                        href={`https://api.99partners.in/api/join/${partner._id}/business-proposal`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proposal-link"
                      >
                        <FiFileText className="info-icon" /> View Proposal
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .partner-management {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Segoe UI', Roboto, sans-serif;
          color: #333;
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
        
        .partner-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .partner-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }
        
        .partner-card.expanded {
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .card-header:hover {
          background-color: #f8fafc;
        }
        
        .partner-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 600;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .partner-info {
          flex-grow: 1;
        }
        
        .partner-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          color: #2c3e50;
        }
        
        .partner-info p {
          margin: 0;
          color: #6b7280;
          font-size: 0.9rem;
        }
        
        .expand-icon {
          font-size: 1.25rem;
          color: #6b7280;
          font-weight: 500;
        }
        
        .card-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .partner-card.expanded .card-content {
          max-height: 2000px;
        }
        
        .info-section {
          padding: 1rem 1.5rem;
          border-top: 1px solid #f3f4f6;
        }
        
        .info-section h4 {
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
          color: #4b5563;
          display: flex;
          align-items: center;
        }
        
        .section-icon {
          margin-right: 0.5rem;
          color: #6b7280;
        }
        
        .info-row {
          display: flex;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .info-row:last-child {
          margin-bottom: 0;
        }
        
        .info-icon {
          margin-right: 0.75rem;
          color: #9ca3af;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
        
        .info-label {
          font-weight: 500;
          color: #4b5563;
          min-width: 120px;
          margin-right: 1rem;
        }
        
        .proposal-link {
          color: #3b82f6;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        
        .proposal-link:hover {
          text-decoration: underline;
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
          
          .partner-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnerManagement;