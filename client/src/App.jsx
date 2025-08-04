import "./App.css";
import { useState, useEffect } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from "sonner";
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
import WhyPartner from "./pages/Whypartner";
import PartnershipBenefits from "./pages/PartnershipBenefits";
import PartnershipOpportunity from "./pages/PartnershipOpportunity";

// Admin Components
import AuthLayout from "./components/admin/components/AuthLayout";
import AdminLayout from "./components/admin/components/AdminLayout";
import Dashboard from "./components/admin/components/Dashboard";
import BlogManagement from "./components/admin/components/BlogManagement";
import UserManagement from "./components/admin/components/UserManagement";
import PartnerManagement from "./components/admin/components/PartnerManagement";
import ContactManagement from "./components/admin/components/ContactManagement";
import Login from "./components/admin/components/Login";

import "./components/admin/styles/main.css";
import "./components/admin/styles/responsive.css";

const queryClient = new QueryClient();

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin-user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      const { credential } = credentialResponse;
      if (!credential) return;

      try {
        const payload = decodeJwt(credential);
        console.log("✅ Decoded Payload:", payload);

        // Update the endpoint to match the server route
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google`, {
          credential
        });

        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUser(res.data.user);
          setIsAuthenticated(true);
        }

        console.log("🔐 Auth response:", res.data);
      } catch (error) {
        console.error("❌ Error authenticating:", error);
      }
    },
    onError: (error) => {
      console.error("❌ Google One Tap Error:", error);
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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster theme="dark" position="bottom-right" />
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
            <Route path="/whypartner" element={<WhyPartner />} />
            <Route path="/partnerbenefits" element={<PartnershipBenefits />} />
            <Route
              path="/partneroppotunity"
              element={<PartnershipOpportunity />}
            />

            {/* Admin Login */}
            <Route element={<AuthLayout />}>
              <Route
                path="/admin/login"
                element={<Login onLogin={handleLogin} />}
              />
            </Route>

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="blogs" element={<BlogManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="partners" element={<PartnerManagement />} />
              <Route path="contacts" element={<ContactManagement />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
