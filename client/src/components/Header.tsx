import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const handleWhatsApp = () => {
    // سيتم تحديثه لاحقاً
    window.open("https://wa.me/", "_blank");
  };

  return (
    <header className="bg-white shadow-modern sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">سوق الأرقام</h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <a href="#numbers" className="text-gray-600 hover:text-blue-600 transition-smooth">
            الأرقام
          </a>
          <a href="#search" className="text-gray-600 hover:text-blue-600 transition-smooth">
            البحث
          </a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-smooth">
            التواصل
          </a>
          <Button
            onClick={handleWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            تواصل معنا
          </Button>
        </nav>
      </div>
    </header>
  );
}
