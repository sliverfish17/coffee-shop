import { useEffect, useState } from "react";
import Filter from "../components/ui/Filter";

interface Transaction {
  _id: string;
  transactionCode: string;
  productName: string;
  quantity: number;
  price: number;
  date: string;
  cashier?: {
    firstName: string;
    lastName: string;
  };
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

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

  const filteredTransactions = transactions.filter((tx) => {
    const date = new Date(tx.date);

    const inRange =
      !range[0].startDate || !range[0].endDate
        ? true
        : date >= new Date(range[0].startDate) &&
          date <= new Date(range[0].endDate);

    const matchesSearch = tx.productName
      .toLowerCase()
      .includes(search.toLowerCase());

    return inRange && matchesSearch;
  });

  const groupedTransactions = filteredTransactions.reduce((acc, tx) => {
    if (!acc[tx.transactionCode]) acc[tx.transactionCode] = [];
    acc[tx.transactionCode].push(tx);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="container mx-auto max-w-6xl py-10 text-white space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Список транзакцій</h1>

      <Filter
        range={range}
        setRange={setRange}
        search={search}
        setSearch={setSearch}
      />

      {loading && <p className="text-center text-zinc-400">Завантаження...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && filteredTransactions.length === 0 && (
        <p className="text-center text-zinc-400 italic">
          Транзакцій не знайдено
        </p>
      )}

      {Object.entries(groupedTransactions).map(([code, txList]) => (
        <div key={code} className="mb-10">
          <h2 className="text-xl font-bold mb-2 text-zinc-200">
            Транзакція: <span className="font-mono">{code}</span>
          </h2>
          <p className="text-sm text-zinc-400 mb-2">
            Касир:{" "}
            {txList[0].cashier
              ? `${txList[0].cashier.lastName} ${txList[0].cashier.firstName}`
              : "Невідомо"}
          </p>

          <div className="overflow-x-auto rounded-lg shadow border border-zinc-700">
            <table className="w-full table-auto text-sm bg-zinc-900">
              <thead className="text-zinc-300 uppercase text-xs">
                <tr className="bg-zinc-800">
                  <th className="px-4 py-3">Товар</th>
                  <th className="px-4 py-3">Кількість</th>
                  <th className="px-4 py-3">Ціна</th>
                  <th className="px-4 py-3">Дата</th>
                </tr>
              </thead>
              <tbody>
                {txList.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-t border-zinc-700 bg-zinc-800 transition"
                  >
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
        </div>
      ))}
    </div>
  );
};

export default Transactions;
