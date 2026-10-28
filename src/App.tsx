import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { SignupPage } from './components/SignupPage';
import { MarketplaceHeader } from './components/MarketplaceHeader';
import { MarketplaceDashboard } from './components/MarketplaceDashboard';
import { Footer } from './components/Footer';
import { ListingDetailModal } from './components/ListingDetailModal';
import { BidModal } from './components/BidModal';
import { CreateListingModal } from './components/CreateListingModal';
import { UserBidsDrawer } from './components/UserBidsDrawer';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { NotificationsPopover } from './components/NotificationsPopover';
import { X } from 'lucide-react';

const MarketplaceApp: React.FC = () => {
  const { currentUser, isGuest, isSignupModalOpen, closeSignupModal } = useAuth();

  // If visitor is not authenticated and not browsing as guest, show the dedicated Signup-First screen!
  const hasEnteredMarketplace = !!currentUser || isGuest;

  if (!hasEnteredMarketplace) {
    return <SignupPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      {/* 3-Zone Sticky Navigation Header */}
      <MarketplaceHeader />

      {/* Main Marketplace Sections */}
      <main className="flex-1">
        <MarketplaceDashboard />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <ListingDetailModal />
      <BidModal />
      <CreateListingModal />
      <UserBidsDrawer />
      <WatchlistDrawer />
      <NotificationsPopover />

      {/* Auth Modal (when guest triggers protected actions like Bidding or Selling) */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md my-auto">
            <button
              onClick={closeSignupModal}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 shadow-md transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <SignupPage isModal onSuccess={closeSignupModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <MarketplaceApp />
      </MarketplaceProvider>
    </AuthProvider>
  );
}
