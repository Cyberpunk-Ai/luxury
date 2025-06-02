import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Crown } from "lucide-react";
import AssetCard from "./asset-card";

export default function HeroSection() {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);

  const { data: featuredAssets } = useQuery({
    queryKey: ["/api/assets/featured"],
  });

  useEffect(() => {
    if (featuredAssets && featuredAssets.length > 1) {
      const interval = setInterval(() => {
        setCurrentAssetIndex((prev) => (prev + 1) % featuredAssets.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredAssets]);

  const currentAsset = featuredAssets?.[currentAssetIndex];

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="fade-in">
            <h1 className="font-playfair text-5xl lg:text-7xl font-bold text-luxury-navy leading-tight mb-6">
              Exceptional
              <span className="luxury-text-gradient block">
                Luxury
              </span>
              Assets
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover the world's most exclusive collection of luxury assets. From rare timepieces 
              to exceptional real estate, each piece is curated with the elegance it deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg"
                className="luxury-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold"
              >
                <a href="/search">Explore Collection</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-luxury-navy text-luxury-navy hover:bg-luxury-navy hover:text-white transition-all duration-300 font-semibold"
              >
                <a href="/contact">Learn More</a>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {currentAsset ? (
              <div className="relative">
                <AssetCard 
                  asset={currentAsset} 
                  className="hover-scale luxury-shadow-hover transform transition-all duration-500"
                />
                
                {/* Asset Navigation Dots */}
                {featuredAssets && featuredAssets.length > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {featuredAssets.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAssetIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentAssetIndex
                            ? "bg-luxury-indigo scale-125"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Fallback hero card when no featured assets
              <div className="relative bg-white rounded-3xl p-8 luxury-shadow hover-scale luxury-shadow-hover">
                <Badge className="absolute -top-3 -right-3 bg-luxury-gold text-white flex items-center shadow-lg">
                  <Crown className="w-3 h-3 mr-1" />
                  FEATURED
                </Badge>
                
                <img 
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" 
                  alt="Luxury timepiece showcase" 
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-luxury-navy mb-2">
                      Curated Excellence
                    </h3>
                    <p className="text-gray-600">Discover luxury redefined</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mt-1">
                      <div className="flex text-luxury-gold mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">(5.0)</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  asChild
                  className="w-full luxury-gradient text-white hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  <a href="/search">Explore Collection</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
