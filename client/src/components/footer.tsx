import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const footerLinks = {
  categories: [
    { name: "Luxury Watches", href: "/category/watches" },
    { name: "Luxury Cars", href: "/category/cars" },
    { name: "Fine Jewelry", href: "/category/jewelry" },
    { name: "Real Estate", href: "/category/real-estate" },
    { name: "Fashion", href: "/category/fashion" },
    { name: "Art & Collectibles", href: "/category/art" },
  ],
  services: [
    { name: "Authentication", href: "/services/authentication" },
    { name: "Concierge Service", href: "/services/concierge" },
    { name: "Global Delivery", href: "/services/delivery" },
    { name: "Investment Advisory", href: "/services/investment" },
    { name: "Support Center", href: "/support" },
    { name: "Contact Us", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/story" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
    { name: "Partners", href: "/partners" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR Compliance", href: "/gdpr" },
    { name: "Accessibility", href: "/accessibility" },
    { name: "Sitemap", href: "/sitemap" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/otulia", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/otulia", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com/otulia", label: "Facebook" },
  { icon: Linkedin, href: "https://linkedin.com/company/otulia", label: "LinkedIn" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-dark text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <img 
                src="/attached_assets/logo1.jpeg" 
                alt="Otulia Logo" 
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="font-playfair text-2xl font-bold">Otulia</span>
            </Link>
            
            <p className="text-white/80 text-lg mb-6 max-w-md">
              The premier digital destination for exceptional luxury assets. Discover curated 
              collections with elegance and sophistication that define the pinnacle of luxury living.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-white/80">
                <Mail className="w-4 h-4 text-luxury-gold" />
                <span>hello@otulia.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Phone className="w-4 h-4 text-luxury-gold" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <MapPin className="w-4 h-4 text-luxury-gold" />
                <span>Beverly Hills, CA 90210</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5 group-hover:text-luxury-gold transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors hover:text-luxury-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors hover:text-luxury-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Company</h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors hover:text-luxury-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-white/20" />

        {/* Newsletter Signup */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-2">Stay Connected</h3>
            <p className="text-white/80">
              Subscribe to our newsletter for exclusive previews and luxury market insights.
            </p>
          </div>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-luxury-gold"
            />
            <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark font-semibold px-8">
              Subscribe
            </Button>
          </div>
        </div>

        <Separator className="mb-8 bg-white/20" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <p className="text-white/60 text-sm">
              © {currentYear} Otulia. All rights reserved. Premium luxury marketplace.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex space-x-6">
              {footerLinks.legal.slice(0, 3).map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-luxury-gold rounded flex items-center justify-center">
                <span className="text-xs font-bold text-luxury-dark">SSL</span>
              </div>
              <span>Secure Transactions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-luxury-gold rounded flex items-center justify-center">
                <span className="text-xs font-bold text-luxury-dark">✓</span>
              </div>
              <span>Verified Authenticity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-luxury-gold rounded flex items-center justify-center">
                <span className="text-xs font-bold text-luxury-dark">24/7</span>
              </div>
              <span>Premium Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-luxury-gold rounded flex items-center justify-center">
                <span className="text-xs font-bold text-luxury-dark">🌍</span>
              </div>
              <span>Global Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
