import { useFund } from "../hooks/useFund";
import { Cart } from "../components/ui/Cart";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { useTransaction } from "../hooks/useTransaction";
import { v4 as uuidv4 } from "uuid";

const Fund = () => {
  const {
    cashiers,
    products,
    cart,
    form,
    setForm,
    handleAdd,
    handleRemove,
    removeId,
    setRemoveId,
    total,
    setCart,
  } = useFund();
  const { sendTransaction, loading } = useTransaction();

  const handlePurchase = async () => {
    const now = new Date().toISOString();

    const items = cart.map((item) => ({
      transactionCode: form.transactionCode,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      date: now,
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
    <div className="container mx-auto max-w-3xl py-10 text-white space-y-4">
      <h1 className="text-4xl text-center font-bold">Каса</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Касир"
          value={form.cashier}
          onChange={(e) => setForm({ ...form, cashier: e.target.value })}
          options={cashiers.map((c) => ({
            value: c.code,
            label: `${c.lastName} ${c.firstName}`,
          }))}
        />
        <div>
          <label className="text-sm font-medium text-white">
            Код транзакції
          </label>
          <input
            value={form.transactionCode}
            readOnly
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Select
          label="Товар"
          value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })}
          options={products.map((p) => ({ value: p.code, label: p.name }))}
        />
        <div>
          <label className="text-sm font-medium text-white">Кількість</label>
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
            className="w-full p-2 rounded bg-zinc-800 text-white"
            min={1}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={handleAdd} fullWidth>
            Додати товар
          </Button>
        </div>
      </div>
      {cart.length !== 0 && <Cart items={cart} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Відмінити товар"
          value={removeId}
          onChange={(e) => setRemoveId(e.target.value)}
          options={cart.map((c) => ({ value: c.productId, label: c.name }))}
        />
        <div className="flex items-end">
          <Button onClick={handleRemove} fullWidth>
            Видалити
          </Button>
        </div>
      </div>

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
        Загальна сума: {total} грн
      </div>
      <Button onClick={handlePurchase} disabled={loading} fullWidth>
        Покупка
      </Button>
    </div>
  );
};

export default Fund;
