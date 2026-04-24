import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="shrink-0">
        <Navbar admin={admin} />
      </header>

      {/* Body: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="shrink-0">
          <Sidebar />
        </aside>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
