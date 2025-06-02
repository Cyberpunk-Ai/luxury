import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - in a real app, this would be an actual newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for joining our exclusive luxury community.",
      });
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="mb-8">
          <div className="w-16 h-16 bg-luxury-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-4">
            Stay Informed
          </h2>
          <p className="text-xl text-white/90 mb-2">
            Subscribe to receive exclusive access to new collections and market insights
          </p>
          <p className="text-white/70">
            Join 50,000+ luxury enthusiasts worldwide
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <CheckCircle className="w-16 h-16 text-luxury-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to Otulia!</h3>
              <p className="text-white/90">
                You'll receive our first exclusive newsletter within 24 hours.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:bg-white/20"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-luxury-gold to-yellow-400 text-luxury-navy px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold disabled:opacity-50"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            ✓ Exclusive previews ✓ Market insights ✓ VIP events ✓ No spam, unsubscribe anytime
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-gold">50K+</div>
            <div className="text-white/80 text-sm">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-gold">Weekly</div>
            <div className="text-white/80 text-sm">Updates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-gold">VIP</div>
            <div className="text-white/80 text-sm">Access</div>
          </div>
        </div>
      </div>
    </section>
  );
}
