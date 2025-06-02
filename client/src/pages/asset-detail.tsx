import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, Star, MapPin, Calendar, Shield, Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function AssetDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: asset, isLoading } = useQuery({
    queryKey: [`/api/assets/${id}`],
  });

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/wishlist", { assetId: parseInt(id!) });
    },
    onSuccess: () => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <Skeleton className="w-full h-96 rounded-2xl mb-4" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-6" />
                <Skeleton className="h-12 w-32 mb-8" />
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-playfair text-4xl font-bold text-luxury-navy mb-4">
              Asset Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The asset you're looking for doesn't exist or has been removed.
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

  const specifications = asset.specifications ? JSON.parse(asset.specifications) : {};
  const currentImage = asset.images?.[currentImageIndex] || asset.images?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-luxury-indigo">Home</a>
            <span>/</span>
            <a href={`/category/${asset.category?.slug}`} className="hover:text-luxury-indigo">
              {asset.category?.name}
            </a>
            <span>/</span>
            <span className="text-luxury-navy font-medium">{asset.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="relative mb-4">
                <img
                  src={currentImage}
                  alt={asset.title}
                  className="w-full h-96 object-cover rounded-2xl luxury-shadow"
                />
                {asset.verified && (
                  <Badge className="absolute top-4 left-4 bg-luxury-gold text-white">
                    <Shield className="w-3 h-3 mr-1" />
                    VERIFIED
                  </Badge>
                )}
              </div>
              
              {asset.images && asset.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {asset.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? "border-luxury-indigo"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${asset.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Asset Details */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-luxury-navy mb-2">
                    {asset.title}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {asset.brand} {asset.model && `• ${asset.model}`}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => wishlistMutation.mutate()}
                  disabled={wishlistMutation.isPending}
                  className="text-luxury-indigo border-luxury-indigo hover:bg-luxury-indigo hover:text-white"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Rating and Location */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex text-luxury-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(parseFloat(asset.rating || "0"))
                            ? "fill-current"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({asset.rating}) • {asset.ratingCount} reviews
                  </span>
                </div>
                {asset.location && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{asset.location}</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-3xl lg:text-4xl font-bold text-luxury-navy">
                  ${parseFloat(asset.price).toLocaleString()}
                  <span className="text-lg text-gray-600 ml-2">{asset.currency}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <Button
                  size="lg"
                  className="flex-1 luxury-gradient text-white hover:shadow-xl transition-all duration-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-luxury-indigo text-luxury-indigo hover:bg-luxury-indigo hover:text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>

              {/* Asset Information */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-luxury-navy mb-4">
                    Asset Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {asset.condition && (
                      <div>
                        <span className="text-gray-600">Condition:</span>
                        <p className="font-medium capitalize">{asset.condition}</p>
                      </div>
                    )}
                    {asset.year && (
                      <div>
                        <span className="text-gray-600">Year:</span>
                        <p className="font-medium">{asset.year}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <p className="font-medium">{asset.category?.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <p className="font-medium capitalize text-green-600">{asset.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              {Object.keys(specifications).length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-playfair text-xl font-bold text-luxury-navy mb-4">
                      Specifications
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(specifications).map(([key, value], index) => (
                        <div key={key}>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="font-medium">{value as string}</span>
                          </div>
                          {index < Object.entries(specifications).length - 1 && (
                            <Separator className="mt-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-16">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-luxury-navy mb-6">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {asset.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
