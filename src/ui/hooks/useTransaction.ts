import { useState } from "react";
import toast from "react-hot-toast";

export type TransactionItem = {
  transactionCode: string;
  productName: string;
  quantity: number;
  price: number;
  date: string;
  cashierId: number | null;
};

export const useTransaction = () => {
  const [loading, setLoading] = useState(false);

  const sendTransaction = async (items: TransactionItem[]) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          items.map((item) => ({
            transactionCode: item.transactionCode,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            date: new Date().toISOString(),
            cashierId: item.cashierId,
          }))
        ),
      });

      if (!res.ok) throw new Error("Помилка при збереженні транзакції");

      toast.success("Транзакція успішно збережена!");
      return true;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`${err.message}`);
      } else {
        toast.error("Невідома помилка");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendTransaction, loading };
};
