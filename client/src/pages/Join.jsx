import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const Join = () => {
  const [data, setData] = useState({
    name: "",
    designation: "",
    company: "",
    email: "",
    website: "",
    businessType: "",
    goal: "",
    targetAudience: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Thank you! We have received your information.");
        setData({
          name: "",
          designation: "",
          company: "",
          email: "",
          website: "",
          businessType: "",
          goal: "",
          targetAudience: "",
          description: "",
        });
      } else {
        const err = await res.json();
        console.error("Error submitting form:", err);
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-16 pt-32 px-4">
        <div className="max-w-3xl mx-auto bg-card shadow-lg rounded-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-card-foreground">
            Partnership Form
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-card-foreground">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={data.designation}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                  placeholder="Your role"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={data.company}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg bg-background"
                placeholder="Company or brand"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-card-foreground">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={data.website}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg bg-background"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground">
                Business Type
              </label>
              <select
                name="businessType"
                value={data.businessType}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg bg-background"
              >
                <option value="">Select your business type</option>
                <option value="Digital Commerce">Digital Commerce</option>
                <option value="IT & Marketing">AI & IT Services</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Spiritual Wellness">Spiritual Wellness</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground">
                Goal
              </label>
              <textarea
                name="goal"
                value={data.goal}
                onChange={handleChange}
                required
                rows={3}
                className="w-full mt-1 p-3 border rounded-lg bg-background"
                placeholder="Your goal for this partnership"
              ></textarea>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground">
                Target Audience
              </label>
              <textarea
                name="targetAudience"
                value={data.targetAudience}
                onChange={handleChange}
                required
                rows={3}
                className="w-full mt-1 p-3 border rounded-lg bg-background"
                placeholder="Who are your customers or users?"
              ></textarea>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground">
                Describe Your Business
              </label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full mt-1 p-3 border rounded-lg bg-background"
                placeholder="Tell us about what your company does"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Join;
