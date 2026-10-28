import React, { useState } from 'react';
import { ListingItem } from '../types/marketplace';
import { CountdownTimer } from './CountdownTimer';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  Heart,
  Gavel,
  Radio,
  GraduationCap,
  CheckCircle,
  Eye,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react';
import { formatCurrency } from '../utils/timeFormat';

interface ListingCardProps {
  listing: ListingItem;
  featured?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  featured = false,
}) => {
  const {
    setSelectedListing,
    setActiveBidModalItem,
    toggleWatchlist,
    isInWatchlist,
  } = useMarketplace();

  const [imageError, setImageError] = useState(false);
  const isSaved = isInWatchlist(listing.id);
  const isSold = listing.status === 'sold' || listing.status === 'completed';

  const categoryLabels: Record<string, string> = {
    sports: 'Sports',
    college: 'College',
    electronics: 'Tech',
    government: 'Government Tender',
    skills: 'Skill Auction',
    vehicles: 'Vehicles',
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">
      {/* Top Media Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            onClick={() => setSelectedListing(listing)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          />
        ) : (
          <div
            onClick={() => setSelectedListing(listing)}
            className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-500 cursor-pointer p-4 text-center"
          >
            <Gavel className="w-8 h-8 mb-2 text-slate-400" />
            <span className="text-xs font-semibold">{listing.title}</span>
          </div>
        )}

        {/* Live Status indicator or Sold Overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {isSold ? (
            <span className="bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
              SOLD
            </span>
          ) : (
            <span className="bg-white/95 backdrop-blur-xs text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </span>
          )}

          {listing.category === 'government' && (
            <span className="bg-[#1E3A8A]/90 backdrop-blur-xs text-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
              Demo Tender
            </span>
          )}
        </div>

        {/* Watchlist Quick Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist(listing.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isSaved
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-600 shadow-xs'
          }`}
          title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
          aria-label={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Live Countdown Bar Overlay (Bottom of image) */}
        {!isSold && (
          <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-lg px-2.5 py-1.5 flex items-center justify-between text-white text-xs">
            <span className="text-[10px] text-slate-300">Time Left</span>
            <CountdownTimer endTime={listing.endTime} compact className="text-white" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 truncate">
            <span className="font-semibold text-blue-700 uppercase tracking-wider text-[11px]">
              {categoryLabels[listing.category] || listing.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{listing.bidCount} bids</span>
            {listing.seller.college && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate text-slate-600">{listing.seller.college.split(' ')[0]}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h4
            onClick={() => setSelectedListing(listing)}
            className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors leading-snug"
          >
            {listing.title}
          </h4>

          {/* Short Category-Specific Key Highlight */}
          <div className="mt-2 text-xs text-slate-500 truncate">
            {listing.category === 'sports' && listing.attributes.authenticityCert && (
              <span>COA: {listing.attributes.authenticityCert.split('#')[0]}</span>
            )}
            {listing.category === 'college' && (
              <span>Pickup: {listing.attributes.deliveryOption || 'Campus Meetup'}</span>
            )}
            {listing.category === 'electronics' && listing.attributes.warrantyStatus && (
              <span>Warranty: {listing.attributes.warrantyStatus}</span>
            )}
            {listing.category === 'government' && (
              <span>Ref: {listing.attributes.tenderReferenceNumber}</span>
            )}
            {listing.category === 'skills' && (
              <span>Timeline: {listing.attributes.deliveryDays} Days Delivery</span>
            )}
            {listing.category === 'vehicles' && (
              <span>Odometer: {listing.attributes.odometerReading || 'Clean Title'}</span>
            )}
          </div>
        </div>

        {/* Pricing & Bid Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                {isSold ? 'Final Winning Bid' : 'Current Bid'}
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#0B1B3A] tabular-nums font-mono">
                {formatCurrency(isSold ? listing.soldPrice || listing.currentBid : listing.currentBid)}
              </span>
            </div>

            {!isSold && (
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Next Min Bid
                </span>
                <span className="text-xs font-semibold text-slate-700 tabular-nums font-mono">
                  {formatCurrency(listing.minNextBid)}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedListing(listing)}
              className="w-full py-2 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            {!isSold ? (
              <button
                type="button"
                onClick={() => setActiveBidModalItem(listing)}
                className="w-full py-2 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1"
              >
                <Gavel className="w-3.5 h-3.5" />
                <span>Place Bid</span>
              </button>
            ) : (
              <div className="w-full py-2 px-2.5 rounded-lg bg-slate-100 text-slate-500 text-xs font-medium text-center flex items-center justify-center">
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
