import { z } from "zod";

// Re-export shared types for convenience
export type {
  User,
  Category,
  Asset,
  Wishlist,
  Contact,
  InsertUser,
  InsertCategory,
  InsertAsset,
  InsertWishlist,
  InsertContact,
  AssetWithCategory,
  SearchFilters,
} from "@shared/schema";

// Frontend-specific types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface PriceRange {
  min?: number;
  max?: number;
  label: string;
  value: string;
}

export interface SortOption {
  label: string;
  value: string;
  direction?: "asc" | "desc";
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface ImageGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  assetId?: number;
}

export interface NewsletterFormData {
  email: string;
  preferences?: string[];
}

export interface AssetCardProps {
  asset: AssetWithCategory;
  variant?: "default" | "compact" | "featured";
  showWishlist?: boolean;
  showCompare?: boolean;
  className?: string;
}

export interface SearchResult {
  query: string;
  totalResults: number;
  assets: AssetWithCategory[];
  facets?: {
    categories: FilterOption[];
    brands: FilterOption[];
    priceRanges: FilterOption[];
    conditions: FilterOption[];
    locations: FilterOption[];
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface AssetFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  brand?: string;
  condition?: string;
  location?: string;
  verified?: boolean;
  featured?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface WishlistItem {
  id: number;
  assetId: number;
  asset: AssetWithCategory;
  addedAt: string;
}

export interface UserPreferences {
  categories: string[];
  priceRange: PriceRange;
  brands: string[];
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  currency: string;
  language: string;
}

export interface AssetSpecification {
  key: string;
  value: string;
  category?: string;
  unit?: string;
}

export interface AssetHistory {
  event: "created" | "updated" | "sold" | "verified" | "featured";
  timestamp: string;
  description: string;
  user?: string;
}

export interface GeolocationData {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  formattedAddress?: string;
}

export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
}

// Form validation schemas
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  assetId: z.number().optional(),
});

export const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  preferences: z.array(z.string()).optional(),
});

export const searchFormSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  brand: z.string().optional(),
  condition: z.string().optional(),
  location: z.string().optional(),
  verified: z.boolean().optional(),
  featured: z.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component prop types
export type ComponentSize = "sm" | "md" | "lg" | "xl";
export type ComponentVariant = "default" | "primary" | "secondary" | "outline" | "ghost";
export type ComponentColor = "default" | "primary" | "secondary" | "success" | "warning" | "error";

// Theme types
export type ThemeMode = "light" | "dark" | "system";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  luxury: {
    navy: string;
    dark: string;
    gold: string;
    indigo: string;
  };
}

// Error types
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

// Utility types for React components
export type HTMLElementProps<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T];
export type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

// Event types
export interface CustomEvent<T = any> {
  type: string;
  payload: T;
  timestamp: number;
}

export type EventHandler<T = any> = (event: CustomEvent<T>) => void;

// State management types
export interface AppState {
  user: User | null;
  wishlist: WishlistItem[];
  searchHistory: string[];
  preferences: UserPreferences;
  theme: ThemeMode;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  action?: {
    label: string;
    href: string;
  };
}
