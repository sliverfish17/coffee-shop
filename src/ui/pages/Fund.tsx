import { useFund } from "../hooks/useFund";
import { Cart } from "../components/ui/Cart";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { useTransaction } from "../hooks/useTransaction";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const Fund = () => {
  const {
    cashiers,
    products,
    cart,
    form,
    setForm,
    handleAddProduct,
    handleRemove,
    removeId,
    setRemoveId,
    total,
    setCart,
  } = useFund();
  const { sendTransaction, loading } = useTransaction();

  const getCashierIdByCode = (code: string) => {
    const found = cashiers.find((c) => c.code === code);
    return found?.id ?? null;
  };

  const cashierId = getCashierIdByCode(form.cashier);

  const handlePurchase = async () => {
    if (!form.cashier) {
      toast.error("Оберіть касира перед покупкою");
      return;
    }

    if (!form.paymentType) {
      toast.error("Оберіть тип оплати");
      return;
    }

    if (cart.length === 0) {
      toast.error("Кошик порожній");
      return;
    }

    const now = new Date().toISOString();

    const items = cart.map((item) => ({
      transactionCode: form.transactionCode,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      date: now,
      cashierId,
    }));

    const success = await sendTransaction(items);
    if (success) {
      setCart([]);
      setForm((prev) => ({
        ...prev,
        transactionCode: uuidv4().slice(0, 6),
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 container mx-auto py-10 text-white">
      {/* Left */}
      <div className="space-y-4 lg:col-span-1">
        <h1 className="text-4xl text-center font-bold">Каса</h1>

        <Select
          label="Касир"
          value={form.cashier}
          onChange={(e) => setForm({ ...form, cashier: e.target.value })}
          options={cashiers.map((c) => ({
            value: c.code,
            label: `${c.lastName} ${c.firstName}`,
          }))}
        />

        <input
          value={form.transactionCode}
          readOnly
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />

        {cart.length !== 0 && <Cart items={cart} />}

        <Select
          label="Видалити товар"
          value={removeId}
          onChange={(e) => setRemoveId(e.target.value)}
          options={cart.map((c) => ({ value: c.productId, label: c.name }))}
        />

        <Button onClick={handleRemove} fullWidth>
          Видалити
        </Button>

        <Select
          label="Тип оплати"
          value={form.paymentType}
          onChange={(e) => setForm({ ...form, paymentType: e.target.value })}
          options={[
            { value: "Готівка", label: "Готівка" },
            { value: "Картка", label: "Картка" },
          ]}
        />

        <div className="text-right text-xl font-semibold pt-4">
          Сума: {total} грн
        </div>

        <Button onClick={handlePurchase} disabled={loading} fullWidth>
          Покупка
        </Button>
      </div>

      {/* Right */}
      <div className="lg:col-span-2 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 justify-center">
        {products.map((product) => (
          <div
            key={product.code}
            onClick={() => handleAddProduct(product, 1)}
            className="cursor-pointer group border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900 hover:shadow-lg transition flex flex-col w-40 sm:w-44 h-60"
          >
            <div className="h-2/3 overflow-hidden">
              {product.imageUrl ? (
                <img
                  src={`http://localhost:3000${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-zinc-500">
                  Немає фото
                </div>
              )}
            </div>

            <div className="p-2 flex-1 flex flex-col justify-between">
              <h2 className="font-semibold text-sm truncate">{product.name}</h2>
              <p className="text-xs text-zinc-400 truncate">
                {product.description || "—"}
              </p>
              <div className="text-right font-bold text-base">
                {product.price} грн
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fund;
