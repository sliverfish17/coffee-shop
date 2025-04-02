import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";

import { useCashierByCode } from "../hooks/useCashierByCode";
import { cashierScheme } from "../validation/cashierScheme";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

type FormData = yup.InferType<typeof cashierScheme>;

const EditCashier = () => {
  const { cashier, isLoading, error, code } = useCashierByCode();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(cashierScheme),
    mode: "onChange",
  });

  // коли дані прийшли — наповнюємо форму
  useEffect(() => {
    if (cashier) {
      reset(cashier);
    }
  }, [cashier, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`http://localhost:3000/cashiers/${code}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      toast.success("Касира оновлено успішно");
      navigate("/view-cashier");
    } catch {
      toast.error("Помилка при оновленні");
    }
  };

  if (isLoading) return <div className="p-4 text-white">Завантаження...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container max-w-xl mx-auto space-y-6 py-10">
      <h1 className="text-4xl text-center text-white font-bold">
        Редагувати касира
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Прізвище"
          placeholder="Іванов"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Input
          label="Ім’я"
          placeholder="Іван"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          label="По батькові"
          placeholder="Іванович"
          {...register("middleName")}
          error={errors.middleName?.message}
        />
        <Input
          label="Адреса"
          placeholder="вул. Героїв УПА 12"
          {...register("address")}
          error={errors.address?.message}
        />
        <Input
          label="Телефон"
          placeholder="+380991112233"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Button type="submit" fullWidth disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Збереження..." : "Зберегти зміни"}
        </Button>
      </form>
    </div>
  );
};

export default EditCashier;
