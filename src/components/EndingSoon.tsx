import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ListingCard } from './ListingCard';
import { Timer, AlertTriangle } from 'lucide-react';

export const EndingSoon: React.FC = () => {
  const { endingSoonListings } = useMarketplace();
  const items = endingSoonListings.slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="py-8" id="ending-soon">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
            <Timer className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>Last Chance Bids</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3A] tracking-tight">
            Ending Soon — Clock Ticking
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Auctions closing in minutes or hours. Submit bids before final timer expiry.
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
