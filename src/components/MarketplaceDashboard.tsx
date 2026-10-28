import React from 'react';
import { WelcomeDashboard } from './WelcomeDashboard';
import { CategoryExplorer } from './CategoryExplorer';
import { LiveAuctions } from './LiveAuctions';
import { TrendingItems } from './TrendingItems';
import { RecentlySold } from './RecentlySold';
import { EndingSoon } from './EndingSoon';
import { FreshFinds } from './FreshFinds';
import { RecommendedSection } from './RecommendedSection';
import { BecomeSellerBanner } from './BecomeSellerBanner';
import { HowBidzWorks } from './HowBidzWorks';
import { useMarketplace } from '../context/MarketplaceContext';

export const MarketplaceDashboard: React.FC = () => {
  const { activeCategory, searchQuery } = useMarketplace();

  const isBrowsingAll = activeCategory === 'all' && !searchQuery.trim();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* 6.A Welcome Dashboard */}
      <WelcomeDashboard />

      {/* 6.B Category Explorer (Always visible for quick navigation) */}
      <CategoryExplorer />

      {/* If user is filtering or searching, highlight the filtered catalog right at the top */}
      {!isBrowsingAll && (
        <div className="py-2">
          <FreshFinds />
        </div>
      )}

      {/* 6.C Live Auctions ("Live Right Now") */}
      <LiveAuctions />

      {/* 6.D Trending Items ("Trending on Bidz") */}
      <TrendingItems />

      {/* 6.E Best of Bidz — Previous Successful Auctions ("Recently Sold") */}
      <RecentlySold />

      {/* 6.F Ending Soon */}
      <EndingSoon />

      {/* 6.G Fresh Finds (Catalog with sorting options) */}
      {isBrowsingAll && <FreshFinds />}

      {/* 6.H Recommended for You */}
      <RecommendedSection />

      {/* 6.I Become a Seller */}
      <BecomeSellerBanner />

      {/* 6.J How Bidz Works */}
      <HowBidzWorks />
    </div>
  );
};
