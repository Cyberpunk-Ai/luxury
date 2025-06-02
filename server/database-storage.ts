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
import { db } from "./db";
import { eq, and, desc, asc, ilike, gte, lte, sql } from "drizzle-orm";
import type { IStorage } from "./enhanced-storage";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        credits: insertUser.credits || "100.00",
        membershipTier: insertUser.membershipTier || "bronze",
        verified: insertUser.verified || false,
        isVip: insertUser.isVip || false,
        totalSpent: insertUser.totalSpent || "0.00",
      })
      .returning();
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(asc(categories.name));
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }

  async getAssets(filters?: SearchFilters): Promise<AssetWithCategory[]> {
    let query = db
      .select({
        asset: assets,
        category: categories,
      })
      .from(assets)
      .leftJoin(categories, eq(assets.categoryId, categories.id))
      .where(eq(assets.status, "active"));

    if (filters) {
      if (filters.category) {
        const category = await this.getCategoryBySlug(filters.category);
        if (category) {
          query = query.where(and(eq(assets.status, "active"), eq(assets.categoryId, category.id)));
        }
      }

      if (filters.priceMin !== undefined) {
        query = query.where(and(eq(assets.status, "active"), gte(sql`CAST(${assets.price} AS DECIMAL)`, filters.priceMin)));
      }

      if (filters.priceMax !== undefined) {
        query = query.where(and(eq(assets.status, "active"), lte(sql`CAST(${assets.price} AS DECIMAL)`, filters.priceMax)));
      }

      if (filters.brand) {
        query = query.where(and(eq(assets.status, "active"), ilike(assets.brand, `%${filters.brand}%`)));
      }

      if (filters.condition) {
        query = query.where(and(eq(assets.status, "active"), eq(assets.condition, filters.condition)));
      }

      if (filters.location) {
        query = query.where(and(eq(assets.status, "active"), ilike(assets.location, `%${filters.location}%`)));
      }

      if (filters.query) {
        query = query.where(
          and(
            eq(assets.status, "active"),
            sql`(
              ${assets.title} ILIKE ${`%${filters.query}%`} OR
              ${assets.description} ILIKE ${`%${filters.query}%`} OR
              ${assets.brand} ILIKE ${`%${filters.query}%`}
            )`
          )
        );
      }
    }

    const results = await query.orderBy(desc(assets.featured), desc(assets.rankingScore));
    
    return results.map(row => ({
      ...row.asset,
      category: row.category || undefined,
    }));
  }

  async getAsset(id: number): Promise<AssetWithCategory | undefined> {
    const result = await db
      .select({
        asset: assets,
        category: categories,
      })
      .from(assets)
      .leftJoin(categories, eq(assets.categoryId, categories.id))
      .where(eq(assets.id, id));

    if (result.length === 0) return undefined;

    const row = result[0];
    return {
      ...row.asset,
      category: row.category || undefined,
    };
  }

  async getFeaturedAssets(): Promise<AssetWithCategory[]> {
    const results = await db
      .select({
        asset: assets,
        category: categories,
      })
      .from(assets)
      .leftJoin(categories, eq(assets.categoryId, categories.id))
      .where(and(eq(assets.featured, true), eq(assets.status, "active")))
      .orderBy(desc(assets.rankingScore))
      .limit(12);

    return results.map(row => ({
      ...row.asset,
      category: row.category || undefined,
    }));
  }

  async getAssetsByCategory(categoryId: number): Promise<AssetWithCategory[]> {
    const results = await db
      .select({
        asset: assets,
        category: categories,
      })
      .from(assets)
      .leftJoin(categories, eq(assets.categoryId, categories.id))
      .where(and(eq(assets.categoryId, categoryId), eq(assets.status, "active")))
      .orderBy(desc(assets.rankingScore));

    return results.map(row => ({
      ...row.asset,
      category: row.category || undefined,
    }));
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const [asset] = await db
      .insert(assets)
      .values({
        ...insertAsset,
        currency: insertAsset.currency || "USD",
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
        status: insertAsset.status || "active",
      })
      .returning();
    return asset;
  }

  async updateAsset(id: number, updates: Partial<Asset>): Promise<Asset | undefined> {
    const [asset] = await db
      .update(assets)
      .set(updates)
      .where(eq(assets.id, id))
      .returning();
    return asset || undefined;
  }

  async incrementAssetViews(id: number): Promise<void> {
    await db
      .update(assets)
      .set({ views: sql`${assets.views} + 1` })
      .where(eq(assets.id, id));
  }

  async getTopRankedAssets(limit: number = 10): Promise<AssetWithCategory[]> {
    const results = await db
      .select({
        asset: assets,
        category: categories,
      })
      .from(assets)
      .leftJoin(categories, eq(assets.categoryId, categories.id))
      .where(eq(assets.status, "active"))
      .orderBy(desc(assets.rankingScore))
      .limit(limit);

    return results.map(row => ({
      ...row.asset,
      category: row.category || undefined,
    }));
  }

  async getWishlist(userId: number): Promise<AssetWithCategory[]> {
    const results = await db
      .select({
        asset: assets,
        category: categories,
      })
      .from(wishlists)
      .innerJoin(assets, eq(wishlists.assetId, assets.id))
      .leftJoin(categories, eq(assets.categoryId, categories.id))
      .where(eq(wishlists.userId, userId));

    return results.map(row => ({
      ...row.asset,
      category: row.category || undefined,
    }));
  }

  async addToWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    const [wishlist] = await db
      .insert(wishlists)
      .values(insertWishlist)
      .returning();
    return wishlist;
  }

  async removeFromWishlist(userId: number, assetId: number): Promise<boolean> {
    const result = await db
      .delete(wishlists)
      .where(and(eq(wishlists.userId, userId), eq(wishlists.assetId, assetId)));
    return result.rowCount > 0;
  }

  async isInWishlist(userId: number, assetId: number): Promise<boolean> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(wishlists)
      .where(and(eq(wishlists.userId, userId), eq(wishlists.assetId, assetId)));
    return result.count > 0;
  }

  async likeAsset(userId: number, assetId: number): Promise<AssetLike> {
    const [like] = await db
      .insert(assetLikes)
      .values({ userId, assetId })
      .returning();

    // Update asset likes count
    await db
      .update(assets)
      .set({ likes: sql`${assets.likes} + 1` })
      .where(eq(assets.id, assetId));

    return like;
  }

  async unlikeAsset(userId: number, assetId: number): Promise<boolean> {
    const result = await db
      .delete(assetLikes)
      .where(and(eq(assetLikes.userId, userId), eq(assetLikes.assetId, assetId)));

    if (result.rowCount > 0) {
      // Update asset likes count
      await db
        .update(assets)
        .set({ likes: sql`GREATEST(${assets.likes} - 1, 0)` })
        .where(eq(assets.id, assetId));
      return true;
    }
    return false;
  }

  async isAssetLiked(userId: number, assetId: number): Promise<boolean> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(assetLikes)
      .where(and(eq(assetLikes.userId, userId), eq(assetLikes.assetId, assetId)));
    return result.count > 0;
  }

  async rateAsset(insertRating: InsertAssetRating): Promise<AssetRating> {
    const [rating] = await db
      .insert(assetRatings)
      .values(insertRating)
      .returning();

    // Update asset rating
    await this.updateAssetRating(insertRating.assetId);

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
    return await db
      .select()
      .from(assetRatings)
      .where(eq(assetRatings.assetId, assetId))
      .orderBy(desc(assetRatings.createdAt));
  }

  private async updateAssetRating(assetId: number): Promise<void> {
    const ratings = await db
      .select()
      .from(assetRatings)
      .where(eq(assetRatings.assetId, assetId));

    if (ratings.length > 0) {
      const totalRating = ratings.reduce((sum, r) => sum + parseFloat(r.overallRating), 0);
      const averageRating = totalRating / ratings.length;

      await db
        .update(assets)
        .set({
          rating: averageRating.toFixed(1),
          ratingCount: ratings.length,
        })
        .where(eq(assets.id, assetId));
    }
  }

  async getCreditBalance(userId: number): Promise<number> {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ? parseFloat(user.credits || "0") : 0;
  }

  async addCredits(insertTransaction: InsertCreditTransaction): Promise<CreditTransaction> {
    const [transaction] = await db
      .insert(creditTransactions)
      .values(insertTransaction)
      .returning();

    // Update user balance
    await db
      .update(users)
      .set({ credits: sql`CAST(${users.credits} AS DECIMAL) + ${parseFloat(insertTransaction.amount)}` })
      .where(eq(users.id, insertTransaction.userId));

    return transaction;
  }

  async spendCredits(userId: number, amount: number, description: string, assetId?: number): Promise<CreditTransaction> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");

    const currentBalance = parseFloat(user.credits || "0");
    if (currentBalance < amount) throw new Error("Insufficient credits");

    const [transaction] = await db
      .insert(creditTransactions)
      .values({
        userId,
        amount: (-amount).toFixed(2),
        type: "spent",
        source: "purchase",
        description,
        assetId: assetId || null,
      })
      .returning();

    // Update user balance
    await db
      .update(users)
      .set({ credits: sql`CAST(${users.credits} AS DECIMAL) - ${amount}` })
      .where(eq(users.id, userId));

    return transaction;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values({
        ...insertContact,
        status: "new",
      })
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));
  }
}