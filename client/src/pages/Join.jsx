// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { useState } from "react";
// import { API_ENDPOINTS } from "@/lib/api";

// const Join = () => {
//   const [data, setData] = useState({
//     // Section 1: Contact Information
//     name: "",
//     company: "",
//     designation: "",
//     email: "",
//     phone: "",
//     website: "",

//     // Section 2: Business Information
//     businessType: "",
//     otherBusinessType: "",
//     businessDescription: "",
//     productsServices: "",
//     yearsInOperation: "",

//     // Section 3: Partnership Goals
//     partnershipReason: "",
//     partnershipType: "",
//     otherPartnershipType: "",
//     targetAudience: "",
//     collaborationVision: "",

//     // Section 4: Supporting Information
//     additionalComments: "",

//     // Consent
//     consentToTerms: false
//   });

//   const [file, setFile] = useState(null);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) { // 10MB limit
//         setError("File size must be less than 10MB");
//         e.target.value = null;
//         return;
//       }
//       const ext = file.name.split('.').pop().toLowerCase();
//       const allowedTypes = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
//       if (!allowedTypes.includes(ext)) {
//         setError("Only PDF, DOC, DOCX, PPT, and PPTX files are allowed");
//         e.target.value = null;
//         return;
//       }
//       setFile(file);
//       setError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!data.consentToTerms) {
//       setError("Please agree to the terms and conditions");
//       return;
//     }

//     const formData = new FormData();
//     // Add all form fields to FormData
//     Object.entries(data).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     // Add file if present
//     if (file) {
//       formData.append('businessProposal', file);
//     }

//     try {
//       // const res = await fetch(API_ENDPOINTS.join, {
//       //   method: "POST",
//       //   body: formData, // FormData automatically sets the correct Content-Type
//       // });
//       const res = await axios.post("https://api.99partners.in/api/join", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (res.ok) {
//         alert("Thank you! We have received your application.");
//         setData({
//           name: "",
//           company: "",
//           designation: "",
//           email: "",
//           phone: "",
//           website: "",
//           businessType: "",
//           otherBusinessType: "",
//           businessDescription: "",
//           productsServices: "",
//           yearsInOperation: "",
//           partnershipReason: "",
//           partnershipType: "",
//           otherPartnershipType: "",
//           targetAudience: "",
//           collaborationVision: "",
//           additionalComments: "",
//           consentToTerms: false
//         });
//         setFile(null);
//         // Reset file input
//         const fileInput = document.querySelector('input[type="file"]');
//         if (fileInput) fileInput.value = "";
//       } else {
//         const errData = await res.json();
//         setError(errData.error || "Failed to submit application. Please try again.");
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pb-16 pt-32 px-4">
//         <div className="max-w-3xl mx-auto bg-card shadow-lg rounded-xl p-8">
//           <h1 className="text-4xl font-bold mb-8 text-center text-card-foreground">
//             Partnership Application Form
//           </h1>
//           <p className="text-muted-foreground mb-8 text-center">
//             Thank you for your interest in partnering with 99 Partners. Please complete the form below to help us understand your business and explore how we can collaborate.
//           </p>

//           {error && (
//             <div className="bg-destructive/15 text-destructive p-4 rounded-lg mb-6">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Section 1: Contact Information */}
//             <div className="space-y-6">
//               <h2 className="text-2xl font-semibold">Contact Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="text-sm font-medium text-card-foreground">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={data.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-3 border rounded-lg bg-background"
//                     placeholder="Your full name"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-card-foreground">
//                     Company Name
//                   </label>
//                   <input
//                     type="text"
//                     name="company"
//                     value={data.company}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-3 border rounded-lg bg-background"
//                     placeholder="Your company name"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="text-sm font-medium text-card-foreground">
//                     Designation/Role
//                   </label>
//                   <input
//                     type="text"
//                     name="designation"
//                     value={data.designation}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-3 border rounded-lg bg-background"
//                     placeholder="Your role in the company"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-card-foreground">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-3 border rounded-lg bg-background"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="text-sm font-medium text-card-foreground">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={data.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-3 border rounded-lg bg-background"
//                     placeholder="Your contact number"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-card-foreground">
//                     Company Website/Portfolio
//                   </label>
//                   <input
//                     type="url"
//                     name="website"
//                     value={data.website}
//                     onChange={handleChange}
//                     className="w-full mt-1 p-3 border rounded-lg bg-background"
//                     placeholder="https://your-website.com"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Section 2: Business Information */}
//             <div className="space-y-6">
//               <h2 className="text-2xl font-semibold">Business Information</h2>
              
//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Type of Business
//                 </label>
//                 <select
//                   name="businessType"
//                   value={data.businessType}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                 >
//                   <option value="">Select your business type</option>
//                   <option value="Digital Commerce">Digital Commerce</option>
//                   <option value="IT & Marketing Services">IT & Marketing Services</option>
//                   <option value="Financial Services">Financial Services</option>
//                   <option value="Spiritual Ecosystem">Spiritual Ecosystem</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               {data.businessType === 'Other' && (
//                 <div>
//                   <label className="text-sm font-medium text-card-foreground">
//                     Please specify your business type
//                   </label>
//                   <input
//                     type="text"
//                     name="otherBusinessType"
//                     value={data.otherBusinessType}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-3 border rounded-lg bg-background"
//                     placeholder="Specify your business type"
//                   />
//                 </div>
//               )}

