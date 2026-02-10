import { useState, useMemo } from "react";

interface Number {
  id: string;
  number: string;
  price: number;
  provider: "yemen-mobile" | "sabafon";
  description?: string;
}

export function useNumbers() {
  const [numbers] = useState<Number[]>([
    {
      id: "1",
      number: "777123456",
      price: 50000,
      provider: "yemen-mobile",
      description: "رقم ذهبي مميز",
    },
    {
      id: "2",
      number: "777654321",
      price: 75000,
      provider: "yemen-mobile",
      description: "أرقام متسلسلة",
    },
    {
      id: "3",
      number: "778888888",
      price: 150000,
      provider: "yemen-mobile",
      description: "رقم نادر جداً",
    },
    {
      id: "4",
      number: "771111111",
      price: 100000,
      provider: "yemen-mobile",
      description: "أرقام متكررة",
    },
    {
      id: "5",
      number: "735123456",
      price: 45000,
      provider: "sabafon",
      description: "رقم عادي",
    },
    {
      id: "6",
      number: "735999999",
      price: 120000,
      provider: "sabafon",
      description: "رقم نادر",
    },
    {
      id: "7",
      number: "777222222",
      price: 85000,
      provider: "yemen-mobile",
      description: "أرقام متكررة",
    },
    {
      id: "8",
      number: "735777777",
      price: 95000,
      provider: "sabafon",
      description: "رقم مميز",
    },
  ]);

  const [selectedProvider, setSelectedProvider] = useState<"all" | "yemen-mobile" | "sabafon">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "newest">("newest");

  const filteredAndSortedNumbers = useMemo(() => {
    let result = numbers.filter((num) => {
      const matchesProvider = selectedProvider === "all" || num.provider === selectedProvider;
      const matchesSearch = num.number.includes(searchTerm);
      return matchesProvider && matchesSearch;
    });

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [numbers, selectedProvider, searchTerm, sortBy]);

  return {
    numbers: filteredAndSortedNumbers,
    selectedProvider,
    setSelectedProvider,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
  };
}
