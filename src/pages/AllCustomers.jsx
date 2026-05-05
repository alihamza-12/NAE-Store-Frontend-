import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lcdRepair } from "../../api/lcd-repairs";

function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const data =await lcdRepair();

      const repairs = Array.isArray(data) ? data : data.repairs || [];

      // Extract unique customers by phone number
      //   const uniqueMap = new Map();
      //   repairs.forEach((r) => {
      //     if (!uniqueMap.has(r.phoneNo)) {
      //       uniqueMap.set(r.phoneNo, {
      //         name: r.customerName,
      //         phoneNo: r.phoneNo,
      //         jobs: 1,
      //         lastVisit: r.receivedDate || r.createdAt,
      //       });
      //     } else {
      //       const existing = uniqueMap.get(r.phoneNo);
      //       existing.jobs += 1;
      //       const newDate = r.receivedDate || r.createdAt;
      //       if (newDate && newDate > existing.lastVisit) {
      //         existing.lastVisit = newDate;
      //       }
      //     }
      //   });

      setCustomers(repairs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">All Customers</h1>
        {/* <p className="text-blue-200/70 text-sm mt-1">
          Unique customers from all repair records
        </p> */}
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
      ) : customers.length === 0 ? (
        <div className="text-center py-20 text-blue-200/60">
          No customers found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-blue-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Job No</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.map((r) => (
                // <tr key={r._id} className="hover:bg-white/5 transition-colors">
                <tr
                  key={r._id}
                  onClick={() => navigate(`/repairs/edit/${r.jobNo}`)}
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium">{r.customerName}</td>
                  <td className="px-4 py-3">{r.phoneNo}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-500/40">
                      {r.jobNo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {r.receivedDate || r.createdAt
                      ? new Date(
                          r.receivedDate || r.createdAt,
                        ).toLocaleDateString()
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

export default AllCustomers;
