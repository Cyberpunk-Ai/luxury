import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertWishlistSchema, 
  insertAssetRatingSchema,
  insertCreditTransactionSchema,
  insertAssetLikeSchema,
  type SearchFilters 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Assets
  app.get("/api/assets", async (req, res) => {
    try {
      const filters: SearchFilters = {
        category: req.query.category as string,
        priceMin: req.query.priceMin ? parseFloat(req.query.priceMin as string) : undefined,
        priceMax: req.query.priceMax ? parseFloat(req.query.priceMax as string) : undefined,
        brand: req.query.brand as string,
        condition: req.query.condition as string,
        location: req.query.location as string,
        query: req.query.query as string,
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof SearchFilters] === undefined) {
          delete filters[key as keyof SearchFilters];
        }
      });

      const assets = await storage.getAssets(Object.keys(filters).length > 0 ? filters : undefined);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });

  app.get("/api/assets/featured", async (req, res) => {
    try {
      const assets = await storage.getFeaturedAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured assets" });
    }
  });

  app.get("/api/assets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }

      const asset = await storage.getAsset(id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }

      res.json(asset);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch asset" });
    }
  });

  app.get("/api/categories/:categoryId/assets", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const assets = await storage.getAssetsByCategory(categoryId);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category assets" });
    }
  });

  // Wishlist (session-based for demo)
  app.get("/api/wishlist", async (req, res) => {
    try {
      // Mock user ID for session-based wishlist
      const userId = 1;
      const wishlist = await storage.getWishlist(userId);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      const validatedData = insertWishlistSchema.parse({
        userId: 1, // Mock user ID
        assetId: req.body.assetId,
      });

      // Check if already in wishlist
      const exists = await storage.isInWishlist(1, req.body.assetId);
      if (exists) {
        return res.status(400).json({ message: "Asset already in wishlist" });
      }

      const wishlist = await storage.addToWishlist(validatedData);
      res.status(201).json(wishlist);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to add to wishlist" });
      }
    }
  });

  app.delete("/api/wishlist/:assetId", async (req, res) => {
    try {
      const assetId = parseInt(req.params.assetId);
      if (isNaN(assetId)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }

      const userId = 1; // Mock user ID
      const removed = await storage.removeFromWishlist(userId, assetId);
      
      if (!removed) {
        return res.status(404).json({ message: "Item not found in wishlist" });
      }

      res.json({ message: "Removed from wishlist" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from wishlist" });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ message: "Contact form submitted successfully", id: contact.id });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Search endpoint
  app.get("/api/search", async (req, res) => {
    try {
      const filters: SearchFilters = {
        query: req.query.q as string,
        category: req.query.category as string,
        priceMin: req.query.priceMin ? parseFloat(req.query.priceMin as string) : undefined,
        priceMax: req.query.priceMax ? parseFloat(req.query.priceMax as string) : undefined,
        brand: req.query.brand as string,
        condition: req.query.condition as string,
        location: req.query.location as string,
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof SearchFilters] === undefined) {
          delete filters[key as keyof SearchFilters];
        }
      });

      const assets = await storage.getAssets(filters);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });

  // Asset Ranking and Analytics
  app.get("/api/assets/top-ranked", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const assets = await storage.getTopRankedAssets(limit);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch top ranked assets" });
    }
  });

  app.post("/api/assets/:id/view", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }

      await storage.incrementAssetViews(id);
      res.json({ message: "View recorded" });
    } catch (error) {
      res.status(500).json({ message: "Failed to record view" });
    }
  });

  // Asset Likes
  app.post("/api/assets/:id/like", async (req, res) => {
    try {
      const assetId = parseInt(req.params.id);
      if (isNaN(assetId)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }

      const userId = 1; // Mock user ID
      const isLiked = await storage.isAssetLiked(userId, assetId);
      
      if (isLiked) {
        await storage.unlikeAsset(userId, assetId);
        res.json({ message: "Asset unliked", liked: false });
      } else {
        await storage.likeAsset(userId, assetId);
        res.json({ message: "Asset liked", liked: true });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to toggle like" });
    }
  });

  app.get("/api/assets/:id/like-status", async (req, res) => {
    try {
      const assetId = parseInt(req.params.id);
      if (isNaN(assetId)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }

      const userId = 1; // Mock user ID
      const isLiked = await storage.isAssetLiked(userId, assetId);
      res.json({ liked: isLiked });
    } catch (error) {
      res.status(500).json({ message: "Failed to check like status" });
    }
  });

  // Asset Ratings
  app.post("/api/assets/:id/rate", async (req, res) => {
    try {
      const assetId = parseInt(req.params.id);
      if (isNaN(assetId)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }

      const validatedData = insertAssetRatingSchema.parse({
        ...req.body,
        assetId,
        userId: 1, // Mock user ID
      });

      const rating = await storage.rateAsset(validatedData);
      res.status(201).json(rating);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to submit rating" });
      }
    }
  });

  app.get("/api/assets/:id/ratings", async (req, res) => {
    try {
      const assetId = parseInt(req.params.id);
      if (isNaN(assetId)) {
        return res.status(400).json({ message: "Invalid asset ID" });
      }

      const ratings = await storage.getAssetRatings(assetId);
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ratings" });
    }
  });

  // Credits System
  app.get("/api/user/credits", async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const balance = await storage.getCreditBalance(userId);
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch credit balance" });
    }
  });

  app.post("/api/user/credits/add", async (req, res) => {
    try {
      const validatedData = insertCreditTransactionSchema.parse({
        ...req.body,
        userId: 1, // Mock user ID
      });

      const transaction = await storage.addCredits(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to add credits" });
      }
    }
  });

  app.post("/api/user/credits/spend", async (req, res) => {
    try {
      const { amount, description, assetId } = req.body;
      const userId = 1; // Mock user ID

      if (!amount || !description) {
        return res.status(400).json({ message: "Amount and description are required" });
      }

      const transaction = await storage.spendCredits(userId, parseFloat(amount), description, assetId);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to spend credits" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
