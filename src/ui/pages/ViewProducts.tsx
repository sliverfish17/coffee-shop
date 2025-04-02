import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { PAGES } from "../types/pages";
import { useProducts } from "../hooks/useProducts";

const ViewProducts = () => {
  const { products, isLoading, error } = useProducts();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto space-y-6 py-10">
      <h1 className="text-3xl sm:text-4xl text-center text-white font-bold mb-8">
        Список товарів
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-zinc-700">
        <table className="w-full text-left text-sm text-white bg-zinc-900">
          <thead className="bg-zinc-800 text-zinc-300 text-xs uppercase tracking-wider">
            <tr className="bg-zinc-900">
              <th className="px-4 py-3">Код</th>
              <th className="px-4 py-3">Назва</th>
              <th className="px-4 py-3">Опис</th>
              <th className="px-4 py-3">Ціна</th>
              <th className="px-4 py-3">Зображення</th>
              <th className="px-4 py-3 text-right">Дія</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="text-center text-zinc-500 py-6">
                  Завантаження...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={6} className="text-center text-red-500 py-6">
                  {error}
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t border-zinc-700 bg-zinc-800 transition text-white"
              >
                <td className="px-4 py-3 font-mono">{product.code}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td
                  className="px-4 py-3 max-w-[164px] truncate whitespace-nowrap overflow-hidden"
                  title={product.description}
                >
                  {product.description}
                </td>
                <td className="px-4 py-3">{product.price} грн</td>
                <td className="px-4 py-3">
                  {product.imageUrl ? (
                    <img
                      src={`http://localhost:3000${product.imageUrl}`}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md mx-auto"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    onClick={() =>
                      navigate(`${PAGES.UPDATE_PRODUCT}/${product.code}`)
                    }
                    className="text-blue-500 hover:text-blue-400 transition underline font-medium"
                  >
                    Редагувати
                  </Button>
                </td>
              </tr>
            ))}
            {products.length === 0 && !isLoading && (
              <tr>
                <td
                  colSpan={6}
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

export default ViewProducts;
