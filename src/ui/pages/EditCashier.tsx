import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Cashier {
  _id: string;
  code: string;
  lastName: string;
  firstName: string;
  middleName: string;
  address: string;
  phone: string;
}

const EditCashier = () => {
  const { code } = useParams<{ code: string }>();

  const navigate = useNavigate();
  const [cashier, setCashier] = useState<Cashier | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/cashiers/${code}`)
      .then((res) => res.json())
      .then((data) => setCashier(data))
      .catch((err) => console.error("❌ Помилка:", err));
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cashier) return;
    setCashier({ ...cashier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/cashiers/${code}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cashier),
      });
      const data = await res.json();
      console.log("✅ Касира оновлено:", data);
      navigate("/view-cashier");
    } catch (err) {
      console.error("❌ Помилка при оновленні:", err);
    }
  };

  if (!cashier) return <div className="p-4">Завантаження...</div>;

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl font-bold">Редагувати касира</h2>
      {Object.entries(cashier).map(([key, value]) =>
        key !== "_id" ? (
          <input
            key={key}
            name={key}
            value={value}
            onChange={handleChange}
            placeholder={key}
            className="block border p-1 rounded w-full"
          />
        ) : null
      )}
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-2 rounded"
      >
        Зберегти зміни
      </button>
    </div>
  );
};

export default EditCashier;
