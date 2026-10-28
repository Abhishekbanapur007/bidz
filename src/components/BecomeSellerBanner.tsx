import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { PlusCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const BecomeSellerBanner: React.FC = () => {
  const { currentUser, openSignupModal } = useAuth();
  const { setIsSellModalOpen } = useMarketplace();

  const handleStartSelling = () => {
    if (!currentUser) {
      openSignupModal();
    } else {
      setIsSellModalOpen(true);
    }
  };

  return (
    <section className="my-10">
      <div className="rounded-3xl bg-gradient-to-br from-[#0B1B3A] via-[#112D5E] to-[#1E3A8A] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-blue-900/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span>Open Seller Marketplace</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Turn Your Unused Items and Skills Into Opportunities.
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6 max-w-2xl">
            List your products, services or permitted project offerings and connect with interested buyers across sports memorabilia, college resale, electronics, freelance dev skills, vehicles, and authorized tenders.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleStartSelling}
              className="py-3 px-6 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Start Selling</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Zero listing fees for college students during prototype period
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
