interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartProps {
  items: CartItem[];
}

export const Cart = ({ items }: CartProps) => (
  <div className="overflow-x-auto rounded border border-zinc-700 mt-4">
    <table className="w-full text-left text-sm text-white ">
      <thead className="text-x uppercase text-zinc-300">
        <tr className="bg-zinc-800 text-zinc-300">
          <th className="px-4 py-2">Назва товару</th>
          <th className="px-4 py-2">Кількість</th>
          <th className="px-4 py-2">Ціна</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr
            key={idx}
            className="border-t border-zinc-700 bg-zinc-800 text-zinc-300"
          >
            <td className="px-4 py-2">{item.name}</td>
            <td className="px-4 py-2">{item.quantity}</td>
            <td className="px-4 py-2">{item.price} грн</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
