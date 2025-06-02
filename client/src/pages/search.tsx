import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AssetCard from "@/components/asset-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search as SearchIcon, Filter } from "lucide-react";

export default function Search() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [condition, setCondition] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    const query = params.get("q") || "";
    setSearchQuery(query);
  }, [location]);

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const buildSearchParams = () => {
    const params: Record<string, string> = {};
    if (searchQuery) params.query = searchQuery;
    if (category !== "all") params.category = category;
    if (condition !== "all") params.condition = condition;
    
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-");
      if (min) params.priceMin = min;
      if (max && max !== "+") params.priceMax = max;
    }

    return params;
  };

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["/api/search", buildSearchParams()],
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    setLocation(`/search?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <section className="pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-luxury-navy mb-4">
              Search Luxury Assets
            </h1>
            <p className="text-xl text-gray-600">
              Discover exceptional luxury items from our curated marketplace
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for luxury watches, cars, jewelry, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 pr-24 py-4 text-lg border-2 border-gray-200 focus:border-luxury-indigo rounded-xl"
              />
              <Button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 luxury-gradient text-white px-6"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-luxury-indigo" />
                <h3 className="font-semibold text-luxury-navy">Filters</h3>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
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
                  <SelectTrigger>
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

                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-64 mb-8" />
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
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-playfair text-2xl font-bold text-luxury-navy">
                  {searchResults ? `${searchResults.length} Results` : "Search Results"}
                  {searchQuery && (
                    <span className="text-gray-600 font-normal ml-2">
                      for "{searchQuery}"
                    </span>
                  )}
                </h2>
              </div>

              {searchResults && searchResults.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map((asset) => (
                    <AssetCard key={asset.id} asset={asset} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <SearchIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-luxury-navy mb-4">
                    No Results Found
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn't find any assets matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setCategory("all");
                      setPriceRange("all");
                      setCondition("all");
                      setLocation("/search");
                    }}
                    variant="outline"
                    className="border-luxury-indigo text-luxury-indigo hover:bg-luxury-indigo hover:text-white"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
