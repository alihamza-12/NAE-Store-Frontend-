import { NavLink } from "react-router-dom";

function Sidebar({ onClose }) {
  const linkClass =
    "block px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition";

  return (
    <aside className="w-64 h-full bg-white/5 backdrop-blur-xl border-r border-white/10 p-4 text-white relative">
      {/* Mobile close button */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Close menu"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="text-lg font-bold mb-6 mt-2 md:mt-0">Admin Panel</h2>

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
