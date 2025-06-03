import { Card, CardContent } from "@/components/ui/card";
import { Shield, Bell, Globe, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Authentication",
    description: "Every item verified by certified experts using advanced authentication protocols",
    color: "from-indigo-600 to-blue-900 shadow-md",
  },
  {
    icon: Bell,
    title: "Concierge",
    description: "Personal shopping assistance and dedicated support for your luxury purchases",
    color: "from-yellow-500 via-amber-400 to-yellow-300",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    description: "Secure worldwide shipping with white-glove delivery service and insurance",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Expert guidance on luxury asset investments and market trends analysis",
    color: "from-purple-500 to-pink-500",
  },
];

export default function LuxuryServices() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-luxury-navy mb-4">
            Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience unparalleled service with our comprehensive suite of luxury marketplace features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <Card 
                key={index}
                className="text-center p-6 border-0 hover:bg-slate-50 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white drop-shadow-sm" />
                  </div>
                  
                  <h3 className="font-playfair text-xl font-bold text-luxury-navy mb-3 group-hover:text-luxury-indigo transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="p-6 border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0 text-center">
              <div className="w-12 h-12 bg-luxury-indigo rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold drop-shadow-sm">24/7</span>
              </div>
              <h4 className="font-semibold text-luxury-navy mb-2">Expert Support</h4>
              <p className="text-gray-600 text-sm">Round-the-clock assistance from luxury specialists</p>
            </CardContent>
          </Card>

          <Card className="p-6 border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0 text-center">
              <div className="w-12 h-12 bg-luxury-gold rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold drop-shadow-sm">VIP</span>
              </div>
              <h4 className="font-semibold text-luxury-navy mb-2">Priority Access</h4>
              <p className="text-gray-600 text-sm">Exclusive previews and early access to new collections</p>
            </CardContent>
          </Card>

          <Card className="p-6 border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0 text-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold drop-shadow-sm">★</span>
              </div>
              <h4 className="font-semibold text-luxury-navy mb-2">Quality Guarantee</h4>
              <p className="text-gray-600 text-sm">100% authenticity guarantee with lifetime support</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
