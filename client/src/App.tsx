import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Category from "@/pages/category";
import AssetDetail from "@/pages/asset-detail";
import Search from "@/pages/search";
import Wishlist from "@/pages/wishlist";
import Contact from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/asset/:id" component={AssetDetail} />
      <Route path="/search" component={Search} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
