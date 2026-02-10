import { MessageCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NumberCardProps {
  number: string;
  price: number;
  provider: "yemen-mobile" | "sabafon" | "y" | "u";
  description?: string;
}

export default function NumberCard({
  number,
  price,
  provider,
  description,
}: NumberCardProps) {
  const [copied, setCopied] = useState(false);

  const providerInfo: Record<string, any> = {
    "yemen-mobile": {
      name: "يمن موبايل",
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    sabafon: {
      name: "سبأفون",
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    y: {
      name: "واي",
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    u: {
      name: "يو",
      color: "bg-orange-500",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  };

  const info = providerInfo[provider];

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContact = () => {
    const message = `أنا مهتم بالرقم: ${number}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="bg-white rounded-lg shadow-modern hover:shadow-hover transition-smooth p-6 border border-gray-100">
      {/* Provider Badge */}
      <div className={`inline-block ${info.bgColor} ${info.textColor} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
        {info.name}
      </div>

      {/* Number Display */}
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-1">الرقم</p>
        <p className="text-3xl font-bold text-gray-900 font-poppins">{number}</p>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}

      {/* Price */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-4">
        <p className="text-gray-500 text-sm mb-1">السعر</p>
        <p className="text-2xl font-bold text-blue-600 font-poppins">
          {price.toLocaleString("ar-YE")} ريال
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex-1 transition-smooth"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              تم النسخ
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              نسخ
            </>
          )}
        </Button>
        <Button
          onClick={handleContact}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white transition-smooth"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          واتساب
        </Button>
      </div>
    </div>
  );
}
