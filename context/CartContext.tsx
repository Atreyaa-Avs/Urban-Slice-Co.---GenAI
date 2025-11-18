import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, Order, PromoCode } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  promoCode: PromoCode | null;
  applyPromo: (code: PromoCode | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('urban_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('urban_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);

  useEffect(() => {
    localStorage.setItem('urban_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('urban_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
        // Simple logic: always add new item entry for custom items
        return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, qty) } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const applyPromo = (code: PromoCode | null) => {
    setPromoCode(code);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const cartSubtotal = cartItems.reduce((acc, item) => {
    const extrasCost = item.extras.reduce((sum, ex) => sum + ex.price, 0);
    return acc + (item.selectedSize.price + extrasCost) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        toggleCart,
        promoCode,
        applyPromo,
        orders,
        addOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
