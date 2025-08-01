import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WhyPartner = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: phoneValue });
      setErrors({
        ...errors,
        phone: phoneValue.length === 10 ? "" : "Phone number must be 10 digits",
      });
    } else if (name === "email") {
      setFormData({ ...formData, [name]: value });
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Please enter a valid email",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email)
      ? ""
      : "Please enter a valid email";
    const phoneError = validatePhone(formData.phone)
      ? ""
      : "Phone number must be 10 digits";

    setErrors({ email: emailError, phone: phoneError });

    if (!emailError && !phoneError) {
      // Simulate form submission (replace with actual API call if needed)
      setSubmitStatus({
        type: "success",
        message: "Thank you for your inquiry! We’ll contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setSubmitStatus({
        type: "error",
        message: "Please fix the errors in the form.",
      });
    }
  };

  const whyPartnerItems = [
    "Diverse Ecosystem: Gain access to a wide range of industries, from e-commerce and financial services to IT solutions and spiritual wellness.",
    "Collaborative Growth: We foster long-term partnerships that benefit all stakeholders.",
    "Expert Support: Leverage our expertise, resources, and technology to expand your reach and achieve success.",
    "Credibility: Work alongside leading brands and trusted names in multiple domains.",
  ];

  const whoCanPartnerItems = [
    "Entrepreneurs & Businesses: Looking to expand their reach and tap into new markets.",
    "Service Providers: Offering IT, marketing, financial, or wellness-related services.",
    "Brands: Seeking co-branding opportunities or support in digital commerce.",
    "Innovators: With unique ideas or products that align with our ecosystem.",
  ];

  const benefitsItems = [
    "Shared Success: Enjoy mutual growth with tailored strategies for your business.",
    "Enhanced Visibility: Be part of a trusted network that spans industries.",
    "Resource Sharing: Leverage our expertise, tools, and market insights.",
    "Co-Branding Opportunities: Collaborate on campaigns that amplify your brand.",
  ];

  const existingPartnerships = [
    {
      category: "Digital Commerce",
      partners: ["Nutraio", "GudGoodlife", "CHAA Tea", "and more"],
    },
    {
      category: "IT & Marketing",
      partners: ["eBranding Studio", "ARKinfoserv", "Biztech.one"],
    },
    {
      category: "Financial Services",
      partners: ["ICICI Bank", "BOB", "Kotak Bank", "Tata Capital"],
    },
    {
      category: "Spiritual Ecosystem",
      partners: [
        "Yoga Studio",
        "Panchkarma Kutir",
        "Joshidada.com",
        "and more",
      ],
    },
  ];

  const joinSteps = [
    "Submit Your Proposal: Fill out our partnership inquiry form with your details and ideas.",
    "Get in Touch: Our team will review your application and contact you for further discussions.",
    "Collaborate: Together, we’ll create a partnership plan that aligns with our mutual goals.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white fade-in-up">
                Partner with{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  99 Partners
                </span>
              </h1>
              <p className="text-xl text-muted-foreground dark:text-neutral-300">
                Collaborate. Innovate. Grow Together.
              </p>
              <p className="text-lg text-muted-foreground dark:text-neutral-300 max-w-3xl mx-auto">
                At 99 Partners, we believe in the power of partnerships to
                create opportunities, drive innovation, and unlock growth. Join
                our dynamic network and become part of a thriving ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* Why Partner with 99 Partners */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border rounded-2xl p-8 glass fade-in-up">
                <h2 className="text-3xl font-bold text-card-foreground dark:text-white mb-6">
                  Why Partner with 99 Partners?
                </h2>
                <ul className="space-y-4 text-lg text-muted-foreground dark:text-neutral-300">
                  {whyPartnerItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Partner with Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border rounded-2xl p-8 glass fade-in-up">
                <h2 className="text-3xl font-bold text-card-foreground dark:text-white mb-6">
                  Who Can Partner with Us?
                </h2>
                <p className="text-lg text-muted-foreground dark:text-neutral-300 mb-4">
                  We welcome partnerships from:
                </p>
                <ul className="space-y-4 text-lg text-muted-foreground dark:text-neutral-300">
                  {whoCanPartnerItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How You Benefit */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border rounded-2xl p-8 glass fade-in-up">
                <h2 className="text-3xl font-bold text-card-foreground dark:text-white mb-6">
                  How You Benefit
                </h2>
                <p className="text-lg text-muted-foreground dark:text-neutral-300 mb-4">
                  By partnering with us, you unlock:
                </p>
                <ul className="space-y-4 text-lg text-muted-foreground dark:text-neutral-300">
                  {benefitsItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Existing Partnerships */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-card-foreground dark:text-white text-center mb-12 fade-in-up">
                Our Existing Partnerships
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {existingPartnerships.map((category, index) => (
                  <div
                    key={index}
                    className="bg-card border rounded-xl p-6 glass fade-in-right stagger-1"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                      {category.category}
                    </h3>
                    <ul className="text-muted-foreground dark:text-neutral-300 space-y-2">
                      {category.partners.map((partner, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                          {partner}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Today */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border rounded-2xl p-8 glass fade-in-up">
                <h2 className="text-3xl font-bold text-card-foreground dark:text-white mb-6">
                  Join Us Today!
                </h2>
                <p className="text-lg text-muted-foreground dark:text-neutral-300 mb-4">
                  Partnering with 99 Partners is easy. Here’s how:
                </p>
                <ol className="space-y-4 text-lg text-muted-foreground dark:text-neutral-300 list-decimal pl-6">
                  {joinSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyPartner;
