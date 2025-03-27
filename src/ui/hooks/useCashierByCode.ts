import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cashier } from "../types/cashier";

export const useCashierByCode = () => {
  const { code } = useParams<{ code: string }>();
  const [cashier, setCashier] = useState<Cashier | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCashier = async () => {
      try {
        const res = await fetch(`http://localhost:3000/cashiers/${code}`);
        const data = await res.json();
        setCashier(data);
      } catch {
        setError("Не вдалося завантажити касира");
      } finally {
        setIsLoading(false);
      }
    };

    if (code) fetchCashier();
  }, [code]);

  return { cashier, setCashier, isLoading, error, code };
};
