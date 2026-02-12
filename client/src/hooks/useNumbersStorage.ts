import { useState, useEffect } from "react";

interface Number {
  id: string;
  number: string;
  price: number;
  provider: "yemen-mobile" | "sabafon" | "y" | "u";
  description?: string;
}

const STORAGE_KEY = "yemen_numbers_market_data";
const ADMIN_PASSWORD = "Rashad00Al-wahdi.."; // يمكن تغييرها

const DEFAULT_NUMBERS: Number[] = [
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
    number: "770123456",
    price: 55000,
    provider: "y",
    description: "رقم مميز من واي",
  },
  {
    id: "8",
    number: "770999999",
    price: 130000,
    provider: "y",
    description: "رقم نادر من واي",
  },
  {
    id: "9",
    number: "771234567",
    price: 60000,
    provider: "u",
    description: "رقم مميز من يو",
  },
  {
    id: "10",
    number: "771888888",
    price: 140000,
    provider: "u",
    description: "رقم نادر من يو",
  },
];

export function useNumbersStorage() {
  const [numbers, setNumbers] = useState<Number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // تحميل البيانات من localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        setNumbers(JSON.parse(storedData));
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        setNumbers(DEFAULT_NUMBERS);
      }
    } else {
      setNumbers(DEFAULT_NUMBERS);
    }
    setIsLoaded(true);
  }, []);

  // حفظ البيانات إلى localStorage
  const saveNumbers = (updatedNumbers: Number[]) => {
    setNumbers(updatedNumbers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNumbers));
  };

  // إضافة رقم جديد
  const addNumber = (number: Omit<Number, "id">) => {
    const newNumber: Number = {
      ...number,
      id: Date.now().toString(),
    };
    const updatedNumbers = [...numbers, newNumber];
    saveNumbers(updatedNumbers);
    return newNumber;
  };

  // حذف رقم
  const deleteNumber = (id: string) => {
    const updatedNumbers = numbers.filter((num) => num.id !== id);
    saveNumbers(updatedNumbers);
  };

  // تحديث رقم
  const updateNumber = (id: string, updatedData: Partial<Number>) => {
    const updatedNumbers = numbers.map((num) =>
      num.id === id ? { ...num, ...updatedData } : num
    );
    saveNumbers(updatedNumbers);
  };

  // التحقق من كلمة المرور
  const verifyPassword = (password: string): boolean => {
    return password === ADMIN_PASSWORD;
  };

  // الحصول على كلمة المرور الحالية
  const getAdminPassword = (): string => {
    return ADMIN_PASSWORD;
  };

  return {
    numbers,
    isLoaded,
    addNumber,
    deleteNumber,
    updateNumber,
    verifyPassword,
    getAdminPassword,
  };
}
