import { CategoryMeta, ListingItem, UserProfile } from '../types/marketplace';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'sports',
    name: 'Sports Auctions',
    tagline: 'Memorabilia & Gear',
    description: 'Discover sports memorabilia, signed jerseys, verified collectibles and high-performance equipment.',
    iconName: 'Trophy',
    accentColor: '#2563EB',
    lightBg: '#EFF6FF',
    sampleCount: 18,
    liveCount: 4,
  },
  {
    id: 'college',
    name: 'College Marketplace',
    tagline: 'Student Essentials & Resale',
    description: 'Buy and sell textbooks, calculators, lab gear, dorm furniture, and campus bicycles within your community.',
    iconName: 'GraduationCap',
    accentColor: '#0EA5E9',
    lightBg: '#F0F9FF',
    sampleCount: 34,
    liveCount: 9,
  },
  {
    id: 'electronics',
    name: 'Electronics',
    tagline: 'Tech, Laptops & Audio',
    description: 'Explore phones, laptops, tablets, gaming consoles, audio gear, and professional cameras at competitive bids.',
    iconName: 'Cpu',
    accentColor: '#3B82F6',
    lightBg: '#EFF6FF',
    sampleCount: 26,
    liveCount: 7,
  },
  {
    id: 'government',
    name: 'Government Projects',
    tagline: 'Tenders & Procurement',
    description: 'Explore tender notices, procurement listings, and authorized vendor contracts (Demonstration Showcase).',
    iconName: 'Building2',
    accentColor: '#1E3A8A',
    lightBg: '#EEF2FF',
    sampleCount: 12,
    liveCount: 3,
  },
  {
    id: 'skills',
    name: 'Skill Auctions',
    tagline: 'Design, Code & Freelance',
    description: 'Find talented developers, UI/UX designers, and video editors offering rapid delivery and project scopes.',
    iconName: 'Sparkles',
    accentColor: '#0284C7',
    lightBg: '#E0F2FE',
    sampleCount: 22,
    liveCount: 6,
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    tagline: 'Cars, Bikes & Scooters',
    description: 'Discover cars, motorcycles, scooters, and commuter bicycles with transparent title records and specs.',
    iconName: 'Car',
    accentColor: '#1D4ED8',
    lightBg: '#DBEAFE',
    sampleCount: 15,
    liveCount: 5,
  },
];

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'u_student',
    name: 'Alex Rivera',
    email: 'alex.rivera@stanford.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: 'Stanford University',
    isStudentVerified: true,
    walletBalance: 1250,
    watchlist: ['list_sports_1', 'list_college_1', 'list_elec_1'],
    role: 'student',
  },
  {
    id: 'u_buyer',
    name: 'Sophia Chen',
    email: 'sophia.chen@techventures.io',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    college: 'MIT Alum',
    isStudentVerified: true,
    walletBalance: 4800,
    watchlist: ['list_elec_2', 'list_skills_1', 'list_veh_1'],
    role: 'buyer',
  },
  {
    id: 'u_seller',
    name: 'Marcus Vance',
    email: 'marcus.vance@studioforge.design',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    college: 'UC Berkeley',
    isStudentVerified: false,
    walletBalance: 3100,
    watchlist: ['list_govt_1', 'list_sports_2'],
    role: 'seller',
  },
];

