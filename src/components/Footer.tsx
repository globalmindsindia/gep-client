import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, MessageCircle, Youtube } from "lucide-react";
import GMILogo from "@/assets/gmi_logo.jpg";
import IndiaFlag from "@/assets/india-flag.png";
import GermanyFlag from "@/assets/German-Flag.png";

export default function Footer() {
  const footerLinks = {
    Quicklinks: [
      { name: "Home", href: "#hero" },
      { name: "About", href: "#what-is-gep" },
      { name: "Benefits", href: "#why-join" },
      { name: "Services", href: "#services" },
      
    ],
    services: [
      { name: "Study Abroad", href: "https://www.globalmindsindia.com/" },
      { name: "Foreign Language Training", href: "https://languages.globalmindsindia.in/" },
      { name: "IELTS Training", href: "https://globalmindsindia.in/" },
      { name: "APS Certification", href: "https://aps.globalmindsindia.in/" },
      { name: "SOP Preparation", href: "https://sop.globalmindsindia.in/" },
      { name: "Visa support", href: "https://visa.globalmindsindia.in/" },
    ],
    support: [
      { name: "Terms and Conditions", href: "#" },
      { name: "Refund Policy", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Chat Now", href: "https://wa.me/917353446655", icon: MessageCircle, isWhatsApp: true },
      
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/people/Global-Minds-India/61573595922348/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/globalminds_india/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFPKZJeWAQQUAAAAZqf3D_4H7Qjpvju5SN7balsbBbhLfh7OW3cZ_E909Ei3VJhozFfIuIPe_ZzIleUeiRArAd3l_YdeIjCBlmXnp_AMXM9LfQ_OWv3no6YFfsQxYaEC__GxA0=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fglobal-minds-india%2F", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@GlobalMindsIndia-1", label: "YouTube" },
  ];

  return (
    <footer id="footer" className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto px-6 lg:px-16 xl:px-32 2xl:px-48 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <img
                src={GMILogo}
                alt="Global Minds India"
                width={200}
                height={67}
                className="h-16 w-auto"
              />
            </motion.div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering individuals to become global education partners and transform students' lives through international education opportunities.
            </p>
            
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.Quicklinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.isWhatsApp ? "_blank" : undefined}
                    rel={link.isWhatsApp ? "noopener noreferrer" : undefined}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    {link.icon && <link.icon className="w-4 h-4 text-green-400" />}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:connect@globalmindsindia.com" className="text-gray-300 hover:text-white transition-colors">
                  connect@globalmindsindia.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+917353446655" className="text-gray-300 hover:text-white transition-colors">
                  +91 7353446655
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 font-semibold text-yellow-300 mb-1">
                    <img src={IndiaFlag} alt="India" className="w-4 h-3 rounded-sm" />
                    India
                  </div>
                  <div className="text-gray-300">23, CJ VenkataDas road,<br />Padmanabhanagar, Bangalore</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 font-semibold text-yellow-300 mb-1">
                    <img src={GermanyFlag} alt="Germany" className="w-4 h-3 rounded-sm" />
                    Germany
                  </div>
                  <div className="text-gray-300 mb-1">Koenigsheideweg Berlin, Germany</div>
                  <a href="tel:+4917645728219" className="text-gray-400 hover:text-gray-200 transition-colors">
                    +49 17645728219
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} <a href="https://www.globalmindsindia.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Global Minds India</a>. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
}
