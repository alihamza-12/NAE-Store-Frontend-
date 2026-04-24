import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar admin={admin} />

      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
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
    </div>
  );
}

export default Dashboard;
