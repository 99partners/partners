import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Laptop,
  IndianRupee,
  Heart,
  ArrowRight,
} from "lucide-react";

const DomainHighlights = () => {
  const domains = [
    {
      icon: ShoppingCart,
      title: "Digital Commerce",
      description:
        "ONDC integration, e-commerce solutions, and co-branding opportunities for modern businesses.",
      backContent: ["Launch", "Manage", "Grow", "Co-Branding"],
      color: "from-green-500 to-green-500",
      darkColor: "dark:from-cyan-400 dark:to-green-500",
      bgColor: "bg-green-50 dark:bg-cyan-900/20",
      delay: "0.1s",
    },
    {
      icon: Laptop,
      title: "AI & IT Services",
      description:
        "Complete KPO, BPO, LPO services with cutting-edge digital strategy development.",
      backContent: [
        "Artificial Intelligence",
        "Data Engineering",
        "Generative AI",
        "DevOps",
        "Development Services",
      ],
      color: "from-blue-500 to-blue-500",
      darkColor: "dark:from-emerald-400 dark:to-green-500",
      bgColor: "bg-blue-50 dark:bg-emerald-900/20",
      delay: "0.2s",
    },
    {
      icon: IndianRupee,
      title: "Financial Services",
      description:
        "SME loan facilitation and tailored funding support solutions for scalable business growth.",
      backContent: [
        "Banking & Landing Services",
        "Capital Market Services",
        "Accounting Audit Advisory",
        "Corporate Finance Advisory",
        "Fintech Services",
      ],
      color: "from-purple-500 to-violet-500",
      darkColor: "dark:from-purple-400 dark:to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      delay: "0.3s",
    },
    {
      icon: Heart,
      title: "Spiritual Ecosystem",
      description:
        "Holistic wellness through yoga, Ayurveda, astrology, and spiritual guidance.",
      backContent: [
        "Wellness & Rejuvenation",
        "Spiritual & Astrological",
        "Star Gazing",
      ],
      color: "from-orange-500 to-pink-500",
      darkColor: "dark:from-pink-400 dark:to-orange-500",
      bgColor: "bg-orange-50 dark:bg-pink-900/20",
      delay: "0.4s",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 -mt-10 relative overflow-hidden">
      <style>{`
        .flip-card {
          perspective: 1200px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s ease-in-out;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg) scale(1.08);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          backface-visibility: hidden;
        }
        .flip-card-front {
          z-index: 2;
          transform: rotateY(0deg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Explore Our <span className="gradient-text">Business Domains</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover comprehensive solutions across four strategic verticals
            designed to accelerate your business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={index}
                className="flip-card min-h-[20rem] md:min-h-[22rem] lg:min-h-[24rem] rounded-2xl"
                style={{ animationDelay: domain.delay }}
              >
                <div className="flip-card-inner rounded-2xl shadow-xl">
                  {/* Front Side */}
                  <div
                    className={`flip-card-front glass p-6 sm:p-8 rounded-2xl ${domain.bgColor}`}
                  >
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 mb-5 rounded-2xl bg-gradient-to-r ${domain.color} ${domain.darkColor} p-3 shadow-md`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {domain.title}
                    </h3>
                  </div>

                  {/* Back Side */}
                  <div
                    className={`flip-card-back glass p-6 sm:p-8 text-center rounded-2xl ${domain.bgColor}`}
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                      {domain.title}
                    </h3>
                    <ul className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                      {domain.backContent.map((item, idx) => (
                        <li key={idx} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/domains"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16">
          <a
            href="/domains"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:brightness-110 transition shadow-lg"
          >
            Explore Solutions
          </a>

          <a
            href="/contact"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:brightness-110 transition shadow-lg"
          >
            Talk to Our Experts
          </a>
        </div>
      </div>
    </section>
  );
};

export default DomainHighlights;
