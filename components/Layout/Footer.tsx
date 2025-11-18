import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-urban-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-serif text-2xl font-bold">Urban Slice<span className="text-urban-gold">.</span></div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting luxury cakes and celebration experiences delivered to your doorstep. Elevate every moment with a slice of perfection.
            </p>
            <div className="flex gap-4 text-urban-gold">
              <Instagram size={20} className="cursor-pointer hover:text-white transition-colors" />
              <Facebook size={20} className="cursor-pointer hover:text-white transition-colors" />
              <Twitter size={20} className="cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif text-lg mb-6">Explore</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/shop" className="hover:text-urban-gold transition-colors">All Cakes</Link></li>
              <li><Link to="/bundles" className="hover:text-urban-gold transition-colors">Bundles & Gifts</Link></li>
              <li><Link to="/savouries" className="hover:text-urban-gold transition-colors">Savouries</Link></li>
              <li><Link to="/about" className="hover:text-urban-gold transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-serif text-lg mb-6">Support</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/faq" className="hover:text-urban-gold transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-urban-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-urban-gold transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-urban-gold transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-urban-gold" />
                <span>123 Baker Street, Sweet District, NY 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-urban-gold" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-urban-gold" />
                <span>hello@urbanslice.co</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Urban Slice Co. All rights reserved.</p>
          <div className="flex gap-6">
             <span>Privacy Policy</span>
             <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
