import { useEffect, useState } from "react";
import { Cashier } from "../types/cashier";

export const useCashiers = () => {
  const [cashiers, setCashiers] = useState<Cashier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCashiers = async () => {
      try {
        const res = await fetch("http://localhost:3000/cashiers");
        const data = await res.json();
        setCashiers(data);
      } catch (err) {
        console.error("Не вдалося завантажити касирів:", err);
        setError("Помилка при завантаженні касирів");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCashiers();
  }, []);

  return { cashiers, isLoading, error };
};
