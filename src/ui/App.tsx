import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PrivateRoutes from "./components/PrivateRoutes";
import Drawer from "./components/ui/Drawer";
import { PAGES } from "./types/pages";

const AddCashier = lazy(() => import("./pages/AddCashier"));
const EditCashier = lazy(() => import("./pages/EditCashier"));
const ViewCashiers = lazy(() => import("./pages/ViewCashiers"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const UpdateProduct = lazy(() => import("./pages/EditProduct"));
const ViewProducts = lazy(() => import("./pages/ViewProducts"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Fund = lazy(() => import("./pages/Fund"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.electron?.onNavigate) {
      window.electron.onNavigate((path) => {
        navigate(path);
      });
    }
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 2000 }}
        reverseOrder={false}
      />
      <Drawer />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path={PAGES.LOGIN} element={<Login />} />
          <Route element={<PrivateRoutes />}>
            {role === "admin" && (
              <>
                <Route path={PAGES.ADD_CASHIER} element={<AddCashier />} />
                <Route
                  path={`${PAGES.EDIT_CASHIER}/:code`}
                  element={<EditCashier />}
                />
                <Route path={PAGES.VIEW_CASHIER} element={<ViewCashiers />} />
                <Route path={PAGES.ADD_PRODUCT} element={<AddProduct />} />
                <Route
                  path={`${PAGES.UPDATE_PRODUCT}/:code`}
                  element={<UpdateProduct />}
                />
                <Route path={PAGES.VIEW_PRODUCT} element={<ViewProducts />} />
                <Route path={PAGES.TRANSACTIONS} element={<Transactions />} />
              </>
            )}
            {role === "cashier" && (
              <Route path={PAGES.FUND} element={<Fund />} />
            )}
            <Route path="*" element={<Navigate to={PAGES.LOGIN} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
