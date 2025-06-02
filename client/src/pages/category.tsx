import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AssetCard from "@/components/asset-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: [`/api/categories/${slug}`],
  });

  const { data: assets, isLoading: assetsLoading } = useQuery({
    queryKey: ["/api/assets", { category: slug }],
  });

  if (categoryLoading || assetsLoading) {
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
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-playfair text-4xl font-bold text-luxury-navy mb-4">
              Category Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The category you're looking for doesn't exist.
            </p>
            <Button asChild>
              <a href="/">Return Home</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Category Header */}
      <section className="pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-luxury-navy mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {category.description}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48">
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
          </div>
        </div>
      </section>

      {/* Assets Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {assets && assets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="font-playfair text-2xl font-bold text-luxury-navy mb-4">
                No Assets Found
              </h3>
              <p className="text-gray-600 mb-8">
                There are currently no assets in this category. Check back soon for new additions.
              </p>
              <Button asChild>
                <a href="/">Explore Other Categories</a>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
