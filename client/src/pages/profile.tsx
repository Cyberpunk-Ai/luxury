
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AssetCard from "@/components/asset-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Crown, 
  TrendingUp, 
  Heart, 
  Package,
  Edit,
  Plus,
  Eye,
  ThumbsUp
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("listings");

  // Mock user data - in a real app this would come from authentication
  const user = {
    id: 1,
    username: "luxury_collector",
    email: "collector@otulia.com",
    firstName: "Alexandre",
    lastName: "Dubois",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150",
    bio: "Passionate collector of luxury timepieces and fine art",
    location: "Monaco",
    membershipTier: "platinum",
    verified: true,
    isVip: true,
    totalSpent: "125000.00",
    joinDate: "January 2022"
  };

  const { data: userListings, isLoading: loadingListings } = useQuery({
    queryKey: ["/api/assets", { sellerId: user.id }],
  });

  const { data: userCredits } = useQuery({
    queryKey: ["/api/user/credits"],
  });

  const { data: wishlistAssets } = useQuery({
    queryKey: ["/api/wishlist"],
  });

  const stats = [
    {
      label: "Active Listings",
      value: userListings?.length || 0,
      icon: Package,
      color: "from-blue-500 to-blue-600"
    },
    {
      label: "Total Views",
      value: userListings?.reduce((sum, asset) => sum + (asset.views || 0), 0) || 0,
      icon: Eye,
      color: "from-green-500 to-green-600"
    },
    {
      label: "Total Likes",
      value: userListings?.reduce((sum, asset) => sum + (asset.likes || 0), 0) || 0,
      icon: ThumbsUp,
      color: "from-purple-500 to-purple-600"
    },
    {
      label: "Wishlist Items",
      value: wishlistAssets?.length || 0,
      icon: Heart,
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/40">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.firstName} />
                  <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2">
                  {user.verified && (
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                      Verified
                    </Badge>
                  )}
                  {user.isVip && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                  <Badge variant="outline" className="capitalize">
                    {user.membershipTier}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </h1>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-4">@{user.username}</p>
                
                <p className="text-slate-700 dark:text-slate-300 mb-4 max-w-2xl">
                  {user.bio}
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {user.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {user.phone}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Member since {user.joinDate}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white min-w-[200px]">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm opacity-90">Credits</span>
                  </div>
                  <div className="text-3xl font-bold">{userCredits?.balance || 0}</div>
                  <div className="text-sm opacity-75">Available</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                My Listings ({userListings?.length || 0})
              </h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Listing
              </Button>
            </div>

            {loadingListings ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-48 w-full mb-4" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : userListings && userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    No listings yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Start selling your luxury items to the community
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Listing
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="wishlist">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Wishlist ({wishlistAssets?.length || 0})
              </h2>
            </div>

            {wishlistAssets && wishlistAssets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} showWishlist={true} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Browse luxury items and add them to your wishlist
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Recent Activity
              </h2>
            </div>

            <Card>
              <CardContent className="p-12 text-center">
                <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Activity tracking coming soon
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We're working on bringing you detailed activity insights
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
