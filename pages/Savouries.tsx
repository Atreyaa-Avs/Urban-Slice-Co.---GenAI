import React from 'react';
import { SAVOURIES } from '../constants';
import { useCart } from '../context/CartContext';
import { PlusCircle } from 'lucide-react';

const Savouries: React.FC = () => {
  const { addToCart } = useCart();

  const handleAdd = (item: any) => {
    addToCart({
        id: `savory-${Date.now()}`,
        productId: item.id,
        productName: item.name,
        productImage: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80', // Generic image
        selectedSize: { label: 'Pack', price: item.price },
        quantity: 1,
        extras: [],
    });
  };

  return (
    <div className="min-h-screen bg-white py-12 animate-fade-in">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl font-serif font-bold text-urban-charcoal mb-4">Savouries & Add-ons</h1>
            <p className="text-gray-500 mb-12">Perfect little salty snacks and drinks to balance the sweetness.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SAVOURIES.map(item => (
                    <div key={item.id} className="bg-urban-cream/30 p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-2xl">🥨</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-urban-charcoal">{item.name}</h3>
                                <p className="text-urban-gold font-bold">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <button onClick={() => handleAdd(item)} className="text-urban-charcoal hover:text-urban-gold transition-colors">
                            <PlusCircle size={32} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Savouries;
