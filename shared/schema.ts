import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
});

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),
  categoryId: integer("category_id").references(() => categories.id),
  brand: text("brand"),
  model: text("model"),
  condition: text("condition"), // new, excellent, good, fair
  year: integer("year"),
  location: text("location"),
  images: text("images").array(),
  verified: boolean("verified").default(false),
  featured: boolean("featured").default(false),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  ratingCount: integer("rating_count").default(0),
  specifications: text("specifications"), // JSON string
  sellerId: integer("seller_id").references(() => users.id),
  status: text("status").default("active"), // active, sold, pending
  createdAt: timestamp("created_at").defaultNow(),
});

export const wishlists = pgTable("wishlists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  assetId: integer("asset_id").references(() => assets.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  assetId: integer("asset_id").references(() => assets.id),
  status: text("status").default("new"), // new, replied, closed
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertAssetSchema = createInsertSchema(assets).omit({
  id: true,
  createdAt: true,
});

export const insertWishlistSchema = createInsertSchema(wishlists).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  status: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Asset = typeof assets.$inferSelect;
export type InsertAsset = z.infer<typeof insertAssetSchema>;

export type Wishlist = typeof wishlists.$inferSelect;
export type InsertWishlist = z.infer<typeof insertWishlistSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

// Extended types for API responses
export type AssetWithCategory = Asset & {
  category?: Category;
  seller?: Partial<User>;
  isWishlisted?: boolean;
};

export type SearchFilters = {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  brand?: string;
  condition?: string;
  location?: string;
  query?: string;
};
