import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden cyber-grid particle-effect">
      {/* Background Animated Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 dark:bg-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-30 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-25 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-400 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Cyber Grid Extras */}
        <div
          className="absolute top-1/2 right-1/3 w-32 h-32 border border-cyan-400/30 rounded-full dark:block hidden animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/2 w-48 h-48 border border-purple-400/20 rounded-full dark:block hidden animate-spin"
          style={{ animationDuration: "30s", animationDirection: "reverse" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Floating Icon */}
          {/* Floating Icon */}
          <div className="flex justify-center mt-8 mb-8 fade-in-up">
            <div className="glass rounded-full p-4 float-animation hover-glow neon-border">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight fade-in-up stagger-1">
            Empowering Businesses with{" "}
            <span className="gradient-text">Strategic Partnerships</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto fade-in-up stagger-2">
            Connecting you with the right partners to accelerate your growth
            through innovation and collaboration.
          </p>

          {/* Call to Action */}
          <div className="w-full text-center py-6 bg-transparent fade-in-up">
            <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-400">
              Unlock your business potential with 99 Partners <br />
              <a
                href="/join"
                className="mt-4 inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-base md:text-lg font-semibold hover:brightness-110 transition duration-300 shadow-md"
              >
                Join Ecosystem
              </a>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
