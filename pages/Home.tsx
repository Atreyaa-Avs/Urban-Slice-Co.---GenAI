import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Leaf } from 'lucide-react';
import ProductCard from '../components/Shop/ProductCard';
import { CAKE_CATALOG } from '../constants';

const Home: React.FC = () => {
  const featuredCakes = CAKE_CATALOG.filter(c => c.featured);
  const trendingCakes = CAKE_CATALOG.slice(0, 4);

  // Simple Carousel Logic
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCakes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredCakes.length]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full bg-[#F3E6DF] overflow-hidden flex items-center">
         {/* Background Decorative Blobs */}
         <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/40 to-transparent skew-x-12"></div>
         
         <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
                <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur text-urban-charcoal text-xs tracking-[0.2em] uppercase font-bold rounded-full border border-urban-rose/30">
                    Premium Cake Delivery
                </span>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-urban-charcoal leading-tight">
                    Taste the <br/> <span className="text-urban-gold italic">Luxury</span> in Every Slice.
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                    Handcrafted artisan cakes made with sustainable ingredients, delivered fresh to make your celebrations unforgettable.
                </p>
                <div className="flex gap-4 pt-4">
                    <Link to="/shop" className="bg-urban-charcoal text-white px-8 py-4 rounded-full font-medium hover:bg-urban-gold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Order Now
                    </Link>
                    <Link to="/bundles" className="border-2 border-urban-charcoal text-urban-charcoal px-8 py-4 rounded-full font-medium hover:bg-urban-charcoal hover:text-white transition-all">
                        Explore Bundles
                    </Link>
                </div>
            </div>
            
            {/* Hero Image Composite */}
            <div className="relative hidden md:block h-[600px] w-full">
                 <img 
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" 
                    alt="Hero Cake"
                    className="absolute top-10 right-10 w-3/4 h-3/4 object-cover rounded-[40px] shadow-2xl animate-float z-20"
                 />
                 <div className="absolute bottom-20 left-10 bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg z-30 max-w-xs">
                    <div className="flex gap-1 text-urban-gold mb-2">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="italic text-sm text-gray-600">"The Red Velvet was the highlight of our anniversary. Absolutely divine!"</p>
                    <p className="text-xs font-bold mt-2 text-urban-charcoal">— Sarah J.</p>
                 </div>
            </div>
         </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-2">Featured Masterpieces</h2>
            <p className="text-gray-500">Curated selections for your special moments</p>
        </div>
        
        <div className="container mx-auto px-6 relative overflow-hidden">
            <div 
                className="flex transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {featuredCakes.map((cake) => (
                    <div key={cake.id} className="w-full flex-shrink-0 px-4 md:px-24">
                        <div className="bg-urban-cream rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <img src={cake.image} alt={cake.name} className="w-full md:w-1/2 h-64 md:h-96 object-cover rounded-2xl shadow-xl" />
                            <div className="text-left space-y-4 flex-1">
                                <div className="flex gap-2 mb-2">
                                    {cake.tags.map(t => <span key={t} className="text-xs bg-white px-2 py-1 rounded uppercase tracking-wider">{t}</span>)}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-urban-charcoal">{cake.name}</h3>
                                <p className="text-gray-600 text-lg">{cake.description}</p>
                                <div className="flex items-center gap-6 pt-4">
                                    <span className="text-3xl font-bold text-urban-gold">${cake.sizes[1].price}</span>
                                    <Link to={`/product/${cake.slug}`} className="flex items-center gap-2 bg-urban-charcoal text-white px-6 py-3 rounded-full hover:bg-urban-gold transition-colors">
                                        View Details <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {featuredCakes.map((_, idx) => (
                    <button 
                        key={idx} 
                        className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-urban-gold w-8' : 'bg-gray-300'}`}
                        onClick={() => setCurrentSlide(idx)}
                    />
                ))}
            </div>
        </div>
      </section>

      {/* Trending Grid */}
      <section className="py-20 bg-urban-cream/30">
         <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-serif font-bold mb-2">Trending Now</h2>
                    <p className="text-gray-500">Our most loved creations this week</p>
                </div>
                <Link to="/shop" className="hidden md:flex items-center gap-2 text-urban-charcoal font-medium hover:text-urban-gold">
                    View All Cakes <ArrowRight size={18} />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {trendingCakes.map(cake => <ProductCard key={cake.id} product={cake} />)}
            </div>

            <div className="mt-12 text-center md:hidden">
                 <Link to="/shop" className="inline-block border border-urban-charcoal px-6 py-3 rounded-full">View All</Link>
            </div>
         </div>
      </section>

      {/* Collections / Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Shop by Collection</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { name: "Birthdays", img: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=300&q=80" },
                    { name: "Anniversary", img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=300&q=80" },
                    { name: "Vegan", img: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&w=300&q=80" },
                    { name: "Kids", img: "https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?auto=format&fit=crop&w=300&q=80" },
                    { name: "Wedding", img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=300&q=80" },
                    { name: "Bundles", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80" },
                ].map((col, i) => (
                    <Link to="/shop" key={i} className="group relative h-40 rounded-xl overflow-hidden cursor-pointer">
                        <img src={col.img} alt={col.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <span className="text-white font-bold text-lg tracking-wide">{col.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* Build Your Own Bundle Teaser */}
      <section className="py-20 bg-urban-rose/10">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                  <h2 className="text-4xl font-serif font-bold text-urban-charcoal">Build Your Own Box of Joy</h2>
                  <p className="text-lg text-gray-600">
                      Create a personalized gift bundle. Choose a cake, add flowers or chocolates, pick a card, and we'll wrap it in luxury.
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-center gap-3"><CheckCircle className="text-urban-sage" /> Custom Cake Selection</li>
                      <li className="flex items-center gap-3"><CheckCircle className="text-urban-sage" /> Premium Add-ons</li>
                      <li className="flex items-center gap-3"><CheckCircle className="text-urban-sage" /> Hand-written Notes</li>
                  </ul>
                  <Link to="/bundles" className="inline-block bg-urban-charcoal text-white px-8 py-4 rounded-full shadow-lg hover:bg-urban-gold transition-colors">
                      Start Building
                  </Link>
              </div>
              <div className="flex-1 relative">
                  <div className="grid grid-cols-2 gap-4">
                      <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80" className="rounded-2xl shadow-lg translate-y-8" alt="Bundle Cake"/>
                      <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80" className="rounded-2xl shadow-lg" alt="Bundle Gift"/>
                  </div>
              </div>
          </div>
      </section>

      {/* Sustainability */}
      <section className="py-12 bg-urban-sage/20">
          <div className="container mx-auto px-6 text-center">
              <div className="flex justify-center mb-4">
                  <Leaf size={40} className="text-green-700" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-green-800 mb-2">Sustainable Sweetness</h3>
              <p className="text-green-900 max-w-2xl mx-auto">
                  We use 100% eco-friendly, biodegradable packaging and source our ingredients from local, organic farms to ensure every bite is guilt-free for you and the planet.
              </p>
          </div>
      </section>
    </div>
  );
};

export default Home;
