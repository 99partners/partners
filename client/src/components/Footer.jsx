import {
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { SiMedium } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/99 logo gradient.webp";
import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../lib/api";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return alert("Please enter an email.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert("Please enter a valid email address.");

    // Debug logging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Newsletter subscription attempt:', {
        endpoint: API_ENDPOINTS.newsletter,
        email: email
      });
    }

    try {
      const response = await axios.post(
        API_ENDPOINTS.newsletter,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Check for success (2xx status codes)
      if (response.status >= 200 && response.status < 300) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        alert("Subscription failed. Please try again later.");
      }
    } catch (error) {
      console.error("Subscription failed:", error);
      let errorMessage = "Subscription failed. Try again later.";

      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = error.response.data.message ||
          `Server responded with ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server";
      }

      alert(errorMessage);
    }
  };

  // const handleSubscribe = async () => {
  //   if (!email) return alert("Please enter an email.");
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) return alert("Please enter a valid email address.");

  //   try {
  //     const response = await axios.post("https://api.99partners.in/api/newsletter", { email });
  //     if (response.status === 200) {
  //       setIsSubmitted(true);
  //       setEmail('');
  //     }
  //   } catch (error) {
  //     console.error("Subscription failed:", error);
  //     alert("Subscription failed. Try again later.");
  //   }
  // };

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Domains', path: '/domains' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  const domains = [
    { name: "99digicom.com", url: "https://99digicom.com" },
    { name: "99infosource.com", url: "https://99infosource.com" },
    { name: "99finserv.com", url: "https://99finserv.com" },
    { name: "harmonyhights.com", url: "https://harmonyhights.com" },
  ];

  const helpLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
    { name: 'FAQs', path: '/faqs' },
  ];

  const socialLinks = [
    { icon: Linkedin, url: 'https://www.linkedin.com/company/99-partners-digicom-private-limited/', label: 'LinkedIn' },
    { icon: FaXTwitter, url: 'https://x.com/99_partners', label: 'X' },
    { icon: Instagram, url: 'https://www.instagram.com/99partners__?utm_source=qr&igsh=MWtseXBzNHI2YThjbA==', label: 'Instagram' },
    { icon: Youtube, url: 'https://www.youtube.com/@99Partners', label: 'Youtube' },
    { icon: SiMedium, url: 'https://medium.com/@99partners.in', label: 'Medium' },
  ];

  const addresses = [
    {
      country: 'India',
      details: 'Ahmedabad, Gujarat, India',
      mapLink: 'https://maps.google.com/?q=Titanium+City+Center,+Satellite,+Ahmedabad,+380015',
    },
    {
      country: 'United States',
      details: 'Dover, Delaware, USA',
      mapLink: 'https://maps.google.com/?q=8+The+Green+STE+B,+Dover,+Delaware+19901',
    },
    {
      country: 'Australia',
      details: 'Sydney, NSW, Australia',
      mapLink: 'https://maps.google.com/?q=Level+13/50+Carrington+Street,+Sydney,+NSW,+Australia,+2000',
    },
    {
      country: 'India',
      details: 'Bhavnagar, Gujarat, India',
      mapLink: 'https://maps.app.goo.gl/Wq8ACCPD6HafkqFh8',
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="w-14 h-14 rounded-xl overflow-hidden">
                <img
                  src={logo}
                  alt="99 Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className="text-2xl font-bold"
                style={{
                  background: "linear-gradient(90deg, #7B2CBF, #D15FEE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Partners
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering businesses through strategic partnerships across digital commerce, IT & marketing, financial services, and spiritual wellness.
            </p>

            <div className="text-sm text-gray-400 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>hello@99partners.com</span>
              </div>
              <div className="grid gap-2">
                {addresses.map((address, i) => (
                  <a
                    key={i}
                    href={address.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-red-300 transition-colors text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-md text-sm"
                  >
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>{address.details}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.path} className="hover:text-white transition-colors">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-4">Our Domains</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {domains.map((domain, i) => (
                    <li key={i}>
                      <a
                        href={domain.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                      >
                        {domain.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-4">Help & Support</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {helpLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.path} className="hover:text-white transition-colors">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-4">Stay Connected</h3>
                <p className="text-sm text-gray-300">
                  Subscribe to our newsletter for updates on new partnerships and opportunities.
                </p>

                {/* ✅ Fixed responsive layout for Nest Hub and smaller screens */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full sm:flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>

                {isSubmitted && (
                  <p className="text-green-400 text-sm mt-1">Subscribed successfully!</p>
                )}

                <div>
                  <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map(({ icon: Icon, url, label }, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        aria-label={label}
                        className="w-9 h-9 bg-gray-800 rounded-md flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-transform hover:scale-110"
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          © {currentYear} 99 Partners. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
