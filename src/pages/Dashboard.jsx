import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Dashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Armeco Electronics Logo"
                className="w-10 h-10 rounded-full object-cover border border-white/30"
              />
              <span className="text-lg font-bold tracking-tight">
                Armeco Electronics
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-200">
                {admin.email || "Admin"}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500/20 border border-red-500/40 px-4 py-2 text-sm font-medium text-red-200 hover:bg-red-500/30 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-200/70">
            Welcome back to the administration panel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-lg">
            <div className="text-blue-300 text-sm font-medium uppercase tracking-wider mb-1">
              Total Products
            </div>
            <div className="text-4xl font-bold">0</div>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-lg">
            <div className="text-blue-300 text-sm font-medium uppercase tracking-wider mb-1">
              Total Orders
            </div>
            <div className="text-4xl font-bold">0</div>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-lg">
            <div className="text-blue-300 text-sm font-medium uppercase tracking-wider mb-1">
              Total Users
            </div>
            <div className="text-4xl font-bold">0</div>
          </div>
        </div>

        {/* Content Placeholder */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <p className="text-blue-200/70 leading-relaxed">
            This is your admin dashboard. You can manage products, orders, and
            users from here. More features will be added soon.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
