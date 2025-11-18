import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="font-serif text-2xl font-bold text-urban-charcoal">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <ShoppingBag size={64} strokeWidth={1} className="mb-4 opacity-50" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <button onClick={onClose} className="mt-4 text-urban-gold underline">Continue Shopping</button>
                </div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-urban-charcoal">{item.productName}</h3>
                                    <p className="text-sm text-gray-500">{item.selectedSize.label}</p>
                                    {item.customization?.occasion && <p className="text-xs text-urban-gold mt-1">For: {item.customization.occasion}</p>}
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-400">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            
                            <div className="flex justify-between items-end mt-3">
                                <div className="flex items-center border border-gray-200 rounded-full">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 px-2 hover:text-urban-gold"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 px-2 hover:text-urban-gold"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-urban-charcoal">
                                        ${((item.selectedSize.price + item.extras.reduce((sum, ex) => sum + ex.price, 0)) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-urban-cream/30">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold text-xl text-urban-charcoal">${cartSubtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-4 text-center">Shipping & taxes calculated at checkout</p>
                <Link 
                    to="/cart" 
                    onClick={onClose}
                    className="block w-full bg-urban-charcoal text-white text-center py-4 rounded-lg font-medium hover:bg-urban-gold transition-colors shadow-lg"
                >
                    View Cart & Checkout
                </Link>
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
