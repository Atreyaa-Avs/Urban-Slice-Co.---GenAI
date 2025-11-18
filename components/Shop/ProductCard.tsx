import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        selectedSize: product.sizes[0],
        quantity: 1,
        extras: []
    });
  };

  return (
    <Link to={`/product/${product.slug}`} className="group product-card block relative bg-white rounded-2xl p-4 pb-6 transition-all duration-300 hover:shadow-xl">
        {/* Image Container with Plate Effect */}
        <div className="relative mb-6 flex justify-center items-end h-64 w-full">
            {/* Shadow/Plate Pseudo-element */}
            <div className="absolute bottom-0 w-32 h-4 bg-black/20 blur-md rounded-[50%] plate-shadow z-0"></div>
            
            {/* Cake Image */}
            <img 
              src={product.image} 
              alt={product.name} 
              loading="lazy"
              className="w-full h-full object-cover rounded-xl cake-img z-10 relative shadow-sm"
            />
            
            {/* Quick Add Button (Visible on Hover) */}
            <button 
                onClick={handleQuickAdd}
                className="absolute bottom-4 right-4 z-20 bg-white text-urban-charcoal p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-urban-gold hover:text-white"
                aria-label="Quick Add"
            >
                <ShoppingBag size={18} />
            </button>

            {product.featured && (
              <span className="absolute top-4 left-4 z-20 bg-urban-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                Bestseller
              </span>
            )}
        </div>

        {/* Info */}
        <div className="text-center px-2">
            <div className="flex justify-center items-center gap-1 text-amber-400 mb-2 text-sm">
                <Star size={14} fill="currentColor" />
                <span className="text-gray-400">({product.rating})</span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-urban-charcoal mb-1 group-hover:text-urban-gold transition-colors">
                {product.name}
            </h3>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                {product.tags.slice(0, 2).join(' • ')}
            </p>
            <p className="font-bold text-urban-charcoal text-lg">
                ${product.sizes[0].price.toFixed(2)}
            </p>
        </div>
    </Link>
  );
};

export default ProductCard;
