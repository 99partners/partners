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
//             <p>
//               <strong>Name:</strong> {partner.name}
//             </p>
//             <p>
//               <strong>Designation:</strong> {partner.designation}
//             </p>
//             <p>
//               <strong>Company:</strong> {partner.company}
//             </p>
//             <p>
//               <strong>Email:</strong> {partner.email}
//             </p>
//             <p>
//               <strong>Website:</strong>{" "}
//               {partner.website ? (
//                 <a
//                   href={partner.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Visit
//                 </a>
//               ) : (
//                 "—"
//               )}
//             </p>
//             <p>
//               <strong>Business Type:</strong> {partner.businessType}
//             </p>
//             <p>
//               <strong>Goal:</strong> {partner.goal}
//             </p>
//             <p>
//               <strong>Target Audience:</strong> {partner.targetAudience}
//             </p>
//             <p>
//               <strong>Description:</strong> {partner.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PartnerManagement;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get("https://api.99partners.in/api/join");
        setPartners(res.data);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="content-section">
      <h2>Partner Management</h2>
      <p>Manage business partnerships and collaborations</p>

      <div className="partner-columns">
        {partners.map((partner, index) => (
          <div className="partner-card" key={index}>
            {/* Contact Information */}
            <p><strong>Name:</strong> {partner.name}</p>
            <p><strong>Designation:</strong> {partner.designation}</p>
            <p><strong>Company:</strong> {partner.company}</p>
            <p><strong>Email:</strong> {partner.email}</p>
            <p><strong>Phone:</strong> {partner.phone}</p>
            <p>
              <strong>Website:</strong>{" "}
              {partner.website ? (
                <a href={partner.website} target="_blank" rel="noopener noreferrer">Visit</a>
              ) : "—"}
            </p>

            {/* Business Information */}
            <p><strong>Business Type:</strong> {partner.businessType}</p>
            {partner.businessType === "Other" && (
              <p><strong>Other Business Type:</strong> {partner.otherBusinessType}</p>
            )}
            <p><strong>Business Description:</strong> {partner.businessDescription}</p>
            <p><strong>Products/Services:</strong> {partner.productsServices}</p>
            <p><strong>Years in Operation:</strong> {partner.yearsInOperation}</p>

            {/* Partnership Goals */}
            <p><strong>Partnership Reason:</strong> {partner.partnershipReason}</p>
            <p><strong>Partnership Type:</strong> {partner.partnershipType}</p>
            {partner.partnershipType === "Other" && (
              <p><strong>Other Partnership Type:</strong> {partner.otherPartnershipType}</p>
            )}
            <p><strong>Target Audience:</strong> {partner.targetAudience}</p>
            <p><strong>Collaboration Vision:</strong> {partner.collaborationVision}</p>

            {/* Supporting Info */}
            <p><strong>Additional Comments:</strong> {partner.additionalComments}</p>
            
            {partner.businessProposal && (
              <p>
                <strong>Business Proposal:</strong>{" "}
                <a href={partner.businessProposal} target="_blank" rel="noopener noreferrer">Download</a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerManagement;
