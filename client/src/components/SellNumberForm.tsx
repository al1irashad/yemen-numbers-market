import { useState } from "react";
import { Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SellNumberForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    minPrice: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const WHATSAPP_NUMBER = "+967711411141";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.minPrice.trim()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    setIsSubmitting(true);

    // محاكاة إرسال الطلب
    setTimeout(() => {
      const message = `طلب بيع رقم جديد:\n\nالاسم: ${formData.fullName}\nرقم الجوال: ${formData.phoneNumber}\nأقل سعر: ${formData.minPrice} ريال`;
      
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      toast.success("سيتم فتح الواتساب لإرسال طلبك");
      
      setFormData({
        fullName: "",
        phoneNumber: "",
        minPrice: "",
      });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border-2 border-green-200">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">
            هل تريد بيع رقم؟
          </h2>
          <p className="text-gray-600">
            أخبرنا بتفاصيل الرقم الذي تريد بيعه وسنتواصل معك قريباً
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-sm">
            سنتواصل معك عبر الواتساب للتحقق من الرقم والاتفاق على السعر النهائي
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الاسم الرباعي *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="أدخل اسمك الكامل"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-smooth"
              disabled={isSubmitting}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الجوال (واتساب) *
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="مثال: 967712345678"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-smooth"
              disabled={isSubmitting}
            />
          </div>

          {/* Minimum Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              أقل سعر تطلبه (ريال) *
            </label>
            <input
              type="number"
              value={formData.minPrice}
              onChange={(e) =>
                setFormData({ ...formData, minPrice: e.target.value })
              }
              placeholder="مثال: 50000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-smooth"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب عبر الواتساب"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          بعد إرسال الطلب، سيتم فتح الواتساب تلقائياً للتواصل المباشر
        </p>
      </div>
    </div>
  );
}
