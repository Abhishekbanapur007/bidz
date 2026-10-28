import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatCurrency } from '../utils/timeFormat';
import { CountdownTimer } from './CountdownTimer';
import { X, Gavel, ArrowRight, ShieldCheck, Trophy } from 'lucide-react';

export const UserBidsDrawer: React.FC = () => {
  const {
    isMyBidsOpen,
    setIsMyBidsOpen,
    userBids,
    listings,
    setSelectedListing,
    setActiveBidModalItem,
  } = useMarketplace();

  if (!isMyBidsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Gavel className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">My Live Bids</h3>
              <p className="text-[11px] text-slate-400">
                {userBids.length} active submissions
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMyBidsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bids List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {userBids.length > 0 ? (
            userBids.map((b) => {
              const liveItem = listings.find((l) => l.id === b.listingId);
              const isWinning = liveItem ? liveItem.currentBid === b.amount : true;

              return (
                <div
                  key={b.listingId}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white transition-all shadow-xs space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={b.listingImage}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-blue-700 uppercase">
                          {b.category}
                        </span>
                        {isWinning ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Highest Bidder
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Outbid
                          </span>
                        )}
                      </div>

                      <h4
                        onClick={() => {
                          if (liveItem) {
                            setSelectedListing(liveItem);
                            setIsMyBidsOpen(false);
                          }
                        }}
                        className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                      >
                        {b.listingTitle}
                      </h4>

                      <div className="flex items-center gap-2 mt-1.5 text-xs">
                        <span className="text-slate-500">Your Bid:</span>
                        <span className="font-mono font-bold text-blue-700">
                          {formatCurrency(b.amount)}
                        </span>
                        {liveItem && liveItem.currentBid > b.amount && (
                          <span className="text-[11px] text-slate-400">
                            (Current: {formatCurrency(liveItem.currentBid)})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <CountdownTimer endTime={b.endTime} compact />

                    <div className="flex items-center gap-2">
                      {liveItem && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveBidModalItem(liveItem);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Increase Bid
                        </button>
                      )}
                      {liveItem && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedListing(liveItem);
                            setIsMyBidsOpen(false);
                          }}
                          className="px-2 py-1 text-xs font-semibold text-slate-600 hover:text-blue-600"
                        >
                          View
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Gavel className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">No active bids yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore the marketplace and place bids on sports, college essentials, or skill tenders.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 text-center">
          Bidding in demonstration mode updates simulated escrow balance.
        </div>
      </div>
    </div>
  );
};
