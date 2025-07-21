import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      title: 'Collaborative Synergy',
      description: 'We believe the greatest solutions emerge from the collective intelligence, diverse skills, and shared commitment of our partner network. We actively foster collaboration and knowledge sharing.',
    },
    {
      title: 'Empowered Partnership',
      description: 'We build deep, trust-based relationships - empowering our partners to excel and our clients to succeed. Mutual respect and shared goals are fundamental.',
    },
    {
      title: 'Integrity & Trust',
      description: 'We operate with unwavering ethical standards, transparency, and reliability. Trust is the bedrock of every partnership within our network and every interaction with our clients.',
    },
    {
      title: 'Specialised Excellence',
      description: 'We attract and empower partners who are leaders in their specific domains (Commerce, AI, Finance, Wellness). We champion deep expertise and exceptional execution in every service delivered.',
    },
    {
      title: 'Holistic Prosperity',
      description: 'Our network is united by the belief that true success integrates material achievement with spiritual and personal well-being. We offer pathways to financial health, business growth, and inner harmony.',
    },
    {
      title: 'Client-Centric Agility',
      description: 'Our diverse partner network allows us to listen deeply, adapt swiftly, and assemble the perfect team of experts to meet each client\'s unique and evolving needs.',
    },
    {
      title: 'Collective Impact',
      description: 'We measure success not just individually, but by the amplified positive impact we create together for our clients and communities through our combined efforts.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
      <Header />
      
      <main className="pt-20">
        {/* Company Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white fade-in-up">
                About 99{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Partners
                </span>
              </h1>
              <p className="text-xl text-muted-foreground dark:text-neutral-300 fade-in-up stagger-1">
                To be the premier ecosystem where visionary partners converge to unlock transformative growth and holistic prosperity for businesses and individuals.
              </p>
            </div>
          </div>
        </section>  

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border rounded-2xl p-8 glass fade-in-up">
                <h2 className="text-3xl font-bold text-card-foreground dark:text-white mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground dark:text-neutral-300 leading-relaxed">
                  99 Partners.in connects clients with specialised, trusted partners across Digital Commerce, AI & IT, Financial Services, and Spiritual Wellness. Together, we deliver integrated, expert solutions that launch ventures, navigate complexity, fuel growth, and cultivate balance.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Core Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-card-foreground dark:text-white text-center mb-12 fade-in-up">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-card border rounded-xl p-6 glass fade-in-right stagger-1">
                    <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-neutral-300">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>        
      </main>

      <Footer />
    </div>
  );
};

export default About;