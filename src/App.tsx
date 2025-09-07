import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/login/LoginPage";
import UsersPage from "./pages/users/UsersPage";
import CreateUserPage from "./pages/new-user/CreateUserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/new-user" element={<CreateUserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
