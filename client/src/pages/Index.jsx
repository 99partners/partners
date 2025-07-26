import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import DomainHighlights from '@/components/DomainHighlights';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <DomainHighlights />
      <Footer />
    </div>
  );
};

export default Index;