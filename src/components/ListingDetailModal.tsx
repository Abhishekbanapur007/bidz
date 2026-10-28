import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { CountdownTimer } from './CountdownTimer';
import { formatCurrency } from '../utils/timeFormat';
import {
  X,
  Heart,
  Gavel,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  GraduationCap,
  AlertCircle,
  Share2,
  Building2,
  User,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const ListingDetailModal: React.FC = () => {
  const {
    selectedListing,
    setSelectedListing,
    placeBid,
    buyNow,
    toggleWatchlist,
    isInWatchlist,
  } = useMarketplace();

  const { currentUser, openSignupModal } = useAuth();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [customBidInput, setCustomBidInput] = useState('');
  const [bidError, setBidError] = useState('');
  const [bidSuccess, setBidSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  if (!selectedListing) return null;

  const item = selectedListing;
  const isSaved = isInWatchlist(item.id);
  const isSold = item.status === 'sold' || item.status === 'completed';

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    setBidError('');
    setBidSuccess('');

    if (!currentUser) {
      openSignupModal();
      return;
    }

    const amount = Number(customBidInput || item.minNextBid);
    if (isNaN(amount) || amount <= 0) {
      setBidError('Please enter a valid bid amount.');
      return;
    }

    setIsSubmitting(true);
    const result = placeBid(item.id, amount);
    setIsSubmitting(false);

    if (result.success) {
      setBidSuccess(result.message);
      setCustomBidInput('');
    } else {
      setBidError(result.message);
    }
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      openSignupModal();
      return;
    }
    const result = buyNow(item.id);
    if (result.success) {
      setBidSuccess(result.message);
    } else {
      setBidError(result.message);
    }
  };

  const handleContactSeller = () => {
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-bold text-blue-700 uppercase tracking-wider text-[11px]">
              {item.category.toUpperCase()}
            </span>
            <span aria-hidden="true">·</span>
            <span>Listing #{item.id.replace('list_', '')}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Demo Listing</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWatchlist(item.id)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-rose-600'
              }`}
              title={isSaved ? 'Saved to Watchlist' : 'Add to Watchlist'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => setSelectedListing(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (5 cols): Media Gallery & Seller Card */}
          <div className="lg:col-span-5 space-y-5">
            {/* Main Image */}
            <div className="aspect-4/3 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 relative">
              <img
                src={item.images[activeImageIdx] || item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {!isSold && (
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Auction
                </div>
              )}
            </div>

            {/* Thumbnail selector if multiple images */}
            {item.images.length > 1 && (
              <div className="flex items-center gap-2">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-blue-600 scale-95' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Seller Profile Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Seller Information
                </span>
                {item.seller.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    Verified Seller
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={item.seller.avatar}
                  alt={item.seller.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="overflow-hidden">
                  <h5 className="text-sm font-bold text-slate-900 truncate">
                    {item.seller.name}
                  </h5>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="text-amber-500 font-bold">★ {item.seller.rating}</span>
                    <span>({item.seller.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {item.seller.college && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center gap-1.5 text-xs text-sky-800">
                  <GraduationCap className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="truncate">{item.seller.college}</span>
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={handleContactSeller}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>{inquirySent ? 'Inquiry Sent (Simulated)' : 'Contact Seller / Ask Question'}</span>
                </button>
              </div>
            </div>

            {/* Location & Delivery Info */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-700">Location:</strong> {item.location || 'United States'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-700">Delivery:</strong> {item.shippingOrDelivery}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Auction Mechanics & Category Specs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1B3A] tracking-tight leading-snug">
                {item.title}
              </h2>

              {/* Countdown / Status Banner */}
              <div className="mt-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-blue-800 font-bold uppercase tracking-wider block">
                    {isSold ? 'Auction Final Status' : 'Live Auction Countdown'}
                  </span>
                  {!isSold ? (
                    <div className="mt-0.5">
                      <CountdownTimer endTime={item.endTime} className="text-base font-bold text-blue-900" />
                    </div>
                  ) : (
                    <div className="text-sm font-bold text-slate-700 mt-0.5">
                      Sold to {item.winnerName || 'High Bidder'}
                    </div>
                  )}
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-blue-800 font-bold uppercase tracking-wider block">
                    {isSold ? 'Winning Sold Price' : 'Current Highest Bid'}
                  </span>
                  <span className="text-2xl font-black font-mono text-[#0B1B3A] tabular-nums">
                    {formatCurrency(isSold ? item.soldPrice || item.currentBid : item.currentBid)}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {item.bidCount} bids placed
                  </span>
                </div>
              </div>

              {/* Feedback Toasts */}
              {bidSuccess && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{bidSuccess}</span>
                </div>
              )}
              {bidError && (
                <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{bidError}</span>
                </div>
              )}

              {/* Bidding Control Module (Contiguous PDP Purchase module) */}
              {!isSold && (
                <div className="mt-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <form onSubmit={handlePlaceBid} className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-slate-800">
                        Enter Custom Bid Amount ($USD)
                      </label>
                      <span className="text-slate-500 font-mono">
                        Min next: <strong>{formatCurrency(item.minNextBid)}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                          $
                        </span>
                        <input
                          type="number"
                          min={item.minNextBid}
                          step="1"
                          placeholder={String(item.minNextBid)}
                          value={customBidInput}
                          onChange={(e) => setCustomBidInput(e.target.value)}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-mono font-bold"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Gavel className="w-4 h-4" />
                        <span>Place Bid</span>
                      </button>
                    </div>

                    {/* Quick increment buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[11px] text-slate-400">Quick set:</span>
                      {[item.minNextBid, item.minNextBid + 25, item.minNextBid + 50, item.minNextBid + 100].map((inc) => (
                        <button
                          key={inc}
                          type="button"
                          onClick={() => setCustomBidInput(String(inc))}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 transition-colors"
                        >
                          ${inc}
                        </button>
                      ))}
                    </div>
                  </form>

                  {/* Buy Now Option if Available */}
                  {item.buyNowPrice && (
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                          Fixed Price Purchase
                        </span>
                        <span className="text-lg font-black font-mono text-emerald-700">
                          {formatCurrency(item.buyNowPrice)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleBuyNow}
                        className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                      >
                        Buy Now Direct
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Item Description
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Category-Specific Attributes Table (Mandatory Section 7) */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Category Specifications & Verified Attributes
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Sports Specifics */}
                  {item.category === 'sports' && (
                    <>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Sport Discipline</span>
                        <span className="font-semibold text-slate-800">{item.attributes.sportType || 'Sports Memorabilia'}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Memorabilia Type</span>
                        <span className="font-semibold text-slate-800">{item.attributes.memorabiliaType}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Condition</span>
                        <span className="font-semibold text-slate-800">{item.attributes.itemCondition}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Authenticity Certificate</span>
                        <span className="font-semibold text-blue-700">{item.attributes.authenticityCert || 'Verified'}</span>
                      </div>
                    </>
                  )}

                  {/* College Specifics */}
                  {item.category === 'college' && (
                    <>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">University Campus</span>
                        <span className="font-semibold text-slate-800">{item.attributes.campus}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Student Item Type</span>
                        <span className="font-semibold text-slate-800">{item.attributes.studentItemType}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Campus Handover</span>
                        <span className="font-semibold text-emerald-700">{item.attributes.deliveryOption}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Term / Semester Used</span>
                        <span className="font-semibold text-slate-800">{item.attributes.semesterUsed}</span>
                      </div>
                    </>
                  )}

                  {/* Electronics Specifics */}
                  {item.category === 'electronics' && (
                    <>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Brand / Manufacturer</span>
                        <span className="font-semibold text-slate-800">{item.attributes.brand}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Device Category</span>
                        <span className="font-semibold text-slate-800">{item.attributes.deviceType}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Battery Health / Cycles</span>
                        <span className="font-semibold text-slate-800">{item.attributes.batteryHealth || '100%'}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Warranty Coverage</span>
                        <span className="font-semibold text-blue-700">{item.attributes.warrantyStatus}</span>
                      </div>
                    </>
                  )}

                  {/* Government Projects Specifics */}
                  {item.category === 'government' && (
                    <>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 sm:col-span-2">
                        <span className="text-slate-400 block text-[10px]">Issuing Public Organization</span>
                        <span className="font-semibold text-slate-800">{item.attributes.issuingOrganization}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Tender Reference #</span>
                        <span className="font-mono font-bold text-blue-800">{item.attributes.tenderReferenceNumber}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Submission Deadline</span>
                        <span className="font-semibold text-rose-700">{item.attributes.submissionDeadline}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 sm:col-span-2">
                        <span className="text-slate-400 block text-[10px]">Eligibility & Requirements</span>
                        <span className="text-slate-700">{item.attributes.eligibilityRequirements}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-200 sm:col-span-2">
                        <span className="text-blue-900 block text-[10px] font-bold">Official Demonstration Portal Notice</span>
                        <span className="text-slate-600 text-[11px]">
                          This is a student hackathon demonstration tender opportunity. Bids are simulated vendor proposals.
                        </span>
                      </div>
                    </>
                  )}

                  {/* Skills Specifics */}
                  {item.category === 'skills' && (
                    <>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Service / Discipline</span>
                        <span className="font-semibold text-slate-800">{item.attributes.serviceType}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Delivery Timeline</span>
                        <span className="font-semibold text-emerald-700">{item.attributes.deliveryDays} Calendar Days</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Included Revisions</span>
                        <span className="font-semibold text-slate-800">{item.attributes.revisionsIncluded} Revisions</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Scope of Work</span>
                        <span className="text-slate-700">{item.attributes.scopeOfWork}</span>
                      </div>
                    </>
                  )}

                  {/* Vehicles Specifics */}
                  {item.category === 'vehicles' && (
                    <>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Make, Model & Year</span>
                        <span className="font-semibold text-slate-800">{item.attributes.makeModel} ({item.attributes.manufacturingYear})</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Odometer Reading</span>
                        <span className="font-mono font-semibold text-slate-800">{item.attributes.odometerReading}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Title & Documentation</span>
                        <span className="font-semibold text-emerald-700">{item.attributes.ownershipDocStatus}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-slate-400 block text-[10px]">Mechanical Inspection</span>
                        <span className="text-slate-700">{item.attributes.inspectionDetails}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Live Bid History Log (Real-time updates) */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Bidding History ({item.bids.length} records)
                  </h4>
                  <span className="text-[11px] text-slate-400">Chronological</span>
                </div>

                {item.bids.length > 0 ? (
                  <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
                    {item.bids.map((b, idx) => (
                      <div key={b.id || idx} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px]">
                            {b.bidderName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800">{b.bidderName}</span>
                            {b.bidderCollege && (
                              <span className="text-[10px] text-slate-400 ml-1.5">
                                ({b.bidderCollege})
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 text-[11px]">{b.timestamp}</span>
                          <span className="font-mono font-bold text-slate-900 tabular-nums">
                            {formatCurrency(b.amount)}
                          </span>
                          {idx === 0 && !isSold && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Winning
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic py-2">
                    No bids placed yet. Be the first to place the starting bid!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
