import React from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <Header />

      <main className="pt-32 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Cookie Policy</h1>
        <div className="prose lg:prose-lg mx-auto text-gray-700 dark:text-gray-300">
          <p>
            This Cookie Policy explains what cookies are, how 99 Partners uses cookies, how third-parties we may partner with use cookies on the Service, your choices regarding cookies, and further information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">What are cookies?</h2>
          <p>
            Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted when you close your browser.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">How 99 Partners Uses Cookies</h2>
          <p>
            When you use and access the Service, we may place a number of cookies in your web browser.
          </p>
          <p>
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>To enable certain functions of the Service</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
            <li>To enable advertisements delivery, including behavioral advertising</li>
          </ul>
          <p>
            We use both session and persistent cookies and different types:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Essential cookies:</strong> Used to authenticate users and prevent fraud.</li>
            <li><strong>Analytics cookies:</strong> Track usage to improve the Site and test new features.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Third-party Cookies</h2>
          <p>
            We may use third-party cookies to report usage statistics, deliver advertisements, and more.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">What are Your Choices Regarding Cookies?</h2>
          <p>
            You can delete cookies or instruct your browser to refuse them via its help pages.
          </p>
          <p>
            Note that deleting or refusing cookies may limit some features, affect preference storage, or cause pages to display improperly.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Where Can You Find More Information About Cookies?</h2>
          <p>
            Learn more at:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>AllAboutCookies: <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">http://www.allaboutcookies.org/</a></li>
            <li>Network Advertising Initiative: <a href="http://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">http://www.networkadvertising.org/</a></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Contact Us</h2>
          <p>
            If you have any questions about this Cookie Policy, please contact us:
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

export default CookiePolicy;