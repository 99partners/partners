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
            <p>
              <strong>Name:</strong> {partner.name}
            </p>
            <p>
              <strong>Designation:</strong> {partner.designation}
            </p>
            <p>
              <strong>Company:</strong> {partner.company}
            </p>
            <p>
              <strong>Email:</strong> {partner.email}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              {partner.website ? (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </a>
              ) : (
                "—"
              )}
            </p>
            <p>
              <strong>Business Type:</strong> {partner.businessType}
            </p>
            <p>
              <strong>Goal:</strong> {partner.goal}
            </p>
            <p>
              <strong>Target Audience:</strong> {partner.targetAudience}
            </p>
            <p>
              <strong>Description:</strong> {partner.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerManagement;