//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Describe Your Business (Max 200 words)
//                 </label>
//                 <textarea
//                   name="businessDescription"
//                   value={data.businessDescription}
//                   onChange={handleChange}
//                   required
//                   rows={4}
//                   maxLength={2000}
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="Tell us about your business"
//                 ></textarea>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   What Products/Services Do You Offer?
//                 </label>
//                 <textarea
//                   name="productsServices"
//                   value={data.productsServices}
//                   onChange={handleChange}
//                   required
//                   rows={3}
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="List your main products/services"
//                 ></textarea>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Years in Operation
//                 </label>
//                 <select
//                   name="yearsInOperation"
//                   value={data.yearsInOperation}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                 >
//                   <option value="">Select years in operation</option>
//                   <option value="Start-Up (Less than 2 years)">Start-Up (Less than 2 years)</option>
//                   <option value="2-5 Years">2-5 Years</option>
//                   <option value="More than 5 Years">More than 5 Years</option>
//                 </select>
//               </div>
//             </div>

//             {/* Section 3: Partnership Goals */}
//             <div className="space-y-6">
//               <h2 className="text-2xl font-semibold">Partnership Goals</h2>

//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Why Do You Want to Partner with 99 Partners?
//                 </label>
//                 <textarea
//                   name="partnershipReason"
//                   value={data.partnershipReason}
//                   onChange={handleChange}
//                   required
//                   rows={3}
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="Tell us why you want to partner with us"
//                 ></textarea>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   What Type of Partnership Are You Looking For?
//                 </label>
//                 <select
//                   name="partnershipType"
//                   value={data.partnershipType}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                 >
//                   <option value="">Select partnership type</option>
//                   <option value="Co-Branding">Co-Branding</option>
//                   <option value="Distribution/Reselling">Distribution/Reselling</option>
//                   <option value="Marketing Collaboration">Marketing Collaboration</option>
//                   <option value="Technology Integration">Technology Integration</option>
//                   <option value="Investment">Investment</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               {data.partnershipType === 'Other' && (
//                 <div>
//                   <label className="text-sm font-medium text-card-foreground">
//                     Please specify partnership type
//                   </label>
//                   <input
//                     type="text"
//                     name="otherPartnershipType"
//                     value={data.otherPartnershipType}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-3 border rounded-lg bg-background"
//                     placeholder="Specify partnership type"
//                   />
//                 </div>
//               )}

//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Target Audience/Market
//                 </label>
//                 <textarea
//                   name="targetAudience"
//                   value={data.targetAudience}
//                   onChange={handleChange}
//                   required
//                   rows={3}
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="Describe your target audience"
//                 ></textarea>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   How Do You Envision Our Collaboration? (Max 300 words)
//                 </label>
//                 <textarea
//                   name="collaborationVision"
//                   value={data.collaborationVision}
//                   onChange={handleChange}
//                   required
//                   rows={5}
//                   maxLength={3000}
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="Describe how you envision our collaboration"
//                 ></textarea>
//               </div>
//             </div>

//             {/* Section 4: Supporting Information */}
//             <div className="space-y-6">
//               <h2 className="text-2xl font-semibold">Supporting Information</h2>

//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Upload Business Proposal or Pitch Deck (Optional)
//                 </label>
//                 <input
//                   type="file"
//                   name="businessProposal"
//                   onChange={handleFileChange}
//                   accept=".pdf,.doc,.docx,.ppt,.pptx"
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                 />
//                 <p className="text-sm text-muted-foreground mt-1">
//                   Max size: 10MB. Accepted formats: PDF, DOC, DOCX, PPT, PPTX
//                 </p>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Additional Comments or Questions
//                 </label>
//                 <textarea
//                   name="additionalComments"
//                   value={data.additionalComments}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="Any additional information you'd like to share"
//                 ></textarea>
//               </div>
//             </div>

//             {/* Consent & Declaration */}
//             <div className="space-y-6">
//               <h2 className="text-2xl font-semibold">Consent & Declaration</h2>

//               <div className="flex items-start space-x-3">
//                 <input
//                   type="checkbox"
//                   name="consentToTerms"
//                   checked={data.consentToTerms}
//                   onChange={handleChange}
//                   required
//                   className="mt-1"
//                 />
//                 <label className="text-sm text-card-foreground">
//                   By submitting this form, I confirm that the information provided is accurate to the best of my knowledge. 
//                   I agree to be contacted by the 99 Partners team regarding this application.
//                 </label>
//               </div>
//             </div>

//             <div className="pt-4">
//               <button
//                 type="submit"
//                 className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
//               >
//                 Submit Your Application
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Join;


import React, { useState } from "react";
import axios from "axios";

