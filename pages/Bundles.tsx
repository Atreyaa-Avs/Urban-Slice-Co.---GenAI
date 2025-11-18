import React, { useState } from 'react';
import { CAKE_CATALOG, GIFTS, CARDS } from '../constants';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Bundles: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedCake, setSelectedCake] = useState<Product | null>(null);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = (selectedCake ? selectedCake.sizes[0].price : 0) + 
                     (selectedGift ? selectedGift.price : 0) + 
                     (selectedCard ? selectedCard.price : 0);

  const handleAddToCart = () => {
    if (selectedCake && selectedGift && selectedCard) {
        addToCart({
            id: `bundle-${Date.now()}`,
            productId: selectedCake.id,
            productName: `Custom Bundle: ${selectedCake.name}`,
            productImage: selectedCake.image,
            selectedSize: selectedCake.sizes[0], // Default small size for bundle base
            quantity: 1,
            extras: [selectedGift, selectedCard],
            customization: { occasion: 'Bundle' }
        });
        navigate('/cart');
    }
  };

  const StepIndicator = () => (
      <div className="flex justify-center mb-8">
          {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= i ? 'bg-urban-charcoal text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {i}
                  </div>
                  {i < 3 && <div className={`w-16 h-1 transition-colors ${step > i ? 'bg-urban-charcoal' : 'bg-gray-200'}`}></div>}
              </div>
          ))}
      </div>
  );

  return (
    <div className="min-h-screen bg-urban-cream/30 py-12 animate-fade-in">
      <div className="container mx-auto px-6">
          <div className="text-center mb-10">
              <h1 className="text-4xl font-serif font-bold text-urban-charcoal">Build Your Own Bundle</h1>
              <p className="text-gray-500 mt-2">Curate the perfect gift in 3 simple steps.</p>
          </div>

          <StepIndicator />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Selection Area */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                  {step === 1 && (
                      <div>
                          <h2 className="text-2xl font-serif font-bold mb-4">Step 1: Choose a Cake</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                              {CAKE_CATALOG.map(cake => (
                                  <div 
                                    key={cake.id} 
                                    onClick={() => setSelectedCake(cake)}
                                    className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${selectedCake?.id === cake.id ? 'border-urban-gold bg-urban-gold/5 ring-2 ring-urban-gold/20' : 'border-gray-100'}`}
                                  >
                                      <img src={cake.image} className="w-20 h-20 rounded-lg object-cover" alt={cake.name}/>
                                      <div>
                                          <h3 className="font-bold text-sm">{cake.name}</h3>
                                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cake.description}</p>
                                          <p className="font-bold mt-2">${cake.sizes[0].price}</p>
                                      </div>
                                      {selectedCake?.id === cake.id && <div className="ml-auto"><Check className="text-urban-gold"/></div>}
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {step === 2 && (
                      <div>
                          <h2 className="text-2xl font-serif font-bold mb-4">Step 2: Add a Gift</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {GIFTS.map(gift => (
                                  <div 
                                    key={gift.id} 
                                    onClick={() => setSelectedGift(gift)}
                                    className={`p-6 rounded-xl border cursor-pointer transition-all text-center hover:shadow-md ${selectedGift?.id === gift.id ? 'border-urban-gold bg-urban-gold/5 ring-2 ring-urban-gold/20' : 'border-gray-100'}`}
                                  >
                                      <h3 className="font-bold">{gift.name}</h3>
                                      <p className="text-urban-gold font-bold mt-2">${gift.price}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {step === 3 && (
                      <div>
                          <h2 className="text-2xl font-serif font-bold mb-4">Step 3: Pick a Card</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {CARDS.map(card => (
                                  <div 
                                    key={card.id} 
                                    onClick={() => setSelectedCard(card)}
                                    className={`p-6 rounded-xl border cursor-pointer transition-all text-center hover:shadow-md ${selectedCard?.id === card.id ? 'border-urban-gold bg-urban-gold/5 ring-2 ring-urban-gold/20' : 'border-gray-100'}`}
                                  >
                                      <h3 className="font-bold">{card.name}</h3>
                                      <p className="text-urban-gold font-bold mt-2">${card.price}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>

              {/* Summary Sidebar */}
              <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
                  <h3 className="font-serif font-bold text-xl mb-6">Your Bundle</h3>
                  <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Cake</span>
                          <span className="font-medium truncate max-w-[120px]">{selectedCake ? selectedCake.name : '-'}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Gift</span>
                          <span className="font-medium">{selectedGift ? selectedGift.name : '-'}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Card</span>
                          <span className="font-medium">{selectedCard ? selectedCard.name : '-'}</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                          <span>Total</span>
                          <span>${totalPrice.toFixed(2)}</span>
                      </div>
                  </div>

                  <div className="flex gap-4">
                      {step > 1 && (
                          <button onClick={() => setStep(s => s-1)} className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">Back</button>
                      )}
                      {step < 3 ? (
                          <button 
                             onClick={() => setStep(s => s+1)} 
                             disabled={!selectedCake && step===1 || !selectedGift && step===2}
                             className="flex-1 bg-urban-charcoal text-white py-3 rounded-lg font-medium hover:bg-urban-gold disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                              Next
                          </button>
                      ) : (
                          <button 
                             onClick={handleAddToCart}
                             disabled={!selectedCard}
                             className="flex-1 bg-urban-gold text-white py-3 rounded-lg font-bold hover:bg-yellow-600 shadow-lg disabled:opacity-50"
                          >
                              Add Bundle
                          </button>
                      )}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Bundles;
