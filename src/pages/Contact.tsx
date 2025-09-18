import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactMethods = [
    {
      title: "Email",
      description: "Get in touch directly via email",
      value: "william@example.com",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: "mailto:william@example.com"
    },
    {
      title: "LinkedIn",
      description: "Connect with me professionally",
      value: "linkedin.com/in/williamarmstrong",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      action: "https://linkedin.com/in/williamarmstrong"
    },
    {
      title: "GitHub",
      description: "View my code and projects",
      value: "github.com/williamarmstrong",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      action: "https://github.com/williamarmstrong"
    }
  ];


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="px-20 pt-8 pb-16">
        {/* Page Title */}
        <section className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
            Ready to collaborate, discuss opportunities, or just say hello? I'd love to hear from you.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-card backdrop-blur-md border border-border rounded-3xl p-8 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg cursor-pointer group"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <div className="w-8 h-8 text-primary">
                  {method.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {method.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {method.description}
              </p>
              <p className="text-primary font-medium mb-6">
                {method.value}
              </p>
              
              {/* Action Button */}
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                onClick={() => window.open(method.action, '_blank')}
              >
                {method.title === 'Email' ? 'Send Email' : 'Visit Profile'}
              </Button>
            </div>
          ))}
        </section>


      </main>
    </div>
  );
};

export default Contact;
