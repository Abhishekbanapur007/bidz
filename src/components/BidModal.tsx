import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/timeFormat';
import { X, Gavel, AlertCircle, CheckCircle2 } from 'lucide-react';

export const BidModal: React.FC = () => {
  const { activeBidModalItem, setActiveBidModalItem, placeBid } = useMarketplace();
  const { currentUser, openSignupModal } = useAuth();

  const [bidAmount, setBidAmount] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeBidModalItem) return null;

  const item = activeBidModalItem;
  const currentMin = item.minNextBid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentUser) {
      openSignupModal();
      return;
    }

    const val = Number(bidAmount || currentMin);
    if (isNaN(val) || val <= 0) {
      setErrorMsg('Please enter a valid bid amount.');
      return;
    }

    setIsSubmitting(true);
    const res = placeBid(item.id, val);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setActiveBidModalItem(null);
        setSuccessMsg('');
        setBidAmount('');
      }, 1400);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Gavel className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Place Live Bid</h3>
              <p className="text-[11px] text-slate-400">Instant Auction Increment</p>
            </div>
          </div>

          <button
            onClick={() => setActiveBidModalItem(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item Short Snapshot */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 mb-4">
          <img
            src={item.images[0]}
            alt=""
            className="w-12 h-12 rounded-lg object-cover border border-slate-200"
          />
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-800 truncate">{item.title}</h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
              <span>Current: <strong className="font-mono text-slate-900">{formatCurrency(item.currentBid)}</strong></span>
              <span aria-hidden="true">·</span>
              <span>{item.bidCount} bids</span>
            </div>
          </div>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-semibold text-slate-700">
                Your Bid Amount ($USD)
              </label>
              <span className="text-slate-500 text-[11px]">
                Min Allowed: <strong className="font-mono text-blue-700">{formatCurrency(currentMin)}</strong>
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                $
              </span>
              <input
                type="number"
                min={currentMin}
                step="1"
                placeholder={String(currentMin)}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-base font-mono font-bold"
              />
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Presets:</span>
            {[currentMin, currentMin + 15, currentMin + 50].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setBidAmount(String(preset))}
                className="px-2.5 py-1 text-xs font-mono rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 transition-colors"
              >
                ${preset}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <Gavel className="w-4 h-4" />
            <span>Confirm & Submit Bid</span>
          </button>
        </form>

        <p className="mt-3 text-[10px] text-slate-400 text-center">
          Demonstration Mode: Placing a bid updates the simulated auction state and deducts temporary demo escrow.
        </p>
      </div>
    </div>
  );
};
