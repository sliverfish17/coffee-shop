import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import AddCashier from "./pages/AddCashier";
import EditCashier from "./pages/EditCashier";
import ViewCashiers from "./pages/ViewCashiers";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import ViewProducts from "./pages/ViewProducts";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import { PAGES } from "./types/pages";
import PrivateRoutes from "./components/PrivateRoutes";

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
      <Route path={PAGES.LOGIN} element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path={PAGES.ADD_CASHIER} element={<AddCashier />} />
        <Route path={`${PAGES.EDIT_CASHIER}/:code`} element={<EditCashier />} />
        <Route path={PAGES.VIEW_CASHIER} element={<ViewCashiers />} />
        <Route path={PAGES.ADD_PRODUCT} element={<AddProduct />} />
        <Route path={PAGES.UPDATE_PRODUCT} element={<UpdateProduct />} />
        <Route path={PAGES.VIEW_PRODUCT} element={<ViewProducts />} />
        <Route path={PAGES.TRANSACTIONS} element={<Transactions />} />
        <Route
          path="*"
          element={
            <div className="text-white text-center p-10">Головна сторінка</div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
