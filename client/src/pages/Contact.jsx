import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import {
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Headphones,
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email for detailed inquiries",
      contact: "hello@99partners.com",
      action: "mailto:hello@99partners.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant support through our chat system",
      contact: "Available 24/7",
      action: "#",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Headphones,
      title: "Support Center",
      description: "Access our comprehensive help resources",
      contact: "Help Center",
      action: "#",
      color: "from-orange-500 to-pink-500",
    },
  ];

  const offices = [
    {
      city: "Ahmedabad",
      address: "E 608, Titanium City Center, Satellite, Ahmedabad, 380015",
      email: "ahmedabad@99partners.com",
      mapLink: "https://maps.google.com/?q=Titanium+City+Center,+Satellite,+Ahmedabad,+380015",
    },
    {
      city: "Dover",
      address: "8 The Green STE B, Dover, Delaware 19901",
      email: "dover@99partners.com",
      mapLink: "https://maps.google.com/?q=8+The+Green+STE+B,+Dover,+Delaware+19901",
    },
    {
      city: "Sydney",
      address: "Level 13/50 Carrington Street, Sydney, NSW, Australia, 2000",
      email: "sydney@99partners.com",
      mapLink: "https://maps.google.com/?q=Level+13/50+Carrington+Street,+Sydney,+NSW,+Australia,+2000",
    },
    {
      city: "Bhavnagar",
      address: "306, Aristo Complex, Waghawadi Road, Bhavnagar-364001, Gujarat, India",
      email: "bhavnagar@99partners.com",
      mapLink: "https://maps.app.goo.gl/Wq8ACCPD6HafkqFh8",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white fade-in-up">
                Let's Start a{" "}
                <span className="gradient-text">Conversation</span>
              </h1>
              <p className="text-xl text-muted-foreground dark:text-neutral-300 max-w-2xl mx-auto fade-in-up stagger-1">
                Ready to explore partnership opportunities? We're here to help
                you connect with the right partners and accelerate your business
                growth.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {contactMethods.slice(0, 3).map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={index}
                    className="glass rounded-xl p-6 text-center hover-lift hover-glow fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${method.color} p-3 shadow-lg`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="font-bold text-foreground dark:text-white mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-neutral-300 mb-3">
                      {method.description}
                    </p>
                    <a
                      href={method.action}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      {method.contact}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Office Information */}
              <div className="space-y-8">
                <div className="glass rounded-2xl p-8 fade-in-right">
                  <h3 className="text-2xl font-bold text-foreground dark:text-white mb-6">
                    Our Offices
                  </h3>

                  <div className="space-y-8">
                    {offices.map((office, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0 dark:border-gray-700"
                      >
                        <h4 className="text-lg font-semibold text-foreground dark:text-white mb-3">
                          {office.city} Office
                        </h4>
                        <div className="space-y-3 text-muted-foreground dark:text-neutral-300">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <a
                              href={office.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors"
                            >
                              {office.address}
                            </a>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <a
                              href={`mailto:${office.email}`}
                              className="hover:text-primary transition-colors"
                            >
                              {office.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="glass rounded-2xl p-8 fade-in-right stagger-1">
                  <h3 className="text-2xl font-bold text-foreground dark:text-white mb-6 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    Business Hours
                  </h3>

                  <div className="space-y-3 text-muted-foreground dark:text-neutral-300">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Need urgent assistance?</strong> Our emergency
                      support line is available 24/7 for existing partners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-white mb-8 fade-in-up">
                Frequently Asked Questions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass rounded-xl p-6 hover-lift fade-in-up stagger-1">
                  <h4 className="font-semibold text-foreground dark:text-white mb-2">
                    Partnership Process
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-neutral-300">
                    Learn about our partnership onboarding process and
                    requirements.
                  </p>
                </div>

                <div className="glass rounded-xl p-6 hover-lift fade-in-up stagger-2">
                  <h4 className="font-semibold text-foreground dark:text-white mb-2">
                    Service Domains
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-neutral-300">
                    Explore our four business verticals and service offerings.
                  </p>
                </div>

                <div className="glass rounded-xl p-6 hover-lift fade-in-up stagger-3">
                  <h4 className="font-semibold text-foreground dark:text-white mb-2">
                    Support & Resources
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-neutral-300">
                    Access our comprehensive support center and resources.
                  </p>
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

export default Contact;
