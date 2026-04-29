import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import RepairsList from "./pages/RepairsList";
import AddRepair from "./pages/AddRepair";
import EditRepair from "./pages/EditRepair";
import SearchRepair from "./pages/SearchRepair";
import DeliveredJobs from "./pages/DeliveredJobs";
import AllCustomers from "./pages/AllCustomers";
import SearchByPhone from "./pages/SearchByPhone";
import JobHistory from "./pages/JobHistory";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/repairs" element={<RepairsList />} />
            <Route path="/repairs/add" element={<AddRepair />} />
            <Route path="/repairs/edit/:jobNo" element={<EditRepair />} />
            <Route path="/repairs/search" element={<SearchRepair />} />
            <Route path="/repairs/delivered" element={<DeliveredJobs />} />
            <Route path="/customers" element={<AllCustomers />} />
            <Route path="/customers/search" element={<SearchByPhone />} />
            <Route path="/history" element={<JobHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
