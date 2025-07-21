import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/99 logo gradient.webp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Domains", path: "/domains" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleJoinUsClick = () => {
    setIsMenuOpen(false);
    navigate("/join");
  };

  return (
    <header
      className="fixed top-0 w-full z-50 glass shadow-lg transition-all duration-500"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-1 group" aria-label="99 Partners Home">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 overflow-hidden">
                <img
                  src={logo}
                  alt="99 Partners Logo"
                  className="w-full h-full object-contain"
                  style={{ width: '64px', height: '64px' }}
                />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
              Partners
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-primary group ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                    isActive(item.path) ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleJoinUsClick}
              className="btn-modern text-sm hover-glow"
              aria-label="Join Us"
            >
              Join Us
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 rotate-90" : "opacity-100"
                  }`}
                  size={24}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "opacity-100" : "opacity-0 -rotate-90"
                  }`}
                  size={24}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-6 border-t border-white/10" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleJoinUsClick}
                className="btn-modern text-sm w-fit mt-4"
                aria-label="Join Us"
              >
                Join Us
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;