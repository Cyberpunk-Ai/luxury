import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Award, 
  TrendingUp, 
  Gift, 
  CreditCard, 
  Star, 
  Crown, 
  Zap,
  Plus,
  Minus,
  History,
  Target
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CreditTransaction {
  id: number;
  amount: string;
  type: string;
  source: string;
  description: string;
  createdAt: string;
}

export default function CreditsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [earnAmount, setEarnAmount] = useState("");
  const [earnDescription, setEarnDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: creditBalance } = useQuery<{ balance: number }>({
    queryKey: ["/api/user/credits"],
  });

  const addCreditsMutation = useMutation({
    mutationFn: async (data: { amount: string; type: string; source: string; description: string }) => {
      const response = await fetch("/api/user/credits/add", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to add credits");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/credits"] });
      toast({
        title: "Credits Added",
        description: "Your credits have been successfully added to your account.",
      });
      setEarnAmount("");
      setEarnDescription("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add credits. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEarnCredits = (type: string, source: string, amount: string, description: string) => {
    addCreditsMutation.mutate({
      amount,
      type,
      source,
      description,
    });
  };

  const getUserTier = (balance: number) => {
    if (balance >= 5000) return { tier: "Platinum", color: "from-slate-400 to-slate-600", icon: Crown };
    if (balance >= 2000) return { tier: "Gold", color: "from-yellow-400 to-yellow-600", icon: Award };
    if (balance >= 500) return { tier: "Silver", color: "from-gray-400 to-gray-600", icon: Star };
    return { tier: "Bronze", color: "from-amber-600 to-orange-600", icon: Zap };
  };

  const creditEarningSources = [
    {
      title: "Rate Luxury Assets",
      description: "Earn 5 credits for each verified asset rating",
      credits: 5,
      action: () => handleEarnCredits("earned", "rating_asset", "5", "Credits earned for rating luxury asset"),
      icon: Star,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Complete Profile",
      description: "One-time bonus for completing your collector profile",
      credits: 50,
      action: () => handleEarnCredits("earned", "profile_completion", "50", "Bonus credits for profile completion"),
      icon: Target,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Daily Login Bonus",
      description: "Get 2 credits for logging in daily",
      credits: 2,
      action: () => handleEarnCredits("earned", "daily_login", "2", "Daily login bonus credits"),
      icon: Gift,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Refer a Friend",
      description: "Earn 100 credits when someone joins using your referral",
      credits: 100,
      action: () => handleEarnCredits("earned", "referral", "100", "Referral bonus credits"),
      icon: TrendingUp,
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const tierInfo = creditBalance ? getUserTier(creditBalance.balance) : { tier: "Bronze", color: "from-amber-600 to-orange-600", icon: Zap };
  const TierIcon = tierInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/40">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-2">
            Credits Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Manage your credits and explore exclusive luxury experiences
          </p>
        </div>

        {/* Credit Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Main Balance Card */}
          <Card className={`bg-gradient-to-br ${tierInfo.color} border-0 text-white md:col-span-2`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <TierIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Current Balance</p>
                    <p className="text-3xl font-bold">{creditBalance?.balance || 0}</p>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  {tierInfo.tier} Member
                </Badge>
              </div>
              <Progress 
                value={Math.min(((creditBalance?.balance || 0) % 1000) / 10, 100)} 
                className="h-2 bg-white/20"
              />
              <p className="text-white/80 text-sm mt-2">
                {1000 - ((creditBalance?.balance || 0) % 1000)} credits to next tier
              </p>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">This Month</p>
                  <p className="text-2xl font-bold">+127</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Total Earned</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-1/2">
            <TabsTrigger value="overview">Earn Credits</TabsTrigger>
            <TabsTrigger value="spend">Redeem</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Earn Credits Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creditEarningSources.map((source, index) => {
                const SourceIcon = source.icon;
                return (
                  <Card key={index} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 bg-gradient-to-br ${source.color} rounded-xl text-white`}>
                            <SourceIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              {source.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                              {source.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                          +{source.credits}
                        </Badge>
                      </div>
                      <Button 
                        onClick={source.action}
                        disabled={addCreditsMutation.isPending}
                        className="w-full"
                        variant="outline"
                      >
                        {addCreditsMutation.isPending ? "Processing..." : "Earn Now"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Custom Credit Addition (Demo) */}
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Manual Credit Addition (Demo)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="earnAmount">Amount</Label>
                    <Input
                      id="earnAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={earnAmount}
                      onChange={(e) => setEarnAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="earnDescription">Description</Label>
                    <Input
                      id="earnDescription"
                      placeholder="Reason for credits"
                      value={earnDescription}
                      onChange={(e) => setEarnDescription(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    if (earnAmount && earnDescription) {
                      handleEarnCredits("earned", "manual", earnAmount, earnDescription);
                    }
                  }}
                  disabled={!earnAmount || !earnDescription || addCreditsMutation.isPending}
                  className="w-full md:w-auto"
                >
                  Add Credits
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Redeem Credits Tab */}
          <TabsContent value="spend" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Priority Asset Viewing",
                  description: "Get early access to new luxury listings",
                  cost: 50,
                  icon: Crown,
                  color: "from-yellow-500 to-yellow-600"
                },
                {
                  title: "Expert Appraisal",
                  description: "Professional valuation for your luxury items",
                  cost: 200,
                  icon: Award,
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "VIP Consultation",
                  description: "1-on-1 consultation with luxury experts",
                  cost: 500,
                  icon: Star,
                  color: "from-purple-500 to-purple-600"
                }
              ].map((reward, index) => {
                const RewardIcon = reward.icon;
                return (
                  <Card key={index} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${reward.color} rounded-2xl flex items-center justify-center mx-auto mb-3 text-white`}>
                          <RewardIcon className="w-8 h-8" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                          {reward.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                          {reward.description}
                        </p>
                        <Badge className={`bg-gradient-to-r ${reward.color} text-white border-0`}>
                          {reward.cost} Credits
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        disabled={(creditBalance?.balance || 0) < reward.cost}
                      >
                        {(creditBalance?.balance || 0) < reward.cost ? "Insufficient Credits" : "Redeem"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Transaction History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Recent Transactions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "earned", amount: "+5", description: "Asset rating bonus", date: "2 hours ago" },
                    { type: "earned", amount: "+2", description: "Daily login bonus", date: "1 day ago" },
                    { type: "spent", amount: "-50", description: "Priority viewing access", date: "3 days ago" },
                    { type: "earned", amount: "+100", description: "Referral bonus", date: "1 week ago" },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === "earned" 
                            ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400" 
                            : "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                        }`}>
                          {transaction.type === "earned" ? <Plus className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={transaction.type === "earned" ? "default" : "destructive"}
                        className={transaction.type === "earned" ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300" : ""}
                      >
                        {transaction.amount}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}