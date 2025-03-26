import { Routes, Route, useNavigate } from "react-router-dom";

import AddCashier from "./pages/AddCashier";
import EditCashier from "./pages/EditCashier";
import ViewCashiers from "./pages/ViewCashiers";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import ViewProducts from "./pages/ViewProducts";
import { PAGES } from "./types/pages";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.electron?.onNavigate) {
      window.electron.onNavigate((path) => {
        navigate(path);
      });
    }
  }, []);

  return (
    <Routes>
      <Route path={PAGES.ADD_CASHIER} element={<AddCashier />} />
      <Route path={PAGES.EDIT_CASHIER} element={<EditCashier />} />
      <Route path={PAGES.VIEW_CASHIER} element={<ViewCashiers />} />
      <Route path={PAGES.ADD_PRODUCT} element={<AddProduct />} />
      <Route path={PAGES.UPDATE_PRODUCT} element={<UpdateProduct />} />
      <Route path={PAGES.VIEW_PRODUCT} element={<ViewProducts />} />
      <Route
        path="*"
        element={
          <div className="text-white text-center p-10">Главная страница</div>
        }
      />
    </Routes>
  );
}

export default App;
