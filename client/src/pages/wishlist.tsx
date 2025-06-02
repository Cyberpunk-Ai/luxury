import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AssetCard from "@/components/asset-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, ShoppingBag } from "lucide-react";

export default function Wishlist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishlistAssets, isLoading } = useQuery({
    queryKey: ["/api/wishlist"],
  });

  const clearWishlistMutation = useMutation({
    mutationFn: async () => {
      // In a real app, this would clear the entire wishlist
      // For now, we'll simulate it by removing each item
      if (wishlistAssets) {
        await Promise.all(
          wishlistAssets.map((asset) =>
            apiRequest("DELETE", `/api/wishlist/${asset.id}`)
          )
        );
      }
    },
    onSuccess: () => {
      toast({
        title: "Wishlist Cleared",
        description: "All items have been removed from your wishlist.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear wishlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Skeleton className="h-12 w-64 mb-4" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-8 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-luxury-navy mb-4">
                My Wishlist
              </h1>
              <p className="text-xl text-gray-600">
                {wishlistAssets ? `${wishlistAssets.length} saved items` : "Your saved luxury assets"}
              </p>
            </div>
            
            {wishlistAssets && wishlistAssets.length > 0 && (
              <Button
                variant="outline"
                onClick={() => clearWishlistMutation.mutate()}
                disabled={clearWishlistMutation.isPending}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Clear All
              </Button>
            )}
          </div>

          {wishlistAssets && wishlistAssets.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {wishlistAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} showRemoveFromWishlist />
                ))}
              </div>

              {/* Wishlist Summary */}
              <Card className="bg-white luxury-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-playfair text-2xl font-bold text-luxury-navy mb-2">
                        Wishlist Summary
                      </h3>
                      <p className="text-gray-600">
                        Total estimated value of your wishlist items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-luxury-navy">
                        ${wishlistAssets.reduce(
                          (total, asset) => total + parseFloat(asset.price),
                          0
                        ).toLocaleString()}
                      </p>
                      <p className="text-gray-600">{wishlistAssets.length} items</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button className="luxury-gradient text-white hover:shadow-xl transition-all duration-300">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Contact Sellers
                    </Button>
                    <Button
                      variant="outline"
                      className="border-luxury-indigo text-luxury-indigo hover:bg-luxury-indigo hover:text-white"
                    >
                      Share Wishlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-luxury-navy mb-4">
                Your Wishlist is Empty
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start building your dream collection by adding luxury assets to your wishlist. 
                Browse our curated categories to discover exceptional pieces.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="luxury-gradient text-white">
                  <a href="/">Explore Collections</a>
                </Button>
                <Button asChild variant="outline" className="border-luxury-indigo text-luxury-indigo hover:bg-luxury-indigo hover:text-white">
                  <a href="/search">Search Assets</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
