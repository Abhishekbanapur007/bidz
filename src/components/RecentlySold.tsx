import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingCard } from './ListingCard';
import { Trophy, CheckCircle2, History } from 'lucide-react';

export const RecentlySold: React.FC = () => {
  const { recentlySoldListings } = useMarketplace();

  return (
    <section className="py-8" id="recently-sold">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
            <History className="w-4 h-4 text-blue-600" />
            <span>Best of Bidz — Recently Sold</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3A] tracking-tight">
            Previous Successful Auctions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Demonstration archive of winning bids, final prices, and verified auction results.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Demonstration transaction history
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recentlySoldListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};
