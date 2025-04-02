import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";
import { productScheme } from "../validation/productScheme";
import { FileSelect } from "../components/ui/FileSelect";
import type * as yup from "yup";

type FormData = yup.InferType<typeof productScheme>;

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(productScheme),
    mode: "onChange",
  });

  const imageValue = watch("image", undefined) as FileList | undefined;
  const previewUrl =
    imageValue && imageValue.length > 0
      ? URL.createObjectURL(imageValue[0])
      : undefined;

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("price", String(data.price));
    formData.append("image", (data.image as FileList)[0]);

    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Server error");

      toast.success("Товар успішно додано!");
      reset();
    } catch {
      toast.error("Помилка при додаванні товару");
    }
  };

  return (
    <div className="container max-w-xl mx-auto space-y-6 py-10">
      <h1 className="text-4xl text-center text-white font-bold">
        Додати новий товар
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Код товару"
          placeholder="12345"
          {...register("code")}
          error={errors.code?.message}
        />
        <Input
          label="Назва"
          placeholder="Капучино"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Опис"
          placeholder="Ніжна кава з молоком"
          {...register("description")}
          error={errors.description?.message}
        />
        <Input
          label="Ціна (грн)"
          type="number"
          placeholder="85"
          {...register("price")}
          error={errors.price?.message}
        />

        <FileSelect
          label="Зображення"
          {...register("image")}
          previewUrl={previewUrl}
          error={errors.image?.message}
        />

        <Button type="submit" fullWidth disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Завантаження..." : "Додати"}
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
