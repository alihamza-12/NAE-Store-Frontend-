import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition";

  return (
    <aside className="w-64 min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-4 text-white">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

      {/* Dashboard */}
      <div className="mb-6">
        <p className="text-xs text-blue-300 mb-2 uppercase">Dashboard</p>
        <NavLink to="/dashboard" className={linkClass}>
          📊 Overview
        </NavLink>
      </div>

      {/* Repairs */}
      <div className="mb-6">
        <p className="text-xs text-blue-300 mb-2 uppercase">Repairs</p>
        <NavLink to="/repairs" className={linkClass}>
          📋 All Repairs
        </NavLink>
        <NavLink to="/repairs/add" className={linkClass}>
          ➕ Add Repair
        </NavLink>
        <NavLink to="/repairs/search" className={linkClass}>
          🔍 Search Repair
        </NavLink>
        <NavLink to="/repairs/delivered" className={linkClass}>
          🚚 Delivered Jobs
        </NavLink>
      </div>

      {/* Customers */}
      <div className="mb-6">
        <p className="text-xs text-blue-300 mb-2 uppercase">Customers</p>
        <NavLink to="/customers" className={linkClass}>
          👥 All Customers
        </NavLink>
        <NavLink to="/customers/search" className={linkClass}>
          📞 Search by Phone
        </NavLink>
      </div>

      {/* System */}
      <div>
        <p className="text-xs text-blue-300 mb-2 uppercase">System</p>
        <NavLink to="/history" className={linkClass}>
          🧾 Job History
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
