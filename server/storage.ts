import {
  users,
  categories,
  assets,
  wishlists,
  contacts,
  assetRatings,
  creditTransactions,
  assetLikes,
  type User,
  type Category,
  type Asset,
  type Wishlist,
  type Contact,
  type AssetRating,
  type CreditTransaction,
  type AssetLike,
  type InsertUser,
  type InsertCategory,
  type InsertAsset,
  type InsertWishlist,
  type InsertContact,
  type InsertAssetRating,
  type InsertCreditTransaction,
  type InsertAssetLike,
  type AssetWithCategory,
  type SearchFilters,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Assets
  getAssets(filters?: SearchFilters): Promise<AssetWithCategory[]>;
  getAsset(id: number): Promise<AssetWithCategory | undefined>;
  getFeaturedAssets(): Promise<AssetWithCategory[]>;
  getAssetsByCategory(categoryId: number): Promise<AssetWithCategory[]>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: number, updates: Partial<Asset>): Promise<Asset | undefined>;
  incrementAssetViews(id: number): Promise<void>;
  getTopRankedAssets(limit?: number): Promise<AssetWithCategory[]>;

  // Wishlist
  getWishlist(userId: number): Promise<AssetWithCategory[]>;
  addToWishlist(wishlist: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(userId: number, assetId: number): Promise<boolean>;
  isInWishlist(userId: number, assetId: number): Promise<boolean>;

  // Asset Likes
  likeAsset(userId: number, assetId: number): Promise<AssetLike>;
  unlikeAsset(userId: number, assetId: number): Promise<boolean>;
  isAssetLiked(userId: number, assetId: number): Promise<boolean>;

  // Asset Ratings
  rateAsset(rating: InsertAssetRating): Promise<AssetRating>;
  getAssetRatings(assetId: number): Promise<AssetRating[]>;

  // Credits
  getCreditBalance(userId: number): Promise<number>;
  addCredits(transaction: InsertCreditTransaction): Promise<CreditTransaction>;
  spendCredits(userId: number, amount: number, description: string, assetId?: number): Promise<CreditTransaction>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private categories: Map<number, Category> = new Map();
  private assets: Map<number, Asset> = new Map();
  private wishlists: Map<number, Wishlist> = new Map();
  private contacts: Map<number, Contact> = new Map();
  
  private currentUserId = 1;
  private currentCategoryId = 1;
  private currentAssetId = 1;
  private currentWishlistId = 1;
  private currentContactId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoryData = [
      { name: "Luxury Watches", slug: "watches", description: "Timeless precision and elegance", icon: "fas fa-clock" },
      { name: "Luxury Cars", slug: "cars", description: "Automotive excellence redefined", icon: "fas fa-car" },
      { name: "Fine Jewelry", slug: "jewelry", description: "Masterfully crafted treasures", icon: "fas fa-gem" },
      { name: "Real Estate", slug: "real-estate", description: "Exceptional properties worldwide", icon: "fas fa-home" },
      { name: "Luxury Fashion", slug: "fashion", description: "Haute couture and designer pieces", icon: "fas fa-tshirt" },
      { name: "Art & Collectibles", slug: "art", description: "Rare and investment-grade pieces", icon: "fas fa-palette" },
    ];

    categoryData.forEach(cat => {
      const category: Category = { id: this.currentCategoryId++, ...cat };
      this.categories.set(category.id, category);
    });

    // Seed luxury assets
    const assetData = [
      {
        title: "Patek Philippe Nautilus",
        description: "The iconic Patek Philippe Nautilus 5711/1A-010 in stainless steel with blue dial. This legendary timepiece represents the pinnacle of luxury sports watches.",
        price: "89500.00",
        categoryId: 1, // watches
        brand: "Patek Philippe",
        model: "5711/1A-010",
        condition: "excellent",
        year: 2019,
        location: "New York, NY",
        images: ["https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "5.0",
        ratingCount: 12,
        specifications: JSON.stringify({
          movement: "Caliber 324 S C",
          caseMaterial: "Stainless Steel",
          dialColor: "Blue",
          waterResistance: "120m",
          powerReserve: "45 hours"
        }),
        status: "active"
      },
      {
        title: "Rolex Submariner",
        description: "The legendary Rolex Submariner 116610LN with black dial and ceramic bezel. A timeless diving watch that defines luxury sports timepieces.",
        price: "12500.00",
        categoryId: 1, // watches
        brand: "Rolex",
        model: "116610LN",
        condition: "excellent",
        year: 2020,
        location: "Los Angeles, CA",
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "4.9",
        ratingCount: 8,
        specifications: JSON.stringify({
          movement: "Caliber 3135",
          caseMaterial: "Oystersteel",
          dialColor: "Black",
          waterResistance: "300m",
          powerReserve: "48 hours"
        }),
        status: "active"
      },
      {
        title: "Ferrari F8 Tributo",
        description: "Stunning 2021 Ferrari F8 Tributo in Rosso Corsa with only 2,500 miles. This mid-engine masterpiece delivers 710hp and represents Ferrari's racing heritage.",
        price: "285000.00",
        categoryId: 2, // cars
        brand: "Ferrari",
        model: "F8 Tributo",
        condition: "excellent",
        year: 2021,
        location: "Miami, FL",
        images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "4.9",
        ratingCount: 5,
        specifications: JSON.stringify({
          engine: "3.9L Twin-Turbo V8",
          horsepower: "710 hp",
          transmission: "7-Speed Dual-Clutch",
          topSpeed: "211 mph",
          acceleration: "0-60 mph in 2.9s"
        }),
        status: "active"
      },
      {
        title: "Cartier Diamond Necklace",
        description: "Exquisite Cartier diamond necklace in 18K white gold featuring 5.2 carats of brilliant-cut diamonds. A masterpiece of French jewelry craftsmanship.",
        price: "125000.00",
        categoryId: 3, // jewelry
        brand: "Cartier",
        model: "Diamond Rivière",
        condition: "new",
        year: 2023,
        location: "Beverly Hills, CA",
        images: ["https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "5.0",
        ratingCount: 7,
        specifications: JSON.stringify({
          metal: "18K White Gold",
          stones: "5.2ct Total Diamond Weight",
          clarity: "VVS1-VVS2",
          color: "D-F",
          length: "16 inches"
        }),
        status: "active"
      },
      {
        title: "Manhattan Penthouse",
        description: "Spectacular penthouse in prime Manhattan location with Central Park views. 4 bedrooms, 3 bathrooms, 3,200 sqft of luxury living space.",
        price: "4200000.00",
        categoryId: 4, // real estate
        brand: "Luxury Properties",
        model: "Penthouse",
        condition: "excellent",
        year: 2018,
        location: "Manhattan, NY",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "4.8",
        ratingCount: 15,
        specifications: JSON.stringify({
          bedrooms: 4,
          bathrooms: 3,
          sqft: 3200,
          floors: "Top Floor",
          amenities: ["Central Park Views", "Private Elevator", "Concierge", "Gym", "Rooftop Terrace"]
        }),
        status: "active"
      },
      {
        title: "Hermès Birkin 35",
        description: "Iconic Hermès Birkin 35 in Étoupe Togo leather with palladium hardware. This legendary handbag represents the ultimate in luxury fashion accessories.",
        price: "18500.00",
        categoryId: 5, // fashion
        brand: "Hermès",
        model: "Birkin 35",
        condition: "excellent",
        year: 2022,
        location: "Paris, France",
        images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "5.0",
        ratingCount: 9,
        specifications: JSON.stringify({
          leather: "Togo",
          color: "Étoupe",
          hardware: "Palladium",
          size: "35cm",
          condition: "Pristine"
        }),
        status: "active"
      }
    ];

    assetData.forEach(assetInfo => {
      const asset: Asset = {
        id: this.currentAssetId++,
        ...assetInfo,
        sellerId: 1,
        createdAt: new Date()
      };
      this.assets.set(asset.id, asset);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.currentUserId++,
      ...insertUser,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const category: Category = {
      id: this.currentCategoryId++,
      ...insertCategory,
    };
    this.categories.set(category.id, category);
    return category;
  }

  // Assets
  async getAssets(filters?: SearchFilters): Promise<AssetWithCategory[]> {
    let results = Array.from(this.assets.values());

    if (filters) {
      if (filters.category) {
        const category = await this.getCategoryBySlug(filters.category);
        if (category) {
          results = results.filter(asset => asset.categoryId === category.id);
        }
      }

      if (filters.priceMin !== undefined) {
        results = results.filter(asset => parseFloat(asset.price) >= filters.priceMin!);
      }

      if (filters.priceMax !== undefined) {
        results = results.filter(asset => parseFloat(asset.price) <= filters.priceMax!);
      }

      if (filters.brand) {
        results = results.filter(asset => 
          asset.brand?.toLowerCase().includes(filters.brand!.toLowerCase())
        );
      }

      if (filters.condition) {
        results = results.filter(asset => asset.condition === filters.condition);
      }

      if (filters.location) {
        results = results.filter(asset => 
          asset.location?.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      if (filters.query) {
        const query = filters.query.toLowerCase();
        results = results.filter(asset => 
          asset.title.toLowerCase().includes(query) ||
          asset.description.toLowerCase().includes(query) ||
          asset.brand?.toLowerCase().includes(query)
        );
      }
    }

    return this.enrichAssetsWithCategory(results);
  }

  async getAsset(id: number): Promise<AssetWithCategory | undefined> {
    const asset = this.assets.get(id);
    if (!asset) return undefined;

    const enriched = await this.enrichAssetsWithCategory([asset]);
    return enriched[0];
  }

  async getFeaturedAssets(): Promise<AssetWithCategory[]> {
    const featured = Array.from(this.assets.values()).filter(asset => asset.featured);
    return this.enrichAssetsWithCategory(featured);
  }

  async getAssetsByCategory(categoryId: number): Promise<AssetWithCategory[]> {
    const assets = Array.from(this.assets.values()).filter(asset => asset.categoryId === categoryId);
    return this.enrichAssetsWithCategory(assets);
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const asset: Asset = {
      id: this.currentAssetId++,
      ...insertAsset,
      createdAt: new Date(),
    };
    this.assets.set(asset.id, asset);
    return asset;
  }

  async updateAsset(id: number, updates: Partial<Asset>): Promise<Asset | undefined> {
    const asset = this.assets.get(id);
    if (!asset) return undefined;

    const updatedAsset = { ...asset, ...updates };
    this.assets.set(id, updatedAsset);
    return updatedAsset;
  }

  private async enrichAssetsWithCategory(assets: Asset[]): Promise<AssetWithCategory[]> {
    return assets.map(asset => ({
      ...asset,
      category: asset.categoryId ? this.categories.get(asset.categoryId) : undefined,
    }));
  }

  // Wishlist
  async getWishlist(userId: number): Promise<AssetWithCategory[]> {
    const userWishlists = Array.from(this.wishlists.values()).filter(w => w.userId === userId);
    const assetIds = userWishlists.map(w => w.assetId);
    const assets = assetIds.map(id => this.assets.get(id)).filter(Boolean) as Asset[];
    return this.enrichAssetsWithCategory(assets);
  }

  async addToWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    const wishlist: Wishlist = {
      id: this.currentWishlistId++,
      ...insertWishlist,
      createdAt: new Date(),
    };
    this.wishlists.set(wishlist.id, wishlist);
    return wishlist;
  }

  async removeFromWishlist(userId: number, assetId: number): Promise<boolean> {
    const wishlist = Array.from(this.wishlists.values()).find(
      w => w.userId === userId && w.assetId === assetId
    );
    if (wishlist) {
      this.wishlists.delete(wishlist.id);
      return true;
    }
    return false;
  }

  async isInWishlist(userId: number, assetId: number): Promise<boolean> {
    return Array.from(this.wishlists.values()).some(
      w => w.userId === userId && w.assetId === assetId
    );
  }

  // Contacts
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: this.currentContactId++,
      ...insertContact,
      status: "new",
      createdAt: new Date(),
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
