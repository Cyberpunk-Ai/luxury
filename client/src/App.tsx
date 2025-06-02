import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SpeedDial } from "@/components/ui/floating-action-button"
import { Heart, Search, Filter, Share2 } from "lucide-react"

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/asset/:id" component={AssetDetail} />
      <Route path="/search" component={Search} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/contact" component={Contact} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/credits" component={Credits} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const navigate = useWouter()[1];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Navigation />
        <Router />
        <Footer />
        <Toaster />

        <SpeedDial
          actions={[
            {
              icon: <Search className="h-4 w-4" />,
              label: "Quick Search",
              onClick: () => navigate('/search'),
              variant: "primary"
            },
            {
              icon: <Heart className="h-4 w-4" />,
              label: "Wishlist",
              onClick: () => navigate('/wishlist'),
              variant: "secondary"
            },
            {
              icon: <Filter className="h-4 w-4" />,
              label: "Filter",
              onClick: () => console.log('Filter clicked'),
              variant: "accent"
            },
            {
              icon: <Share2 className="h-4 w-4" />,
              label: "Share",
              onClick: () => console.log('Share clicked'),
              variant: "secondary"
            }
          ]}
          direction="up"
          mainButtonVariant="primary"
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;