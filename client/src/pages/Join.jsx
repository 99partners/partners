import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const Join = () => {
  const [data, setData] = useState({
    // Section 1: Contact Information
    fullName: "",
    companyName: "",
    designation: "",
    email: "",
    phone: "",
    website: "",

    // Section 2: Business Information
    businessType: "",
    otherBusinessType: "",
    businessDescription: "",
    services: "",
    yearsInOperation: "",

    // Section 3: Partnership Goals
    partnershipReason: "",
    partnershipTypes: [],
    otherPartnershipType: "",
    targetAudience: "",
    collaborationVision: "",

    // Section 4: Supporting Information
    proposalFile: null,
    additionalComments: "",
    
    // Consent & Declaration
    agreeToTerms: false
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (name === "agreeToTerms") {
        setData(prev => ({ ...prev, [name]: checked }));
      } else {
        // Handle partnership type checkboxes
        const updatedTypes = checked
          ? [...data.partnershipTypes, value]
          : data.partnershipTypes.filter(type => type !== value);
        setData(prev => ({ ...prev, partnershipTypes: updatedTypes }));
      }
    } else if (type === "file") {
      setData(prev => ({ ...prev, proposalFile: files[0] }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!data.agreeToTerms) {
      setError("Please agree to the terms and conditions.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();

    // Append all form fields to FormData
    Object.keys(data).forEach(key => {
      if (key === 'partnershipTypes') {
        // Handle array of partnership types
        data[key].forEach(type => {
          formData.append('partnershipTypes', type);
        });
      } else if (key === 'proposalFile' && data[key]) {
        // Handle file upload
        formData.append('proposalFile', data[key]);
      } else if (key === 'agreeToTerms') {
        // Convert boolean to string
        formData.append(key, data[key].toString());
      } else {
        // Handle all other fields
        formData.append(key, data[key]);
      }
    });

    try {
      const res = await fetch("https://api.99partners.in/api/join", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      const result = await res.json();
      setSuccess("Thank you! Your application has been submitted successfully.");
      
      // Reset form
      setData({
        fullName: "",
        companyName: "",
        designation: "",
        email: "",
        phone: "",
        website: "",
        businessType: "",
        otherBusinessType: "",
        businessDescription: "",
        services: "",
        yearsInOperation: "",
        partnershipReason: "",
        partnershipTypes: [],
        otherPartnershipType: "",
        targetAudience: "",
        collaborationVision: "",
        proposalFile: null,
        additionalComments: "",
        agreeToTerms: false
      });

      // Reset file input if it exists
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessTypes = [
    "Digital Commerce",
    "IT & Marketing Services",
    "Financial Services",
    "Spiritual Ecosystem",
    "Other"
  ];

  const partnershipTypes = [
    "Co-Branding",
    "Distribution/Reselling",
    "Marketing Collaboration",
    "Technology Integration",
    "Investment",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto bg-card shadow-lg rounded-xl p-8">
          <h1 className="text-4xl font-bold mb-6 text-center text-card-foreground">
            Partnership Application Form
          </h1>
          <p className="text-center mb-10 text-muted-foreground">
            Thank you for your interest in partnering with 99 Partners. Please complete the form below to help us understand your business and explore how we can collaborate.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
            {/* Section 1: Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Section 1: Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-card-foreground">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={data.companyName}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground">Designation/Role</label>
                  <input
                    type="text"
                    name="designation"
                    value={data.designation}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground">Company Website/Portfolio (if any)</label>
                  <input
                    type="url"
                    name="website"
                    value={data.website}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border rounded-lg bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Business Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Section 2: Business Information</h2>
              
              <div>
                <label className="text-sm font-medium text-card-foreground">Type of Business</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {businessTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`business-${type}`}
                        name="businessType"
                        value={type}
                        checked={data.businessType === type}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <label htmlFor={`business-${type}`}>{type}</label>
                    </div>
                  ))}
                </div>
                {data.businessType === "Other" && (
                  <input
                    type="text"
                    name="otherBusinessType"
                    value={data.otherBusinessType}
                    onChange={handleChange}
                    placeholder="Please specify"
                    className="w-full mt-2 p-3 border rounded-lg bg-background"
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground">Describe Your Business (Max 200 words)</label>
                <textarea
                  name="businessDescription"
                  value={data.businessDescription}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground">What Products/Services Do You Offer?</label>
                <textarea
                  name="services"
                  value={data.services}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground">Years in Operation</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  {["Start-Up", "2-5 Years", "More than 5 Years"].map((year) => (
                    <div key={year} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`year-${year}`}
                        name="yearsInOperation"
                        value={year}
                        checked={data.yearsInOperation === year}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <label htmlFor={`year-${year}`}>{year}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Partnership Goals */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Section 3: Partnership Goals</h2>
              
              <div>
                <label className="text-sm font-medium text-card-foreground">Why Do You Want to Partner with 99 Partners?</label>
                <textarea
                  name="partnershipReason"
                  value={data.partnershipReason}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground">What Type of Partnership Are You Looking For?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {partnershipTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`partnership-${type}`}
                        name="partnershipTypes"
                        value={type}
                        checked={data.partnershipTypes.includes(type)}
                        onChange={handleChange}
                        className="rounded"
                      />
                      <label htmlFor={`partnership-${type}`}>{type}</label>
                    </div>
                  ))}
                </div>
                {data.partnershipTypes.includes("Other") && (
                  <input
                    type="text"
                    name="otherPartnershipType"
                    value={data.otherPartnershipType}
                    onChange={handleChange}
                    placeholder="Please specify"
                    className="w-full mt-2 p-3 border rounded-lg bg-background"
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground">Target Audience/Market</label>
                <textarea
                  name="targetAudience"
                  value={data.targetAudience}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground">How Do You Envision Our Collaboration? (Max 300 words)</label>
                <textarea
                  name="collaborationVision"
                  value={data.collaborationVision}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                ></textarea>
              </div>
            </div>

            {/* Section 4: Supporting Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Section 4: Supporting Information</h2>
              
              <div>
                <label className="text-sm font-medium text-card-foreground">Upload Business Proposal or Pitch Deck (Optional)</label>
                <input
                  type="file"
                  name="proposalFile"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground">Additional Comments or Questions</label>
                <textarea
                  name="additionalComments"
                  value={data.additionalComments}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                ></textarea>
              </div>
            </div>

            {/* Consent & Declaration */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={data.agreeToTerms}
                  onChange={handleChange}
                  className="rounded"
                />
                <label htmlFor="agreeToTerms" className="text-sm">
                  By submitting this form, I confirm that the information provided is accurate to the best of my knowledge. 
                  I agree to be contacted by the 99 Partners team regarding this application.
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Your Application"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
