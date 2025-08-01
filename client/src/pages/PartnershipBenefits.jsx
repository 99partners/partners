import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const PartnershipBenefits = () => {
  const benefits = [
    {
      title: "Diverse Ecosystem Access",
      description:
        "Gain direct access to our broad ecosystem that spans multiple industries, opening doors to new opportunities and collaborations.",
      subItems: [
        "Digital Commerce: Co-brand and market e-commerce products with brands like Nutraio, GudGoodlife, RK Organic, and more.",
        "IT & Marketing: Access expert-driven IT solutions, performance marketing, and outsourcing services.",
        "Financial Services: SME loan support through trusted institutions like ICICI, Kotak, and Tata Capital.",
        "Spiritual Ecosystem: Collaborate on wellness initiatives, from yoga and meditation to Ayurveda and astrological services.",
      ],
    },
    {
      title: "Enhanced Visibility and Reach",
      description:
        "Leverage the 99 Partners’ platform to increase your brand’s exposure and connect with new audiences.",
      subItems: [
        "Increase visibility among a diverse audience.",
        "Tap into new markets across various industries.",
        "Co-brand with trusted names to build credibility and trust.",
      ],
    },
    {
      title: "Expert Support and Resources",
      description:
        "Benefit from our years of expertise and resources to grow your business effectively.",
      subItems: [
        "Strategic guidance to refine your offerings.",
        "Access to cutting-edge tools and technologies.",
        "Marketing and branding support tailored to your needs.",
      ],
    },
    {
      title: "Shared Success and Long-Term Growth",
      description:
        "Build win-win collaborations that foster sustainable growth and innovation.",
      subItems: [
        "Share resources, insights, and networks for mutual success.",
        "Build a sustainable growth model with long-term impact.",
        "Gain exclusive opportunities for innovation and expansion.",
      ],
    },
    {
      title: "Networking Opportunities",
      description:
        "Connect with industry leaders and like-minded businesses within our network.",
      subItems: [
        "Leading brands and innovators in your industry.",
        "Service providers and experts across multiple domains.",
        "Like-minded businesses aiming to achieve common goals.",
      ],
    },
    {
      title: "Tailored Collaboration Opportunities",
      description:
        "Customize partnerships to align with your specific business goals.",
      subItems: [
        "Co-Branding Solutions: Collaborate on campaigns that amplify both brands.",
        "Market Entry Support: Leverage our networks to establish yourself in new markets.",
        "Product Distribution: Access our vast distribution channels.",
        "Technology Integration: Seamlessly integrate our tools into your operations.",
      ],
    },
    {
      title: "Credibility and Trust",
      description:
        "Align your brand with a trusted name in multiple industries, enhancing your reputation.",
      subItems: [
        "Financial Leaders: ICICI, BOB, Kotak, Tata Capital.",
        "E-Commerce Brands: Nutraio, GudGoodlife, RK Organic, and others.",
        "IT Innovators: eBranding Studio, ARKinfoserv, Biztech.one.",
        "Spiritual Experts: Joshidada.com, Yoga Studio, Panchkarma Kutir, and more.",
      ],
    },
    {
      title: "Exclusive Growth Opportunities",
      description:
        "Participate in unique initiatives that drive innovation and expansion.",
      subItems: [
        "Strategic joint ventures.",
        "Pilot programs for new products or services.",
        "Special initiatives within our expanding ecosystem.",
      ],
    },
    {
      title: "Cost Efficiency",
      description:
        "Reduce costs through shared resources and collaborative efforts.",
      subItems: [
        "Marketing and branding efforts.",
        "Operational tools and technologies.",
        "Market research and analysis.",
      ],
    },
    {
      title: "Dedicated Partnership Support",
      description:
        "Receive personalized support to maximize the value of our collaboration.",
      subItems: [
        "A dedicated partnership manager for personalized support.",
        "Regular reviews to optimize our collaboration.",
        "Open communication channels for feedback and growth.",
      ],
    },
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
                Partnership Benefits with <br />
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  99 Partners
                </span>
              </h1>
              <p className="text-lg text-muted-foreground dark:text-neutral-300 max-w-3xl mx-auto">
                Collaborating with 99 Partners is a gateway to accessing a
                diverse ecosystem, leveraging expert resources, and driving
                mutual growth.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits List */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-card-foreground dark:text-white text-center mb-12 fade-in-up">
                Key Benefits of Partnering with Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-card border rounded-xl p-6 glass fade-in-right stagger-1"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-neutral-300 mb-4">
                      {benefit.description}
                    </p>
                    <ul className="space-y-2 text-muted-foreground dark:text-neutral-300">
                      {benefit.subItems.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnershipBenefits;
