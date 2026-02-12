import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import NumberCard from "@/components/NumberCard";
import SearchSection from "@/components/SearchSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import SellNumberForm from "@/components/SellNumberForm";
import { Button } from "@/components/ui/button";
import { useNumbersStorage } from "@/hooks/useNumbersStorage";

/**
 * Home Page - Modern & Functional Design
 * عرض الأرقام المتاحة مع خيارات البحث والتواصل
 */

export default function Home() {
  const [, setLocation] = useLocation();
  const { numbers, isLoaded } = useNumbersStorage();
  const [selectedProvider, setSelectedProvider] = useState<"all" | "yemen-mobile" | "sabafon" | "y" | "u">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "newest">("newest");

  const filteredNumbers = useMemo(() => {
    let result = numbers.filter((num) => {
      const matchesProvider = selectedProvider === "all" || num.provider === selectedProvider;
      const matchesSearch = num.number.includes(searchTerm);
      return matchesProvider && matchesSearch;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [numbers, selectedProvider, searchTerm, sortBy]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Link */}
      <div className="bg-blue-50 border-b border-blue-200 py-2">
        <div className="container mx-auto px-4 flex justify-end">
          <button
            onClick={() => setLocation("/admin-login")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-smooth"
          >
           Admin
          </button>
        </div>
      </div>
      <Header />

      {/* Hero Section */}
<section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-24">

  {/* خلفية دوائر ضبابية فخمة */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl text-right animate-fade-in">

      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        أرقام مميزة للبيع
      </h2>

      <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
        اختر من بين أفضل الأرقام المتاحة من سبأفون ويمن موبايل و واي و يو  
        بأسعار تنافسية وجودة عالية
      </p>

      <Button
        onClick={() =>
          document.getElementById("numbers")?.scrollIntoView({ behavior: "smooth" })
        }
        className="bg-white text-blue-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
      >
        استعرض الأرقام
      </Button>

    </div>
  </div>
</section>



      {/* Numbers Section */}
      <section id="numbers" className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters Bar */}
          <FilterBar
            selectedProvider={selectedProvider}
            onProviderChange={setSelectedProvider}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultsCount={filteredNumbers.length}
          />

          {/* Numbers Grid */}
          {filteredNumbers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
              {filteredNumbers.map((num) => (
                <NumberCard
                  key={num.id}
                  number={num.number}
                  price={num.price}
                  provider={num.provider}
                  description={num.description}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner">
              <p className="text-gray-600 text-lg mb-4">
                لم يتم العثور على أرقام تطابق بحثك
              </p>
              <Button
                onClick={() => {
                  setSelectedProvider("all");
                  setSearchTerm("");
                }}
                variant="outline"
              >
                إعادة تعيين الفلاتر
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Sell Number Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <SellNumberForm />
        </div>
      </section>

      {/* Search Section */}
      <SearchSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
