import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PROMOS } from '../constants';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal, applyPromo, promoCode, clearCart } = useCart();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    const code = PROMOS.find(p => p.code === promoInput.toUpperCase());
    if (code) {
      if (cartSubtotal < code.minOrder) {
        setPromoError(`Minimum order of $${code.minOrder} required`);
        applyPromo(null);
      } else {
        applyPromo(code);
        setPromoError('');
      }
    } else {
      setPromoError('Invalid code');
      applyPromo(null);
    }
  };

  const discount = promoCode 
    ? (promoCode.discountPercent ? cartSubtotal * promoCode.discountPercent : (promoCode.discountAmount || 0))
    : 0;

  const tax = (cartSubtotal - discount) * 0.05;
  const shipping = cartSubtotal > 50 ? 0 : 15;
  const total = cartSubtotal - discount + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-urban-cream/20">
         <h2 className="text-3xl font-serif font-bold text-urban-charcoal mb-4">Your Cart is Empty</h2>
         <p className="text-gray-500 mb-8">Looks like you haven't added any treats yet.</p>
         <Link to="/shop" className="bg-urban-charcoal text-white px-8 py-3 rounded-full hover:bg-urban-gold transition-colors">
            Browse Cakes
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-urban-cream/20 py-12 animate-fade-in">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
           {/* Cart Items */}
           <div className="flex-grow bg-white rounded-2xl shadow-sm p-6 lg:p-8">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <span className="font-bold text-gray-500">{cartItems.length} Items</span>
                  <button onClick={clearCart} className="text-red-400 text-sm hover:underline">Clear Cart</button>
              </div>
              
              <div className="space-y-8">
                 {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                           <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg text-urban-charcoal">{item.productName}</h3>
                            <p className="text-sm text-gray-500">{item.selectedSize.label}</p>
                            {item.customization?.occasion && (
                                <div className="mt-2 text-xs bg-urban-cream p-2 rounded inline-block">
                                    <span className="font-bold">Note:</span> {item.customization.occasion} {item.customization.message && `- "${item.customization.message}"`}
                                </div>
                            )}
                            {item.extras.length > 0 && (
                                <p className="text-xs text-gray-400 mt-1">
                                    + {item.extras.map(e => e.name).join(', ')}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-50">-</button>
                                <span className="px-2 font-medium">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-50">+</button>
                            </div>
                            <span className="font-bold text-lg w-20 text-right">
                                ${((item.selectedSize.price + item.extras.reduce((s,e)=>s+e.price,0)) * item.quantity).toFixed(2)}
                            </span>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-400">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Summary */}
           <div className="w-full lg:w-96">
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 sticky top-24">
                  <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 text-sm text-gray-600 mb-6">
                      <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                          <span>Shipping Estimate</span>
                          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                          <span>Tax (5%)</span>
                          <span>${tax.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                          <div className="flex justify-between text-green-600 font-medium">
                              <span>Discount ({promoCode?.code})</span>
                              <span>-${discount.toFixed(2)}</span>
                          </div>
                      )}
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between items-end">
                          <span className="font-bold text-urban-charcoal text-lg">Grand Total</span>
                          <span className="font-bold text-urban-charcoal text-2xl">${total.toFixed(2)}</span>
                      </div>
                  </div>

                  {/* Promo */}
                  <div className="mb-6">
                      <div className="flex gap-2">
                          <div className="relative flex-grow">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Promo Code" 
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm uppercase bg-white"
                                value={promoInput}
                                onChange={(e) => setPromoInput(e.target.value)}
                            />
                          </div>
                          <button onClick={handleApplyPromo} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-urban-gold">Apply</button>
                      </div>
                      {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
                      {promoCode && <p className="text-green-600 text-xs mt-1">Code applied!</p>}
                  </div>

                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-urban-charcoal text-white py-4 rounded-xl font-bold text-lg hover:bg-urban-gold transition-all shadow-lg flex justify-center items-center gap-2"
                  >
                    Checkout <ArrowRight size={20} />
                  </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;