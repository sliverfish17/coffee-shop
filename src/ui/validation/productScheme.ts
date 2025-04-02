import * as Yup from "yup";

export const productScheme = Yup.object().shape({
  code: Yup.string().required("Код товару є обов'язковим"),
  name: Yup.string().required("Назва є обов'язковою"),
  description: Yup.string(),
  price: Yup.number().required("Ціна є обов'язковою"),
  image: Yup.mixed()
    .test(
      "fileList",
      "Зображення є обов'язковим",
      (value) => value instanceof FileList && value.length > 0
    )
    .required("Зображення є обов'язковим"),
});

export const productEditScheme = Yup.object().shape({
  code: Yup.string().required("Код товару є обов'язковим"),
  name: Yup.string().required("Назва є обов'язковою"),
  description: Yup.string(),
  price: Yup.number()
    .typeError("Ціна має бути числом")
    .required("Ціна є обов'язковою"),
  image: Yup.mixed(),
});
