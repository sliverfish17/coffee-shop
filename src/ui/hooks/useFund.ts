import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type CartItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

type Cashier = {
  code: string;
  lastName: string;
  firstName: string;
  middleName: string;
};

type Product = {
  code: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

export const useFund = () => {
  const [cashiers, setCashiers] = useState<Cashier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [removeId, setRemoveId] = useState("");

  const [form, setForm] = useState({
    cashier: "",
    product: "",
    quantity: 1,
    paymentType: "",
    transactionCode: uuidv4().slice(0, 6),
  });

  useEffect(() => {
    fetch("http://localhost:3000/cashiers")
      .then((res) => res.json())
      .then(setCashiers);
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleAdd = () => {
    const product = products.find((p) => p.code === form.product);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((c) => c.productId === product.code);
      if (existing) {
        return prev.map((c) =>
          c.productId === product.code
            ? { ...c, quantity: c.quantity + +form.quantity }
            : c
        );
      }

      return [
        ...prev,
        {
          productId: product.code,
          name: product.name,
          quantity: +form.quantity,
          price: product.price,
        },
      ];
    });
  };

  const handleRemove = () => {
    setCart((prev) => prev.filter((item) => item.productId !== removeId));
  };

  const total = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  const handleAddProduct = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === product.code);
      if (existing) {
        return prev.map((c) =>
          c.productId === product.code
            ? { ...c, quantity: c.quantity + quantity }
            : c
        );
      }

      return [
        ...prev,
        {
          productId: product.code,
          name: product.name,
          quantity,
          price: product.price,
        },
      ];
    });
  };

  return {
    cashiers,
    products,
    cart,
    form,
    setForm,
    handleAdd,
    handleAddProduct,
    handleRemove,
    removeId,
    setRemoveId,
    total,
    setCart,
  };
};
