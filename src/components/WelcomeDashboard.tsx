import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  Gavel,
  Heart,
  Wallet,
  Sparkles,
  PlusCircle,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';

export const WelcomeDashboard: React.FC = () => {
  const { currentUser, isGuest, openSignupModal, updateWalletBalance } = useAuth();
  const {
    userBids,
    watchlistItems,
    liveAuctions,
    setIsSellModalOpen,
    setIsMyBidsOpen,
    setIsWatchlistOpen,
  } = useMarketplace();

  return (
    <div className="bg-gradient-to-r from-[#0B1B3A] via-[#1E3A8A] to-[#2563EB] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      {/* Subtle background illumination pattern */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 -top-12 w-72 h-72 rounded-full bg-sky-300/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Personalized Greeting */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider font-bold text-sky-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Live Marketplace Overview
            </span>
            {currentUser?.isStudentVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <GraduationCap className="w-3 h-3" />
                Verified Student
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {currentUser ? `Welcome back, ${currentUser.name.split(' ')[0]}!` : 'Welcome to Bidz Marketplace'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 mt-2 leading-relaxed">
            {currentUser?.college
              ? `Connected to ${currentUser.college} student network and nationwide live auctions. Place your bids or list items today.`
              : 'Discover deals, sell what you no longer need, showcase your skills and participate in competitive auctions.'}
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={() => (currentUser ? setIsSellModalOpen(true) : openSignupModal())}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-blue-900 font-bold rounded-xl text-xs hover:bg-slate-100 transition-all shadow-md active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>List an Item or Skill</span>
            </button>

            <a
              href="#live-auctions"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-800/60 hover:bg-blue-700/60 text-white font-semibold rounded-xl text-xs border border-blue-400/30 transition-all"
            >
              <Gavel className="w-3.5 h-3.5 text-sky-300" />
              <span>Browse {liveAuctions.length} Live Auctions</span>
            </a>

            {currentUser && (
              <button
                onClick={() => updateWalletBalance(500)}
                className="inline-flex items-center gap-1 text-[11px] text-sky-200 hover:text-white px-2 py-1 underline decoration-dotted"
                title="Add $500 simulated demo funds"
              >
                + Add $500 Demo Funds
              </button>
            )}
          </div>
        </div>

        {/* Right: Quick Telemetry / Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
          {/* Active Bids Card */}
          <div
            onClick={() => (currentUser ? setIsMyBidsOpen(true) : openSignupModal())}
            className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs text-sky-200 mb-1">
              <span>My Bids</span>
              <Gavel className="w-3.5 h-3.5 text-sky-300" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono tabular-nums">
              {currentUser ? userBids.length : 0}
            </div>
            <span className="text-[10px] text-slate-300">
              {userBids.filter((b) => b.status === 'winning').length} winning
            </span>
          </div>

          {/* Watchlist Card */}
          <div
            onClick={() => (currentUser ? setIsWatchlistOpen(true) : openSignupModal())}
            className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs text-sky-200 mb-1">
              <span>Watchlist</span>
              <Heart className="w-3.5 h-3.5 text-rose-300" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono tabular-nums">
              {currentUser ? watchlistItems.length : 0}
            </div>
            <span className="text-[10px] text-slate-300">saved items</span>
          </div>

          {/* Demo Balance Card */}
          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center justify-between text-xs text-sky-200 mb-1">
              <span>Demo Balance</span>
              <Wallet className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono tabular-nums text-emerald-300">
              ${currentUser ? currentUser.walletBalance.toLocaleString() : '2,500'}
            </div>
            <span className="text-[10px] text-slate-300">simulated wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
};
