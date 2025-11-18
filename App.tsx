import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CartDrawer from './components/Cart/CartDrawer';
import { useCart } from './context/CartContext';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Bundles = lazy(() => import('./pages/Bundles'));
const Savouries = lazy(() => import('./pages/Savouries'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Contact = lazy(() => import('./pages/Contact'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const { isCartOpen, toggleCart } = useCart();

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <Header />
        <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
        
        <main className="flex-grow pt-20">
          <Suspense fallback={
            <div className="flex items-center justify-center h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-urban-gold"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/bundles" element={<Bundles />} />
              <Route path="/savouries" element={<Savouries />} />
              <Route path="/confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<div className="pt-20 text-center text-2xl">About Page Placeholder</div>} />
              <Route path="/faq" element={<div className="pt-20 text-center text-2xl">FAQ Page Placeholder</div>} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
