import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { lcdRepair } from "../../api/lcd-repairs";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    delivered: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lcdRepair()
      .then((data) => {
        const repairs = Array.isArray(data) ? data : data.repairs || [];
        setStats({
          total: repairs.length,
          pending: repairs.filter((r) => r.status === "Pending").length,
          completed: repairs.filter((r) => r.status === "Completed").length,
          delivered: repairs.filter((r) => r.status === "Delivered").length,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Jobs", value: stats.total, color: "text-white" },
    { label: "Pending", value: stats.pending, color: "text-yellow-300" },
    { label: "Completed", value: stats.completed, color: "text-green-300" },
    { label: "Delivered", value: stats.delivered, color: "text-blue-300" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-blue-200/70">Overview of your repair shop</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 md:p-6 shadow-lg"
          >
            <div className="text-blue-300 text-xs font-medium uppercase tracking-wider mb-1">
              {card.label}
            </div>
            <div className={`text-3xl md:text-4xl font-bold ${card.color}`}>
              {loading ? "—" : card.value}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/repairs/add"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            ➕ New Repair Job
          </Link>
          <Link
            to="/repairs"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-sm font-medium hover:bg-white/15 transition-colors"
          >
            📋 View All Jobs
          </Link>
          <Link
            to="/repairs/search"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-sm font-medium hover:bg-white/15 transition-colors"
          >
            🔍 Search Job
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
