import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Menu, ChevronDown, TrendingUp, Award } from "lucide-react";

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: wishlistAssets } = useQuery({
    queryKey: ["/api/wishlist"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 luxury-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="font-playfair text-2xl font-bold text-luxury-navy">Otulia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isActive("/") ? "text-luxury-navy" : "text-gray-700 hover:text-luxury-navy"
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-luxury-navy transition-colors font-medium">
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2">
                {categories?.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link
                      href={`/category/${category.slug}`}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <i className={`${category.icon} mr-3 text-luxury-indigo`}></i>
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/ranking"
              className={`font-medium transition-colors flex items-center space-x-1 ${
                isActive("/ranking") ? "text-luxury-navy" : "text-gray-700 hover:text-luxury-navy"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Rankings</span>
            </Link>

            <Link
              href="/credits"
              className={`font-medium transition-colors flex items-center space-x-1 ${
                isActive("/credits") ? "text-luxury-navy" : "text-gray-700 hover:text-luxury-navy"
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Credits</span>
            </Link>

            <Link
              href="/search"
              className={`font-medium transition-colors ${
                isActive("/search") ? "text-luxury-navy" : "text-gray-700 hover:text-luxury-navy"
              }`}
            >
              Search
            </Link>

            <Link
              href="/contact"
              className={`font-medium transition-colors ${
                isActive("/contact") ? "text-luxury-navy" : "text-gray-700 hover:text-luxury-navy"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-luxury-navy transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative text-gray-700 hover:text-luxury-navy transition-colors"
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistAssets && wishlistAssets.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-luxury-gold text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {wishlistAssets.length}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Sign In Button */}
            <Button className="hidden sm:inline-flex luxury-gradient text-white hover:shadow-lg transition-all duration-300">
              Sign In
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  <Link href="/" className="text-lg font-medium text-luxury-navy">
                    Home
                  </Link>
                  
                  <div>
                    <h3 className="text-lg font-medium text-luxury-navy mb-3">Categories</h3>
                    <div className="space-y-2 ml-4">
                      {categories?.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="block text-gray-700 hover:text-luxury-navy transition-colors"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link href="/ranking" className="text-lg font-medium text-luxury-navy flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Rankings</span>
                  </Link>

                  <Link href="/credits" className="text-lg font-medium text-luxury-navy flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Credits</span>
                  </Link>

                  <Link href="/search" className="text-lg font-medium text-luxury-navy">
                    Search
                  </Link>

                  <Link href="/contact" className="text-lg font-medium text-luxury-navy">
                    Contact
                  </Link>

                  <Button className="luxury-gradient text-white">
                    Sign In
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4">
            <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search luxury assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 border-gray-200 focus:border-luxury-indigo"
                autoFocus
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 luxury-gradient text-white"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
