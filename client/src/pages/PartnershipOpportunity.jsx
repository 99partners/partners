import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const PartnershipOpportunity = () => {
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
      // Simulate form submission (replace with API call if needed)
      setSubmitStatus({
        type: "success",
        message: "Thank you for your interest! We’ll contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setSubmitStatus({
        type: "error",
        message: "Please fix the errors in the form.",
      });
    }
  };

  const benefits = [
    "Diverse Ecosystem: Access a wide array of fields—e-commerce, IT, finance, wellness, and more—all under one roof.",
    "Cross-Functional Collaboration: Join forces with industry leaders, innovative brands, and service experts to unlock new opportunities.",
    "Unparalleled Reach: Expand your span across untapped markets and customer bases with our robust network.",
    "Shared Resources: Leverage cutting-edge tools, insights, and expertise to accelerate your growth.",
    "Co-Branding Opportunities: Build credibility and visibility by collaborating with trusted names in the industry.",
  ];

  const whyPartnerItems = [
    {
      title: "Join a Thriving Ecosystem",
      subItems: [
        "Digital Commerce: From co-branding to product marketing.",
        "IT & Marketing Services: Cutting-edge solutions for modern businesses.",
        "Financial Services: Access SME loans and funding opportunities.",
        "Spiritual & Wellness Initiatives: Collaborate with experts in yoga, Ayurveda, and more.",
      ],
    },
    {
      title: "Expand Your Reach",
      subItems: [
        "Tap into new markets.",
        "Reach a wider audience.",
        "Amplify your brand visibility.",
      ],
    },
    {
      title: "Unmatched Benefits",
      subItems: [
        "Cross-Functional Collaboration: Work with industry leaders and innovators.",
        "Exclusive Growth Opportunities: Co-branding, joint ventures, and more.",
        "Tailored Support: Expert guidance and shared resources to drive success.",
      ],
    },
    {
      title: "Diverse Fields Under One Umbrella",
      description:
        "We bring together businesses from various domains, creating endless opportunities for innovation and synergies.",
    },
  ];

  const whoShouldPartner = [
    "Entrepreneurs & Startups: Ready to take their business to the next level.",
    "Established Brands: Looking for innovative collaborations.",
    "Service Providers: Seeking growth through resource sharing and networking.",
    "Innovators: With unique products or services that align with our ecosystem.",
  ];

  const whatSetsUsApart = [
    "Comprehensive Ecosystem: From e-commerce to financial services, IT to wellness—everything you need is here.",
    "Golden Collaboration: Join hands with leading brands and trusted partners.",
    "Future-Ready Solutions: Stay ahead with cutting-edge tools, strategies, and technology.",
  ];

  const howItWorks = [
    "Submit Your Interest: Fill out our quick application form.",
    "Collaborative Planning: We’ll design a tailored partnership plan that meets your goals.",
    "Mutual Growth: Work with us to achieve your business objectives through synergy and innovation.",
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
                Partnership Opportunity with <br />
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  99 Partners
                </span>
              </h1>
              <p className="text-xl text-muted-foreground dark:text-neutral-300">
                A Golden Opportunity Awaits You!
              </p>
              <p className="text-lg text-muted-foreground dark:text-neutral-300 max-w-3xl mx-auto">
                Join the 99 Partners Ecosystem and unlock a world of growth,
                collaboration, and unmatched opportunities across diverse
                industries.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border rounded-2xl p-8 glass fade-in-up">
                <h2 className="text-3xl font-bold text-card-foreground dark:text-white mb-6">
                  Unmatched Benefits of Partnering with Us
                </h2>
                <ul className="space-y-4 text-lg text-muted-foreground dark:text-neutral-300">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner with Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-card-foreground dark:text-white text-center mb-12 fade-in-up">
                Why Partner with Us?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {whyPartnerItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-card border rounded-xl p-6 glass fade-in-right stagger-1"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="text-muted-foreground dark:text-neutral-300">
                        {item.description}
                      </p>
                    ) : (
                      <ul className="space-y-2 text-muted-foreground dark:text-neutral-300">
                        {item.subItems.map((subItem, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>{subItem}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border rounded-2xl p-8 glass fade-in-up">
                <h2 className="text-3xl font-bold text-card-foreground dark:text-white mb-6">
                  Who Should Partner with Us?
                </h2>
                <p className="text-lg text-muted-foreground dark:text-neutral-300 mb-4">
                  This partnership opportunity is ideal for:
                </p>
                <ul className="space-y-4 text-lg text-muted-foreground dark:text-neutral-300">
                  {whoShouldPartner.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl font-semibold mt-8 mb-3 text-purple-600 dark:text-purple-400">
                  What Sets Us Apart?
                </h3>
                <ul className="space-y-4 text-lg text-muted-foreground dark:text-neutral-300">
                  {whatSetsUsApart.map((item, index) => (
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

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border rounded-2xl p-8 glass fade-in-up">
                <h2 className="text-3xl font-bold text-card-foreground dark:text-white mb-6">
                  Your Partnership Journey
                </h2>
                <ol className="space-y-4 text-lg text-muted-foreground dark:text-neutral-300 list-decimal pl-6">
                  {howItWorks.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border rounded-2xl p-8 glass fade-in-up">
                <h2 className="text-3xl font-bold text-card-foreground dark:text-white mb-6">
                  What Our Partners Say
                </h2>
                <blockquote className="text-lg text-muted-foreground dark:text-neutral-300 italic border-l-4 border-purple-600 pl-4">
                  "Joining 99 Partners was the best decision we made! The
                  diverse opportunities and collaborative environment have been
                  instrumental in our success."
                  <cite className="block mt-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
                    — [Raj Shah, ARKinfoserv]
                  </cite>
                </blockquote>
                <h3 className="text-xl font-semibold mt-8 mb-3 text-purple-600 dark:text-purple-400">
                  Partner Success Stories
                </h3>
                <p className="text-lg text-muted-foreground dark:text-neutral-300">
                  Discover how brands like Nutraio, GudGoodlife, Joshidada.com,
                  and many others have achieved extraordinary growth through the
                  99 Partners ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnershipOpportunity;
