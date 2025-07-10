import React from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <Header />

      <main className="pt-32 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Privacy Policy</h1>
        <div className="prose lg:prose-lg mx-auto text-gray-700 dark:text-gray-300">
          <p>
            This Privacy Policy describes how 99 Partners ("we," "us," or "our") collects, uses, and discloses your personal information when you visit our website 99partners.in (the "Site") or engage with our services.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Information We Collect</h2>
          <p>
            We collect various types of information in connection with the services we provide, including:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Personal Information:</strong> This includes information you voluntarily provide when you contact us, subscribe to our newsletter, or fill out a form, such as your name, email address, phone number, and company name.</li>
            <li><strong>Usage Data:</strong> We automatically collect information on how the Site is accessed and used ("Usage Data"). This may include your computer's Internet Protocol address (e.g., IP address), browser type, browser version, pages visited, time and date of visit, time spent, unique device identifiers, and other diagnostic data.</li>
            <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track activity on our Site and store certain information. Cookies are files with a small amount of data, which may include an anonymous unique identifier.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
          <p>
            We use the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>To provide and maintain our Site</li>
            <li>To notify you about changes to our services</li>
            <li>To allow you to participate in interactive features when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our Site</li>
            <li>To monitor the usage of our Site</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To send you newsletters, marketing, or promotional materials if you have opted in</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Disclosure of Data</h2>
          <p>
            We may disclose your Personal Information in good faith if we believe it is necessary to:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of 99 Partners</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Site</li>
            <li>Protect the personal safety of users or the public</li>
            <li>Protect against legal liability</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Security of Data</h2>
          <p>
            The security of your data is important to us, but no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an update date of 20th June 2025, 03:48 PM IST. You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;