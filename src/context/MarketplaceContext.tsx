import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  ListingItem,
  CategoryId,
  UserBidLog,
  NotificationItem,
  BidRecord,
} from '../types/marketplace';
import { INITIAL_LISTINGS } from '../data/mockMarketplace';
import { useAuth } from './AuthContext';
import { supabase } from '../supabase';

interface MarketplaceContextType {
  listings: ListingItem[];
  filteredListings: ListingItem[];
  liveAuctions: ListingItem[];
  trendingListings: ListingItem[];
  recentlySoldListings: ListingItem[];
  endingSoonListings: ListingItem[];
  freshFindsListings: ListingItem[];
  recommendedListings: ListingItem[];

  // Filter state
  activeCategory: CategoryId | 'all';
  setActiveCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'newest' | 'ending_soon' | 'price_asc' | 'price_desc' | 'bids_desc';
  setSortBy: (sort: 'featured' | 'newest' | 'ending_soon' | 'price_asc' | 'price_desc' | 'bids_desc') => void;
  conditionFilter: string;
  setConditionFilter: (cond: string) => void;
  priceFilter: number;
  setPriceFilter: (maxPrice: number) => void;
  resetFilters: () => void;

  // Actions
placeBid: (listingId: string, amount: number) => Promise<{ success: boolean; message: string }>;
  buyNow: (listingId: string) => { success: boolean; message: string };
  toggleWatchlist: (listingId: string) => void;
  isInWatchlist: (listingId: string) => boolean;
  createListing: (data: Partial<ListingItem>) => void;

