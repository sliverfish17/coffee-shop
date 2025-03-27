import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";
import { cashierScheme } from "../validation/cashierScheme";

type FormData = yup.InferType<typeof cashierScheme>;

const AddCashier = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(cashierScheme),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("http://localhost:3000/cashiers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Server error");

      toast.success("Касира успішно додано!");
      reset();
    } catch {
      toast.error("Помилка при створенні касира");
    }
  };

  return (
    <div className="container max-w-xl mx-auto space-y-6 py-10">
      <h1 className="text-3xl sm:text-4xl text-center text-white font-bold">
        Додати нового касира
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Код касира"
          placeholder="226245"
          {...register("code")}
          error={errors.code?.message}
        />
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
        <Button
          className="mt-6"
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? "Завантаження..." : "Додати"}
        </Button>
      </form>
    </div>
  );
};

export default AddCashier;
