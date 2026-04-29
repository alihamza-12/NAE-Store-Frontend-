import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMatch } from "react-router-dom";

function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/lcd-repairs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const repairs = Array.isArray(data) ? data : data.repairs || [];
        setStats({
          total: repairs.length,
          pending: repairs.filter((r) => r.status === "Pending").length,
          completed: repairs.filter((r) => r.status === "Completed").length,
        });
      })
      .catch(() => {});
  }, []);

  const baseLink =
    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/10";
  const activeLink = "bg-white/15 font-medium border-l-2 border-blue-400";

  const SectionTitle = ({ icon, label }) => (
    <p className="text-xs text-blue-300/80 uppercase tracking-widest font-semibold mb-2 mt-4 px-4">
      {icon} {label}
    </p>
  );


const NavItem = ({ to, icon, label }) => {
  const match = useMatch({ path: to, end: true });

  return (
    <NavLink
      to={to}
      onClick={onClose}
      className={`${baseLink} ${match ? activeLink : ""}`}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/admin/logout", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem("admin");
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      });
  };

  return (
    <aside className="w-64 h-full bg-white/5 backdrop-blur-xl border-r border-white/10 text-white relative flex flex-col">
      {/* Mobile close */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Close menu"
      >
        <svg
          className="w-6 h-6"
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

      {/* Logo */}
      <div className="p-4 pb-2">
        <h2 className="text-lg font-bold">Armeco Electronics</h2>
        <p className="text-xs text-blue-300/60">LCD Repair Management</p>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {/* 🔧 Repair Management */}
        <SectionTitle icon="🔧" label="Repair Management" />
        <NavItem to="/repairs/add" icon="➕" label="Add New Repair" />
        <NavItem to="/repairs/edit/:jobNo" icon="✏️" label="Edit Repair" />
        <NavItem to="/repairs/search" icon="🔍" label="Search Repair" />
        <NavItem to="/repairs" icon="📋" label="All Repairs" />
        <NavItem to="/repairs/delivered" icon="🚚" label="Delivered Jobs" />

        {/* 📊 Admin Panel */}
        <SectionTitle icon="📊" label="Admin Panel" />
        <NavItem to="/dashboard" icon="📈" label="Dashboard Overview" />

        {/* 👤 Customer Section */}
        <SectionTitle icon="👤" label="Customer Section" />
        <NavItem to="/customers" icon="👥" label="All Customers" />
        <NavItem to="/customers/search" icon="📞" label="Search by Phone" />

        {/* ⚙️ System */}
        <SectionTitle icon="⚙️" label="System" />
        <NavItem to="/history" icon="🧾" label="Job History" />
      </nav>

      {/* Stats Summary */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-white/5 p-2">
            <div className="text-lg font-bold">{stats.total}</div>
            <div className="text-[10px] text-blue-300/60 uppercase">Total</div>
          </div>
          <div className="rounded-lg bg-white/5 p-2">
            <div className="text-lg font-bold text-yellow-300">
              {stats.pending}
            </div>
            <div className="text-[10px] text-blue-300/60 uppercase">
              Pending
            </div>
          </div>
          <div className="rounded-lg bg-white/5 p-2">
            <div className="text-lg font-bold text-green-300">
              {stats.completed}
            </div>
            <div className="text-[10px] text-blue-300/60 uppercase">Done</div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="px-2 pb-3 pt-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <span className="text-base">🔐</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
