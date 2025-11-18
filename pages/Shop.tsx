import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/Shop/ProductCard';
import { CAKE_CATALOG } from '../constants';

const Shop: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | null>(null);

  const filters = ['all', 'vegetarian', 'chocolate', 'fruit', 'contains-nuts', 'contains-egg'];

  const filteredProducts = useMemo(() => {
    let products = CAKE_CATALOG;

    if (searchQuery) {
      products = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedFilter !== 'all') {
      products = products.filter(p => p.tags.includes(selectedFilter));
    }

    if (priceSort) {
      products = [...products].sort((a, b) => {
        const priceA = a.sizes[0].price;
        const priceB = b.sizes[0].price;
        return priceSort === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    return products;
  }, [searchQuery, selectedFilter, priceSort]);

  return (
    <div className="min-h-screen bg-urban-cream/30 pb-20 animate-fade-in">
      {/* Shop Header */}
      <div className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-urban-charcoal mb-4">Our Collection</h1>
          <p className="text-gray-500">Explore our range of artisanal cakes tailored for every taste.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 sticky top-20 z-30 bg-urban-cream/95 p-4 rounded-xl backdrop-blur md:static md:bg-transparent md:p-0">
           {/* Search */}
           <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search cakes..." 
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-urban-gold/50 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>

           {/* Filter Chips */}
           <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap capitalize text-sm font-medium transition-colors border ${selectedFilter === f ? 'bg-urban-charcoal text-white border-urban-charcoal' : 'bg-white text-gray-600 border-gray-200 hover:border-urban-gold'}`}
                >
                  {f.replace('-', ' ')}
                </button>
              ))}
           </div>

           {/* Sort */}
           <div className="flex items-center gap-2">
              <select 
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none cursor-pointer"
                onChange={(e) => setPriceSort(e.target.value as any)}
              >
                <option value="">Sort by Price</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No cakes found matching your criteria.</p>
            <button onClick={() => {setSearchQuery(''); setSelectedFilter('all');}} className="mt-4 text-urban-gold underline">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;