export type CategoryId = 
  | 'sports' 
  | 'college' 
  | 'electronics' 
  | 'government' 
  | 'skills' 
  | 'vehicles';

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  lightBg: string;
  sampleCount: number;
  liveCount: number;
}

export interface BidRecord {
  id: string;
  bidderId: string;
  bidderName: string;
  bidderAvatar?: string;
  bidderCollege?: string;
  amount: number;
  timestamp: string;
  isWinning?: boolean;
}

export interface SellerProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  memberSince: string;
  college?: string;
  verifiedBadgeText?: string;
}

export interface CategorySpecificAttributes {
  // Sports
  sportType?: string;
  memorabiliaType?: string;
  itemCondition?: string;
  authenticityCert?: string;
  playerOrTeam?: string;

  // College
  campus?: string;
  studentItemType?: string;
  deliveryOption?: 'Dorm Delivery' | 'Campus Meetup' | 'Library Pickup' | 'Student Center';
  semesterUsed?: string;

  // Electronics
  brand?: string;
  deviceType?: string;
  batteryHealth?: string;
  warrantyStatus?: string;
  includedAccessories?: string[];

  // Government Projects (Tenders)
  issuingOrganization?: string;
  tenderReferenceNumber?: string;
  submissionDeadline?: string;
  eligibilityRequirements?: string;
  officialSourceUrl?: string;
  verificationStatus?: 'Official Tender Notice (Demonstration)' | 'Procurement Opportunity (Demo)';
  procurementCategory?: string;

  // Skills
  serviceType?: string;
  portfolioUrl?: string;
  deliveryDays?: number;
  scopeOfWork?: string;
  revisionsIncluded?: number;
  toolsUsed?: string[];

  // Vehicles
  vehicleType?: 'Car' | 'Motorcycle' | 'Scooter' | 'Bicycle' | 'Electric Bike';
  makeModel?: string;
  manufacturingYear?: number;
  odometerReading?: string;
  ownershipDocStatus?: 'Clean Title in Hand' | 'Single Owner Registration' | 'Bill of Sale Ready';
  inspectionDetails?: string;
}

export interface ListingItem {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  images: string[];
  seller: SellerProfile;
  currentBid: number;
  minNextBid: number;
  startingBid: number;
  buyNowPrice?: number;
  bidCount: number;
  bids: BidRecord[];
  startTime: string;
  endTime: string; // ISO string
  durationHoursRemaining?: number;
  status: 'live' | 'ending_soon' | 'completed' | 'sold';
  isTrending?: boolean;
  isFresh?: boolean;
  isFeatured?: boolean;
  location?: string;
  shippingOrDelivery: string;
  views: number;
  watchers: number;
  soldPrice?: number;
  soldDate?: string;
  winnerName?: string;
  attributes: CategorySpecificAttributes;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college?: string;
  isStudentVerified?: boolean;
  walletBalance: number;
  watchlist: string[];
  role: 'buyer' | 'seller' | 'student';
}

export interface UserBidLog {
  listingId: string;
  listingTitle: string;
  listingImage: string;
  category: CategoryId;
  amount: number;
  timestamp: string;
  status: 'winning' | 'outbid' | 'won' | 'ended';
  currentHighestBid: number;
  endTime: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'outbid' | 'winning' | 'auction_won' | 'new_listing' | 'tender_update';
  listingId?: string;
}
