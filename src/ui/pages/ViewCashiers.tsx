import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Cashier {
  _id: string;
  code: string;
  lastName: string;
  firstName: string;
  middleName: string;
  address: string;
  phone: string;
}

const ViewCashiers = () => {
  const [cashiers, setCashiers] = useState<Cashier[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCashiers = async () => {
      try {
        const res = await fetch("http://localhost:3000/cashiers");
        const data = await res.json();
        setCashiers(data);
      } catch (err) {
        console.error("❌ Не вдалося завантажити касирів:", err);
      }
    };

    fetchCashiers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Список касирів</h2>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Код</th>
            <th className="border p-2">ПІБ</th>
            <th className="border p-2">Адреса</th>
            <th className="border p-2">Телефон</th>
          </tr>
        </thead>
        <tbody>
          {cashiers.map((c) => (
            <tr key={c._id}>
              <td className="border p-2">{c.code}</td>
              <td className="border p-2">
                {c.lastName} {c.firstName} {c.middleName}
              </td>
              <td className="border p-2">{c.address}</td>
              <td className="border p-2">{c.phone}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate(`/edit-cashier/${c.code}`)}
                  className="text-blue-600 underline"
                >
                  Редагувати
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCashiers;
