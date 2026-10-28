import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingCard } from './ListingCard';
import { Flame, TrendingUp } from 'lucide-react';

export const TrendingItems: React.FC = () => {
  const { trendingListings } = useMarketplace();
  const items = trendingListings.slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="py-8" id="trending-section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Trending on Bidz</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3A] tracking-tight">
            High Engagement & High Bid Velocity
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Most viewed and competitively bid items across all 6 categories (sample engagement data).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};
