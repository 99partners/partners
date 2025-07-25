// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { useState } from "react";

// const Join = () => {
//   const [data, setData] = useState({
//     name: "",
//     designation: "",
//     company: "",
//     email: "",
//     website: "",
//     businessType: "",
//     goal: "",
//     targetAudience: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("https://api.99partners.in/api/join", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (res.ok) {
//         alert("Thank you! We have received your information.");
//         setData({
//           name: "",
//           designation: "",
//           company: "",
//           email: "",
//           website: "",
//           businessType: "",
//           goal: "",
//           targetAudience: "",
//           description: "",
//         });
//       } else {
//         const err = await res.json();
//         console.error("Error submitting form:", err);
//         alert("Submission failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pb-16 pt-32 px-4">
//         <div className="max-w-3xl mx-auto bg-card shadow-lg rounded-xl p-8">
//           <h1 className="text-4xl font-bold mb-8 text-center text-card-foreground">
//             Partnership Form
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={data.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="Your full name"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Designation
//                 </label>
//                 <input
//                   type="text"
//                   name="designation"
//                   value={data.designation}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="Your role"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-card-foreground">
//                 Company Name
//               </label>
//               <input
//                 type="text"
//                 name="company"
//                 value={data.company}
//                 onChange={handleChange}
//                 required
//                 className="w-full mt-1 p-3 border rounded-lg bg-background"
//                 placeholder="Company or brand"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={data.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="name@example.com"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-card-foreground">
//                   Website (Optional)
//                 </label>
//                 <input
//                   type="url"
//                   name="website"
//                   value={data.website}
//                   onChange={handleChange}
//                   className="w-full mt-1 p-3 border rounded-lg bg-background"
//                   placeholder="https://yourwebsite.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-card-foreground">
//                 Business Type
//               </label>
//               <select
//                 name="businessType"
//                 value={data.businessType}
//                 onChange={handleChange}
//                 required
//                 className="w-full mt-1 p-3 border rounded-lg bg-background"
//               >
//                 <option value="">Select your business type</option>
//                 <option value="Digital Commerce">Digital Commerce</option>
//                 <option value="IT & Marketing">AI & IT Services</option>
//                 <option value="Financial Services">Financial Services</option>
//                 <option value="Spiritual Wellness">Spiritual Wellness</option>
//               </select>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-card-foreground">
//                 Goal
//               </label>
//               <textarea
//                 name="goal"
//                 value={data.goal}
//                 onChange={handleChange}
//                 required
//                 rows={3}
//                 className="w-full mt-1 p-3 border rounded-lg bg-background"
//                 placeholder="Your goal for this partnership"
//               ></textarea>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-card-foreground">
//                 Target Audience
//               </label>
//               <textarea
//                 name="targetAudience"
//                 value={data.targetAudience}
//                 onChange={handleChange}
//                 required
//                 rows={3}
//                 className="w-full mt-1 p-3 border rounded-lg bg-background"
//                 placeholder="Who are your customers or users?"
//               ></textarea>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-card-foreground">
//                 Describe Your Business
//               </label>
//               <textarea
//                 name="description"
//                 value={data.description}
//                 onChange={handleChange}
//                 required
//                 rows={4}
//                 className="w-full mt-1 p-3 border rounded-lg bg-background"
//                 placeholder="Tell us about what your company does"
//               ></textarea>
//             </div>

//             <div className="pt-4">
//               <button
//                 type="submit"
//                 className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
//               >
//                 Submit
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


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const Join = () => {
  const [data, setData] = useState({
    fullName: "",
    company: "",
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
    partnershipType: [],
    otherPartnershipType: "",
    targetAudience: "",
    collaborationVision: "",
    proposalFile: null,
    comments: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (name === "agreeTerms") {
        setData((prev) => ({ ...prev, [name]: checked }));
      } else {
        const updatedTypes = checked
          ? [...data.partnershipType, value]
          : data.partnershipType.filter((type) => type !== value);
        setData((prev) => ({ ...prev, partnershipType: updatedTypes }));
      }
    } else if (type === "file") {
      setData((prev) => ({ ...prev, proposalFile: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.agreeTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    const formData = new FormData();
    for (const key in data) {
      if (key === "partnershipType") {
        data[key].forEach((item) => formData.append("partnershipType[]", item));
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await fetch("https://api.99partners.in/api/join", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Thank you! Your application has been submitted.");
        setData({
          fullName: "",
          company: "",
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
          partnershipType: [],
          otherPartnershipType: "",
          targetAudience: "",
          collaborationVision: "",
          proposalFile: null,
          comments: "",
          agreeTerms: false,
        });
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

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

          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Section 1: Contact Info */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Section 1: Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="fullName" required value={data.fullName} onChange={handleChange} placeholder="Full Name" className="p-3 border rounded-lg bg-background" />
                <input type="text" name="company" required value={data.company} onChange={handleChange} placeholder="Company Name" className="p-3 border rounded-lg bg-background" />
                <input type="text" name="designation" required value={data.designation} onChange={handleChange} placeholder="Designation/Role" className="p-3 border rounded-lg bg-background" />
                <input type="email" name="email" required value={data.email} onChange={handleChange} placeholder="Email Address" className="p-3 border rounded-lg bg-background" />
                <input type="tel" name="phone" required value={data.phone} onChange={handleChange} placeholder="Phone Number" className="p-3 border rounded-lg bg-background" />
                <input type="url" name="website" value={data.website} onChange={handleChange} placeholder="Website or Portfolio (Optional)" className="p-3 border rounded-lg bg-background" />
              </div>
            </div>

            {/* Section 2: Business Info */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Section 2: Business Information</h2>
              <select name="businessType" required value={data.businessType} onChange={handleChange} className="w-full p-3 border rounded-lg bg-background">
                <option value="">Select Business Type</option>
                <option value="Digital Commerce">Digital Commerce</option>
                <option value="IT & Marketing Services">IT & Marketing Services</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Spiritual Ecosystem">Spiritual Ecosystem</option>
                <option value="Other">Other</option>
              </select>
              {data.businessType === "Other" && (
                <input
                  type="text"
                  name="otherBusinessType"
                  value={data.otherBusinessType}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="mt-2 p-3 w-full border rounded-lg bg-background"
                />
              )}
              <textarea name="businessDescription" rows={4} required value={data.businessDescription} onChange={handleChange} placeholder="Describe your business (Max 200 words)" className="w-full mt-4 p-3 border rounded-lg bg-background"></textarea>
              <textarea name="services" rows={2} required value={data.services} onChange={handleChange} placeholder="What Products/Services Do You Offer?" className="w-full mt-4 p-3 border rounded-lg bg-background"></textarea>
              <select name="yearsInOperation" required value={data.yearsInOperation} onChange={handleChange} className="w-full mt-4 p-3 border rounded-lg bg-background">
                <option value="">Years in Operation</option>
                <option value="Start-Up">Start-Up (Less than 2 years)</option>
                <option value="2-5 Years">2-5 Years</option>
                <option value="More than 5 Years">More than 5 Years</option>
              </select>
            </div>

            {/* Section 3: Partnership Goals */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Section 3: Partnership Goals</h2>
              <textarea name="partnershipReason" rows={3} required value={data.partnershipReason} onChange={handleChange} placeholder="Why do you want to partner with 99 Partners?" className="w-full p-3 border rounded-lg bg-background"></textarea>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Co-Branding", "Distribution/Reselling", "Marketing Collaboration", "Technology Integration", "Investment"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input type="checkbox" name="partnershipType" value={type} checked={data.partnershipType.includes(type)} onChange={handleChange} />
                    {type}
                  </label>
                ))}
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="partnershipType" value="Other" checked={data.partnershipType.includes("Other")} onChange={handleChange} />
                  Other
                </label>
              </div>
              {data.partnershipType.includes("Other") && (
                <input
                  type="text"
                  name="otherPartnershipType"
                  value={data.otherPartnershipType}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="mt-2 w-full p-3 border rounded-lg bg-background"
                />
              )}
              <textarea name="targetAudience" rows={3} required value={data.targetAudience} onChange={handleChange} placeholder="Target Audience / Market" className="w-full mt-4 p-3 border rounded-lg bg-background"></textarea>
              <textarea name="collaborationVision" rows={5} required value={data.collaborationVision} onChange={handleChange} placeholder="How do you envision our collaboration? (Max 300 words)" className="w-full mt-4 p-3 border rounded-lg bg-background"></textarea>
            </div>

            {/* Section 4: Supporting Info */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Section 4: Supporting Information</h2>
              <label className="block mb-2 text-sm font-medium">Upload Business Proposal or Pitch Deck (Optional)</label>
              <input type="file" name="proposalFile" accept=".pdf,.ppt,.pptx" onChange={handleChange} className="block w-full p-2 border rounded-lg bg-background" />
              <textarea name="comments" rows={3} value={data.comments} onChange={handleChange} placeholder="Additional Comments or Questions" className="w-full mt-4 p-3 border rounded-lg bg-background"></textarea>
              <label className="flex items-center gap-2 mt-4">
                <input type="checkbox" name="agreeTerms" checked={data.agreeTerms} onChange={handleChange} />
                I agree to the terms and conditions.
              </label>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
              Submit Your Application
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
// ...existing code...
for (const key in data) {
  if (key === "partnershipType") {
    data[key].forEach((item) => formData.append("partnershipType", item)); // <-- remove []
  } else {
    formData.append(key, data[key]);
  }
}
// ...existing code...// ...existing code...
    const {
      fullName,
      company,
      designation,
      email,
      phone,
      website,
      businessType,
      otherBusinessType,
      businessDescription,
      services,
      yearsInOperation,
      partnershipReason,
      otherPartnershipType,
      targetAudience,
      collaborationVision,
      comments,
      agreeTerms,
    } = req.body;

    // Parse partnershipType as array
    let partnershipType = req.body.partnershipType;
    if (typeof partnershipType === "string") {
      partnershipType = [partnershipType];
    } else if (!Array.isArray(partnershipType)) {
      partnershipType = [];
    }

    const newEntry = new Join({
      fullName,
      company,
      designation,
      email,
      phone,
      website,
      businessType,
      otherBusinessType,
      businessDescription,
      services,
      yearsInOperation,
      partnershipReason,
      partnershipType,
      otherPartnershipType,
      targetAudience,
      collaborationVision,
      comments,
      agreeTerms: agreeTerms === "true" || agreeTerms === true,
      proposalFile: req.file?.filename || null,
    });
// ...existing code...