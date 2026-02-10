import { Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function SearchSection() {
  const [searchNumber, setSearchNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchNumber.trim() || !customerName.trim() || !customerPhone.trim()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    setIsSubmitting(true);

    // محاكاة إرسال الطلب
    setTimeout(() => {
      const message = `طلب بحث عن رقم:\n\nالرقم: ${searchNumber}\nاسم العميل: ${customerName}\nرقم الواتساب: ${customerPhone}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");

      toast.success("تم إرسال طلبك! سيتم التواصل معك قريباً");
      setSearchNumber("");
      setCustomerName("");
      setCustomerPhone("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section id="search" className="bg-gradient-to-br from-blue-50 to-cyan-50 py-12 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">
              هل تبحث عن رقم محدد؟
            </h2>
            <p className="text-gray-600">
              أخبرنا بالرقم الذي تريده وسنبحث عنه لك
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-modern p-6">
            {/* Phone Number Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الرقم المطلوب
              </label>
              <div className="relative">
                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={searchNumber}
                  onChange={(e) => setSearchNumber(e.target.value)}
                  placeholder="أدخل الرقم الذي تريده (مثال: 777123456)"
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Customer Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسمك
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="أدخل اسمك"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Customer Phone */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم واتساب
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="أدخل رقم واتساب للتواصل"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-smooth flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
            </Button>
          </form>

          {/* Info */}
          <p className="text-center text-gray-600 text-sm mt-4">
            سنبحث عن الرقم وسنتواصل معك عبر الواتساب في أقرب وقت
          </p>
        </div>
      </div>
    </section>
  );
}
