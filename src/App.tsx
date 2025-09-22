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
import AllProAndService from "./pages/product-services/AllProAndService";
import CreateBank from "./pages/bank/CreateBank";
import AllBanks from "./pages/bank/AllBanks";
import AllVault from "./pages/vault/AllVault";
import CreateVault from "./pages/vault/CreateVault";
import CreateTransfer from "./pages/transfer/CreateTransfer";
import AllTransfer from "./pages/transfer/AllTransfer";
import AllFund from "./pages/fund/AllFund";
import CreateFund from "./pages/fund/CreateFund";
import AllStorage from "./pages/storage/AllStorage";
import CreateStorage from "./pages/storage/CreateStorage";
import CreateSeller from "./pages/sellers/CreateSeller";
import AllSellers from "./pages/sellers/AllSellers";
import CreateSale from "./pages/sales/CreateSale";
import AllSales from "./pages/sales/AllSales";
import AllProjects from "./pages/product-services/AllProjects";
import CreateSalesReturn from "./pages/sales/CreateSalesReturn";
import CreateBuyFactore from "./pages/buy/CreateBuyFactore";
import CreateBuyReturnFactore from "./pages/buy/CreateBuyReturnFactore";
import AllBuyFactore from "./pages/buy/AllBuyFactore";
import AllBuyReturnFactore from "./pages/buy/AllBuyReturnFactore";
import AllSalesReturn from "./pages/sales/AllSalesReturn";

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
        <Route path="/product-service-list" element={<AllProAndService />} />
        <Route path="/new-bank" element={<CreateBank />} />
        <Route path="/banks" element={<AllBanks />} />
        <Route path="/new-fund" element={<CreateVault />} />
        <Route path="/funds" element={<AllVault />} />
        <Route path="/new-imprest" element={<CreateFund />} />
        <Route path="/imprests" element={<AllFund />} />
        <Route path="/new-transfer" element={<CreateTransfer />} />
        <Route path="/transfers" element={<AllTransfer />} />
        <Route path="/storages" element={<AllStorage />} />
        <Route path="/new-storage" element={<CreateStorage />} />
        <Route path="/new-seller" element={<CreateSeller />} />
        <Route path="/sellers" element={<AllSellers />} />
        <Route path="/projects-list" element={<AllProjects />} />

        <Route path="/new-sale" element={<CreateSale />} />
        <Route path="/new-sale-return" element={<CreateSalesReturn />} />
        <Route path="/sales" element={<AllSales />} />
        <Route path="/sales-return" element={<AllSalesReturn />} />

        <Route path="/new-buy" element={<CreateBuyFactore />} />
        <Route path="/new-buy-return" element={<CreateBuyReturnFactore />} />
        <Route path="/buys" element={<AllBuyFactore />} />
        <Route path="/buys-return" element={<AllBuyReturnFactore />} />
      </Route>
    </Routes>
  );
}

export default App;
