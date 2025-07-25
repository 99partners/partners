import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';

const PartnerManagement = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('https://api.99partners.in/api/join');
      setApplications(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="p-4">Loading applications...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="content-section">
      <h2>Partnership Applications</h2>
      <p className="mb-6">Manage and review partnership applications</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Business Type</th>
              <th className="px-4 py-3 text-left">Partnership Types</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t">
                <td className="px-4 py-3">{formatDate(app.createdAt)}</td>
                <td className="px-4 py-3">{app.fullName}</td>
                <td className="px-4 py-3">{app.companyName}</td>
                <td className="px-4 py-3">
                  {app.businessType}
                  {app.businessType === 'Other' && ` (${app.otherBusinessType})`}
                </td>
                <td className="px-4 py-3">
                  {app.partnershipTypes.join(', ')}
                  {app.partnershipTypes.includes('Other') && ` (${app.otherPartnershipType})`}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Application Details</h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Section 1: Contact Information */}
              <div>
                <h4 className="font-semibold border-b pb-2 mb-3">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p>{selectedApp.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company Name</p>
                    <p>{selectedApp.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Designation</p>
                    <p>{selectedApp.designation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p>{selectedApp.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p>{selectedApp.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <p>{selectedApp.website || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Business Information */}
              <div>
                <h4 className="font-semibold border-b pb-2 mb-3">Business Information</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Business Type</p>
                    <p>{selectedApp.businessType} {selectedApp.businessType === 'Other' && `(${selectedApp.otherBusinessType})`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Years in Operation</p>
                    <p>{selectedApp.yearsInOperation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Business Description</p>
                    <p className="whitespace-pre-wrap">{selectedApp.businessDescription}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Products/Services</p>
                    <p className="whitespace-pre-wrap">{selectedApp.services}</p>
                  </div>
                </div>
              </div>

              {/* Section 3: Partnership Goals */}
              <div>
                <h4 className="font-semibold border-b pb-2 mb-3">Partnership Goals</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Partnership Types</p>
                    <p>
                      {selectedApp.partnershipTypes.join(', ')}
                      {selectedApp.partnershipTypes.includes('Other') && ` (${selectedApp.otherPartnershipType})`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Partnership Reason</p>
                    <p className="whitespace-pre-wrap">{selectedApp.partnershipReason}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target Audience</p>
                    <p className="whitespace-pre-wrap">{selectedApp.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Collaboration Vision</p>
                    <p className="whitespace-pre-wrap">{selectedApp.collaborationVision}</p>
                  </div>
                </div>
              </div>

              {/* Section 4: Supporting Information */}
              <div>
                <h4 className="font-semibold border-b pb-2 mb-3">Supporting Information</h4>
                <div className="space-y-4">
                  {selectedApp.proposalFile && (
                    <div>
                      <p className="text-sm text-gray-600">Proposal File</p>
                      <a
                        href={`https://api.99partners.in/uploads/proposals/${selectedApp.proposalFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        View Proposal
                      </a>
                    </div>
                  )}
                  {selectedApp.additionalComments && (
                    <div>
                      <p className="text-sm text-gray-600">Additional Comments</p>
                      <p className="whitespace-pre-wrap">{selectedApp.additionalComments}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-4">
                <p>Application submitted on {formatDate(selectedApp.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerManagement;
