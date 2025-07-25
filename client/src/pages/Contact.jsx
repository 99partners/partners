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
  

  const offices = [
    {
      city: "Ahmedabad",
      address: "E 608, Titanium City Center, Satellite, Ahmedabad, 380015",
      email: "ahmedabad@99partners.com",
      mapLink: "https://maps.google.com/?q=Titanium+City+Center,+Satellite,+Ahmedabad,+380015",
    },
    {
      city: "USA",
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

       
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
