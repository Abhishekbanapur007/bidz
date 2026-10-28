import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { X, Bell, Check, Trash2, Gavel, Sparkles } from 'lucide-react';

export const NotificationsPopover: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationRead,
    clearNotifications,
    setSelectedListing,
    listings,
  } = useMarketplace();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
              <p className="text-[10px] text-slate-400">Live auction alerts</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="text-[11px] text-slate-400 hover:text-slate-600 px-2 py-1"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.listingId) {
                    const match = listings.find((l) => l.id === n.listingId);
                    if (match) {
                      setSelectedListing(match);
                      setIsNotificationsOpen(false);
                    }
                  }
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  n.read
                    ? 'border-slate-100 bg-white text-slate-600'
                    : 'border-blue-200 bg-blue-50/60 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    {n.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{n.message}</p>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">No new alerts</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center">
          Real-time alerts for outbids, won auctions, and tenders.
        </div>
      </div>
    </div>
  );
};
