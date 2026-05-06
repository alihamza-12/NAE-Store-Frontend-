import { useEffect, useState } from "react";
import { lcdRepair } from "../../api/lcd-repairs";

function DeliveredJobs() {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRepairs();
  }, []);

  const fetchRepairs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await lcdRepair();
  
      setRepairs(Array.isArray(data) ? data : data.repairs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Delivered Jobs</h1>
        <p className="text-blue-200/70 text-sm mt-1">
          All completed and delivered repair jobs
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
          No delivered jobs yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-blue-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">Job No</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Brand</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Advance</th>
                <th className="px-4 py-3 font-medium">Left</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {repairs.map((r) => (
                <tr key={r._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{r.jobNo}</td>
                  <td className="px-4 py-3">{r.customerName}</td>
                  <td className="px-4 py-3">{r.phoneNo}</td>
                  <td className="px-4 py-3">{r.brand}</td>
                  <td className="px-4 py-3">Rs.{r.repairingPrice}</td>
                  <td className="px-4 py-3">Rs.{r.advance}</td>
                  <td className="px-4 py-3 text-red-300">₹{r.leftMoney}</td>
                  <td className="px-4 py-3 text-xs">
                    {r.receivedDate
                      ? new Date(r.receivedDate).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DeliveredJobs;
