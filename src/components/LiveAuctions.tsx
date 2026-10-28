import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingCard } from './ListingCard';
import { Radio, ArrowRight, Flame } from 'lucide-react';

export const LiveAuctions: React.FC = () => {
  const { liveAuctions, activeCategory, setActiveCategory } = useMarketplace();

  // Take top 4 or relevant active auctions
  const displayedAuctions = liveAuctions.slice(0, 4);

  return (
    <section className="py-8" id="live-auctions">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              Live Right Now
            </span>
            <span className="text-xs text-slate-400">
              {liveAuctions.length} active live auctions
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3A] tracking-tight">
            Competitive Live Bidding
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time demo auctions with live countdowns, verified sellers, and instant bid confirmations.
          </p>
        </div>

        {activeCategory !== 'all' && (
          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 shrink-0"
          >
            <span>View All Live</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {displayedAuctions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedAuctions.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-slate-600 text-sm">No live auctions matching current category filter.</p>
          <button
            onClick={() => setActiveCategory('all')}
            className="mt-3 text-xs font-semibold text-blue-600 underline"
          >
            Reset category filter
          </button>
        </div>
      )}
    </section>
  );
};
