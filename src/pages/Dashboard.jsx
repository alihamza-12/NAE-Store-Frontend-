import DashboardLayout from "../components/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      {/* Page Header */}
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
    </DashboardLayout>
  );
}

export default Dashboard;
