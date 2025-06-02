import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Heart, Eye, TrendingUp, Award, Star, Crown, Gem, Zap } from "lucide-react";
import { type AssetWithCategory } from "@shared/schema";

export default function AssetRanking() {
  const [activeTab, setActiveTab] = useState("overall");

  const { data: topRankedAssets, isLoading } = useQuery<AssetWithCategory[]>({
    queryKey: ["/api/assets/top-ranked"],
  });

  const { data: userCredits } = useQuery<{ balance: number }>({
    queryKey: ["/api/user/credits"],
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/40">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-white/60 dark:bg-slate-800/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/40">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-2">
                Asset Rankings
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Discover the most prestigious luxury assets ranked by our comprehensive scoring system
              </p>
            </div>
            
            {/* Credit Balance Card */}
            <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 border-0 text-white min-w-[200px]">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm">Your Credits</p>
                    <p className="text-2xl font-bold">{userCredits?.balance || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ranking Categories */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="luxury">Luxury Index</TabsTrigger>
              <TabsTrigger value="investment">Investment</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Asset Rankings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {topRankedAssets?.map((asset, index) => (
            <Card 
              key={asset.id} 
              className={`relative overflow-hidden border-2 bg-gradient-to-br ${getRarityColor(asset.rarity || "common")} backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group`}
            >
              {/* Ranking Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge 
                  variant="secondary" 
                  className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border-0 shadow-lg"
                >
                  #{index + 1}
                </Badge>
              </div>

              {/* Rarity Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border-0 shadow-lg">
                  {getRarityIcon(asset.rarity || "common")}
                  <span className="ml-1 capitalize">{asset.rarity}</span>
                </Badge>
              </div>

              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={asset.images?.[0] || "/placeholder-luxury.jpg"}
                    alt={asset.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Price overlay */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-2xl font-bold">
                      {formatPrice(asset.price, asset.currency)}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                    {asset.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {asset.brand} • {asset.category?.name}
                  </p>
                </div>

                {/* Ranking Metrics */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Ranking Score</span>
                      <span className="font-semibold">{asset.rankingScore}/100</span>
                    </div>
                    <Progress value={parseFloat(asset.rankingScore || "0")} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Luxury Index</span>
                      <span className="font-semibold">{asset.luxuryIndex}/10</span>
                    </div>
                    <Progress value={parseFloat(asset.luxuryIndex || "0") * 10} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Investment Potential</span>
                      <span className="font-semibold">{asset.investmentPotential}/10</span>
                    </div>
                    <Progress value={parseFloat(asset.investmentPotential || "0") * 10} className="h-2" />
                  </div>
                </div>

                {/* Asset Stats */}
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{asset.views || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{asset.likes || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{asset.rating || "0.0"}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Asset Tags */}
                {asset.tags && asset.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {asset.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ranking Methodology */}
        <Card className="mt-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-indigo-600" />
              <span>Ranking Methodology</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Gem className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Luxury Index</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Based on brand prestige, craftsmanship, materials, and exclusivity
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Investment Potential</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Historical performance, market trends, and future value projection
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Rarity Score</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Production numbers, availability, and collector demand
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}