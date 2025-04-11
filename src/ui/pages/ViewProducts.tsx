import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { PAGES } from "../types/pages";
import { useProducts } from "../hooks/useProducts";

const ViewProducts = () => {
  const { products, isLoading, error } = useProducts();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl sm:text-4xl text-center text-white font-bold mb-8">
        Список товарів
      </h1>

      {isLoading && (
        <p className="text-center text-zinc-500 py-6">Завантаження...</p>
      )}
      {error && <p className="text-center text-red-500 py-6">{error}</p>}

      {!isLoading && products.length === 0 && (
        <p className="text-center text-zinc-500 py-6 italic">Дані відсутні</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.code}
            className="relative group border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900 p-4 flex flex-col gap-4 transition hover:shadow-lg"
          >
            <div className="relative w-full h-40 overflow-hidden rounded-lg">
              {product.imageUrl ? (
                <img
                  src={`http://localhost:3000${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">
                  Немає фото
                </div>
              )}

              {/* Кнопка редагування */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Button
                  onClick={() =>
                    navigate(`${PAGES.UPDATE_PRODUCT}/${product.code}`)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Редагувати
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white mb-1">
                {product.name}
              </h2>
              <p className="text-sm text-zinc-400 line-clamp-2">
                {product.description || "—"}
              </p>
            </div>

            <div className="text-right text-lg font-bold text-white">
              {product.price} грн
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
