import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus, Minus } from 'lucide-react'; // Assuming lucide-react is installed for icons

const FAQs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // FAQ data structure
  const faqs = [
    {
      question: 'What is 99 Partners?',
      answer: '99 Partners is a platform that empowers businesses through strategic partnerships across digital commerce, IT & marketing, financial services, and spiritual wellness.',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can reach out to us via email at hello@99partners.com or visit our <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</Link> page.',
    },
    {
      question: 'How do I create an account?',
      answer: 'To create an account, visit the <Link to="/join" className="text-blue-600 dark:text-blue-400 hover:underline">Join Us</Link> page and follow the registration steps.',
    },
    {
      question: 'What services do you offer?',
      answer: 'We offer services in digital commerce, IT & marketing, financial services, and spiritual wellness. Explore more on our <Link to="/domains" className="text-blue-600 dark:text-blue-400 hover:underline">Domains</Link> page.',
    },
    {
      question: 'Why am I seeing a blank page?',
      answer: 'A blank page might occur due to a network issue or an unhandled error. Please clear your browser cache or contact us for assistance.',
    },
    {
      question: 'How can I reset my password?',
      answer: 'Password reset options are available on the login page. If you need further help, email us at hello@99partners.com.',
    },
    {
      question: 'Contact Us',
      answer: 'If you have any additional questions, please contact us: <ul className="list-disc list-inside ml-4"><li>By email: hello@99partners.com</li><li>By visiting this page on our website: <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</Link></li></ul>',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <Header />

      <main className="pt-32 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Frequently Asked Questions</h1>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                  {openIndex === index ? <Minus className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                </button>
                <div className={openIndex === index ? 'p-4 bg-white dark:bg-gray-900' : 'hidden'}>
                  <p className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQs;