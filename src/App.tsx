import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/login/LoginPage";
import CreateUserPage from "./pages/customers/CreateUserPage";
import CustomersPage from "./pages/customers/CustomersPage";
import CreateReceive from "./pages/receive/CreateReceive";
import AllReceives from "./pages/receive/AllReceives";

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
      </Route>
    </Routes>
  );
}

export default App;
