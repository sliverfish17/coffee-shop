import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  _id: string;
  code: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export const useProductByCode = () => {
  const { code } = useParams<{ code: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${code}`);
        if (!res.ok) throw new Error("Не вдалося отримати продукт");
        const data = await res.json();
        setProduct(data);
      } catch {
        setError("❌ Помилка завантаження продукту");
      } finally {
        setIsLoading(false);
      }
    };

    if (code) {
      fetchProduct();
    }
  }, [code]);

  return { product, isLoading, error, code };
};
