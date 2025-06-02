import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, Star, Shield, MapPin, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssetWithCategory } from "@shared/schema";

interface AssetCardProps {
  asset: AssetWithCategory;
  className?: string;
  showRemoveFromWishlist?: boolean;
}

export default function AssetCard({ 
  asset, 
  className, 
  showRemoveFromWishlist = false 
}: AssetCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/wishlist", { assetId: asset.id });
    },
    onSuccess: () => {
      setIsWishlisted(true);
      toast({
        title: "Added to Wishlist",
        description: "This asset has been added to your wishlist.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add to wishlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", `/api/wishlist/${asset.id}`);
    },
    onSuccess: () => {
      setIsWishlisted(false);
      toast({
        title: "Removed from Wishlist",
        description: "This asset has been removed from your wishlist.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove from wishlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (showRemoveFromWishlist || isWishlisted) {
      removeFromWishlistMutation.mutate();
    } else {
      addToWishlistMutation.mutate();
    }
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    return (
      <div className="flex text-luxury-gold text-sm">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(numRating) ? "fill-current" : ""
            }`}
          />
        ))}
      </div>
    );
  };

  const primaryImage = asset.images?.[0] || "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80";

  return (
    <Card className={cn("bg-white rounded-2xl p-6 luxury-shadow hover-scale luxury-shadow-hover group overflow-hidden border-0", className)}>
      <div className="relative mb-6">
        <a href={`/asset/${asset.id}`} className="block">
          <img
            src={primaryImage}
            alt={asset.title}
            className="w-full h-48 object-cover rounded-xl"
          />
        </a>
        
        {/* Verification Badge */}
        {asset.verified && (
          <Badge className="absolute top-3 left-3 bg-luxury-gold text-white flex items-center shadow-lg">
            <Shield className="w-3 h-3 mr-1" />
            VERIFIED
          </Badge>
        )}

        {/* Featured Badge */}
        {asset.featured && (
          <Badge className="absolute top-3 right-12 bg-luxury-indigo text-white">
            FEATURED
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlistToggle}
          disabled={addToWishlistMutation.isPending || removeFromWishlistMutation.isPending}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 p-2 rounded-lg"
        >
          {showRemoveFromWishlist ? (
            <Trash2 className="w-4 h-4 text-red-500" />
          ) : (
            <Heart 
              className={cn(
                "w-4 h-4 transition-colors",
                isWishlisted ? "text-red-500 fill-current" : "text-gray-600 group-hover:text-red-500"
              )} 
            />
          )}
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <a href={`/asset/${asset.id}`} className="block hover:text-luxury-indigo transition-colors">
            <h3 className="font-playfair text-xl font-bold text-luxury-navy mb-1 line-clamp-1">
              {asset.title}
            </h3>
          </a>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {asset.brand && <span>{asset.brand}</span>}
            {asset.brand && asset.model && <span>•</span>}
            {asset.model && <span>{asset.model}</span>}
            {asset.year && (
              <>
                <span>•</span>
                <span>{asset.year}</span>
              </>
            )}
          </div>
        </div>
        
        {/* Rating and Location */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            {renderStars(asset.rating || "0")}
            <span className="text-gray-500 ml-1">
              ({asset.rating || "0"})
            </span>
          </div>
          
          {asset.location && (
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">{asset.location}</span>
            </div>
          )}
        </div>

        {/* Status and Condition */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {asset.condition && (
              <Badge variant="outline" className="text-xs capitalize">
                {asset.condition}
              </Badge>
            )}
            {asset.category && (
              <Badge variant="secondary" className="text-xs">
                {asset.category.name}
              </Badge>
            )}
          </div>
          
          <span className="text-green-600 font-semibold text-xs">
            {asset.verified ? "Authenticated" : "Pending"}
          </span>
        </div>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-bold text-luxury-navy">
              ${parseFloat(asset.price).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">{asset.currency || "USD"}</p>
          </div>
          
          <Button 
            asChild
            size="sm"
            className="luxury-gradient text-white hover:shadow-lg transition-all duration-300 font-semibold"
          >
            <a href={`/asset/${asset.id}`}>
              View Details
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
