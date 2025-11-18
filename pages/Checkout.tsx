import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Order, Address } from '../types';

const Checkout: React.FC = () => {
  const { cartItems, cartSubtotal, promoCode, clearCart, addOrder } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState<Address>({
    fullName: '', email: '', phone: '', addressLine1: '', city: '', state: '', pincode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const discount = promoCode 
    ? (promoCode.discountPercent ? cartSubtotal * promoCode.discountPercent : (promoCode.discountAmount || 0))
    : 0;
  const tax = (cartSubtotal - discount) * 0.05;
  const shipping = cartSubtotal > 50 ? 0 : 15;
  const total = cartSubtotal - discount + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Math.floor(Math.random() * 100000)}`,
        date: new Date().toISOString(),
        items: [...cartItems],
        subtotal: cartSubtotal,
        tax,
        shipping,
        discount,
        total,
        shippingAddress: address
      };

      addOrder(newOrder);
      setIsProcessing(false);
      navigate(`/confirmation/${newOrder.id}`);
    }, 2000);
  };

  if (cartItems.length === 0) {
      return <div className="pt-32 text-center">Your cart is empty. <br/><a href="#/shop" className="text-urban-gold underline">Go Shopping</a></div>;
  }

  return (
    <div className="min-h-screen bg-urban-cream/20 py-12 animate-fade-in">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-serif font-bold mb-8 text-center">Checkout</h1>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                <h2 className="text-xl font-bold border-b pb-4 mb-4">Shipping Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input required name="fullName" onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-urban-gold/50 outline-none bg-white" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <input required name="phone" onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-urban-gold/50 outline-none bg-white" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input required type="email" name="email" onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-urban-gold/50 outline-none bg-white" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <input required name="addressLine1" onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-urban-gold/50 outline-none bg-white" placeholder="Street, Apartment, etc." />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <input required name="city" onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-urban-gold/50 outline-none bg-white" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">State</label>
                        <input required name="state" onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-urban-gold/50 outline-none bg-white" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Zip/Pin</label>
                        <input required name="pincode" onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-urban-gold/50 outline-none bg-white" />
                    </div>
                </div>

                <div className="pt-6">
                    <h2 className="text-xl font-bold border-b pb-4 mb-4">Payment</h2>
                    <div className="p-4 border border-urban-gold bg-urban-gold/5 rounded-lg">
                        <p className="text-sm text-gray-600 text-center italic">Payment Gateway Simulation Mode</p>
                        <p className="text-center font-bold mt-2">No actual charge will be made.</p>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full bg-urban-charcoal text-white py-4 rounded-xl font-bold text-lg hover:bg-urban-gold transition-all shadow-lg mt-6 disabled:bg-gray-400"
                >
                    {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
            </form>

            {/* Summary Sidebar */}
            <div className="bg-gray-50 p-8 rounded-2xl h-fit">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex gap-4 text-sm">
                            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0">
                                <img src={item.productImage} className="w-full h-full object-cover rounded"/>
                            </div>
                            <div className="flex-grow">
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-bold">${((item.selectedSize.price + item.extras.reduce((a,b)=>a+b.price,0)) * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                    <div className="flex justify-between text-green-600"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;