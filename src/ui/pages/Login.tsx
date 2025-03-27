import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Помилка входу");
      }

      const data = await res.json();
      console.log("✅ Успішний вхід", data);

      localStorage.setItem("auth", "true");
      navigate("/view-cashier");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto space-y-3">
      <h2 className="text-xl font-bold">Вхід</h2>
      <input
        name="username"
        placeholder="Логін"
        value={form.username}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Увійти
      </button>
    </div>
  );
};

export default Login;
