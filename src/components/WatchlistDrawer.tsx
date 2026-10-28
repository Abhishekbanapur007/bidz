import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatCurrency } from '../utils/timeFormat';
import { X, Heart, Trash2, Gavel } from 'lucide-react';

export const WatchlistDrawer: React.FC = () => {
  const {
    isWatchlistOpen,
    setIsWatchlistOpen,
    watchlistItems,
    toggleWatchlist,
    setSelectedListing,
    setActiveBidModalItem,
  } = useMarketplace();

  if (!isWatchlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Saved Watchlist</h3>
              <p className="text-[11px] text-slate-400">
                {watchlistItems.length} items tracked
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWatchlistOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {watchlistItems.length > 0 ? (
            watchlistItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-xs flex items-center justify-between gap-3"
              >
                <img
                  src={item.images[0]}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0 cursor-pointer"
                  onClick={() => {
                    setSelectedListing(item);
                    setIsWatchlistOpen(false);
                  }}
                />

                <div className="flex-1 overflow-hidden">
                  <h4
                    onClick={() => {
                      setSelectedListing(item);
                      setIsWatchlistOpen(false);
                    }}
                    className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                  >
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <span className="font-mono font-bold text-slate-900">
                      {formatCurrency(item.currentBid)}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] text-slate-500">{item.bidCount} bids</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveBidModalItem(item);
                    }}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"
                    title="Place Bid"
                  >
                    <Gavel className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWatchlist(item.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Heart className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">Your watchlist is empty</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Click the heart icon on any auction card to track prices and closing countdowns.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 text-center">
          Items in your watchlist remain saved across demo sessions.
        </div>
      </div>
    </div>
  );
};
