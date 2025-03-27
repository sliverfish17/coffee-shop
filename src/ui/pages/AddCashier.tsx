import { useState } from "react";

const AddCashier = () => {
  const [form, setForm] = useState({
    code: "",
    lastName: "",
    firstName: "",
    middleName: "",
    address: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/cashiers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("✅ Касир створений:", data);
    } catch (err) {
      console.error("❌ Помилка при створенні касира:", err);
    }
  };

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl">Новий касир</h2>
      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          name={key}
          value={value}
          onChange={handleChange}
          placeholder={key}
          className="block border p-1 rounded w-full"
        />
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Додати
      </button>
    </div>
  );
};

export default AddCashier;
