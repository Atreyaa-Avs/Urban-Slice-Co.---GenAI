import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Bundles & Gifts', path: '/bundles' },
    { name: 'Savouries', path: '/savouries' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-50">
           <div className="w-10 h-10 bg-urban-gold rounded-full flex items-center justify-center text-white font-serif text-xl font-bold shadow-lg">
              U
           </div>
           <div className={`font-serif text-2xl font-bold tracking-wide ${isScrolled || isMobileMenuOpen ? 'text-urban-charcoal' : 'text-urban-charcoal'}`}>
             Urban Slice<span className="text-urban-gold">.</span>
           </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm uppercase tracking-widest font-medium hover:text-urban-gold transition-colors ${
                 location.pathname === link.path ? 'text-urban-gold' : 'text-urban-charcoal'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-6 z-50">
          <button 
            onClick={toggleCart} 
            className="relative text-urban-charcoal hover:text-urban-gold transition-colors"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-urban-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            className="md:hidden text-urban-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-urban-cream z-40 transform transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center items-center gap-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-urban-charcoal hover:text-urban-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
};

export default Header;