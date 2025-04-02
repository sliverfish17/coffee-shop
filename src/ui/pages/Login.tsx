import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../types/pages";
import { ROLES } from "../types/roles";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("auth") === "true";
    const role = localStorage.getItem("role");

    if (isAuth) {
      navigate(role === ROLES.ADMIN ? PAGES.VIEW_CASHIER : PAGES.FUND);
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");
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

      localStorage.setItem("auth", "true");
      localStorage.setItem("role", data.role);
      console.log(data.role);

      if (data.role === "admin") {
        navigate(PAGES.VIEW_CASHIER);
        return;
      }

      navigate(PAGES.FUND);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Невідома помилка");
      }
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto space-y-3">
      <h2 className="text-xl font-bold text-white text-center">Вхід</h2>

      <input
        name="username"
        placeholder="Логін"
        value={form.username}
        onChange={handleChange}
        className="border border-zinc-600 bg-zinc-800 text-white p-2 rounded w-full"
      />

      <input
        name="password"
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={handleChange}
        className="border border-zinc-600 bg-zinc-800 text-white p-2 rounded w-full"
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full"
      >
        Увійти
      </button>
    </div>
  );
};

export default Login;
