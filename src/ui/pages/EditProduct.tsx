import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useProductByCode } from "../hooks/useProductByCode";
import { productEditScheme } from "../validation/productScheme";
import * as yup from "yup";

type FormData = yup.InferType<typeof productEditScheme>;

const EditProduct = () => {
  const { product, isLoading, error, code } = useProductByCode();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей товар?")) return;
    try {
      const res = await fetch(`http://localhost:3000/products/${code}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();
      toast.success("Товар видалено успішно");
      navigate("/view-product");
    } catch {
      toast.error("Помилка при видаленні товару");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(productEditScheme),
    mode: "onChange",
  });

  useEffect(() => {
    if (product) {
      const { ...rest } = product;
      reset(rest);
    }
  }, [product, reset]);

  console.log(isValid, errors);
  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${code}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      toast.success("Товар оновлено успішно");
      navigate("/view-product");
    } catch {
      toast.error("Помилка при оновленні товару");
    }
  };

  if (isLoading) return <div className="p-4 text-white">Завантаження...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container max-w-xl mx-auto space-y-6 py-10">
      <h1 className="text-4xl text-center text-white font-bold">
        Редагувати товар
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Назва"
          placeholder="Капучино"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Опис"
          placeholder="Смачна кава"
          {...register("description")}
          error={errors.description?.message}
        />
        <Input
          label="Ціна"
          placeholder="85"
          type="number"
          {...register("price")}
          error={errors.price?.message}
        />
        <Button type="button" fullWidth onClick={handleDelete}>
          Видалити товар
        </Button>

        <Button type="submit" fullWidth disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Збереження..." : "Зберегти зміни"}
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
