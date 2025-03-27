export const getCashierFormLabel = (key: string) => {
  const labels: Record<string, string> = {
    code: "Код касира",
    lastName: "Прізвище",
    firstName: "Ім’я",
    middleName: "По батькові",
    address: "Адреса",
    phone: "Номер телефону",
  };
  return labels[key] ?? key;
};

export const getCashierFormPlaceholder = (key: string) => {
  const placeholders: Record<string, string> = {
    code: "Введіть код (наприклад 226245)",
    lastName: "Іванов",
    firstName: "Іван",
    middleName: "Іванович",
    address: "вул. Героїв УПА 12",
    phone: "+380991112233",
  };
  return placeholders[key] ?? key;
};
