import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Order } from '../types';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useCart();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    const found = orders.find(o => o.id === orderId);
    setOrder(found);
  }, [orderId, orders]);

  if (!order) {
      return <div className="pt-32 text-center">Loading Order Details...</div>;
  }

  return (
    <div className="min-h-screen bg-urban-cream/30 py-12 animate-fade-in flex items-center justify-center">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl w-full text-center">
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={48} className="text-green-600" />
                </div>
            </div>
            <h1 className="text-3xl font-serif font-bold text-urban-charcoal mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 mb-8">Thank you, {order.shippingAddress.fullName}. Your sweet joy is on its way.</p>

            <div className="bg-gray-50 p-6 rounded-xl text-left mb-8 text-sm">
                <p className="mb-2"><span className="font-bold">Order ID:</span> {order.id}</p>
                <p className="mb-2"><span className="font-bold">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                <p className="mb-2"><span className="font-bold">Total Amount:</span> ${order.total.toFixed(2)}</p>
                <p><span className="font-bold">Ship To:</span> {order.shippingAddress.addressLine1}, {order.shippingAddress.city}</p>
            </div>

            <Link to="/shop" className="bg-urban-charcoal text-white px-8 py-3 rounded-full font-medium hover:bg-urban-gold transition-colors shadow-lg">
                Continue Shopping
            </Link>
        </div>
    </div>
  );
};

export default OrderConfirmation;
