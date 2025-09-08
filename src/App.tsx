import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/login/LoginPage";
import CreateUserPage from "./pages/customers/CreateUserPage";
import CustomersPage from "./pages/customers/CustomersPage";
import CreateReceive from "./pages/receive/CreateReceive";
import AllReceives from "./pages/receive/AllReceives";
import CreatePayment from "./pages/payment/CreatePayment";
import AllPayments from "./pages/payment/AllPayments";
import CreateProduct from "./pages/product-services/CreateProduct";
import CreateService from "./pages/product-services/CreateService";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<CustomersPage />} />
        <Route path="/new-user" element={<CreateUserPage />} />
        <Route path="/new-receive" element={<CreateReceive />} />
        <Route path="/receives" element={<AllReceives />} />
        <Route path="/new-payment" element={<CreatePayment />} />
        <Route path="/payments" element={<AllPayments />} />
        <Route path="/new-product" element={<CreateProduct />} />
        <Route path="/new-service" element={<CreateService />} />
      </Route>
    </Routes>
  );
}

export default App;
