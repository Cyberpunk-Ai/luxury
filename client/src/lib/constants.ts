export const APP_NAME = "Otulia";
export const APP_DESCRIPTION = "Premier digital destination for exceptional luxury assets";

export const API_BASE_URL = "/api";

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  WISHLIST: "/wishlist",
  CONTACT: "/contact",
  CATEGORY: (slug: string) => `/category/${slug}`,
  ASSET: (id: string | number) => `/asset/${id}`,
} as const;

export const CATEGORY_SLUGS = {
  WATCHES: "watches",
  CARS: "cars", 
  JEWELRY: "jewelry",
  REAL_ESTATE: "real-estate",
  FASHION: "fashion",
  ART: "art",
} as const;

export const ASSET_CONDITIONS = {
  NEW: "new",
  EXCELLENT: "excellent",
  GOOD: "good",
  FAIR: "fair",
} as const;

export const ASSET_STATUS = {
  ACTIVE: "active",
  SOLD: "sold",
  PENDING: "pending",
} as const;

export const PRICE_RANGES = [
  { label: "Under $10K", value: "0-10000" },
  { label: "$10K - $50K", value: "10000-50000" },
  { label: "$50K - $100K", value: "50000-100000" },
  { label: "$100K - $500K", value: "100000-500000" },
  { label: "$500K+", value: "500000+" },
] as const;

export const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Newest First", value: "newest" },
  { label: "Highest Rated", value: "rating" },
] as const;

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Asset Inquiry", 
  "Authentication Services",
  "Concierge Services",
  "Investment Advisory",
  "Technical Support",
  "Partnership Opportunities",
  "Media & Press",
] as const;

export const SOCIAL_LINKS = {
  INSTAGRAM: "https://instagram.com/otulia",
  TWITTER: "https://twitter.com/otulia", 
  FACEBOOK: "https://facebook.com/otulia",
  LINKEDIN: "https://linkedin.com/company/otulia",
} as const;

export const CONTACT_INFO = {
  EMAIL: "hello@otulia.com",
  SUPPORT_EMAIL: "support@otulia.com",
  PHONE: "+1 (555) 123-4567",
  ADDRESS: {
    STREET: "123 Luxury Avenue",
    CITY: "Beverly Hills",
    STATE: "CA",
    ZIP: "90210",
    COUNTRY: "United States",
  },
  BUSINESS_HOURS: {
    WEEKDAYS: "Monday - Friday: 9:00 AM - 6:00 PM",
    SATURDAY: "Saturday: 10:00 AM - 4:00 PM", 
    SUNDAY: "Sunday: Closed",
  },
} as const;

export const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CHF: "₣",
} as const;

export const LUXURY_BRANDS = {
  WATCHES: ["Rolex", "Patek Philippe", "Audemars Piguet", "Omega", "Cartier", "Breitling"],
  CARS: ["Ferrari", "Lamborghini", "Porsche", "McLaren", "Bentley", "Rolls-Royce"],
  JEWELRY: ["Cartier", "Tiffany & Co.", "Harry Winston", "Van Cleef & Arpels", "Bulgari"],
  FASHION: ["Hermès", "Louis Vuitton", "Chanel", "Gucci", "Prada", "Dior"],
} as const;

export const IMAGE_PLACEHOLDERS = {
  WATCHES: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
  CARS: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800", 
  JEWELRY: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
  REAL_ESTATE: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
  FASHION: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
  ART: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
  YACHTS: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
  JETS: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
  DEFAULT: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800",
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;
