import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { theme } = useTheme();

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com/in/williamarmstrong", icon: "💼" },
    { name: "GitHub", url: "https://github.com/williamarmstrong", icon: "💻" },
    { name: "Email", url: "mailto:william@example.com", icon: "✉️" },
  ];

  const quickLinks = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Brands", path: "/brands" },
    { name: "Photography", path: "/photography" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-md border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <h3 className="text-2xl font-bold text-foreground mb-2">William Armstrong</h3>
              <p className="text-muted-foreground">Engineer & Entrepreneur</p>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building innovative solutions at the intersection of technology and design. 
              Always creating, always learning.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">Let's Connect</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Ready to collaborate or just want to chat? I'd love to hear from you.
            </p>
            <Link to="/contact">
              <Button variant="connect" size="default" className="mb-4">
                Get In Touch
              </Button>
            </Link>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted transition-colors duration-200 flex items-center justify-center text-sm hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-border/30 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} William Armstrong. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Made with ❤️ in California</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Available for opportunities</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
