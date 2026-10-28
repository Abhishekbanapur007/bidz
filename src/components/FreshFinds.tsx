import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingCard } from './ListingCard';
import { Sparkles, ArrowUpDown, Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/mockMarketplace';

export const FreshFinds: React.FC = () => {
  const {
    filteredListings,
    sortBy,
    setSortBy,
    activeCategory,
    setActiveCategory,
    priceFilter,
    setPriceFilter,
    searchQuery,
    resetFilters,
  } = useMarketplace();

  return (
    <section className="py-8" id="fresh-finds">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Marketplace Catalog</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3A] tracking-tight">
            Fresh Finds & Search Results
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {searchQuery ? `Showing matches for "${searchQuery}"` : 'Browse new additions across all six categories with live sorting.'}
          </p>
        </div>

        {/* Working Sorting Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold text-slate-800 bg-transparent outline-none cursor-pointer pr-1"
            >
              <option value="featured">Featured / Trending</option>
              <option value="newest">Newly Listed</option>
              <option value="ending_soon">Ending Soon</option>
              <option value="price_asc">Lowest Current Bid</option>
              <option value="price_desc">Highest Current Bid</option>
              <option value="bids_desc">Most Bids</option>
            </select>
          </div>

          {(activeCategory !== 'all' || searchQuery || sortBy !== 'featured') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills (Functional Buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          All Items ({filteredListings.length})
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of Items */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">No items found</h3>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search query, clearing filters, or switching category.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
};
