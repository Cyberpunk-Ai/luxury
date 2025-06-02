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

export class EnhancedMemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private categories: Map<number, Category> = new Map();
  private assets: Map<number, Asset> = new Map();
  private wishlists: Map<number, Wishlist> = new Map();
  private contacts: Map<number, Contact> = new Map();
  private assetRatings: Map<number, AssetRating> = new Map();
  private creditTransactions: Map<number, CreditTransaction> = new Map();
  private assetLikes: Map<number, AssetLike> = new Map();
  
  private currentUserId = 1;
  private currentCategoryId = 1;
  private currentAssetId = 1;
  private currentWishlistId = 1;
  private currentContactId = 1;
  private currentRatingId = 1;
  private currentTransactionId = 1;
  private currentLikeId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Comprehensive luxury categories
    const luxuryCategories = [
      { name: "Luxury Watches", slug: "watches", description: "Exceptional timepieces from prestigious maisons", icon: "fas fa-clock" },
      { name: "Luxury Cars", slug: "cars", description: "Automotive excellence and craftsmanship", icon: "fas fa-car" },
      { name: "Fine Jewelry", slug: "jewelry", description: "Exquisite gems and precious metals", icon: "fas fa-gem" },
      { name: "Luxury Real Estate", slug: "real-estate", description: "Exceptional properties worldwide", icon: "fas fa-home" },
      { name: "Haute Couture", slug: "fashion", description: "Designer fashion and accessories", icon: "fas fa-tshirt" },
      { name: "Fine Art", slug: "art", description: "Masterpieces and collectible artworks", icon: "fas fa-palette" },
      { name: "Private Jets", slug: "jets", description: "Luxury aviation and private aircraft", icon: "fas fa-plane" },
      { name: "Luxury Yachts", slug: "yachts", description: "Premium maritime vessels", icon: "fas fa-ship" },
      { name: "Rare Wines", slug: "wines", description: "Vintage and collectible wines", icon: "fas fa-wine-glass" },
      { name: "Luxury Handbags", slug: "handbags", description: "Designer bags and accessories", icon: "fas fa-briefcase" },
      { name: "Premium Spirits", slug: "spirits", description: "Rare whiskeys and cognacs", icon: "fas fa-cocktail" },
      { name: "Rare Books", slug: "books", description: "First editions and manuscripts", icon: "fas fa-book" },
    ];

    luxuryCategories.forEach(cat => {
      const category: Category = { 
        id: this.currentCategoryId++, 
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon
      };
      this.categories.set(category.id, category);
    });

    // Extensive luxury asset collection
    const premiumAssets = [
      // Luxury Watches
      {
        title: "Patek Philippe Nautilus 5711/1A",
        description: "The holy grail of luxury sports watches. This iconic Patek Philippe Nautilus features the distinctive blue dial and integrated steel bracelet that has made it one of the most coveted timepieces in the world.",
        price: "125000.00",
        currency: "USD",
        categoryId: 1,
        brand: "Patek Philippe",
        model: "5711/1A-010",
        condition: "excellent",
        year: 2021,
        location: "Geneva, Switzerland",
        images: ["https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "5.0",
        ratingCount: 24,
        views: 1847,
        likes: 234,
        rankingScore: "98.50",
        luxuryIndex: "9.8",
        investmentPotential: "9.9",
        rarity: "ultra-rare",
        tags: ["investment-grade", "discontinued", "blue-chip"],
        specifications: JSON.stringify({
          movement: "Caliber 324 S C",
          caseMaterial: "Stainless Steel",
          caseSize: "40mm",
          dialColor: "Blue",
          waterResistance: "120m",
          powerReserve: "45 hours"
        }),
        status: "active"
      },
      {
        title: "Rolex Daytona 116500LN Panda",
        description: "The legendary Rolex Cosmograph Daytona with white dial and black subdials, creating the iconic 'Panda' configuration. Features Rolex's in-house Caliber 4130 movement.",
        price: "35000.00",
        currency: "USD",
        categoryId: 1,
        brand: "Rolex",
        model: "116500LN",
        condition: "new",
        year: 2023,
        location: "New York, NY",
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "4.9",
        ratingCount: 18,
        views: 923,
        likes: 156,
        rankingScore: "94.20",
        luxuryIndex: "9.2",
        investmentPotential: "8.8",
        rarity: "rare",
        tags: ["ceramic-bezel", "chronograph", "panda-dial"],
        specifications: JSON.stringify({
          movement: "Caliber 4130",
          caseMaterial: "Oystersteel",
          caseSize: "40mm",
          dialColor: "White",
          waterResistance: "100m",
          powerReserve: "72 hours"
        }),
        status: "active"
      },
      {
        title: "Audemars Piguet Royal Oak 15202ST",
        description: "The original Royal Oak Jumbo in stainless steel with the classic 'Grande Tapisserie' dial. This 39mm masterpiece represents the pinnacle of luxury sports watch design.",
        price: "89000.00",
        currency: "USD",
        categoryId: 1,
        brand: "Audemars Piguet",
        model: "15202ST.OO.1240ST.01",
        condition: "excellent",
        year: 2020,
        location: "London, UK",
        images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "4.8",
        ratingCount: 15,
        views: 756,
        likes: 98,
        rankingScore: "92.10",
        luxuryIndex: "9.0",
        investmentPotential: "8.7",
        rarity: "rare",
        tags: ["jumbo", "tapisserie", "steel"],
        specifications: JSON.stringify({
          movement: "Caliber 2121",
          caseMaterial: "Stainless Steel",
          caseSize: "39mm",
          dialColor: "Blue",
          waterResistance: "50m",
          powerReserve: "40 hours"
        }),
        status: "active"
      },

      // Luxury Cars
      {
        title: "Ferrari LaFerrari",
        description: "The ultimate Ferrari hypercar featuring hybrid V12 technology. Limited to 499 units worldwide, this represents the pinnacle of Ferrari engineering and exclusivity.",
        price: "4500000.00",
        currency: "USD",
        categoryId: 2,
        brand: "Ferrari",
        model: "LaFerrari",
        condition: "excellent",
        year: 2015,
        location: "Monaco",
        images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "5.0",
        ratingCount: 8,
        views: 2341,
        likes: 445,
        rankingScore: "99.80",
        luxuryIndex: "10.0",
        investmentPotential: "9.8",
        rarity: "legendary",
        tags: ["hypercar", "hybrid", "limited-edition"],
        specifications: JSON.stringify({
          engine: "6.3L V12 + Electric Motor",
          horsepower: "963 hp",
          transmission: "7-Speed Dual-Clutch",
          topSpeed: "217 mph",
          acceleration: "0-60 mph in 2.4s",
          production: "499 units"
        }),
        status: "active"
      },
      {
        title: "McLaren P1",
        description: "Revolutionary hybrid hypercar from McLaren's Ultimate Series. Features active aerodynamics and the most advanced suspension system ever developed for a road car.",
        price: "2800000.00",
        currency: "USD",
        categoryId: 2,
        brand: "McLaren",
        model: "P1",
        condition: "excellent",
        year: 2014,
        location: "Beverly Hills, CA",
        images: ["https://images.unsplash.com/photo-1563720360172-67b8f3dce741?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "4.9",
        ratingCount: 12,
        views: 1876,
        likes: 287,
        rankingScore: "97.60",
        luxuryIndex: "9.8",
        investmentPotential: "9.5",
        rarity: "ultra-rare",
        tags: ["hypercar", "hybrid", "track-focused"],
        specifications: JSON.stringify({
          engine: "3.8L Twin-Turbo V8 + Electric Motor",
          horsepower: "903 hp",
          transmission: "7-Speed Dual-Clutch",
          topSpeed: "217 mph",
          acceleration: "0-60 mph in 2.8s",
          production: "375 units"
        }),
        status: "active"
      },

      // Fine Jewelry
      {
        title: "Cartier Panthère de Cartier Necklace",
        description: "Exquisite high jewelry piece featuring a magnificent panther crafted in white gold, adorned with emeralds, onyx, and brilliant-cut diamonds totaling over 15 carats.",
        price: "850000.00",
        currency: "USD",
        categoryId: 3,
        brand: "Cartier",
        model: "Panthère de Cartier",
        condition: "new",
        year: 2023,
        location: "Paris, France",
        images: ["https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "5.0",
        ratingCount: 6,
        views: 634,
        likes: 89,
        rankingScore: "96.40",
        luxuryIndex: "9.5",
        investmentPotential: "8.9",
        rarity: "ultra-rare",
        tags: ["high-jewelry", "panthère", "diamonds"],
        specifications: JSON.stringify({
          metal: "18K White Gold",
          stones: "15.2ct Total Diamond Weight",
          emeralds: "2.8ct Colombian Emeralds",
          onyx: "Black Onyx",
          length: "18 inches",
          certification: "Cartier Certificate"
        }),
        status: "active"
      },

      // Luxury Real Estate
      {
        title: "Penthouse at One57 Manhattan",
        description: "Ultra-luxurious penthouse spanning two floors with panoramic Central Park views. Features 6 bedrooms, 7 bathrooms, and access to exclusive building amenities including spa and wine cellar.",
        price: "95000000.00",
        currency: "USD",
        categoryId: 4,
        brand: "One57",
        model: "Penthouse",
        condition: "excellent",
        year: 2019,
        location: "Manhattan, NY",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "4.9",
        ratingCount: 21,
        views: 3421,
        likes: 567,
        rankingScore: "98.70",
        luxuryIndex: "9.9",
        investmentPotential: "9.1",
        rarity: "ultra-rare",
        tags: ["penthouse", "central-park", "full-floor"],
        specifications: JSON.stringify({
          bedrooms: 6,
          bathrooms: 7,
          sqft: 13554,
          floors: "75th & 76th Floor",
          view: "Central Park & Hudson River",
          amenities: ["Private Elevator", "Spa", "Wine Cellar", "24h Concierge", "Pool", "Library"]
        }),
        status: "active"
      },

      // Private Jets
      {
        title: "Gulfstream G650ER",
        description: "The flagship of business aviation featuring ultra-long range capability and the most advanced avionics. Luxuriously appointed cabin with bespoke interior design.",
        price: "75000000.00",
        currency: "USD",
        categoryId: 7,
        brand: "Gulfstream",
        model: "G650ER",
        condition: "excellent",
        year: 2018,
        location: "Teterboro, NJ",
        images: ["https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "4.8",
        ratingCount: 9,
        views: 1234,
        likes: 178,
        rankingScore: "95.30",
        luxuryIndex: "9.4",
        investmentPotential: "8.2",
        rarity: "rare",
        tags: ["ultra-long-range", "low-hours", "custom-interior"],
        specifications: JSON.stringify({
          maxRange: "7500 nautical miles",
          maxSpeed: "Mach 0.925",
          passengers: "Up to 19",
          flightHours: "892 hours",
          engines: "Rolls-Royce BR725",
          interior: "Bespoke design by Alberto Pinto"
        }),
        status: "active"
      },

      // Luxury Yachts
      {
        title: "Feadship 85m Custom Superyacht",
        description: "Magnificent custom-built superyacht featuring state-of-the-art technology and exquisite interior design. Accommodates 12 guests in ultimate luxury with professional crew quarters.",
        price: "180000000.00",
        currency: "USD",
        categoryId: 8,
        brand: "Feadship",
        model: "85m Custom",
        condition: "excellent",
        year: 2020,
        location: "Monaco",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "5.0",
        ratingCount: 4,
        views: 876,
        likes: 134,
        rankingScore: "97.90",
        luxuryIndex: "9.8",
        investmentPotential: "8.5",
        rarity: "legendary",
        tags: ["superyacht", "custom-build", "award-winning"],
        specifications: JSON.stringify({
          length: "85 meters",
          beam: "14.5 meters",
          guests: "12 in 6 staterooms",
          crew: "17",
          cruisingSpeed: "15 knots",
          maxSpeed: "17.5 knots",
          features: ["Beach Club", "Helicopter Pad", "Spa", "Cinema", "Wine Cellar"]
        }),
        status: "active"
      },

      // Fine Art
      {
        title: "Banksy 'Girl with Balloon' Original",
        description: "Iconic stencil work by the enigmatic street artist Banksy. This original piece on canvas represents one of the most recognizable images in contemporary art.",
        price: "12500000.00",
        currency: "USD",
        categoryId: 6,
        brand: "Banksy",
        model: "Girl with Balloon",
        condition: "excellent",
        year: 2006,
        location: "London, UK",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3"],
        verified: true,
        featured: true,
        rating: "4.9",
        ratingCount: 13,
        views: 2156,
        likes: 456,
        rankingScore: "94.80",
        luxuryIndex: "8.9",
        investmentPotential: "9.3",
        rarity: "ultra-rare",
        tags: ["contemporary-art", "street-art", "investment-grade"],
        specifications: JSON.stringify({
          medium: "Stencil and Acrylic on Canvas",
          dimensions: "100 x 70 cm",
          year: "2006",
          provenance: "Private Collection",
          exhibition: "Multiple International Exhibitions",
          authentication: "Pest Control Certificate"
        }),
        status: "active"
      }
    ];

    // Create assets with proper type handling
    premiumAssets.forEach(assetInfo => {
      const asset: Asset = {
        id: this.currentAssetId++,
        title: assetInfo.title,
        description: assetInfo.description,
        price: assetInfo.price,
        currency: assetInfo.currency,
        categoryId: assetInfo.categoryId,
        brand: assetInfo.brand || null,
        model: assetInfo.model || null,
        condition: assetInfo.condition || null,
        year: assetInfo.year || null,
        location: assetInfo.location || null,
        images: assetInfo.images || null,
        verified: assetInfo.verified || false,
        featured: assetInfo.featured || false,
        rating: assetInfo.rating || "0.0",
        ratingCount: assetInfo.ratingCount || 0,
        views: assetInfo.views || 0,
        likes: assetInfo.likes || 0,
        rankingScore: assetInfo.rankingScore || "0.00",
        luxuryIndex: assetInfo.luxuryIndex || "0.0",
        investmentPotential: assetInfo.investmentPotential || "0.0",
        rarity: assetInfo.rarity || "common",
        specifications: assetInfo.specifications || null,
        sellerId: 1,
        status: assetInfo.status || "active",
        tags: assetInfo.tags || null,
        createdAt: new Date()
      };
      this.assets.set(asset.id, asset);
    });

    // Create a demo user
    const demoUser: User = {
      id: this.currentUserId++,
      username: "luxury_collector",
      email: "collector@otulia.com",
      password: "hashed_password",
      firstName: "Alexandre",
      lastName: "Dubois",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150",
      bio: "Passionate collector of luxury timepieces and fine art",
      location: "Monaco",
      credits: "2500.00",
      membershipTier: "platinum",
      verified: true,
      isVip: true,
      totalSpent: "125000.00",
      createdAt: new Date()
    };
    this.users.set(demoUser.id, demoUser);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.currentUserId++,
      username: insertUser.username,
      email: insertUser.email,
      password: insertUser.password,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      phone: insertUser.phone || null,
      avatar: null,
      bio: null,
      location: null,
      credits: "100.00",
      membershipTier: "bronze",
      verified: insertUser.verified || false,
      isVip: false,
      totalSpent: "0.00",
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Category methods
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
      name: insertCategory.name,
      slug: insertCategory.slug,
      description: insertCategory.description || null,
      icon: insertCategory.icon || null,
    };
    this.categories.set(category.id, category);
    return category;
  }

  // Asset methods
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
      title: insertAsset.title,
      description: insertAsset.description,
      price: insertAsset.price,
      currency: insertAsset.currency,
      categoryId: insertAsset.categoryId,
      brand: insertAsset.brand || null,
      model: insertAsset.model || null,
      condition: insertAsset.condition || null,
      year: insertAsset.year || null,
      location: insertAsset.location || null,
      images: insertAsset.images || null,
      verified: insertAsset.verified || false,
      featured: insertAsset.featured || false,
      rating: insertAsset.rating || "0.0",
      ratingCount: insertAsset.ratingCount || 0,
      views: insertAsset.views || 0,
      likes: insertAsset.likes || 0,
      rankingScore: insertAsset.rankingScore || "0.00",
      luxuryIndex: insertAsset.luxuryIndex || "0.0",
      investmentPotential: insertAsset.investmentPotential || "0.0",
      rarity: insertAsset.rarity || "common",
      specifications: insertAsset.specifications || null,
      sellerId: insertAsset.sellerId,
      status: insertAsset.status || "active",
      tags: insertAsset.tags || null,
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

  async incrementAssetViews(id: number): Promise<void> {
    const asset = this.assets.get(id);
    if (asset) {
      asset.views = (asset.views || 0) + 1;
      this.assets.set(id, asset);
    }
  }

  async getTopRankedAssets(limit: number = 10): Promise<AssetWithCategory[]> {
    const sorted = Array.from(this.assets.values())
      .sort((a, b) => parseFloat(b.rankingScore || "0") - parseFloat(a.rankingScore || "0"))
      .slice(0, limit);
    return this.enrichAssetsWithCategory(sorted);
  }

  private async enrichAssetsWithCategory(assets: Asset[]): Promise<AssetWithCategory[]> {
    return assets.map(asset => ({
      ...asset,
      category: asset.categoryId ? this.categories.get(asset.categoryId) : undefined,
    }));
  }

  // Wishlist methods
  async getWishlist(userId: number): Promise<AssetWithCategory[]> {
    const userWishlists = Array.from(this.wishlists.values()).filter(w => w.userId === userId);
    const assetIds = userWishlists.map(w => w.assetId).filter(id => id !== null) as number[];
    const assets = assetIds.map(id => this.assets.get(id)).filter(Boolean) as Asset[];
    return this.enrichAssetsWithCategory(assets);
  }

  async addToWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    const wishlist: Wishlist = {
      id: this.currentWishlistId++,
      userId: insertWishlist.userId || null,
      assetId: insertWishlist.assetId || null,
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

  // Asset Like methods
  async likeAsset(userId: number, assetId: number): Promise<AssetLike> {
    const like: AssetLike = {
      id: this.currentLikeId++,
      userId,
      assetId,
      createdAt: new Date(),
    };
    this.assetLikes.set(like.id, like);

    // Update asset likes count
    const asset = this.assets.get(assetId);
    if (asset) {
      asset.likes = (asset.likes || 0) + 1;
      this.assets.set(assetId, asset);
    }

    return like;
  }

  async unlikeAsset(userId: number, assetId: number): Promise<boolean> {
    const like = Array.from(this.assetLikes.values()).find(
      l => l.userId === userId && l.assetId === assetId
    );
    if (like) {
      this.assetLikes.delete(like.id);

      // Update asset likes count
      const asset = this.assets.get(assetId);
      if (asset && asset.likes && asset.likes > 0) {
        asset.likes = asset.likes - 1;
        this.assets.set(assetId, asset);
      }

      return true;
    }
    return false;
  }

  async isAssetLiked(userId: number, assetId: number): Promise<boolean> {
    return Array.from(this.assetLikes.values()).some(
      l => l.userId === userId && l.assetId === assetId
    );
  }

  // Asset Rating methods
  async rateAsset(insertRating: InsertAssetRating): Promise<AssetRating> {
    const rating: AssetRating = {
      id: this.currentRatingId++,
      assetId: insertRating.assetId,
      userId: insertRating.userId,
      overallRating: insertRating.overallRating,
      qualityRating: insertRating.qualityRating,
      authenticityRating: insertRating.authenticityRating,
      valueRating: insertRating.valueRating,
      serviceRating: insertRating.serviceRating,
      review: insertRating.review || null,
      verified: insertRating.verified || false,
      createdAt: new Date(),
    };
    this.assetRatings.set(rating.id, rating);

    // Update asset rating
    this.updateAssetRating(insertRating.assetId);

    // Award credits for rating
    await this.addCredits({
      userId: insertRating.userId,
      amount: "5.00",
      type: "earned",
      source: "rating_asset",
      description: "Credits earned for rating an asset",
      assetId: insertRating.assetId,
    });

    return rating;
  }

  async getAssetRatings(assetId: number): Promise<AssetRating[]> {
    return Array.from(this.assetRatings.values()).filter(r => r.assetId === assetId);
  }

  private updateAssetRating(assetId: number): void {
    const ratings = Array.from(this.assetRatings.values()).filter(r => r.assetId === assetId);
    const asset = this.assets.get(assetId);
    
    if (asset && ratings.length > 0) {
      const totalRating = ratings.reduce((sum, r) => sum + parseFloat(r.overallRating), 0);
      const averageRating = totalRating / ratings.length;
      
      asset.rating = averageRating.toFixed(1);
      asset.ratingCount = ratings.length;
      this.assets.set(assetId, asset);
    }
  }

  // Credit methods
  async getCreditBalance(userId: number): Promise<number> {
    const user = this.users.get(userId);
    return user ? parseFloat(user.credits || "0") : 0;
  }

  async addCredits(insertTransaction: InsertCreditTransaction): Promise<CreditTransaction> {
    const transaction: CreditTransaction = {
      id: this.currentTransactionId++,
      userId: insertTransaction.userId,
      amount: insertTransaction.amount,
      type: insertTransaction.type,
      source: insertTransaction.source,
      description: insertTransaction.description,
      assetId: insertTransaction.assetId || null,
      createdAt: new Date(),
    };
    this.creditTransactions.set(transaction.id, transaction);

    // Update user balance
    const user = this.users.get(insertTransaction.userId);
    if (user) {
      const currentBalance = parseFloat(user.credits || "0");
      const transactionAmount = parseFloat(insertTransaction.amount);
      user.credits = (currentBalance + transactionAmount).toFixed(2);
      this.users.set(insertTransaction.userId, user);
    }

    return transaction;
  }

  async spendCredits(userId: number, amount: number, description: string, assetId?: number): Promise<CreditTransaction> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");

    const currentBalance = parseFloat(user.credits || "0");
    if (currentBalance < amount) throw new Error("Insufficient credits");

    const transaction: CreditTransaction = {
      id: this.currentTransactionId++,
      userId,
      amount: (-amount).toFixed(2),
      type: "spent",
      source: "purchase",
      description,
      assetId: assetId || null,
      createdAt: new Date(),
    };
    this.creditTransactions.set(transaction.id, transaction);

    // Update user balance
    user.credits = (currentBalance - amount).toFixed(2);
    this.users.set(userId, user);

    return transaction;
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: this.currentContactId++,
      name: insertContact.name,
      email: insertContact.email,
      phone: insertContact.phone || null,
      subject: insertContact.subject,
      message: insertContact.message,
      assetId: insertContact.assetId || null,
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

export const storage = new EnhancedMemStorage();