import React from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <Header />

      <main className="pt-32 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Terms of Service</h1>
        <div className="prose lg:prose-lg mx-auto text-gray-700 dark:text-gray-300">
          <p>
            Welcome to 99partners.in! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our Site, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <p>
            You are responsible for safeguarding your password and for any activities or actions under your password, whether on our Service or a third-party service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are the exclusive property of 99 Partners and its licensors. The Service is protected by copyright, trademark, and other laws of India and foreign countries. Our trademarks may not be used without prior written consent.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party websites or services not owned or controlled by 99 Partners.
          </p>
          <p>
            99 Partners has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites. We shall not be liable for any damage or loss caused by use of or reliance on such content or services.
          </p>
          <p>
            We advise you to read the terms and conditions and privacy policies of any third-party websites you visit.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of the Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will cease. To terminate your account, discontinue using the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of Maharashtra, India, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision will not waive those rights. If any provision is held invalid, the remaining provisions remain in effect. These Terms constitute the entire agreement regarding our Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Changes</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. For material revisions, we will provide at least 30 days' notice prior to new terms taking effect, updated as of 20th June 2025, 03:48 PM IST. Material changes are determined at our discretion.
          </p>
          <p>
            By continuing to access or use our Service after revisions, you agree to be bound by the revised terms. If you disagree, stop using the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>By email: hello@99partners.com</li>
            <li>By visiting this page on our website: <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;