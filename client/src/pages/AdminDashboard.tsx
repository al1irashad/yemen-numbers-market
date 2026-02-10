import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Plus, Trash2, LogOut, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNumbersStorage } from "@/hooks/useNumbersStorage";
import { toast } from "sonner";

interface Number {
  id: string;
  number: string;
  price: number;
  provider: "yemen-mobile" | "sabafon" | "y" | "u";
  description?: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { numbers, addNumber, deleteNumber, updateNumber } = useNumbersStorage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    number: "",
    price: "",
    provider: "yemen-mobile" as "yemen-mobile" | "sabafon" | "y" | "u",
    description: "",
  });

  // التحقق من تسجيل الدخول
  useEffect(() => {
    if (!localStorage.getItem("admin_logged_in")) {
      setLocation("/admin-login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setLocation("/");
  };

  const handleAddNumber = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.number || !formData.price) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (editingId) {
      updateNumber(editingId, {
        number: formData.number,
        price: parseInt(formData.price),
        provider: formData.provider,
        description: formData.description,
      });
      toast.success("تم تحديث الرقم بنجاح");
      setEditingId(null);
    } else {
      addNumber({
        number: formData.number,
        price: parseInt(formData.price),
        provider: formData.provider,
        description: formData.description,
      });
      toast.success("تم إضافة الرقم بنجاح");
    }

    setFormData({
      number: "",
      price: "",
      provider: "yemen-mobile",
      description: "",
    });
    setShowAddForm(false);
  };

  const handleEdit = (num: Number) => {
    setFormData({
      number: num.number,
      price: num.price.toString(),
      provider: num.provider,
      description: num.description || "",
    });
    setEditingId(num.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الرقم؟")) {
      deleteNumber(id);
      toast.success("تم حذف الرقم بنجاح");
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      number: "",
      price: "",
      provider: "yemen-mobile",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-modern sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">
            لوحة التحكم
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Add Number Button */}
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white mb-8"
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة رقم جديد
          </Button>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-modern p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 font-poppins">
                {editingId ? "تعديل الرقم" : "إضافة رقم جديد"}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddNumber} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Number Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرقم
                  </label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: e.target.value })
                    }
                    placeholder="مثال: 777123456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Price Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر (ريال)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="مثال: 50000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Provider Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شركة الاتصالات
                  </label>
                  <select
                    value={formData.provider}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        provider: e.target.value as "yemen-mobile" | "sabafon" | "y" | "u",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="yemen-mobile">يمن موبايل</option>
                    <option value="sabafon">سبأفون</option>
                    <option value="y">واي</option>
                    <option value="u">يو</option>
                  </select>
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف (اختياري)
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="مثال: رقم ذهبي مميز"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingId ? "تحديث" : "إضافة"}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Numbers Table */}
        <div className="bg-white rounded-lg shadow-modern overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الرقم
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    السعر
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الشركة
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الوصف
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {numbers.map((num) => (
                  <tr key={num.id} className="hover:bg-gray-50 transition-smooth">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {num.number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {num.price.toLocaleString("ar-YE")} ريال
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          num.provider === "yemen-mobile"
                            ? "bg-red-50 text-red-700"
                            : num.provider === "sabafon"
                            ? "bg-blue-50 text-blue-700"
                            : num.provider === "y"
                            ? "bg-purple-50 text-purple-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {num.provider === "yemen-mobile"
                          ? "يمن موبايل"
                          : num.provider === "sabafon"
                          ? "سبأفون"
                          : num.provider === "y"
                          ? "واي"
                          : "يو"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {num.description || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(num)}
                          className="text-blue-600 hover:text-blue-700 transition-smooth"
                          title="تعديل"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(num.id)}
                          className="text-red-600 hover:text-red-700 transition-smooth"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {numbers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">لا توجد أرقام حالياً</p>
            </div>
          )}

          {/* Stats */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
            <p className="text-sm text-gray-600">
              إجمالي الأرقام: <span className="font-semibold">{numbers.length}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
