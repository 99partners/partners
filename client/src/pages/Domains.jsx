import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ShoppingCart, Laptop, IndianRupee, Heart } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const Domains = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Debugging: Log rendering and activeTab
  console.log("Domains component rendering, Active Tab:", activeTab);

  const domains = [
    {
      id: "digital-commerce",
      icon: ShoppingCart,
      title: "Digital Commerce",
      domain: "99digicom.com",
      color: "green",
      overview:
        "Comprehensive e-commerce solutions helping businesses establish and grow their online presence through ONDC integration and co-branding opportunities.",
      services: [
        "ONDC marketplace integration",
        "E-commerce platform development",
        "Co-branding for product lines",
        "Digital catalog management",
        "Payment gateway integration",
        "Inventory management systems",
        "Customer relationship management",
        "Analytics and reporting tools",
      ],
      image: "/assets/DigitalCommerce_Mohit99.webp",
    },
    {
      id: "it-marketing",
      icon: Laptop,
      title: "AI & IT Services",
      domain: "99infosource.com",
      color: "blue",
      overview:
        "Complete outsourcing solutions and digital strategy services to help businesses optimize operations and enhance their market presence.",
      services: [
        "Knowledge Process Outsourcing (KPO)",
        "Business Process Outsourcing (BPO)",
        "Legal Process Outsourcing (LPO)",
        "Digital marketing strategy",
        "IT infrastructure development",
        "Software development services",
        "Content creation and management",
        "SEO and digital advertising",
      ],
      image: "/assets/IT_Services_Mohit99.webp",
    },
    {
      id: "financial-services",
      icon: IndianRupee,
      title: "Financial Services",
      domain: "99finserv.com",
      color: "purple",
      overview:
        "Comprehensive financial solutions including SME loan facilitation and customized funding support to help businesses access the capital they need.",
      services: [
        "SME loan facilitation",
        "Working capital financing",
        "Equipment financing",
        "Business credit solutions",
        "Financial planning and advisory",
        "Investment guidance",
        "Insurance solutions",
        "Tax planning and compliance",
      ],
      image: "/assets/Financial_Service_Mohit99.webp",
    },
    {
      id: "spiritual-ecosystem",
      icon: Heart,
      title: "Spiritual Ecosystem",
      domain: "harmonyhights.com",
      color: "orange",
      overview:
        "Holistic wellness solutions encompassing ancient wisdom and modern practices to promote physical, mental, and spiritual well-being. ",
      services: [
        "Yoga and meditation programs",
        "Panchkarma treatments",
        "Ayurvedic consultations",
        "Astrology and horoscope services",
        "Ritual ceremonies (Karmkand)",
        "Star gazing and cosmic awareness",
        "Spiritual counseling",
        "Wellness retreats and workshops",
      ],
      image: "/assets/Spritual_Support_Mohit99.webp",
    },
  ];

  const getColorClasses = (color, variant = "primary") => {
    const colors = {
      blue: {
        primary: "text-blue-600 bg-blue-50 border-blue-200",
        secondary: "bg-blue-500 text-white",
        accent: "text-blue-600",
      },
      green: {
        primary: "text-green-600 bg-green-50 border-green-200",
        secondary: "bg-green-500 text-white",
        accent: "text-green-600",
      },
      purple: {
        primary: "text-purple-600 bg-purple-50 border-purple-200",
        secondary: "bg-purple-500 text-white",
        accent: "text-purple-600",
      },
      orange: {
        primary: "text-orange-600 bg-orange-50 border-orange-200",
        secondary: "bg-orange-500 text-white",
        accent: "text-orange-600",
      },
    };
    console.log(`Color classes for ${color} (${variant}):`, colors[color][variant]);
    return colors[color][variant];
  };

  return (
    <>
      <Helmet>
        <title>99Partners Domains – Digital Commerce, IT, Finance, Wellness</title>
        <meta name="description" content="Explore 99Partners' business domains: digital commerce, IT services, financial solutions, and spiritual wellness. Discover how we empower growth across sectors." />
        <meta property="og:title" content="99Partners Domains – Digital Commerce, IT, Finance, Wellness" />
        <meta property="og:description" content="Explore 99Partners' business domains: digital commerce, IT services, financial solutions, and spiritual wellness." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.99partners.in/domains" />
        <meta property="og:image" content="https://www.99partners.com/images/og-image.jpg" />
        <meta property="og:site_name" content="99Partners" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@99Partners" />
        <meta name="twitter:title" content="99Partners Domains – Digital Commerce, IT, Finance, Wellness" />
        <meta name="twitter:description" content="Explore 99Partners' business domains: digital commerce, IT services, financial solutions, and spiritual wellness." />
        <meta name="twitter:image" content="https://www.99partners.com/images/twitter-card-image.jpg" />
        <meta name="keywords" content="99Partners, domains, digital commerce, ecommerce, IT services, financial advisory, spiritual wellness, AI, business consulting, SME loans, yoga, business partnerships" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
        <Header />
        <main className="pt-20">
         
          {/* Hero Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white">
                  Business <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Domains</span>
                </h1>
                <p className="text-xl text-muted-foreground dark:text-neutral-300">
                  Explore our comprehensive portfolio across four strategic business verticals
                </p>
              </div>
            </div>
          </section>

          {/* Tab Navigation */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {domains.map((domain, index) => {
                  const Icon = domain.icon;
                  const active = activeTab === index;
                  const gradient = {
                    green: "from-green-500 to-emerald-600",
                    blue: "from-blue-500 to-indigo-600",
                    purple: "from-purple-500 to-fuchsia-600",
                    orange: "from-orange-500 to-amber-600",
                  }[domain.color];

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        console.log("Tab clicked:", index);
                        setActiveTab(index);
                      }}
                      className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 hover-glow ${
                        active
                          ? `bg-gradient-to-r ${gradient} text-white`
                          : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="hidden sm:inline">{domain.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="max-w-6xl mx-auto">
                {domains.map((domain, index) => {
                  if (activeTab !== index) return null;
                  const Icon = domain.icon;
                  return (
                    <div key={index} className="space-y-8">
                      <div className="bg-card border rounded-2xl p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getColorClasses(domain.color)}`}>
                            <Icon className="w-8 h-8" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-card-foreground dark:text-white">{domain.title}</h2>
                            <p className="text-muted-foreground font-medium text-lg dark:text-neutral-300">{domain.domain}</p>
                          </div>
                        </div>
                        <p className="text-lg text-muted-foreground dark:text-neutral-300 leading-relaxed">
                          {domain.overview}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Services Section - Takes 2/3 of the space */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-gray-100 dark:border-slate-700 rounded-2xl p-8 shadow-lg">
                          <div className="flex items-center gap-3 mb-8">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(domain.color)}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-card-foreground dark:text-white">
                              Services Offered
                            </h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {domain.services.map((service, serviceIndex) => (
                              <div 
                                key={serviceIndex} 
                                className={`group relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-${domain.color}-300 dark:hover:border-${domain.color}-500`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getColorClasses(domain.color, "secondary")} group-hover:scale-110 transition-transform duration-300`}></div>
                                  <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                                    {service}
                                  </span>
                                </div>
                                {/* Subtle gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${
                                  domain.color === 'green' ? 'from-green-50 to-emerald-50' :
                                  domain.color === 'blue' ? 'from-blue-50 to-indigo-50' :
                                  domain.color === 'purple' ? 'from-purple-50 to-fuchsia-50' :
                                  'from-orange-50 to-amber-50'
                                } dark:from-slate-700 dark:to-slate-600 opacity-0 group-hover:opacity-30 rounded-xl transition-opacity duration-300 pointer-events-none`}></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Image Section - Takes 1/3 of the space with better positioning */}
                        <div className="lg:col-span-1 relative">
                          <div className="sticky top-8">
                            <div className={`bg-gradient-to-br ${
                              domain.color === 'green' ? 'from-green-100 to-emerald-200' :
                              domain.color === 'blue' ? 'from-blue-100 to-indigo-200' :
                              domain.color === 'purple' ? 'from-purple-100 to-fuchsia-200' :
                              'from-orange-100 to-amber-200'
                            } dark:from-slate-700 dark:to-slate-800 border-2 ${
                              domain.color === 'green' ? 'border-green-200' :
                              domain.color === 'blue' ? 'border-blue-200' :
                              domain.color === 'purple' ? 'border-purple-200' :
                              'border-orange-200'
                            } dark:border-slate-600 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]`}>
                              <div className="relative overflow-hidden rounded-xl">
                                <img
                                  src={domain.image}
                                  alt={domain.title}
                                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                                  onError={() => console.log(`Failed to load image: ${domain.image}`)}
                                />
                                {/* Subtle overlay for better image integration */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${
                                  domain.color === 'green' ? 'from-green-900/10 to-transparent' :
                                  domain.color === 'blue' ? 'from-blue-900/10 to-transparent' :
                                  domain.color === 'purple' ? 'from-purple-900/10 to-transparent' :
                                  'from-orange-900/10 to-transparent'
                                } opacity-0 hover:opacity-100 transition-opacity duration-300`}></div>
                              </div>
                              
                              {/* Domain badge */}
                              <div className="mt-4 text-center">
                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getColorClasses(domain.color)} shadow-sm`}>
                                  {domain.domain}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Domains;
