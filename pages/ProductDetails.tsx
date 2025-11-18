import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';
import { CAKE_CATALOG, EXTRAS } from '../constants';
import { useCart } from '../context/CartContext';
import { ProductSize, ProductExtra } from '../types';

const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = CAKE_CATALOG.find(p => p.slug === slug);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [occasion, setOccasion] = useState('');
  const [cakeMessage, setCakeMessage] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (product) setSelectedSize(product.sizes[0]);
  }, [product]);

  if (!product || !selectedSize) return <div className="pt-32 text-center">Product not found</div>;

  const handleToggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
    );
  };

  const calculateTotal = () => {
    const base = selectedSize.price;
    const extrasCost = selectedExtras.reduce((sum, id) => {
      const ex = EXTRAS.find(e => e.id === id);
      return sum + (ex ? ex.price : 0);
    }, 0);
    return base + extrasCost;
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    const finalExtras = EXTRAS.filter(e => selectedExtras.includes(e.id));
    
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      selectedSize: selectedSize,
      quantity: 1,
      customization: {
        occasion,
        message: cakeMessage
      },
      extras: finalExtras
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="min-h-screen bg-white pb-20 animate-fade-in">
      <div className="container mx-auto px-6 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-urban-charcoal mb-8">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden h-[400px] md:h-[600px] shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="rounded-xl overflow-hidden h-24 opacity-70 hover:opacity-100 cursor-pointer">
                    <img src={product.image} alt="thumbnail" className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>
          </div>

          {/* Info & Customization */}
          <div className="space-y-8">
             <div>
               <h1 className="text-4xl font-serif font-bold text-urban-charcoal mb-2">{product.name}</h1>
               <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-amber-400"><Star fill="currentColor" size={18} /> <span className="text-gray-600 ml-1 font-medium">{product.rating}</span></div>
                  <div className="flex gap-2">{product.tags.map(t => <span key={t} className="px-2 py-1 bg-urban-cream text-xs uppercase font-bold rounded">{t}</span>)}</div>
               </div>
               <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
             </div>

             <hr className="border-gray-100" />

             {/* Size Selector */}
             <div>
               <h3 className="font-bold text-urban-charcoal mb-3">Select Size (Weight)</h3>
               <div className="flex gap-4">
                  {product.sizes.map(size => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg border-2 transition-all ${selectedSize.label === size.label ? 'border-urban-gold bg-urban-gold/10 text-urban-charcoal font-bold' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                    >
                      {size.label}
                      <span className="block text-xs font-normal mt-1">${size.price}</span>
                    </button>
                  ))}
               </div>
             </div>

             {/* Customization */}
             <div className="bg-urban-cream/30 p-6 rounded-xl space-y-4">
                <h3 className="font-bold text-urban-charcoal">Personalize</h3>
                <div>
                   <label className="block text-sm text-gray-500 mb-1">Occasion</label>
                   <select 
                    className="w-full p-3 rounded-lg border border-gray-200 bg-white"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                   >
                      <option value="">Select Occasion</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Farewell">Farewell</option>
                      <option value="Just Because">Just Because</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm text-gray-500 mb-1">Message on Cake (Optional)</label>
                   <input 
                     type="text" 
                     maxLength={25}
                     className="w-full p-3 rounded-lg border border-gray-200 bg-white"
                     placeholder="e.g. Happy Birthday John"
                     value={cakeMessage}
                     onChange={(e) => setCakeMessage(e.target.value)}
                   />
                </div>
             </div>

             {/* Extras */}
             <div>
                <h3 className="font-bold text-urban-charcoal mb-3">Make it Special</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {EXTRAS.filter(e => e.category === 'party').map(extra => (
                      <div 
                        key={extra.id} 
                        onClick={() => handleToggleExtra(extra.id)}
                        className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center transition-all ${selectedExtras.includes(extra.id) ? 'border-urban-gold bg-urban-gold/5' : 'border-gray-200'}`}
                      >
                         <span className="text-sm">{extra.name}</span>
                         <span className="text-sm font-bold text-urban-gold">+${extra.price}</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Action */}
             <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 sticky bottom-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Total Price</span>
                  <span className="text-3xl font-bold text-urban-charcoal">${calculateTotal().toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-urban-charcoal text-white py-4 rounded-xl font-bold text-lg hover:bg-urban-gold transition-all active:scale-95 shadow-lg"
                >
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </button>
             </div>

             {/* Trust Badges */}
             <div className="grid grid-cols-2 gap-4 text-center text-xs text-gray-400">
                <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                   <Truck className="text-urban-charcoal" />
                   <span>Free Delivery above $50</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                   <ShieldCheck className="text-urban-charcoal" />
                   <span>100% Fresh Guarantee</span>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
