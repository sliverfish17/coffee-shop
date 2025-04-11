import { PAGES } from "../types/pages";
import { ROLES } from "../types/roles";

export const menuItems: {
  category: string;
  roles: string[];
  links: {
    label: string;
    to: string;
    onClick?: () => void;
  }[];
}[] = [
  {
    category: "Касир",
    roles: [ROLES.ADMIN],
    links: [
      { label: "💼 Додати касира", to: PAGES.ADD_CASHIER },
      { label: "👁️ Перегляд касирів", to: PAGES.VIEW_CASHIER },
    ],
  },
  {
    category: "Товар",
    roles: [ROLES.ADMIN, ROLES.CASHIER],
    links: [
      { label: "🛒 Додати товар", to: PAGES.ADD_PRODUCT },
      { label: "👁️ Перегляд товарів", to: PAGES.VIEW_PRODUCT },
    ],
  },
  {
    category: "Транзакції",
    roles: [ROLES.ADMIN],
    links: [{ label: "💳 Переглянути транзакції", to: PAGES.TRANSACTIONS }],
  },
  {
    category: "Робота",
    roles: [ROLES.CASHIER],
    links: [{ label: "💵 Каса", to: PAGES.FUND }],
  },
  {
    category: "Обліковий запис",
    roles: [ROLES.ADMIN, ROLES.CASHIER],
    links: [
      {
        label: "🚪 Вийти",
        to: PAGES.LOGIN,
        onClick: () => {
          localStorage.removeItem("auth");
          localStorage.removeItem("role");
        },
      },
    ],
  },
];
