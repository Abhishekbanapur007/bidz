import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { ListingCard } from './ListingCard';
import { Sparkles, GraduationCap } from 'lucide-react';

export const RecommendedSection: React.FC = () => {
  const { recommendedListings } = useMarketplace();
  const { currentUser } = useAuth();

  if (recommendedListings.length === 0) return null;

  return (
    <section className="py-8" id="recommended">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>Recommended for You</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3A] tracking-tight">
            {currentUser?.college
              ? `Curated for ${currentUser.college} & Trending Auctions`
              : 'Curated Selections for Your Interests'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Personalized matches tailored to your student profile, bidding history, and active watchlist.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recommendedListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};
