import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import DomainHighlights from '@/components/DomainHighlights';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>99Partners – Digital Commerce, Finance & Wellness Solutions</title>
        <meta name="description" content="Unlock growth with 99Partners: a strategic ecosystem offering digital commerce, IT services, financial advisory, and spiritual wellness solutions. Partner with us for AI-driven success." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="99Partners: AI-Driven Digital Commerce, Finance & Wellness" />
        <meta property="og:description" content="Empower your business with 99Partners’ digital commerce, IT, finance, and wellness solutions. Your partner in ONDC, ecommerce growth, and holistic success." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.99partners.in/" />
        <meta property="og:image" content="https://www.99partners.com/images/og-image.jpg" />
        <meta property="og:site_name" content="99Partners" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@99Partners" />
        <meta name="twitter:title" content="99Partners: AI-Driven Digital Commerce, Finance & Wellness" />
        <meta name="twitter:description" content="Partner with 99Partners for digital transformation through ecommerce, IT, financial services, ONDC, and spiritual wellness ecosystems." />
        <meta name="twitter:image" content="https://www.99partners.com/images/twitter-card-image.jpg" />
        <meta name="keywords" content="99Partners, digital commerce, ecommerce, ONDC, IT services, financial advisory, spiritual wellness, AI solutions, business consulting, SME loans, yoga, business partnerships, co-branding, ecommerce partners" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <DomainHighlights />
        <Footer />
      </div>
    </>
  );
};

export default Index;