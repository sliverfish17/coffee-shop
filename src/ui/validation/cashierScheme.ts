import * as yup from "yup";

const nameRegex = /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґA-Za-z'’\-\s]+$/;

export const cashierScheme = yup.object().shape({
  code: yup
    .number()
    .typeError("Код має бути числом")
    .integer("Код має бути цілим числом")
    .positive("Код має бути додатнім")
    .required("Код обов’язковий"),

  lastName: yup
    .string()
    .matches(nameRegex, "Прізвище має містити лише літери")
    .required("Прізвище обов’язкове"),

  firstName: yup
    .string()
    .matches(nameRegex, "Ім’я має містити лише літери")
    .required("Ім’я обов’язкове"),

  middleName: yup
    .string()
    .matches(nameRegex, "По батькові має містити лише літери")
    .required("По батькові обов’язкове"),

  address: yup
    .string()
    .min(3, "Адреса занадто коротка")
    .required("Адреса обов’язкова"),

  phone: yup
    .string()
    .required("Телефон обов’язковий")
    .matches(/^\+?[0-9]{9,15}$/, "Невірний формат телефону"),
});
