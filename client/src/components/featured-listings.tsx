import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter } from "lucide-react";
import AssetCard from "./asset-card";

export default function FeaturedListings() {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: featuredAssets, isLoading } = useQuery({
    queryKey: ["/api/assets/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <Skeleton className="h-12 w-80 mb-4" />
              <Skeleton className="h-6 w-96" />
            </div>
            <div className="flex gap-4 mt-6 lg:mt-0">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-24" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
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
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-luxury-navy mb-4">
              Featured Collections
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked exceptional assets from our curated marketplace
            </p>
          </div>
          
          {/* Sophisticated Filtering System */}
          <div className="flex flex-wrap gap-4 mt-6 lg:mt-0">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-48 bg-white border-gray-200 focus:border-luxury-indigo">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48 bg-white border-gray-200 focus:border-luxury-indigo">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-10000">Under $10K</SelectItem>
                <SelectItem value="10000-50000">$10K - $50K</SelectItem>
                <SelectItem value="50000-100000">$50K - $100K</SelectItem>
                <SelectItem value="100000-500000">$100K - $500K</SelectItem>
                <SelectItem value="500000+">$500K+</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="luxury-gradient text-white hover:shadow-lg transition-all duration-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {featuredAssets && featuredAssets.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>

            <div className="text-center">
              <Button 
                asChild
                size="lg"
                className="luxury-gradient text-white hover:shadow-xl transition-all duration-300 font-semibold"
              >
                <a href="/search">View All Collections</a>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="font-playfair text-2xl font-bold text-luxury-navy mb-4">
              No Featured Assets Available
            </h3>
            <p className="text-gray-600 mb-8">
              Our curators are working on selecting the finest luxury assets for you.
            </p>
            <Button asChild className="luxury-gradient text-white">
              <a href="/search">Explore All Assets</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
