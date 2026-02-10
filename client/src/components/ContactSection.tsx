import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "واتساب",
      description: "تواصل معنا عبر الواتساب",
      color: "bg-green-50 text-green-600",
      action: () => window.open("https://wa.me/", "_blank"),
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      description: "أرسل لنا بريداً إلكترونياً",
      color: "bg-blue-50 text-blue-600",
      action: () => window.location.href = "mailto:info@example.com",
    },
    {
      icon: Phone,
      title: "الهاتف",
      description: "اتصل بنا مباشرة",
      color: "bg-orange-50 text-orange-600",
      action: () => window.location.href = "tel:+967",
    },
    {
      icon: MapPin,
      title: "الموقع",
      description: "زرنا في صنعاء",
      color: "bg-red-50 text-red-600",
      action: () => {},
    },
  ];

  return (
    <section id="contact" className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">
            تواصل معنا
          </h2>
          <p className="text-gray-600">
            نحن هنا للإجابة على جميع استفساراتك
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-modern p-6 text-center hover:shadow-hover transition-smooth"
              >
                <div className={`${method.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-poppins">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {method.description}
                </p>
                <Button
                  onClick={method.action}
                  variant="outline"
                  className="w-full transition-smooth"
                >
                  تواصل
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
