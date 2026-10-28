import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { CategoryId, CategorySpecificAttributes } from '../types/marketplace';
import { CATEGORIES } from '../data/mockMarketplace';
import {
  X,
  PlusCircle,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const CreateListingModal: React.FC = () => {
  const { isSellModalOpen, setIsSellModalOpen, createListing } = useMarketplace();
  const { currentUser } = useAuth();

  const [category, setCategory] = useState<CategoryId>('college');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [buyNowPrice, setBuyNowPrice] = useState('');
  const [durationDays, setDurationDays] = useState('3');
  const [location, setLocation] = useState(currentUser?.college ? `${currentUser.college} Campus` : 'San Francisco, CA');
  const [shippingOrDelivery, setShippingOrDelivery] = useState('Campus Handover or Standard Insured Courier');
  const [imageUrl, setImageUrl] = useState('');

  // Category-specific fields state
  // Sports
  const [sportType, setSportType] = useState('Basketball');
  const [memorabiliaType, setMemorabiliaType] = useState('Signed Jersey');
  const [sportCondition, setSportCondition] = useState('Mint in Frame');
  const [authenticityCert, setAuthenticityCert] = useState('Beckett / PSA Authentication Hologram');

  // College
  const [campus, setCampus] = useState(currentUser?.college || 'Stanford University');
  const [studentItemType, setStudentItemType] = useState('Textbooks & Course Materials');
  const [deliveryOption, setDeliveryOption] = useState<'Dorm Delivery' | 'Campus Meetup' | 'Library Pickup' | 'Student Center'>('Campus Meetup');
  const [semesterUsed, setSemesterUsed] = useState('Spring 2026 Term');

  // Electronics
  const [brand, setBrand] = useState('Apple');
  const [deviceType, setDeviceType] = useState('Laptop');
  const [batteryHealth, setBatteryHealth] = useState('99% (Low Cycles)');
  const [warrantyStatus, setWarrantyStatus] = useState('Valid 1-Year Limited Warranty');

  // Government
  const [issuingOrganization, setIssuingOrganization] = useState('City Department of Public Works');
  const [tenderReferenceNumber, setTenderReferenceNumber] = useState(`MUNI-${Math.floor(1000 + Math.random() * 9000)}-TENDER`);
  const [submissionDeadline, setSubmissionDeadline] = useState('November 20, 2026, 17:00 EST');
  const [eligibilityRequirements, setEligibilityRequirements] = useState('Licensed state contractor, General Liability insurance $1M+');

  // Skills
  const [serviceType, setServiceType] = useState('Full-Stack Web App Development');
  const [portfolioUrl, setPortfolioUrl] = useState('https://github.com/developer-showcase');
  const [deliveryDays, setDeliveryDays] = useState('10');
  const [scopeOfWork, setScopeOfWork] = useState('Production React / Next.js app with authentication, database and responsive UI');
  const [revisionsIncluded, setRevisionsIncluded] = useState('3');

  // Vehicles
  const [vehicleType, setVehicleType] = useState<'Car' | 'Motorcycle' | 'Scooter' | 'Bicycle' | 'Electric Bike'>('Car');
  const [makeModel, setMakeModel] = useState('Honda Civic EX');
  const [manufacturingYear, setManufacturingYear] = useState('2022');
  const [odometerReading, setOdometerReading] = useState('18,500 miles');
  const [ownershipDocStatus, setOwnershipDocStatus] = useState<'Clean Title in Hand' | 'Single Owner Registration' | 'Bill of Sale Ready'>('Clean Title in Hand');
  const [inspectionDetails, setInspectionDetails] = useState('Completed 120-point dealer safety inspection with new brake pads');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isSellModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a listing title.');
      return;
    }
    const startNum = Number(startingBid);
    if (isNaN(startNum) || startNum <= 0) {
      setErrorMsg('Please specify a valid starting bid amount.');
      return;
    }

    // Assemble category-specific attributes
    const attributes: CategorySpecificAttributes = {};
    if (category === 'sports') {
      attributes.sportType = sportType;
      attributes.memorabiliaType = memorabiliaType;
      attributes.itemCondition = sportCondition;
      attributes.authenticityCert = authenticityCert;
    } else if (category === 'college') {
      attributes.campus = campus;
      attributes.studentItemType = studentItemType;
      attributes.deliveryOption = deliveryOption;
      attributes.semesterUsed = semesterUsed;
    } else if (category === 'electronics') {
      attributes.brand = brand;
      attributes.deviceType = deviceType;
      attributes.batteryHealth = batteryHealth;
      attributes.warrantyStatus = warrantyStatus;
    } else if (category === 'government') {
      attributes.issuingOrganization = issuingOrganization;
      attributes.tenderReferenceNumber = tenderReferenceNumber;
      attributes.submissionDeadline = submissionDeadline;
      attributes.eligibilityRequirements = eligibilityRequirements;
      attributes.verificationStatus = 'Procurement Opportunity (Demo)';
    } else if (category === 'skills') {
      attributes.serviceType = serviceType;
      attributes.portfolioUrl = portfolioUrl;
      attributes.deliveryDays = Number(deliveryDays) || 7;
      attributes.scopeOfWork = scopeOfWork;
      attributes.revisionsIncluded = Number(revisionsIncluded) || 2;
    } else if (category === 'vehicles') {
      attributes.vehicleType = vehicleType;
      attributes.makeModel = makeModel;
      attributes.manufacturingYear = Number(manufacturingYear) || 2022;
      attributes.odometerReading = odometerReading;
      attributes.ownershipDocStatus = ownershipDocStatus;
      attributes.inspectionDetails = inspectionDetails;
    }

    // Default stock imagery if empty
    const defaultImages: Record<CategoryId, string> = {
      sports: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&auto=format&fit=crop&q=80',
      college: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&auto=format&fit=crop&q=80',
      electronics: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      government: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      skills: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      vehicles: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
    };

    createListing({
      title: title.trim(),
      description: description.trim() || 'No description provided.',
      category: category,
      startingBid: startNum,
      buyNowPrice: buyNowPrice ? Number(buyNowPrice) : undefined,
      durationHoursRemaining: Number(durationDays) * 24,
      location: location,
      shippingOrDelivery: shippingOrDelivery,
      images: imageUrl.trim() ? [imageUrl.trim()] : [defaultImages[category]],
      attributes: attributes,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsSellModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">List an Item or Skill for Auction</h3>
              <p className="text-[11px] text-slate-500">Category-Specific Listing Submission</p>
            </div>
          </div>

          <button
            onClick={() => setIsSellModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Listing Published Live!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your listing is now active in the {category.toUpperCase()} category and available for competitive bids.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Category Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Category <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        category === cat.id
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{cat.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">{cat.tagline}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Basic Info */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Listing Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Vintage Signed Basketball / TI-84 Plus CE / MacBook Pro M3"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe condition, specifications, history, included accessories, or deliverables..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* 3. Category-Specific Fields (Section 7) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Category-Specific Attributes for {category.toUpperCase()}</span>
                </div>

                {/* Sports Fields */}
                {category === 'sports' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Sport Type</label>
                      <input
                        type="text"
                        value={sportType}
                        onChange={(e) => setSportType(e.target.value)}
                        placeholder="e.g. Basketball, Soccer, Cycling"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Memorabilia Type</label>
                      <input
                        type="text"
                        value={memorabiliaType}
                        onChange={(e) => setMemorabiliaType(e.target.value)}
                        placeholder="e.g. Signed Jersey, Game Ball, Helmet"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Condition</label>
                      <input
                        type="text"
                        value={sportCondition}
                        onChange={(e) => setSportCondition(e.target.value)}
                        placeholder="e.g. Mint in Frame, Archival Sealed"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Authenticity Cert / COA</label>
                      <input
                        type="text"
                        value={authenticityCert}
                        onChange={(e) => setAuthenticityCert(e.target.value)}
                        placeholder="e.g. Beckett BAS #12345 or PSA/DNA"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* College Fields */}
                {category === 'college' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">College or Campus</label>
                      <input
                        type="text"
                        value={campus}
                        onChange={(e) => setCampus(e.target.value)}
                        placeholder="e.g. Stanford University, UC Berkeley"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Student Item Type</label>
                      <input
                        type="text"
                        value={studentItemType}
                        onChange={(e) => setStudentItemType(e.target.value)}
                        placeholder="e.g. Textbooks, Calculator, Dorm Chair"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Delivery / Pickup Option</label>
                      <select
                        value={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="Campus Meetup">Campus Meetup (Red Square / Plaza)</option>
                        <option value="Library Pickup">Library Pickup (Green / Moffitt)</option>
                        <option value="Dorm Delivery">Dorm Delivery</option>
                        <option value="Student Center">Student Center Desk</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Semester / Usage Duration</label>
                      <input
                        type="text"
                        value={semesterUsed}
                        onChange={(e) => setSemesterUsed(e.target.value)}
                        placeholder="e.g. 1 Quarter, Fresh condition"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Electronics Fields */}
                {category === 'electronics' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Brand</label>
                      <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="e.g. Apple, Sony, Dell, Canon"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Device Type</label>
                      <input
                        type="text"
                        value={deviceType}
                        onChange={(e) => setDeviceType(e.target.value)}
                        placeholder="e.g. Laptop, Headphones, Mirrorless Body"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Battery Health</label>
                      <input
                        type="text"
                        value={batteryHealth}
                        onChange={(e) => setBatteryHealth(e.target.value)}
                        placeholder="e.g. 98% (42 cycles)"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Warranty Information</label>
                      <input
                        type="text"
                        value={warrantyStatus}
                        onChange={(e) => setWarrantyStatus(e.target.value)}
                        placeholder="e.g. AppleCare+ until Nov 2026"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Government Projects Fields */}
                {category === 'government' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Issuing Public Organization</label>
                      <input
                        type="text"
                        value={issuingOrganization}
                        onChange={(e) => setIssuingOrganization(e.target.value)}
                        placeholder="e.g. Dept of Transportation"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Tender Reference Number</label>
                      <input
                        type="text"
                        value={tenderReferenceNumber}
                        onChange={(e) => setTenderReferenceNumber(e.target.value)}
                        placeholder="e.g. DOT-2026-T402"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Submission Deadline</label>
                      <input
                        type="text"
                        value={submissionDeadline}
                        onChange={(e) => setSubmissionDeadline(e.target.value)}
                        placeholder="e.g. Nov 30, 2026 17:00 EST"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Eligibility Requirements</label>
                      <input
                        type="text"
                        value={eligibilityRequirements}
                        onChange={(e) => setEligibilityRequirements(e.target.value)}
                        placeholder="e.g. SAM.gov registered, General Liability $1M+"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Skills Fields */}
                {category === 'skills' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Service / Skill Type</label>
                      <input
                        type="text"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        placeholder="e.g. Full-Stack Dev, Mobile UI/UX"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Portfolio Preview URL</label>
                      <input
                        type="text"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Delivery Timeline (Days)</label>
                      <input
                        type="number"
                        min="1"
                        value={deliveryDays}
                        onChange={(e) => setDeliveryDays(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Included Revisions</label>
                      <input
                        type="number"
                        min="1"
                        value={revisionsIncluded}
                        onChange={(e) => setRevisionsIncluded(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Vehicles Fields */}
                {category === 'vehicles' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Vehicle Type</label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="Car">Car</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Scooter">Scooter</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="Electric Bike">Electric Bike</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Make, Model & Year</label>
                      <input
                        type="text"
                        value={makeModel}
                        onChange={(e) => setMakeModel(e.target.value)}
                        placeholder="e.g. Tesla Model 3 / Royal Enfield GT650"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Odometer Reading</label>
                      <input
                        type="text"
                        value={odometerReading}
                        onChange={(e) => setOdometerReading(e.target.value)}
                        placeholder="e.g. 24,000 miles"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Ownership / Title Status</label>
                      <select
                        value={ownershipDocStatus}
                        onChange={(e) => setOwnershipDocStatus(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="Clean Title in Hand">Clean Title in Hand</option>
                        <option value="Single Owner Registration">Single Owner Registration</option>
                        <option value="Bill of Sale Ready">Bill of Sale Ready</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Pricing & Auction Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Starting Bid ($USD) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={startingBid}
                    onChange={(e) => setStartingBid(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Buy Now Price ($USD, Optional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={buyNowPrice}
                    onChange={(e) => setBuyNowPrice(e.target.value)}
                    placeholder="e.g. 120"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Auction Duration
                  </label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="1">1 Day (Quick Auction)</option>
                    <option value="3">3 Days (Standard)</option>
                    <option value="5">5 Days</option>
                    <option value="7">7 Days</option>
                  </select>
                </div>
              </div>

              {/* 5. Custom Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Image URL (Optional, defaults to category photography)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Auction Listing</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
