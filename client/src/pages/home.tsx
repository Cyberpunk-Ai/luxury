import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CategoriesShowcase from "@/components/categories-showcase";
import FeaturedListings from "@/components/featured-listings";
import LuxuryServices from "@/components/luxury-services";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <HeroSection />
      <CategoriesShowcase />
      <FeaturedListings />
      <LuxuryServices />
      <Newsletter />
      <Footer />
    </div>
  );
}
