import "./App.css";
import { useState, useEffect } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Domains from "./pages/Domains";
import Blogs from "./pages/Blogs";
import BlogDetail from "./components/BlogDetail";
import Contact from "./pages/Contact";
import Join from "./pages/Join";
import FAQs from "./pages/faqs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";

// Admin Components
import Sidebar from "./components/admin/components/Sidebar";
import Header from "./components/admin/components/Header";
import Dashboard from "./components/admin/components/Dashboard";
import BlogManagement from "./components/admin/components/BlogManagement";
import UserManagement from "./components/admin/components/UserManagement";
import PartnerManagement from "./components/admin/components/PartnerManagement";
import ContactManagement from "./components/admin/components/ContactManagement";
import Login from "./components/admin/components/Login";

import "./components/admin/styles/main.css";
import "./components/admin/styles/responsive.css";

const queryClient = new QueryClient();

const AdminLayout = ({ user, onLogout, activeTab, setActiveTab, children }) => (
  <div className="admin-panel">
    <Sidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={onLogout}
    />
    <div style={{ width: "100%" }}>
      <Header user={user} onLogout={onLogout} />
      <main className="main-content">{children}</main>
    </div>
  </div>
);

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    const storedUser = localStorage.getItem("admin-user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Google One Tap Login - only show when not authenticated
   useGoogleOneTapLogin({
      onSuccess: async (credentialResponse) => {
        const { credential } = credentialResponse;
        if (!credential) return;
  
        try {
          const payload = decodeJwt(credential);
          console.log('✅ Decoded Payload:', payload);
  
          const res = await axios.get('http://localhost:5050/protected', {
            headers: {
              Authorization: `Bearer ${credential}`,
            },
          });
  
          console.log('🔐 Protected route response:', res.data);
  
          // You can store user info in localStorage, Context, etc.
          // localStorage.setItem('user', JSON.stringify(res.data.user));
  
        } catch (error) {
          console.error('❌ Error verifying user:', error);
        }
      },
      onError: (error) => {
        console.error('❌ Google One Tap Error:', error);
      },
    });

  const handleLogin = () => {
    const storedUser = localStorage.getItem("admin-user");
    setUser(JSON.parse(storedUser));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const renderAdminContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Blog":
        return <BlogManagement />;
      case "Users":
        return <UserManagement />;
      case "Partner":
        return <PartnerManagement />;
      case "Contact":
        return <ContactManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join" element={<Join />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/faqs" element={<FAQs />} />
            {/* Catch-all route */}

            {/* Admin Login */}
            <Route
              path="/admin/login"
              element={<Login onLogin={handleLogin} />}
            />

            {/* Protected Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AdminLayout
                    user={user}
                    onLogout={handleLogout}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  >
                    {renderAdminContent()}
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
