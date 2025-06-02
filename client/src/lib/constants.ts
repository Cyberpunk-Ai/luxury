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
  WATCHES: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3",
  CARS: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3", 
  JEWELRY: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3",
  REAL_ESTATE: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3",
  FASHION: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3",
  ART: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3",
  DEFAULT: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3",
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
