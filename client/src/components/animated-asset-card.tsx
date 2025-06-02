import { useState } from "react";
import { Link } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Eye, 
  Star, 
  TrendingUp, 
  Crown, 
  Gem, 
  Zap,
  MapPin,
  Calendar,
  Sparkles,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type AssetWithCategory } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface AnimatedAssetCardProps {
  asset: AssetWithCategory;
  index?: number;
  showRemoveFromWishlist?: boolean;
  onRemove?: () => void;
}

export default function AnimatedAssetCard({ 
  asset, 
  index = 0, 
  showRemoveFromWishlist = false,
  onRemove 
}: AnimatedAssetCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/assets/${asset.id}/like`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to toggle like");
      return response.json();
    },
    onSuccess: (data) => {
      setIsLiked(data.liked);
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      if (showRemoveFromWishlist) {
        const response = await fetch(`/api/wishlist/${asset.id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to remove from wishlist");
        return response.json();
      } else {
        const response = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assetId: asset.id }),
        });
        if (!response.ok) throw new Error("Failed to add to wishlist");
        return response.json();
      }
    },
    onSuccess: () => {
      if (showRemoveFromWishlist) {
        onRemove?.();
        toast({
          title: "Removed from Wishlist",
          description: "The asset has been removed from your wishlist.",
        });
      } else {
        toast({
          title: "Added to Wishlist",
          description: "The asset has been added to your wishlist.",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
  });

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary": return <Crown className="w-4 h-4 text-yellow-500" />;
      case "ultra-rare": return <Gem className="w-4 h-4 text-purple-500" />;
      case "rare": return <Star className="w-4 h-4 text-blue-500" />;
      default: return <Zap className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";
      case "ultra-rare": return "from-purple-500/20 to-purple-600/20 border-purple-500/30";
      case "rare": return "from-blue-500/20 to-blue-600/20 border-blue-500/30";
      default: return "from-gray-500/20 to-gray-600/20 border-gray-500/30";
    }
  };

  const formatPrice = (price: string, currency: string = "USD") => {
    const amount = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className={`relative overflow-hidden border-2 bg-gradient-to-br ${getRarityColor(asset.rarity || "common")} backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform-gpu`}>
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
          {asset.featured && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                <Award className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </motion.div>
          )}
          {asset.verified && (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                <Sparkles className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Rarity Badge */}
        <motion.div 
          className="absolute top-4 right-4 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border-0 shadow-lg backdrop-blur-sm">
            {getRarityIcon(asset.rarity || "common")}
            <span className="ml-1 capitalize">{asset.rarity}</span>
          </Badge>
        </motion.div>

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
            animate={{ opacity: imageLoaded ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.img
            src={asset.images?.[0] || "/placeholder-luxury.jpg"}
            alt={asset.title}
            className="w-full h-full object-cover"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Animated Price Tag */}
          <motion.div 
            className="absolute bottom-4 left-4 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p 
              className="text-2xl font-bold"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {formatPrice(asset.price, asset.currency)}
            </motion.p>
          </motion.div>

          {/* Action Buttons Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => likeMutation.mutate()}
                    disabled={likeMutation.isPending}
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => wishlistMutation.mutate()}
                    disabled={wishlistMutation.isPending}
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                  >
                    <Link href={`/asset/${asset.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CardContent className="p-6">
          {/* Title and Brand */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {asset.title}
            </h3>
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 text-sm">
              <span className="font-medium">{asset.brand}</span>
              <span>•</span>
              <span>{asset.category?.name}</span>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{asset.views || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{asset.likes || 0}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{asset.rating || "0.0"}</span>
            </div>
          </motion.div>

          {/* Ranking Score */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600 dark:text-slate-400">Ranking Score</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {asset.rankingScore}/100
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${parseFloat(asset.rankingScore || "0")}%` }}
                transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Location and Year */}
          <motion.div 
            className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            {asset.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{asset.location}</span>
              </div>
            )}
            {asset.year && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{asset.year}</span>
              </div>
            )}
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/asset/${asset.id}`}>
                <TrendingUp className="w-4 h-4 mr-2" />
                View Details
              </Link>
            </Button>
          </motion.div>

          {/* Asset Tags */}
          {asset.tags && asset.tags.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-1 mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {asset.tags.slice(0, 3).map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                >
                  <Badge variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}