import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  Search,
  PlusCircle,
  Gavel,
  Heart,
  Bell,
  User,
  LogOut,
  ChevronDown,
  Layers,
  GraduationCap,
  Sparkles,
  Wallet,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { CATEGORIES } from '../data/mockMarketplace';
import { CategoryId } from '../types/marketplace';

export const MarketplaceHeader: React.FC = () => {
  const { currentUser, isGuest, signout, openSignupModal } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    userBids,
    watchlistItems,
    notifications,
    setIsSellModalOpen,
    setIsMyBidsOpen,
    setIsWatchlistOpen,
    setIsNotificationsOpen,
    isNotificationsOpen,
  } = useMarketplace();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Sync external search query
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  const handleCategorySelect = (catId: CategoryId | 'all') => {
    setActiveCategory(catId);
    setIsCategoryMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleProtectedAction = (action: () => void) => {
    if (!currentUser) {
      openSignupModal();
    } else {
      action();
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner: Student Hackathon Prototype Disclaimer */}
      <div className="bg-[#0B1B3A] text-white text-[11px] px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="font-semibold text-sky-300">DEMO MODE:</span>
          <span className="text-slate-300 truncate">
            All auctions, bids, college listings, and tenders are simulated demonstrations.
          </span>
          <div className="ml-auto hidden md:flex items-center gap-4 text-slate-300">
            {currentUser?.college && (
              <span className="flex items-center gap-1 text-sky-300">
                <GraduationCap className="w-3.5 h-3.5" />
                {currentUser.college}
              </span>
            )}
            {currentUser && (
              <span className="flex items-center gap-1 font-mono text-emerald-300">
                <Wallet className="w-3.5 h-3.5" />
                Demo Balance: ${currentUser.walletBalance.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Brand Wordmark / Official Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <BrandLogo
            size="md"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
          />

          {/* Category Dropdown Button (Desktop) */}
          <div className="relative hidden lg:block" ref={categoryDropdownRef}>
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                activeCategory !== 'all'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {activeCategory === 'all'
                  ? 'All Categories'
                  : CATEGORIES.find((c) => c.id === activeCategory)?.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`w-full px-4 py-2 text-xs text-left font-semibold flex items-center justify-between hover:bg-slate-50 ${
                    activeCategory === 'all' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-800'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] text-slate-400">View All</span>
                </button>
                <div className="h-px bg-slate-100 my-1" />
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`w-full px-4 py-2 text-xs text-left font-medium flex items-center justify-between hover:bg-blue-50/50 ${
                      activeCategory === cat.id ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {cat.sampleCount} items
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: Global Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-xl hidden md:flex items-center relative"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search items, skills, vehicles and auctions..."
              className="w-full pl-10 pr-24 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-900 transition-all placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  setSearchQuery('');
                }}
                className="absolute right-18 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
            >
              Search
            </button>
          </div>
        </form>

        {/* Zone 3: Actions & Account Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sell / List Item Button */}
          <button
            onClick={() => handleProtectedAction(() => setIsSellModalOpen(true))}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sell or List</span>
            <span className="sm:hidden">Sell</span>
          </button>

          {/* My Bids Drawer Toggle */}
          <button
            onClick={() => handleProtectedAction(() => setIsMyBidsOpen(true))}
            className="relative p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
            title="My Bids"
            aria-label="My Bids"
          >
            <Gavel className="w-4 h-4" />
            {userBids.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {userBids.length}
              </span>
            )}
          </button>

          {/* Watchlist Drawer Toggle */}
          <button
            onClick={() => handleProtectedAction(() => setIsWatchlistOpen(true))}
            className="relative p-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors"
            title="Watchlist"
            aria-label="Watchlist"
          >
            <Heart className="w-4 h-4" />
            {watchlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {watchlistItems.length}
              </span>
            )}
          </button>

          {/* Notifications Toggle */}
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Account / Profile */}
          {currentUser ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-slate-800 hidden md:inline max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    {currentUser.college && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded mt-1">
                        <GraduationCap className="w-3 h-3" />
                        {currentUser.college}
                      </span>
                    )}
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Wallet</span>
                      <span className="font-mono font-bold text-emerald-600">
                        ${currentUser.walletBalance.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsMyBidsOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-left font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Gavel className="w-3.5 h-3.5 text-blue-600" />
                    <span>My Active Bids ({userBids.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsWatchlistOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-left font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Watchlist ({watchlistItems.length})</span>
                  </button>

                  <div className="h-px bg-slate-100 my-1" />

                  <button
                    onClick={() => {
                      signout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-left font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openSignupModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search items, skills, vehicles..."
              className="w-full pl-9 pr-20 py-2 rounded-lg border border-slate-200 text-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 text-white text-xs font-semibold rounded"
            >
              Search
            </button>
          </form>

          {/* Mobile Categories Grid */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Explore Categories
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`p-2 text-xs text-left rounded-lg border ${
                  activeCategory === 'all'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`p-2 text-xs text-left rounded-lg border ${
                    activeCategory === cat.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
