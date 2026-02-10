import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold font-poppins">سوق الأرقام</h3>
            </div>
            <p className="text-gray-400">
              أفضل منصة لشراء أرقام الهواتف من يمن موبايل وسبأفون
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 font-poppins">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <a href="#numbers" className="text-gray-400 hover:text-white transition-smooth">
                  الأرقام المتاحة
                </a>
              </li>
              <li>
                <a href="#search" className="text-gray-400 hover:text-white transition-smooth">
                  البحث عن رقم
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-smooth">
                  التواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 font-poppins">معلومات</h4>
            <ul className="space-y-2 text-gray-400">
              <li>البريد: info@example.com</li>
              <li>الهاتف: +967 XXX XXX XXX</li>
              <li>الموقع: صنعاء، اليمن</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 سوق الأرقام اليمنية. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                شروط الاستخدام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
