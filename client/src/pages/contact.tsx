import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-luxury-navy mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with our luxury asset specialists. We're here to help you find 
              the perfect addition to your collection.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="luxury-shadow">
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-luxury-navy">
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-luxury-indigo rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxury-navy">Email</h3>
                      <p className="text-gray-600">hello@otulia.com</p>
                      <p className="text-gray-600">support@otulia.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-luxury-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxury-navy">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxury-navy">Address</h3>
                      <p className="text-gray-600">
                        123 Luxury Avenue<br />
                        Beverly Hills, CA 90210<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxury-navy">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Services */}
              <Card className="luxury-shadow mt-8">
                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-luxury-navy">
                    Premium Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full mr-3"></div>
                      Personal Asset Consultation
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full mr-3"></div>
                      White-Glove Delivery Service
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full mr-3"></div>
                      Investment Advisory
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full mr-3"></div>
                      Authentication & Appraisal
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full mr-3"></div>
                      24/7 Concierge Support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="luxury-shadow">
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-luxury-navy">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-luxury-indigo"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-luxury-indigo"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-luxury-indigo"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-luxury-indigo"
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="border-gray-200 focus:border-luxury-indigo"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full luxury-gradient text-white hover:shadow-xl transition-all duration-300 py-3"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
