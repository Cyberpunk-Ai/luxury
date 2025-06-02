import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const categoryImages = {
  watches: "https://images.unsplash.com/photo-1730757679771-b53e798846cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bHV4dXJ5JTIwJTIwcm9sZXglMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
  cars: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1Z2F0dGl8ZW58MHx8MHx8fDA%3D",
  jewelry: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "real-estate": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
  fashion: "https://plus.unsplash.com/premium_photo-1727456097871-67df2d851efe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwY2xvdGhlcyUyMGNvbGxlY3Rpb258ZW58MHx8MHx8fDA%3D",
  art: "https://images.unsplash.com/photo-1608416161627-6031918331ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGZpbmUlMjBhcnR8ZW58MHx8MHx8fDA%3D",
  jets: "https://images.unsplash.com/photo-1738810477184-1f2f4b16bafd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGV4cGVuc2l2ZSUyMHByaXZhdGVqZXR8ZW58MHx8MHx8fDA%3D",
  yachts: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bHV4dXJ5JTIweWF0Y2h8ZW58MHx8MHx8fDA%3D",
  wines: "https://images.unsplash.com/photo-1672140940042-1f2e27cf64df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJhcmUlMjB3aW5lc3xlbnwwfHwwfHx8MA%3D%3D",
  handbags: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
  spirits: "https://plus.unsplash.com/premium_photo-1723563576516-0dd54a5badac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwc3Bpcml0c3xlbnwwfHwwfHx8MA%3D%3D",
  books: "https://plus.unsplash.com/premium_photo-1682125776589-e899882259c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFyZSUyMGJvb2tzfGVufDB8fDB8fHww",
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
