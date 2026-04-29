import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white flex flex-col overflow-hidden">
      <header className="shrink-0">
        <Navbar admin={admin} onMenuToggle={toggleSidebar} />
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}

        <aside
          className={`
            fixed md:static top-0 left-0 z-50 h-full
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:block
          `}
        >
          <Sidebar onClose={closeSidebar} />
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
