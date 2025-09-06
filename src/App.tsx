import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/login/LoginPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
    
    </Routes>
  );
}

export default App;
