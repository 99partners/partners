import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      title: 'Collaboration',
      description: 'Building strong partnerships through mutual trust and shared goals',
    },
    {
      title: 'Innovation',
      description: 'Embracing cutting-edge solutions to drive business transformation',
    },
    {
      title: 'Inclusivity',
      description: 'Creating opportunities for businesses of all sizes to thrive',
    },
    {
      title: 'Impact',
      description: 'Delivering measurable results that accelerate growth and success',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
      <Header />
      
      <main className="pt-20">
        {/* Company Vision & Mission */}
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
                Empowering businesses and individuals with robust partnerships and cutting-edge solutions
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
                  To create a dynamic ecosystem that connects businesses across diverse industries, 
                  fostering meaningful partnerships that drive innovation, growth, and sustainable success. 
                  We believe in the power of collaboration to transform ideas into impactful solutions 
                  that benefit businesses, communities, and individuals alike.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-card-foreground dark:text-white text-center mb-12 fade-in-up">Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border rounded-xl p-6 glass fade-in-right">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">John Doe</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">CEO - Leading strategic vision and growth initiatives</p>
                </div>
                <div className="bg-card border rounded-xl p-6 glass fade-in-right stagger-1">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Jane Smith</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">CTO - Driving technological innovation and solutions</p>
                </div>
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

        {/* Timeline / Evolution of Verticals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-card-foreground dark:text-white text-center mb-12 fade-in-up">Timeline / Evolution of Verticals</h2>
              <div className="space-y-8">
                <div className="bg-card border rounded-xl p-6 glass fade-in-right">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">2020 - Founding</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">Established 99 Partners with a focus on digital commerce solutions.</p>
                </div>
                <div className="bg-card border rounded-xl p-6 glass fade-in-right stagger-1">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">2022 - IT & Marketing Expansion</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">Introduced IT and marketing services to support business growth.</p>
                </div>
                <div className="bg-card border rounded-xl p-6 glass fade-in-right stagger-2">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">2024 - Financial Services Launch</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">Launched financial services to aid SME funding.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Summary (Clients, Projects, Metrics) */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-card-foreground dark:text-white text-center mb-12 fade-in-up">Impact Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border rounded-xl p-6 glass fade-in-right">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Clients</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">Served over 500 clients across various industries.</p>
                </div>
                <div className="bg-card border rounded-xl p-6 glass fade-in-right stagger-1">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Projects</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">Completed 200+ successful projects in the last 5 years.</p>
                </div>
                <div className="bg-card border rounded-xl p-6 glass fade-in-right stagger-2">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Metrics</h3>
                  <p className="text-muted-foreground dark:text-neutral-300">Achieved 30% average growth rate for client businesses.</p>
                </div>
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