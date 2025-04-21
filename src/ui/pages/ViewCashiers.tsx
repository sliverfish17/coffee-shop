import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { PAGES } from "../types/pages";
import { useCashiers } from "../hooks/useCashiers";

const ViewCashiers = () => {
  const { cashiers, isLoading, error } = useCashiers();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto space-y-6 py-10">
      <h1 className="text-3xl sm:text-4xl text-center text-white font-bold mb-8">
        Список касирів
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-zinc-700">
        <table className="w-full text-left text-sm text-white bg-zinc-900">
          <thead className="bg-zinc-800 text-zinc-300 text-xs uppercase tracking-wider">
            <tr className="bg-zinc-900">
              <th className="px-4 py-3">Код</th>
              <th className="px-4 py-3">ПІБ</th>
              <th className="px-4 py-3">Адреса</th>
              <th className="px-4 py-3">Телефон</th>
              <th className="px-4 py-3 text-right">Дія</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="text-center text-zinc-500 py-6">
                  Завантаження...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={5} className="text-center text-red-500 py-6">
                  {error}
                </td>
              </tr>
            )}
            {Array.isArray(cashiers) &&
              cashiers.map((c) => (
                <tr
                  key={c.code}
                  className="border-t border-zinc-700 bg-zinc-800 transition text-white"
                >
                  <td className="px-4 py-3 font-mono">{c.code}</td>
                  <td className="px-4 py-3">
                    {c.lastName} {c.firstName} {c.middleName}
                  </td>
                  <td className="px-4 py-3">{c.address}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      onClick={() =>
                        navigate(`${PAGES.EDIT_CASHIER}/${c.code}`)
                      }
                      className="text-blue-500 hover:text-blue-400 transition underline font-medium"
                    >
                      Редагувати
                    </Button>
                  </td>
                </tr>
              ))}
            {cashiers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-zinc-500 py-6 italic"
                >
                  Дані відсутні
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCashiers;
