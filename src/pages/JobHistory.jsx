import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function JobHistory() {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/lcd-repairs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      const list = Array.isArray(data) ? data : data.repairs || [];
      // Sort by receivedDate descending (newest first)
      const sorted = list.sort(
        (a, b) =>
          new Date(b.receivedDate || b.createdAt) -
          new Date(a.receivedDate || a.createdAt),
      );
      setRepairs(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-200 border-yellow-500/40";
      case "In Progress":
        return "bg-blue-500/20 text-blue-200 border-blue-500/40";
      case "Completed":
        return "bg-green-500/20 text-green-200 border-green-500/40";
      case "Delivered":
        return "bg-purple-500/20 text-purple-200 border-purple-500/40";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Job History</h1>
        <p className="text-blue-200/70 text-sm mt-1">
          Complete history of all repair jobs sorted by date
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-white/30 border-t-white"></div>
        </div>
      ) : repairs.length === 0 ? (
        <div className="text-center py-20 text-blue-200/60">
          No job history found.
        </div>
      ) : (
        <div className="space-y-3">
          {repairs.map((r) => (
            <div
              key={r._id}
              onClick={() => navigate(`/repairs/edit/${r.jobNo}`)}
              className="rounded-xl bg-white/5 border border-white/10 p-4 md:p-5 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:scale-[1.01] hover:border-white/20"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded">
                      {r.jobNo}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        r.status,
                      )}`}
                    >
                      {r.status}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-white">
                      {r.customerName}
                    </span>
                    <span className="text-blue-300/60 mx-2">|</span>
                    <span className="text-blue-200">{r.phoneNo}</span>
                  </div>
                  <div className="text-xs text-blue-300/60 mt-1">
                    {r.brand} {r.modelNo} — {r.issueDescription}
                  </div>
                </div>

                <div className="flex items-center gap-4 md:text-right">
                  <div>
                    <div className="text-xs text-blue-300/60">Received</div>
                    <div className="text-sm">
                      {r.receivedDate
                        ? new Date(r.receivedDate).toLocaleDateString()
                        : new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-white/10"></div>
                  <div>
                    <div className="text-xs text-blue-300/60">Price</div>
                    <div className="text-sm font-medium">
                      Rs.{r.repairingPrice}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-300/60">Left</div>
                    <div className="text-sm font-medium text-red-300">
                      Rs.{r.leftMoney}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobHistory;
