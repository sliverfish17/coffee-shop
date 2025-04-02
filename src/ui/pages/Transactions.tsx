import { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  transactionCode: string;
  productName: string;
  quantity: number;
  price: number;
  date: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:3000/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch {
        setError("Не вдалося завантажити транзакції");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto max-w-6xl py-10 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Список транзакцій</h1>

      {loading && <p className="text-center text-zinc-400">Завантаження...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && transactions.length === 0 && (
        <p className="text-center text-zinc-400 italic">Транзакцій ще немає</p>
      )}

      {transactions.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow border border-zinc-700">
          <table className="w-full table-auto text-sm bg-zinc-900">
            <thead className=" text-zinc-300 uppercase text-xs">
              <tr className="bg-zinc-800">
                <th className="px-4 py-3">Код</th>
                <th className="px-4 py-3">Товар</th>
                <th className="px-4 py-3">Кількість</th>
                <th className="px-4 py-3">Ціна</th>
                <th className="px-4 py-3">Дата</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-t border-zinc-700 bg-zinc-800 transition"
                >
                  <td className="px-4 py-2 font-mono">{tx.transactionCode}</td>
                  <td className="px-4 py-2">{tx.productName}</td>
                  <td className="px-4 py-2">{tx.quantity}</td>
                  <td className="px-4 py-2">{tx.price} грн</td>
                  <td className="px-4 py-2">
                    {new Date(tx.date).toLocaleString("uk-UA")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
