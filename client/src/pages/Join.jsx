import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const Join = () => {
  const [data, setData] = useState({
    // Section 1: Contact Information
    fullName: "",
    company: "",
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
    partnershipType: [],
    otherPartnershipType: "",
    targetAudience: "",
    collaborationVision: "",

    // Section 4: Supporting Information
    proposalFile: null,
    comments: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!data.agreeTerms) {
      setError("Please agree to the terms and conditions.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    for (const key in data) {
      if (key === "partnershipType") {
        data[key].forEach((item) => formData.append("partnershipType", item));
      } else if (key === "proposalFile" && data[key]) {
        formData.append(key, data[key]);
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
        setSuccess("Thank you! Your application has been submitted successfully.");
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
        const errorData = await res.json();
        setError(errorData.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
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
        <Card className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-6 text-center text-card-foreground">
            Partnership Application Form
          </h1>
          <p className="text-center mb-10 text-muted-foreground">
            Thank you for your interest in partnering with 99 Partners. Please complete the form below to help us understand your business and explore how we can collaborate.
          </p>

          {error && (
            <Alert variant="destructive" className="mb-6">
              {error}
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Section 1: Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    value={data.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="designation">Designation/Role</Label>
                  <Input
                    id="designation"
                    name="designation"
                    value={data.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={data.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="website">Company Website/Portfolio (if any)</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={data.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Business Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Section 2: Business Information</h2>
              
              <div>
                <Label>Type of Business</Label>
                <RadioGroup
                  name="businessType"
                  value={data.businessType}
                  onValueChange={(value) => handleChange({ target: { name: "businessType", value } })}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2"
                >
                  {businessTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`business-${type}`} />
                      <Label htmlFor={`business-${type}`}>{type}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {data.businessType === "Other" && (
                  <Input
                    name="otherBusinessType"
                    value={data.otherBusinessType}
                    onChange={handleChange}
                    placeholder="Please specify"
                    className="mt-2"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="businessDescription">Describe Your Business (Max 200 words)</Label>
                <Textarea
                  id="businessDescription"
                  name="businessDescription"
                  value={data.businessDescription}
                  onChange={handleChange}
                  required
                  className="h-32"
                />
              </div>

              <div>
                <Label htmlFor="services">What Products/Services Do You Offer?</Label>
                <Textarea
                  id="services"
                  name="services"
                  value={data.services}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>Years in Operation</Label>
                <RadioGroup
                  name="yearsInOperation"
                  value={data.yearsInOperation}
                  onValueChange={(value) => handleChange({ target: { name: "yearsInOperation", value } })}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Start-Up" id="years-startup" />
                    <Label htmlFor="years-startup">Start-Up (Less than 2 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-5 Years" id="years-2-5" />
                    <Label htmlFor="years-2-5">2-5 Years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="More than 5 Years" id="years-5plus" />
                    <Label htmlFor="years-5plus">More than 5 Years</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Section 3: Partnership Goals */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Section 3: Partnership Goals</h2>
              
              <div>
                <Label htmlFor="partnershipReason">Why Do You Want to Partner with 99 Partners?</Label>
                <Textarea
                  id="partnershipReason"
                  name="partnershipReason"
                  value={data.partnershipReason}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>What Type of Partnership Are You Looking For?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {partnershipTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`partnership-${type}`}
                        name="partnershipType"
                        value={type}
                        checked={data.partnershipType.includes(type)}
                        onCheckedChange={(checked) =>
                          handleChange({
                            target: {
                              name: "partnershipType",
                              value: type,
                              type: "checkbox",
                              checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor={`partnership-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
                {data.partnershipType.includes("Other") && (
                  <Input
                    name="otherPartnershipType"
                    value={data.otherPartnershipType}
                    onChange={handleChange}
                    placeholder="Please specify"
                    className="mt-2"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience/Market</Label>
                <Textarea
                  id="targetAudience"
                  name="targetAudience"
                  value={data.targetAudience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="collaborationVision">How Do You Envision Our Collaboration? (Max 300 words)</Label>
                <Textarea
                  id="collaborationVision"
                  name="collaborationVision"
                  value={data.collaborationVision}
                  onChange={handleChange}
                  required
                  className="h-32"
                />
              </div>
            </div>

            {/* Section 4: Supporting Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Section 4: Supporting Information</h2>
              
              <div>
                <Label htmlFor="proposalFile">Upload Business Proposal or Pitch Deck (Optional)</Label>
                <Input
                  id="proposalFile"
                  name="proposalFile"
                  type="file"
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="comments">Additional Comments or Questions</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  value={data.comments}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={data.agreeTerms}
                  onCheckedChange={(checked) =>
                    handleChange({
                      target: {
                        name: "agreeTerms",
                        type: "checkbox",
                        checked,
                      },
                    })
                  }
                />
                <Label htmlFor="agreeTerms" className="text-sm">
                  By submitting this form, I confirm that the information provided is accurate to the best of my knowledge. 
                  I agree to be contacted by the 99 Partners team regarding this application.
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Your Application"}
            </Button>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Join;