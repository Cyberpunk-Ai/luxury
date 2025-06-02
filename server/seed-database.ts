import { db } from "./db";
import { users, categories, assets } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingCategories = await db.select().from(categories).limit(1);
    if (existingCategories.length > 0) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding database...");

    // Seed categories
    const categoryData = [
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

    const insertedCategories = await db.insert(categories).values(categoryData).returning();
    console.log(`Seeded ${insertedCategories.length} categories`);

    // Create demo user
    const [demoUser] = await db.insert(users).values({
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
    }).returning();

    // Extensive luxury asset collection
    const premiumAssets = [
      // Luxury Watches
      {
        title: "Patek Philippe Nautilus 5711/1A",
        description: "The holy grail of luxury sports watches. This iconic Patek Philippe Nautilus features the distinctive blue dial and integrated steel bracelet that has made it one of the most coveted timepieces in the world.",
        price: "125000.00",
        currency: "USD",
        categoryId: insertedCategories.find(c => c.slug === "watches")!.id,
        brand: "Patek Philippe",
        model: "5711/1A-010",
        condition: "excellent",
        year: 2021,
        location: "Geneva, Switzerland",
        images: ["https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80"],
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
        sellerId: demoUser.id,
        status: "active"
      },
      {
        title: "Rolex Daytona 116500LN Panda",
        description: "The legendary Rolex Cosmograph Daytona with white dial and black subdials, creating the iconic 'Panda' configuration. Features Rolex's in-house Caliber 4130 movement.",
        price: "35000.00",
        currency: "USD",
        categoryId: insertedCategories.find(c => c.slug === "watches")!.id,
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
        sellerId: demoUser.id,
        status: "active"
      },
      // Luxury Cars
      {
        title: "Ferrari LaFerrari",
        description: "The ultimate Ferrari hypercar featuring hybrid V12 technology. Limited to 499 units worldwide, this represents the pinnacle of Ferrari engineering and exclusivity.",
        price: "4500000.00",
        currency: "USD",
        categoryId: insertedCategories.find(c => c.slug === "cars")!.id,
        brand: "Ferrari",
        model: "LaFerrari",
        condition: "excellent",
        year: 2015,
        location: "Monaco",
        images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80"],
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
        sellerId: demoUser.id,
        status: "active"
      },
      // Add more premium assets with authentic luxury details...
      {
        title: "Cartier Panthère de Cartier Necklace",
        description: "Exquisite high jewelry piece featuring a magnificent panther crafted in white gold, adorned with emeralds, onyx, and brilliant-cut diamonds totaling over 15 carats.",
        price: "850000.00",
        currency: "USD",
        categoryId: insertedCategories.find(c => c.slug === "jewelry")!.id,
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
        sellerId: demoUser.id,
        status: "active"
      }
    ];

    const insertedAssets = await db.insert(assets).values(premiumAssets).returning();
    console.log(`Seeded ${insertedAssets.length} premium assets`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}