const Join = () => {
  const [data, setData] = useState({
    name: "",
    company: "",
    designation: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    otherBusinessType: "",
    businessDescription: "",
    productsServices: "",
    yearsInOperation: "",
    partnershipReason: "",
    partnershipType: "",
    otherPartnershipType: "",
    targetAudience: "",
    collaborationVision: "",
    additionalComments: "",
    consentToTerms: false,
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      !["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"].includes(selectedFile.type)
    ) {
      setError("Only PDF, DOC, DOCX, PPT, or PPTX files are allowed.");
      setFile(null);
      return;
    }
    setError("");
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!data.consentToTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (file) formData.append("businessProposal", file);

    try {
      setSubmitting(true);
      const res = await axios.post("https://api.99partners.in/api/join", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Thank you! We have received your application.");
      setData({
        name: "",
        company: "",
        designation: "",
        email: "",
        phone: "",
        website: "",
        businessType: "",
        otherBusinessType: "",
        businessDescription: "",
        productsServices: "",
        yearsInOperation: "",
        partnershipReason: "",
        partnershipType: "",
        otherPartnershipType: "",
        targetAudience: "",
        collaborationVision: "",
        additionalComments: "",
        consentToTerms: false,
      });
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error("Submission error:", err);
      const message = err.response?.data?.error || "Failed to submit application.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={data.name} onChange={handleChange} placeholder="Full Name *" className="border p-2 rounded" required />
        <input name="company" value={data.company} onChange={handleChange} placeholder="Company Name *" className="border p-2 rounded" required />
        <input name="designation" value={data.designation} onChange={handleChange} placeholder="Designation *" className="border p-2 rounded" required />
        <input name="email" type="email" value={data.email} onChange={handleChange} placeholder="Email *" className="border p-2 rounded" required />
        <input name="phone" value={data.phone} onChange={handleChange} placeholder="Phone Number *" className="border p-2 rounded" required />
        <input name="website" value={data.website} onChange={handleChange} placeholder="Company Website (optional)" className="border p-2 rounded" />
        <div>
          <select name="businessType" value={data.businessType} onChange={handleChange} className="border p-2 rounded w-full" required>
            <option value="">Select Business Type *</option>
            <option value="Startup">Startup</option>
            <option value="SMB">Small/Medium Business</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Agency">Agency</option>
            <option value="Other">Other</option>
          </select>
          {data.businessType === "Other" && (
            <input name="otherBusinessType" value={data.otherBusinessType} onChange={handleChange} placeholder="Please specify your business type" className="border p-2 rounded mt-2 w-full" />
          )}
        </div>
        <input name="productsServices" value={data.productsServices} onChange={handleChange} placeholder="Products/Services Offered *" className="border p-2 rounded" required />
        <input name="yearsInOperation" value={data.yearsInOperation} onChange={handleChange} placeholder="Years in Operation *" className="border p-2 rounded" required />
      </div>

      <textarea name="businessDescription" value={data.businessDescription} onChange={handleChange} placeholder="Brief description of your business *" className="border p-2 rounded w-full" rows={4} required />

      <textarea name="partnershipReason" value={data.partnershipReason} onChange={handleChange} placeholder="Why do you want to partner with us? *" className="border p-2 rounded w-full" rows={4} required />

      <div>
        <select name="partnershipType" value={data.partnershipType} onChange={handleChange} className="border p-2 rounded w-full" required>
          <option value="">Select Partnership Type *</option>
          <option value="Reseller">Reseller</option>
          <option value="Co-Marketing">Co-Marketing</option>
          <option value="Technology Integration">Technology Integration</option>
          <option value="Affiliate">Affiliate</option>
          <option value="Other">Other</option>
        </select>
        {data.partnershipType === "Other" && (
          <input name="otherPartnershipType" value={data.otherPartnershipType} onChange={handleChange} placeholder="Please specify the partnership type" className="border p-2 rounded mt-2 w-full" />
        )}
      </div>

      <textarea name="targetAudience" value={data.targetAudience} onChange={handleChange} placeholder="Describe your target audience/customer base *" className="border p-2 rounded w-full" rows={3} required />

      <textarea name="collaborationVision" value={data.collaborationVision} onChange={handleChange} placeholder="What does a successful collaboration look like to you? *" className="border p-2 rounded w-full" rows={3} required />

      <textarea name="additionalComments" value={data.additionalComments} onChange={handleChange} placeholder="Any additional comments or questions? (Optional)" className="border p-2 rounded w-full" rows={3} />

      <div>
        <label className="block mb-2 font-medium">Upload Business Proposal (PDF, DOC, PPT — optional):</label>
        <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={handleFileChange} className="block border rounded p-2 w-full" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="consentToTerms" checked={data.consentToTerms} onChange={handleChange} required />
        <label htmlFor="consentToTerms" className="text-xs">I agree to the terms and conditions.</label>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button type="submit" disabled={submitting} className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
        {submitting ? "Submitting..." : "Submit Your Application"}
      </button>
    </form>
  );
};

export default Join;
