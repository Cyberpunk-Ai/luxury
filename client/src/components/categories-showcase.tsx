import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const categoryImages = {
  watches: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  cars: "https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  jewelry: "https://images.pexels.com/photos/1927258/pexels-photo-1927258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "real-estate": "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  fashion: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  art: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  jets: "https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  yachts: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  wines: "https://images.pexels.com/photos/1565802/pexels-photo-1565802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  handbags: "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  spirits: "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  books: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

const mockCounts = {
  watches: "247+",
  cars: "189+", 
  jewelry: "312+",
  "real-estate": "94+",
  fashion: "428+",
  art: "156+",
};

export default function CategoriesShowcase() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-[500px] mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-luxury-navy mb-4">
            Curated Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our meticulously selected collections, each representing the pinnacle of luxury and craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category) => {
            const imageKey = category.slug as keyof typeof categoryImages;
            const image = categoryImages[imageKey] || categoryImages.art;
            const count = mockCounts[imageKey] || "50+";
            
            return (
              <a
                key={category.id}
                href={`/category/${category.slug}`}
                className="group cursor-pointer block"
              >
                <Card className="relative overflow-hidden luxury-shadow-hover border-0">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="font-playfair text-2xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/90 mb-3">
                        {category.description}
                      </p>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                        {count} Collections
                      </Badge>
                    </div>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
