import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  selectedProvider: "all" | "yemen-mobile" | "sabafon" | "y" | "u";
  onProviderChange: (provider: "all" | "yemen-mobile" | "sabafon" | "y" | "u") => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: "price-asc" | "price-desc" | "newest";
  onSortChange: (sort: "price-asc" | "price-desc" | "newest") => void;
  resultsCount: number;
}

export default function FilterBar({
  selectedProvider,
  onProviderChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  resultsCount,
}: FilterBarProps) {
  const providers = [
    { id: "all", label: "الكل", color: "" },
    { id: "yemen-mobile", label: "يمن موبايل", color: "bg-red-500 hover:bg-red-600" },
    { id: "sabafon", label: "سبأفون", color: "bg-blue-500 hover:bg-blue-600" },
    { id: "y", label: "واي", color: "bg-purple-500 hover:bg-purple-600" },
    { id: "u", label: "يو", color: "bg-orange-500 hover:bg-orange-600" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-8 mb-10 transition-all duration-300 hover:shadow-2xl">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-extrabold text-gray-900">
            الفلاتر والترتيب
          </h3>

        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Provider Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              شركة الاتصالات
            </label>
            <div className="flex gap-2 flex-wrap">
              {providers.map((provider) => (
                <Button
                  key={provider.id}
                  onClick={() => onProviderChange(provider.id as any)}
                  variant={selectedProvider === provider.id ? "default" : "outline"}
                  className={`rounded-xl px-4 py-2 font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedProvider === provider.id && provider.color ? provider.color : ""
                  }`}
                >
                  {provider.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البحث عن رقم
            </label>
            <input
              type="text"
              placeholder="أدخل الرقم..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الترتيب
            </label>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
              >
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            عدد النتائج: <span className="font-bold text-gray-900">{resultsCount}</span>
          </p>
          {searchTerm && (
            <Button
              onClick={() => onSearchChange("")}
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
            >
              مسح البحث
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