// High quality curated unsplash product photos with direct resilient URLs
export const INITIAL_LISTINGS: ListingItem[] = [
  // --- SPORTS AUCTIONS ---
  {
    id: 'list_sports_1',
    title: 'Lionel Messi Signed 2022 World Cup Finals Jersey (Beckett COA)',
    description: 'Authentic Argentina 2022 World Cup home kit hand-signed by Lionel Messi. Includes serialized Beckett Authentication hologram and tamper-proof certificate of authenticity. Museum framed in UV-protective acrylic.',
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_sports_vault',
      name: 'Vault Memorabilia Co.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      rating: 4.96,
      reviewsCount: 318,
      isVerified: true,
      memberSince: '2023',
      verifiedBadgeText: 'Verified Memorabilia Dealer'
    },
    currentBid: 1450,
    minNextBid: 1500,
    startingBid: 800,
    bidCount: 29,
    bids: [
      { id: 'b1', bidderId: 'u_buyer', bidderName: 'Sophia C.', amount: 1450, timestamp: '12 mins ago', isWinning: true },
      { id: 'b2', bidderId: 'u2', bidderName: 'David K.', amount: 1400, timestamp: '34 mins ago' },
      { id: 'b3', bidderId: 'u3', bidderName: 'Rohan P.', amount: 1350, timestamp: '1 hour ago' },
    ],
    startTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 42).toISOString(), // 42 mins remaining
    status: 'ending_soon',
    isTrending: true,
    isFeatured: true,
    location: 'Chicago, IL',
    shippingOrDelivery: 'Insured Express Courier with Signature Required',
    views: 1420,
    watchers: 86,
    attributes: {
      sportType: 'Soccer / Football',
      memorabiliaType: 'Framed Signed Jersey',
      itemCondition: 'Mint / Pristine in Display',
      authenticityCert: 'Beckett Authentication Services (BAS) #BK99482',
      playerOrTeam: 'Lionel Messi / Argentina National Team'
    }
  },
  {
    id: 'list_sports_2',
    title: 'Vintage Michael Jordan 1996 Chicago Bulls Championship Game Ball',
    description: 'Official Spalding NBA Game Ball from the historic 1995-1996 72-10 Bulls championship season. Hand-signed in silver ink. Comes with Upper Deck Authenticated (UDA) certificate and numbered hologram.',
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_heritage_sports',
      name: 'Heritage Collectibles',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 4.92,
      reviewsCount: 142,
      isVerified: true,
      memberSince: '2022'
    },
    currentBid: 2100,
    minNextBid: 2200,
    startingBid: 1200,
    buyNowPrice: 3200,
    bidCount: 38,
    bids: [
      { id: 'b4', bidderId: 'u4', bidderName: 'Michael S.', amount: 2100, timestamp: '18 mins ago', isWinning: true },
      { id: 'b5', bidderId: 'u5', bidderName: 'Elena V.', amount: 2000, timestamp: '2 hours ago' },
    ],
    startTime: new Date(Date.now() - 86400000 * 3).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(), // 6 hours remaining
    status: 'live',
    isTrending: true,
    isFresh: false,
    location: 'Cleveland, OH',
    shippingOrDelivery: 'Priority Air Freight with Tracking',
    views: 980,
    watchers: 64,
    attributes: {
      sportType: 'Basketball',
      memorabiliaType: 'Signed Official Game Ball',
      itemCondition: 'Archival Sealed Condition',
      authenticityCert: 'Upper Deck Authenticated (UDA) #BA-1996-CHI',
      playerOrTeam: 'Michael Jordan / Chicago Bulls'
    }
  },
  {
    id: 'list_sports_3',
    title: 'Zipp 404 Firecrest Carbon Aero Wheelset (Tubeless Disc)',
    description: 'Pro peloton race-proven carbon road wheelset. 58mm rim depth, ZR1 DB hubs, SRAM XDR freehub body. Never crashed, ridden for less than 400 miles on weekend club rides.',
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_velo_pro',
      name: 'Julian Vance',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating: 4.88,
      reviewsCount: 47,
      isVerified: true,
      memberSince: '2024'
    },
    currentBid: 820,
    minNextBid: 850,
    startingBid: 600,
    buyNowPrice: 1100,
    bidCount: 16,
    bids: [
      { id: 'b6', bidderId: 'u6', bidderName: 'Thomas L.', amount: 820, timestamp: '45 mins ago', isWinning: true }
    ],
    startTime: new Date(Date.now() - 86400000).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 14).toISOString(),
    status: 'live',
    isFresh: true,
    location: 'Boulder, CO',
    shippingOrDelivery: 'Heavy item courier or local pickup',
    views: 430,
    watchers: 28,
    attributes: {
      sportType: 'Cycling / Road Racing',
      memorabiliaType: 'Pro Sports Equipment',
      itemCondition: 'Excellent (400 miles logged)',
      authenticityCert: 'Serial Number Registered with SRAM Zipp',
      playerOrTeam: 'Aero Racing Edition'
    }
  },

  // --- COLLEGE MARKETPLACE ---
  {
    id: 'list_college_1',
    title: 'TI-Nspire CX II CAS Color Graphing Calculator + Charging Dock',
    description: 'Required for Calculus, Linear Algebra, and Physics. Used for two terms at Stanford. Flawless scratch-free color display, latest OS 5.4 loaded with student chemistry and physics formula suites. Includes original USB sync cable and hard cover.',
    category: 'college',
    images: [
      'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_student_jake',
      name: 'Jake Reynolds',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 19,
      isVerified: true,
      memberSince: '2024',
      college: 'Stanford University (Engineering Class of 2026)',
      verifiedBadgeText: 'Verified Stanford Student (.edu)'
    },
    currentBid: 95,
    minNextBid: 100,
    startingBid: 60,
    buyNowPrice: 135,
    bidCount: 14,
    bids: [
      { id: 'b7', bidderId: 'u_student', bidderName: 'Alex Rivera', bidderCollege: 'Stanford', amount: 95, timestamp: '14 mins ago', isWinning: true },
      { id: 'b8', bidderId: 'u7', bidderName: 'Maya K.', bidderCollege: 'Stanford', amount: 90, timestamp: '2 hours ago' },
    ],
    startTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 28).toISOString(), // 28 mins remaining
    status: 'ending_soon',
    isTrending: true,
    isFresh: false,
    location: 'Stanford Campus / Florence Moore Dorm',
    shippingOrDelivery: 'Free Campus Meetup at Green Library or Tressider Union',
    views: 650,
    watchers: 42,
    attributes: {
      campus: 'Stanford University',
      studentItemType: 'Graphing Calculator & Lab Tools',
      itemCondition: 'Very Good (No display scratches)',
      deliveryOption: 'Campus Meetup',
      semesterUsed: 'Winter & Spring 2026'
    }
  },
  {
    id: 'list_college_2',
    title: 'Campbell Biology 12th Global Edition + Laboratory Investigations Manual',
    description: 'Essential core package for Bio 81/82 and Pre-Med series. Includes clean unmarked laboratory spiral manual. Clean pages with minimal highlighting in pencil only on Chapters 1-4.',
    category: 'college',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_student_emma',
      name: 'Emma Larson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 4.95,
      reviewsCount: 22,
      isVerified: true,
      memberSince: '2023',
      college: 'UC Berkeley (Integrative Biology)',
      verifiedBadgeText: 'Verified Cal Student'
    },
    currentBid: 45,
    minNextBid: 50,
    startingBid: 30,
    buyNowPrice: 75,
    bidCount: 8,
    bids: [
      { id: 'b9', bidderId: 'u8', bidderName: 'Daniel L.', amount: 45, timestamp: '1 hour ago', isWinning: true }
    ],
    startTime: new Date(Date.now() - 86400000).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(),
    status: 'live',
    isFresh: true,
    location: 'UC Berkeley / Moffitt Library Plaza',
    shippingOrDelivery: 'Dorm drop-off at Unit 1/2/3 or Library Meetup',
    views: 310,
    watchers: 19,
    attributes: {
      campus: 'UC Berkeley',
      studentItemType: 'Textbooks & Course Materials',
      itemCondition: 'Good (Pencil annotations only)',
      deliveryOption: 'Library Pickup',
      semesterUsed: 'Fall 2025'
    }
  },
  {
    id: 'list_college_3',
    title: 'Trek FX2 Disc Commuter Bicycle with Kryptonite U-Lock & Cable',
    description: 'Medium aluminum frame, 18-speed Shimano drivetrain, hydraulic disc brakes. Perfect campus cruiser for getting between dorms and lecture halls. Tuned up last month with new puncture-resistant tires. Comes with heavy Kryptonite New York U-lock.',
    category: 'college',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_student_sam',
      name: 'Samira Patel',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 11,
      isVerified: true,
      memberSince: '2024',
      college: 'University of Washington',
      verifiedBadgeText: 'Verified UW Student'
    },
    currentBid: 280,
    minNextBid: 300,
    startingBid: 180,
    buyNowPrice: 380,
    bidCount: 17,
    bids: [
      { id: 'b10', bidderId: 'u9', bidderName: 'Lucas B.', amount: 280, timestamp: '30 mins ago', isWinning: true }
    ],
    startTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
    status: 'live',
    isTrending: true,
    location: 'UW Seattle / Red Square',
    shippingOrDelivery: 'In-person campus handover only',
    views: 790,
    watchers: 51,
    attributes: {
      campus: 'University of Washington (Seattle)',
      studentItemType: 'Bicycle & Campus Commute',
      itemCondition: 'Very Good (Fresh brake pads)',
      deliveryOption: 'Campus Meetup',
      semesterUsed: 'Graduating Senior Resale'
    }
  },

  // --- ELECTRONICS ---
  {
    id: 'list_elec_1',
    title: 'Apple MacBook Pro 14" M3 Pro (18GB Unified RAM, 512GB SSD, Space Black)',
    description: 'M3 Pro chip with 11-core CPU and 14-core GPU. Immaculate physical condition with zero dents or keyboard shine. 98% battery health cycle with only 46 battery cycles. Comes in original Apple box with 70W MagSafe braided charger and AppleCare+ warranty valid through November 2026.',
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_tech_curator',
      name: 'Northwest Tech Exchange',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 4.97,
      reviewsCount: 512,
      isVerified: true,
      memberSince: '2021',
      verifiedBadgeText: 'Top Rated Tech Refurbisher'
    },
    currentBid: 1380,
    minNextBid: 1420,
    startingBid: 950,
    buyNowPrice: 1680,
    bidCount: 36,
    bids: [
      { id: 'b11', bidderId: 'u_student', bidderName: 'Alex Rivera', amount: 1380, timestamp: '8 mins ago', isWinning: true },
      { id: 'b12', bidderId: 'u10', bidderName: 'Kevin Z.', amount: 1340, timestamp: '22 mins ago' },
      { id: 'b13', bidderId: 'u11', bidderName: 'Priya N.', amount: 1300, timestamp: '1 hour ago' }
    ],
    startTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 19).toISOString(), // 19 mins remaining
    status: 'ending_soon',
    isTrending: true,
    isFeatured: true,
    location: 'Seattle, WA',
    shippingOrDelivery: 'Free 2-Day Insured Priority Delivery',
    views: 2190,
    watchers: 134,
    attributes: {
      brand: 'Apple',
      deviceType: 'Laptop / Workstation',
      batteryHealth: '98% (46 cycles logged)',
      warrantyStatus: 'AppleCare+ coverage until Nov 2026',
      includedAccessories: ['70W USB-C MagSafe 3 Power Adapter', 'Space Black Braided Cable', 'Original Retail Box']
    }
  },
  {
    id: 'list_elec_2',
    title: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones (Midnight Black)',
    description: 'Industry-leading noise cancellation powered by dual processors and 8 microphones. 30-hour battery life with quick charging. Lightly used in home office setup, no foam tearing. Includes hard travel case, 3.5mm gold cable, and airplane adapter.',
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_audio_hub',
      name: 'Acoustic Labs Resale',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      rating: 4.91,
      reviewsCount: 88,
      isVerified: true,
      memberSince: '2023'
    },
    currentBid: 210,
    minNextBid: 220,
    startingBid: 140,
    buyNowPrice: 280,
    bidCount: 22,
    bids: [
      { id: 'b14', bidderId: 'u_buyer', bidderName: 'Sophia Chen', amount: 210, timestamp: '15 mins ago', isWinning: true }
    ],
    startTime: new Date(Date.now() - 86400000).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    status: 'live',
    isFresh: true,
    location: 'Austin, TX',
    shippingOrDelivery: 'USPS Priority Mail with Tracking',
    views: 890,
    watchers: 63,
    attributes: {
      brand: 'Sony',
      deviceType: 'Over-Ear Active Noise-Cancelling Headphones',
      batteryHealth: '100% capacity',
      warrantyStatus: 'Manufacturer 1-Year Limited',
      includedAccessories: ['Magnetic Zipper Carry Case', 'USB-C Cable', '3.5mm Audio Cable']
    }
  },
  {
    id: 'list_elec_3',
    title: 'Fujifilm X-T5 Mirrorless Digital Camera Body (40.2MP X-Trans CMOS 5 HR)',
    description: 'Compact lightweight body in classic silver. 5-axis 7.0-stop in-body image stabilization, 6.2K/30p video, dual UHS-II SD card slots. Shutter count is only 1,840 actuations. Screen protector installed on day one.',
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_lens_vault',
      name: 'West Coast Photo',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      rating: 4.98,
      reviewsCount: 167,
      isVerified: true,
      memberSince: '2022'
    },
    currentBid: 1220,
    minNextBid: 1260,
    startingBid: 900,
    buyNowPrice: 1490,
    bidCount: 19,
    bids: [
      { id: 'b15', bidderId: 'u12', bidderName: 'Arturo M.', amount: 1220, timestamp: '52 mins ago', isWinning: true }
    ],
    startTime: new Date(Date.now() - 86400000 * 3).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 22).toISOString(),
    status: 'live',
    isFresh: false,
    location: 'San Francisco, CA',
    shippingOrDelivery: 'FedEx Direct Ground with Insurance',
    views: 1140,
    watchers: 77,
    attributes: {
      brand: 'Fujifilm',
      deviceType: 'Mirrorless Camera Body',
      batteryHealth: 'Two OEM NP-W235 Batteries included',
      warrantyStatus: 'B&H Extended Warranty transferrable',
      includedAccessories: ['2x NP-W235 Batteries', 'Dual USB Charger', 'Shoulder Strap', 'Body Cap']
    }
  },

  // --- GOVERNMENT PROJECTS (Tenders / Procurement Demonstration) ---
  {
    id: 'list_govt_1',
    title: 'Metropolitan Smart Transit IoT Sensor Array & Real-Time Telemetry Modernization',
    description: '[DEMONSTRATION TENDER NOTICE] RFP Ref #DOT-2026-T402. Municipal Department of Transportation procurement for 350 solar-assisted street bus telemetry nodes, LoRaWAN mesh gateways, and open GTFS-RT feed API integration. Authorized vendors must hold ISO 27001 or SOC 2 Type II compliance.',
    category: 'government',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_agency_dot',
      name: 'Department of Transportation (Procurement Division)',
      avatar: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=150&auto=format&fit=crop&q=80',
      rating: 4.95,
      reviewsCount: 42,
      isVerified: true,
      memberSince: '2021',
      verifiedBadgeText: 'Government Procurement Entity (Demonstration)'
    },
    currentBid: 48500, // RFP initial base proposal target
    minNextBid: 50000,
    startingBid: 35000,
    bidCount: 11,
    bids: [
      { id: 'b16', bidderId: 'u13', bidderName: 'Apex Telemetry Systems LLC', amount: 48500, timestamp: '2 hours ago', isWinning: true },
      { id: 'b17', bidderId: 'u14', bidderName: 'CivicGrid Infrastructure Inc.', amount: 46000, timestamp: '1 day ago' }
    ],
    startTime: new Date(Date.now() - 86400000 * 5).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
    status: 'live',
    isTrending: true,
    isFeatured: true,
    location: 'Metropolitan District / Capital City',
    shippingOrDelivery: 'Official Electronic Bid Submission Portal (Mock Sandbox)',
    views: 3200,
    watchers: 95,
    attributes: {
      issuingOrganization: 'Municipal Transportation Authority (Mock Demo)',
      tenderReferenceNumber: 'DOT-2026-T402-CIVIC',
      submissionDeadline: 'October 31, 2026, 17:00 EST',
      eligibilityRequirements: 'Registered vendor in SAM.gov, $2M General Liability insurance, SOC2 certified',
      officialSourceUrl: 'https://example.gov/procurement/tenders/DOT-2026-T402 (Demo)',
      verificationStatus: 'Official Tender Notice (Demonstration)',
      procurementCategory: 'Municipal IoT & Public Infrastructure'
    }
  },
  {
    id: 'list_govt_2',
    title: 'State University Campus High-Density Wi-Fi 7 Enterprise Overhaul Tender',
    description: '[DEMONSTRATION TENDER NOTICE] RFP #HE-WIFI-2026-09. Multi-building procurement notice for 1,200 commercial ceiling Wi-Fi 7 access points, 10Gbps PoE++ core aggregation switching, and 802.1X eduroam AAA RADIUS federated clustering.',
    category: 'government',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_state_he',
      name: 'State Higher Education Board',
      avatar: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&auto=format&fit=crop&q=80',
      rating: 4.88,
      reviewsCount: 29,
      isVerified: true,
      memberSince: '2022',
      verifiedBadgeText: 'Educational Procurement Board (Demo)'
    },
    currentBid: 92000,
    minNextBid: 95000,
    startingBid: 75000,
    bidCount: 8,
    bids: [
      { id: 'b18', bidderId: 'u15', bidderName: 'OmniFiber Enterprise Networks', amount: 92000, timestamp: '5 hours ago', isWinning: true }
    ],
    startTime: new Date(Date.now() - 86400000 * 4).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    status: 'live',
    isFresh: false,
    location: 'State University Campus System',
    shippingOrDelivery: 'Turnkey On-Site Deployment & Rigging',
    views: 1850,
    watchers: 68,
    attributes: {
      issuingOrganization: 'State University Facilities & IT Board',
      tenderReferenceNumber: 'HE-WIFI-2026-09',
      submissionDeadline: 'November 15, 2026, 16:00 CST',
      eligibilityRequirements: 'Cisco Gold / Aruba Platinum Certified Partner status',
      officialSourceUrl: 'https://state.edu/it-contracts/wifi7-rfp (Demo)',
      verificationStatus: 'Procurement Opportunity (Demo)',
      procurementCategory: 'Educational IT & Networking Infrastructure'
    }
  },

  // --- SKILL AUCTIONS ---
  {
    id: 'list_skills_1',
    title: 'Full-Stack React, Next.js & AI Agent MVP Developed in 14 Days',
    description: 'Senior software architect (ex-Stripe, YC W22 cohort) will build and ship your custom AI product MVP. Includes production Tailwind design, Supabase/Postgres relational database, auth, and automated test suite. Full GitHub repository transfer with commercial ownership.',
    category: 'skills',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_dev_devon',
      name: 'Devon Sterling',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 74,
      isVerified: true,
      memberSince: '2022',
      verifiedBadgeText: 'Top 1% Engineering Freelancer'
    },
    currentBid: 2800,
    minNextBid: 2950,
    startingBid: 1800,
    buyNowPrice: 4200,
    bidCount: 21,
    bids: [
      { id: 'b19', bidderId: 'u_buyer', bidderName: 'Sophia Chen', amount: 2800, timestamp: '24 mins ago', isWinning: true },
      { id: 'b20', bidderId: 'u16', bidderName: 'Liam T.', amount: 2650, timestamp: '3 hours ago' }
    ],
    startTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 35).toISOString(), // 35 mins remaining
    status: 'ending_soon',
    isTrending: true,
    isFeatured: true,
    location: 'Remote / Global (PST Hours)',
    shippingOrDelivery: 'Private GitHub Repo & Automated Vercel Deployment Pipeline',
    views: 1890,
    watchers: 112,
    attributes: {
      serviceType: 'Full-Stack Web App & AI Prototype',
      portfolioUrl: 'https://github.com/devonsterling-portfolio',
      deliveryDays: 14,
      scopeOfWork: 'Complete MVP from Figma design to live cloud deployment + 3 post-launch maintenance weeks',
      revisionsIncluded: 3,
      toolsUsed: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker']
    }
  },
  {
    id: 'list_skills_2',
    title: 'Mobile App UI/UX Redesign & Scalable Figma Design System',
    description: 'Complete audit and redesign of your iOS/Android app. Includes user journey wireframes, 30+ responsive screens, interactive component library, tokens, and comprehensive developer handoff documentation with motion specs.',
    category: 'skills',
    images: [
      'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_marcus_vance',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 4.94,
      reviewsCount: 58,
      isVerified: true,
      memberSince: '2023',
      verifiedBadgeText: 'Verified Design Lead'
    },
    currentBid: 1450,
    minNextBid: 1550,
    startingBid: 900,
    buyNowPrice: 2200,
    bidCount: 15,
    bids: [
      { id: 'b21', bidderId: 'u17', bidderName: 'Elena Rostova', amount: 1450, timestamp: '1 hour ago', isWinning: true }
    ],
    startTime: new Date(Date.now() - 86400000).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 11).toISOString(),
    status: 'live',
    isFresh: true,
    location: 'Remote (EST / CET)',
    shippingOrDelivery: 'Figma Project File + Component Tokens Package',
    views: 920,
    watchers: 55,
    attributes: {
      serviceType: 'Mobile UI/UX & Design Systems',
      portfolioUrl: 'https://behance.net/marcusvance-ui',
      deliveryDays: 10,
      scopeOfWork: '30 polished screens, clickable prototype, WCAG AAA accessibility audit',
      revisionsIncluded: 4,
      toolsUsed: ['Figma', 'FigJam', 'Principle', 'Token Studio']
    }
  },

  // --- VEHICLES ---
  {
    id: 'list_veh_1',
    title: '2021 Tesla Model 3 Long Range Dual Motor AWD (28k Miles, Full Self-Driving Capable)',
    description: 'Pearl White Multi-Coat exterior with Black Premium vegan interior. Dual-motor all-wheel drive, 353-mile EPA range, acceleration boost unlocked (0-60 in 3.7s). Clean Carfax with zero accidents, single owner, stored in garage. Clean title ready for transfer.',
    category: 'vehicles',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_auto_elite',
      name: 'Pacific Auto Consignment',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 4.96,
      reviewsCount: 184,
      isVerified: true,
      memberSince: '2021',
      verifiedBadgeText: 'Licensed Consignor & Dealer'
    },
    currentBid: 24500,
    minNextBid: 25000,
    startingBid: 18000,
    buyNowPrice: 28500,
    bidCount: 44,
    bids: [
      { id: 'b22', bidderId: 'u_buyer', bidderName: 'Sophia Chen', amount: 24500, timestamp: '10 mins ago', isWinning: true },
      { id: 'b23', bidderId: 'u18', bidderName: 'Derek Vance', amount: 24000, timestamp: '1 hour ago' },
      { id: 'b24', bidderId: 'u19', bidderName: 'Jonathan Cole', amount: 23500, timestamp: '3 hours ago' }
    ],
    startTime: new Date(Date.now() - 86400000 * 3).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 55).toISOString(), // 55 mins remaining
    status: 'ending_soon',
    isTrending: true,
    isFeatured: true,
    location: 'San Jose, CA',
    shippingOrDelivery: 'Dealer pick up or insured flatbed nationwide transport',
    views: 4520,
    watchers: 248,
    attributes: {
      vehicleType: 'Car',
      makeModel: 'Tesla Model 3 Long Range AWD',
      manufacturingYear: 2021,
      odometerReading: '28,450 miles',
      ownershipDocStatus: 'Clean Title in Hand',
      inspectionDetails: '150-Point Pre-Purchase EV Inspection Passed with 96% Battery SOH'
    }
  },
  {
    id: 'list_veh_2',
    title: '2022 Royal Enfield Continental GT 650 Cafe Racer (British Racing Green)',
    description: '648cc parallel twin cafe racer. Features clip-on handlebars, upswept stainless exhaust with deep rumble, Brembo ByBre calipers, and Pirelli Phantom Sportscomp tires. Clean title, always garage kept with only 3,200 miles.',
    category: 'vehicles',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_moto_craft',
      name: 'Apex Moto Exchange',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating: 4.93,
      reviewsCount: 62,
      isVerified: true,
      memberSince: '2023'
    },
    currentBid: 4800,
    minNextBid: 5000,
    startingBid: 3200,
    buyNowPrice: 5900,
    bidCount: 23,
    bids: [
      { id: 'b25', bidderId: 'u20', bidderName: 'Ryan Gallagher', amount: 4800, timestamp: '4 hours ago', isWinning: true }
    ],
    startTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 16).toISOString(),
    status: 'live',
    isFresh: true,
    location: 'Portland, OR',
    shippingOrDelivery: 'Enclosed motorcycle carrier or local ride-away',
    views: 1670,
    watchers: 94,
    attributes: {
      vehicleType: 'Motorcycle',
      makeModel: 'Royal Enfield Continental GT 650',
      manufacturingYear: 2022,
      odometerReading: '3,210 miles',
      ownershipDocStatus: 'Single Owner Registration',
      inspectionDetails: 'Clean multi-point mechanical inspection + fresh oil and filter'
    }
  },
  {
    id: 'list_veh_3',
    title: 'Specialized Turbo Vado SL 4.0 Lightweight Electric Commuter Bike (Size L)',
    description: 'Ultra-lightweight 33 lb e-bike. Up to 80 miles range with Specialized SL 1.1 motor (240W, 35Nm) and integrated 320Wh battery. Clean hydraulic disc brakes, bright integrated front and rear safety lights.',
    category: 'vehicles',
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel_e_commute',
      name: 'Green Miles Transit',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      rating: 4.89,
      reviewsCount: 39,
      isVerified: true,
      memberSince: '2024'
    },
    currentBid: 1650,
    minNextBid: 1720,
    startingBid: 1100,
    buyNowPrice: 2150,
    bidCount: 18,
    bids: [
      { id: 'b26', bidderId: 'u21', bidderName: 'Carlos M.', amount: 1650, timestamp: '1 hour ago', isWinning: true }
    ],
    startTime: new Date(Date.now() - 86400000).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
    status: 'live',
    isFresh: true,
    location: 'Denver, CO',
    shippingOrDelivery: 'Boxed freight delivery or local test ride',
    views: 820,
    watchers: 49,
    attributes: {
      vehicleType: 'Electric Bike',
      makeModel: 'Specialized Turbo Vado SL 4.0',
      manufacturingYear: 2023,
      odometerReading: '480 miles logged on Mission Control app',
      ownershipDocStatus: 'Bill of Sale Ready',
      inspectionDetails: '100% battery health diagnostic report provided'
    }
  },

  // --- RECENTLY SOLD (Previous Successful Demonstration Auctions) ---
  {
    id: 'list_sold_1',
    title: 'Steph Curry Signed 2015 Golden State Warriors Championship Photo (PSA/DNA)',
    description: '16x20 autographed photo from the 2015 NBA Finals series with gold marker inscription "2015 Champs". PSA/DNA authenticated certification #7A8902.',
    category: 'sports',
    images: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80'],
    seller: {
      id: 'sel_sports_vault',
      name: 'Vault Memorabilia Co.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      rating: 4.96,
      reviewsCount: 318,
      isVerified: true,
      memberSince: '2023'
    },
    currentBid: 850,
    minNextBid: 850,
    startingBid: 400,
    bidCount: 27,
    bids: [],
    startTime: new Date(Date.now() - 86400000 * 6).toISOString(),
    endTime: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: 'sold',
    soldPrice: 850,
    soldDate: 'Yesterday, 8:45 PM',
    winnerName: 'Marcus T. (Verified Bidder)',
    location: 'Oakland, CA',
    shippingOrDelivery: 'Insured Delivery Complete',
    views: 1350,
    watchers: 72,
    attributes: {
      sportType: 'Basketball',
      memorabiliaType: 'Autographed Photo with Inscription',
      itemCondition: 'Mint Framed Condition',
      authenticityCert: 'PSA/DNA Certification #7A8902',
      playerOrTeam: 'Stephen Curry / Golden State Warriors'
    }
  },
  {
    id: 'list_sold_2',
    title: 'Sony Alpha 7 IV Full-Frame Hybrid Camera Body with FE 24-70mm GM Lens',
    description: '33MP full frame sensor with legendary autofocus and 4K 60p recording. Included original battery, charger, strap, and lens hood.',
    category: 'electronics',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'],
    seller: {
      id: 'sel_lens_vault',
      name: 'West Coast Photo',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      rating: 4.98,
      reviewsCount: 167,
      isVerified: true,
      memberSince: '2022'
    },
    currentBid: 2420,
    minNextBid: 2420,
    startingBid: 1600,
    bidCount: 34,
    bids: [],
    startTime: new Date(Date.now() - 86400000 * 7).toISOString(),
    endTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'sold',
    soldPrice: 2420,
    soldDate: '2 days ago',
    winnerName: 'Sarah K. (Tech Media Director)',
    location: 'Los Angeles, CA',
    shippingOrDelivery: 'FedEx Expedited Complete',
    views: 1890,
    watchers: 94,
    attributes: {
      brand: 'Sony',
      deviceType: 'Full-Frame Mirrorless Kit',
      batteryHealth: '100% (2 OEM batteries)',
      warrantyStatus: 'Expired'
    }
  },
  {
    id: 'list_sold_3',
    title: 'Herman Miller Aeron Chair (Size B, Fully Loaded with PostureFit SL)',
    description: 'Mineral colorway with satin aluminum base. Fully adjustable arms, tilt limiter, forward tilt, and multi-directional lumbar support. Campus pickup at Stanford dorms.',
    category: 'college',
    images: ['https://images.unsplash.com/photo-1580481077195-c3a82da45899?w=800&auto=format&fit=crop&q=80'],
    seller: {
      id: 'sel_student_jake',
      name: 'Jake Reynolds',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 19,
      isVerified: true,
      memberSince: '2024',
      college: 'Stanford University'
    },
    currentBid: 560,
    minNextBid: 560,
    startingBid: 350,
    bidCount: 19,
    bids: [],
    startTime: new Date(Date.now() - 86400000 * 5).toISOString(),
    endTime: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: 'sold',
    soldPrice: 560,
    soldDate: '3 days ago',
    winnerName: 'Aarav G. (Stanford Grad Student)',
    location: 'Stanford Campus',
    shippingOrDelivery: 'Dorm Pickup Handover Complete',
    views: 1120,
    watchers: 68,
    attributes: {
      campus: 'Stanford University',
      studentItemType: 'Dormitory Furniture',
      itemCondition: 'Excellent (Clean mesh)',
      deliveryOption: 'Campus Meetup'
    }
  },
  {
    id: 'list_sold_4',
    title: 'SaaS Brand Identity, 3D Assets & Interactive Landing Page Design',
    description: 'Award-winning design studio delivered complete visual language, 3D product renders, and responsive design for an autonomous robotics startup.',
    category: 'skills',
    images: ['https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=800&auto=format&fit=crop&q=80'],
    seller: {
      id: 'sel_marcus_vance',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 4.94,
      reviewsCount: 58,
      isVerified: true,
      memberSince: '2023'
    },
    currentBid: 3400,
    minNextBid: 3400,
    startingBid: 2000,
    bidCount: 18,
    bids: [],
    startTime: new Date(Date.now() - 86400000 * 10).toISOString(),
    endTime: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: 'completed',
    soldPrice: 3400,
    soldDate: '4 days ago',
    winnerName: 'RoboFleet Technologies',
    location: 'Remote',
    shippingOrDelivery: 'Digital Asset Delivery Complete',
    views: 1450,
    watchers: 81,
    attributes: {
      serviceType: 'Brand Identity & Web Design',
      portfolioUrl: 'https://behance.net/marcusvance-ui',
      deliveryDays: 12,
      scopeOfWork: 'Brand guidelines, 3D models, component library',
      revisionsIncluded: 3
    }
  }
];