  // Modals & Panels
  selectedListing: ListingItem | null;
  setSelectedListing: (item: ListingItem | null) => void;
  activeBidModalItem: ListingItem | null;
  setActiveBidModalItem: (item: ListingItem | null) => void;
  isSellModalOpen: boolean;
  setIsSellModalOpen: (open: boolean) => void;
  isMyBidsOpen: boolean;
  setIsMyBidsOpen: (open: boolean) => void;
  isWatchlistOpen: boolean;
  setIsWatchlistOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // User activity
  userBids: UserBidLog[];
  watchlistItems: ListingItem[];
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const LISTINGS_STORAGE_KEY = 'bidz_listings_v1';
const USER_BIDS_STORAGE_KEY = 'bidz_user_bids_v1';
const WATCHLIST_STORAGE_KEY = 'bidz_watchlist_v1';

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateWalletBalance, openSignupModal } = useAuth();

  const [listings, setListings] = useState<ListingItem[]>(() => {
    try {
      const stored = localStorage.getItem(LISTINGS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_LISTINGS;
  });

  const [userBids, setUserBids] = useState<UserBidLog[]>(() => {
    try {
      const stored = localStorage.getItem(USER_BIDS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      {
        listingId: 'list_elec_1',
        listingTitle: 'Apple MacBook Pro 14" M3 Pro Space Black',
        listingImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
        category: 'electronics',
        amount: 1380,
        timestamp: '8 mins ago',
        status: 'winning',
        currentHighestBid: 1380,
        endTime: new Date(Date.now() + 1000 * 60 * 19).toISOString(),
      },
      {
        listingId: 'list_college_1',
        listingTitle: 'TI-Nspire CX II CAS Color Graphing Calculator',
        listingImage: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&auto=format&fit=crop&q=80',
        category: 'college',
        amount: 95,
        timestamp: '14 mins ago',
        status: 'winning',
        currentHighestBid: 95,
        endTime: new Date(Date.now() + 1000 * 60 * 28).toISOString(),
      },
    ];
  });

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return ['list_sports_1', 'list_elec_1', 'list_veh_1'];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Active High Bidder!',
      message: 'You currently hold the highest bid ($1,380) on Apple MacBook Pro 14" M3 Pro.',
      timestamp: '8m ago',
      read: false,
      type: 'winning',
      listingId: 'list_elec_1',
    },
    {
      id: 'n2',
      title: 'Auction Ending Soon',
      message: 'TI-Nspire CX II CAS Calculator closes in under 30 minutes! Your bid is winning.',
      timestamp: '25m ago',
      read: false,
      type: 'winning',
      listingId: 'list_college_1',
    },
    {
      id: 'n3',
      title: 'New Government Tender Posted',
      message: 'Metropolitan Smart Transit IoT Sensor Array tender notice open for verified bids.',
      timestamp: '2h ago',
      read: true,
      type: 'tender_update',
      listingId: 'list_govt_1',
    },
  ]);

  // UI state
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'ending_soon' | 'price_asc' | 'price_desc' | 'bids_desc'>('featured');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<number>(100000);

  // Modals
  const [selectedListing, setSelectedListing] = useState<ListingItem | null>(null);
  const [activeBidModalItem, setActiveBidModalItem] = useState<ListingItem | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState<boolean>(false);
  const [isMyBidsOpen, setIsMyBidsOpen] = useState<boolean>(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Load real auction listings from Supabase
  
useEffect(() => {
  let cancelled = false;

  async function loadSupabaseListings() {
    const { data: rows, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Could not load Supabase listings:', error.message);
      return;
    }

    if (!rows || rows.length === 0 || cancelled) return;

    // Fetch all bids for these listings
    const listingIds = rows.map((row) => row.id);

    const { data: bidRows, error: bidError } = await supabase
      .from('bids')
      .select('*')
      .in('listing_id', listingIds)
      .order('created_at', { ascending: false });

    if (bidError) {
      console.error('Could not load bids:', bidError.message);
    }

    // Fetch bidder profiles
    const bidderIds = [
      ...new Set((bidRows || []).map((bid) => bid.bidder_id)),
    ];

    const { data: bidderProfiles, error: bidderError } =
      bidderIds.length > 0
        ? await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', bidderIds)
        : { data: [], error: null };

    if (bidderError) {
      console.error('Could not load bidder profiles:', bidderError.message);
    }

    const bidderMap = new Map(
      (bidderProfiles || []).map((profile) => [
        profile.id,
        profile.full_name,
      ])
    );

    // Group bids by listing
    const bidsByListing = new Map<string, BidRecord[]>();

    (bidRows || []).forEach((bid) => {
      const newBid: BidRecord = {
        id: String(bid.id),
        bidderId: bid.bidder_id,
        bidderName: bidderMap.get(bid.bidder_id) || 'Bidz User',
        bidderAvatar: '',
        bidderCollege: '',
        amount: Number(bid.amount),
        timestamp: new Date(bid.created_at).toLocaleString(),
        isWinning: false,
      };

      const existing = bidsByListing.get(bid.listing_id) || [];
      existing.push(newBid);
      bidsByListing.set(bid.listing_id, existing);
    });

    const sellerIds = [...new Set(rows.map((row) => row.seller_id))];

    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', sellerIds);

    if (profileError) {
      console.error('Could not load seller profiles:', profileError.message);
    }

    const profileMap = new Map(
      (profiles || []).map((profile) => [profile.id, profile.full_name])
    );

    const realListings: ListingItem[] = rows.map((row) => {
      const categoryMap: Record<string, CategoryId> = {
        sports: 'sports',
        Sports: 'sports',
        college: 'college',
        College: 'college',
        electronics: 'electronics',
        Electronics: 'electronics',
        government: 'government',
        'Government Projects': 'government',
        skills: 'skills',
        'Skill Auctions': 'skills',
        vehicles: 'vehicles',
        Vehicles: 'vehicles',
      };

      const startingPrice = Number(row.starting_price);
      const increment = Number(row.min_increment);

      const listingBids = bidsByListing.get(row.id) || [];

      // Find the highest bid
      const highestBid = listingBids.reduce(
        (highest, bid) => Math.max(highest, bid.amount),
        startingPrice
      );

      // Mark the highest bid as winning
      const winningBidIndex = listingBids.findIndex(
        (bid) => bid.amount === highestBid
      );

      const updatedBids = listingBids.map((bid, index) => ({
        ...bid,
        isWinning: index === winningBidIndex,
      }));

      return {
        id: row.id,
        title: row.title,
        description: row.description || '',
        category: categoryMap[row.category] || 'college',
        images: row.image_url ? [row.image_url] : [],
        seller: {
          id: row.seller_id,
          name: profileMap.get(row.seller_id) || 'Bidz Seller',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          rating: 5,
          reviewsCount: 0,
          isVerified: false,
          memberSince: new Date(row.created_at).getFullYear().toString(),
          verifiedBadgeText: 'Seller',
        },
        currentBid: highestBid,
        minNextBid: highestBid + increment,
        startingBid: startingPrice,
        bidCount: listingBids.length,
        bids: updatedBids,
        startTime: row.start_time,
        endTime: row.end_time,
        status:
          row.status === 'closed' ? 'completed' :
          row.status === 'active' || row.status === 'scheduled'
            ? 'live'
            : 'sold',
        isTrending: false,
        isFresh: true,
        location: 'Online',
        shippingOrDelivery: 'Contact seller for delivery details',
        views: 0,
        watchers: 0,
        attributes: {},
      };
    });

    if (cancelled) return;

    setListings((previous) => {
      const realIds = new Set(realListings.map((item) => item.id));
      const remaining = previous.filter((item) => !realIds.has(item.id));
      return [...realListings, ...remaining];
    });
  }

  void loadSupabaseListings();

  return () => {
    cancelled = true;
  };
}, []);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem(USER_BIDS_STORAGE_KEY, JSON.stringify(userBids));
  }, [userBids]);

  useEffect(() => {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  // Keep selectedListing synced if listings change
  useEffect(() => {
    if (selectedListing) {
      const refreshed = listings.find((l) => l.id === selectedListing.id);
      if (refreshed) {
        setSelectedListing(refreshed);
      }
    }
  }, [listings]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setConditionFilter('all');
    setPriceFilter(100000);
  };

  const toggleWatchlist = (listingId: string) => {
    if (!currentUser) {
      openSignupModal();
      return;
    }
    setWatchlist((prev) => {
      const exists = prev.includes(listingId);
      const updated = exists ? prev.filter((id) => id !== listingId) : [...prev, listingId];
      // update watchers on the listing item
      setListings((current) =>
        current.map((item) =>
          item.id === listingId
            ? { ...item, watchers: item.watchers + (exists ? -1 : 1) }
            : item
        )
      );
      return updated;
    });
  };

  const isInWatchlist = (listingId: string) => watchlist.includes(listingId);

  
const placeBid = async (listingId: string, amount: number) => {
  if (!currentUser) {
    openSignupModal();
    return {
      success: false,
      message: 'Please create an account or sign in to place live bids.',
    };
  }

  const listing = listings.find((l) => l.id === listingId);

  if (!listing) {
    return { success: false, message: 'Listing not found.' };
  }

  if (amount < listing.minNextBid) {
    return {
      success: false,
      message: `Your bid must be at least $${listing.minNextBid.toLocaleString()}.`,
    };
  }

  if (currentUser.walletBalance < amount) {
    return {
      success: false,
      message: `Insufficient demo wallet balance ($${currentUser.walletBalance.toLocaleString()}).`,
    };
  }

  // Save bid in Supabase first
  const { data: savedBid, error } = await supabase
    .from('bids')
    .insert({
      listing_id: listingId,
      bidder_id: currentUser.id,
      amount: amount,
    })
    .select()
    .single();

  if (error) {
    console.error('Bid saving failed:', error.message);

    return {
      success: false,
      message: `Could not place bid: ${error.message}`,
    };
  }

  // Create local bid record
  const newBid: BidRecord = {
    id: String(savedBid.id),
    bidderId: currentUser.id,
    bidderName: currentUser.name,
    bidderAvatar: currentUser.avatar,
    bidderCollege: currentUser.college,
    amount: amount,
    timestamp: 'Just now',
    isWinning: true,
  };

  const nextMin = Math.round(
    amount + Math.max(10, amount * 0.05)
  );

  // Update listing in the interface
  setListings((prev) =>
    prev.map((item) => {
      if (item.id === listingId) {
        return {
          ...item,
          currentBid: amount,
          minNextBid: nextMin,
          bidCount: item.bidCount + 1,
          bids: [
            newBid,
            ...item.bids.map((b) => ({
              ...b,
              isWinning: false,
            })),
          ],
        };
      }
      return item;
    })
  );

  // Update user's bid history
  setUserBids((prev) => {
    const filtered = prev.filter(
      (b) => b.listingId !== listingId
    );

    const newEntry: UserBidLog = {
      listingId: listing.id,
      listingTitle: listing.title,
      listingImage: listing.images[0],
      category: listing.category,
      amount: amount,
      timestamp: 'Just now',
      status: 'winning',
      currentHighestBid: amount,
      endTime: listing.endTime,
    };

    return [newEntry, ...filtered];
  });

  // Add notification
  const newNotification: NotificationItem = {
    id: `notif_${Date.now()}`,
    title: 'Bid Placed Successfully!',
    message: `You are now the highest bidder at $${amount.toLocaleString()} for "${listing.title}".`,
    timestamp: 'Just now',
    read: false,
    type: 'winning',
    listingId: listing.id,
  };

  setNotifications((prev) => [
    newNotification,
    ...prev,
  ]);

  return {
    success: true,
    message: `Success! Your bid of $${amount.toLocaleString()} has been saved.`,
  };
};



  const buyNow = (listingId: string) => {
    if (!currentUser) {
      openSignupModal();
      return { success: false, message: 'Please sign in to complete purchase.' };
    }

    const listing = listings.find((l) => l.id === listingId);
    if (!listing || !listing.buyNowPrice) {
      return { success: false, message: 'This item does not have a Buy Now option.' };
    }

    if (currentUser.walletBalance < listing.buyNowPrice) {
      return {
        success: false,
        message: `Insufficient demo wallet funds ($${currentUser.walletBalance.toLocaleString()}) for Buy Now ($${listing.buyNowPrice.toLocaleString()}).`,
      };
    }

    updateWalletBalance(-listing.buyNowPrice);

    setListings((prev) =>
      prev.map((item) =>
        item.id === listingId
          ? {
              ...item,
              status: 'sold',
              soldPrice: listing.buyNowPrice,
              soldDate: 'Just now',
              winnerName: `${currentUser.name} (Direct Buy Now)`,
            }
          : item
      )
    );

    const winNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Item Purchased via Buy Now!',
      message: `Congratulations! You purchased "${listing.title}" for $${listing.buyNowPrice.toLocaleString()}.`,
      timestamp: 'Just now',
      read: false,
      type: 'auction_won',
      listingId: listing.id,
    };
    setNotifications((prev) => [winNotif, ...prev]);

    return { success: true, message: `Congratulations! Item purchased for $${listing.buyNowPrice.toLocaleString()}.` };
  };

  
    
  const createListing = async (data: Partial<ListingItem>) => {
    if (!currentUser) {
      openSignupModal();
      return;
    }

    const startAmount = data.startingBid || 50;
    const minIncrement = Math.max(
      100,
      Math.round(startAmount * 0.05)
    );

    const endTime = new Date(
      Date.now() +
      1000 * 60 * 60 *
      (data.durationHoursRemaining || 72)
    ).toISOString();

    const { data: row, error } = await supabase
      .from('listings')
      .insert({
        seller_id: currentUser.id,
        title: data.title || 'Untitled Listing',
        description: data.description || 'No description provided.',
        category: ({
  sports: 'Sports',
  college: 'College',
  electronics: 'Electronics',
  government: 'Government Projects',
  skills: 'Skill Auctions',
  vehicles: 'Vehicles',
} as Record<CategoryId, string>)[data.category || 'college'],
        image_url: data.images?.[0] || null,
        starting_price: startAmount,
        min_increment: minIncrement,
        start_time: new Date().toISOString(),
        end_time: endTime,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Could not publish listing:', error.message);
      window.alert(
        `Could not publish listing: ${error.message}`
      );
      return;
    }

    const newListing: ListingItem = {
      id: row.id,
      title: row.title,
      description: row.description || '',
      category: row.category as CategoryId,
      images: row.image_url ? [row.image_url] : [],
      seller: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        rating: 5,
        reviewsCount: 0,
        isVerified: Boolean(currentUser.isStudentVerified),
        memberSince: new Date().getFullYear().toString(),
        college: currentUser.college,
        verifiedBadgeText: currentUser.isStudentVerified
          ? 'Verified Student Seller'
          : 'New Seller',
      },
      currentBid: Number(row.starting_price),
      minNextBid:
        Number(row.starting_price) + Number(row.min_increment),
      startingBid: Number(row.starting_price),
      buyNowPrice: data.buyNowPrice,
      bidCount: 0,
      bids: [],
      startTime: row.start_time,
      endTime: row.end_time,
      status: 'live',
      isTrending: false,
      isFresh: true,
      location: data.location || 'Online',
      shippingOrDelivery:
        data.shippingOrDelivery ||
        'Contact seller for delivery details',
      views: 0,
      watchers: 0,
      attributes: data.attributes || {},
    };

    setListings((previous) => [
      newListing,
      ...previous.filter((item) => item.id !== newListing.id),
    ]);

    setNotifications((previous) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Listing Published Live!',
        message: `Your item "${newListing.title}" is now open for bids.`,
        timestamp: 'Just now',
        read: false,
        type: 'new_listing',
        listingId: newListing.id,
      },
      ...previous,
    ]);

    window.alert('Listing published successfully!');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Filtered listings computation
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Price filter
      if (item.currentBid > priceFilter) {
        return false;
      }
      // Search query (title, description, category, brand, campus, issuingOrg, seller)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchSeller = item.seller.name.toLowerCase().includes(q);
        const matchBrand = item.attributes?.brand?.toLowerCase().includes(q);
        const matchCampus = item.attributes?.campus?.toLowerCase().includes(q);
        const matchMake = item.attributes?.makeModel?.toLowerCase().includes(q);
        const matchTender = item.attributes?.tenderReferenceNumber?.toLowerCase().includes(q);
        const matchService = item.attributes?.serviceType?.toLowerCase().includes(q);

        if (
          !matchTitle &&
          !matchDesc &&
          !matchCat &&
          !matchSeller &&
          !matchBrand &&
          !matchCampus &&
          !matchMake &&
          !matchTender &&
          !matchService
        ) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
      }
      if (sortBy === 'ending_soon') {
        return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
      }
      if (sortBy === 'price_asc') {
        return a.currentBid - b.currentBid;
      }
      if (sortBy === 'price_desc') {
        return b.currentBid - a.currentBid;
      }
      if (sortBy === 'bids_desc') {
        return b.bidCount - a.bidCount;
      }
      // default: featured/popular
      return (b.views + b.watchers * 2) - (a.views + a.watchers * 2);
    });
  }, [listings, activeCategory, searchQuery, priceFilter, sortBy]);

  // Derived curated subsets
  const liveAuctions = useMemo(() => {
    return listings.filter((l) => l.status === 'live' || l.status === 'ending_soon');
  }, [listings]);

  const trendingListings = useMemo(() => {
    return listings.filter((l) => l.isTrending && l.status !== 'sold');
  }, [listings]);

  const recentlySoldListings = useMemo(() => {
    return listings.filter((l) => l.status === 'sold' || l.status === 'completed');
  }, [listings]);

  const endingSoonListings = useMemo(() => {
    return listings
      .filter((l) => l.status === 'ending_soon' || l.status === 'live')
      .sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
  }, [listings]);

  const freshFindsListings = useMemo(() => {
    return listings
      .filter((l) => l.status !== 'sold')
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  }, [listings]);

  const recommendedListings = useMemo(() => {
    // If student user, emphasize college + electronics + sports
    if (currentUser?.isStudentVerified) {
      return listings.filter((l) => l.category === 'college' || l.category === 'electronics' || l.category === 'sports');
    }
    return listings.slice(0, 4);
  }, [listings, currentUser]);

  const watchlistItems = useMemo(() => {
    return listings.filter((l) => watchlist.includes(l.id));
  }, [listings, watchlist]);

  return (
    <MarketplaceContext.Provider
      value={{
        listings,
        filteredListings,
        liveAuctions,
        trendingListings,
        recentlySoldListings,
        endingSoonListings,
        freshFindsListings,
        recommendedListings,

        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        conditionFilter,
        setConditionFilter,
        priceFilter,
        setPriceFilter,
        resetFilters,

        placeBid,
        buyNow,
        toggleWatchlist,
        isInWatchlist,
        createListing,

        selectedListing,
        setSelectedListing,
        activeBidModalItem,
        setActiveBidModalItem,
        isSellModalOpen,
        setIsSellModalOpen,
        isMyBidsOpen,
        setIsMyBidsOpen,
        isWatchlistOpen,
        setIsWatchlistOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,

        userBids,
        watchlistItems,
        notifications,
        markNotificationRead,
        clearNotifications,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
