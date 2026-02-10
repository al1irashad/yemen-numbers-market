import { useState } from "react";
import { useLocation } from "wouter";
import { Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNumbersStorage } from "@/hooks/useNumbersStorage";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { verifyPassword } = useNumbersStorage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // محاكاة تأخير في التحقق
    setTimeout(() => {
      if (verifyPassword(password)) {
        localStorage.setItem("admin_logged_in", "true");
        setLocation("/admin-dashboard");
      } else {
        setError("كلمة المرور غير صحيحة");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-poppins">
              لوحة التحكم
            </h1>
            <p className="text-gray-600 mt-2">
              أدخل كلمة المرور للوصول إلى لوحة التحكم
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-smooth"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "جاري التحقق..." : "دخول"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            هذه الصفحة مخصصة للمسؤول فقط
          </p>
        </div>
      </div>
    </div>
  );
}
