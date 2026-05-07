import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lcdRepair } from "../../api/lcd-repairs";

function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;

    const includes = (val) => (val ?? "").toString().toLowerCase().includes(q);

    return customers.filter(
      (r) =>
        includes(r.customerName) ||
        includes(r.phoneNo) ||
        includes(r.serialNo) ||
        includes(r.modelNo) ||
        includes(r.jobNo),
    );
  }, [customers, query]);

  const fetchCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await lcdRepair();

      const repairs = Array.isArray(data) ? data : data.repairs || [];

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

        <form
          className="mt-4 flex flex-col sm:flex-row gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, serial no, model no, or job no..."
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/30"
          />
          <button
            type="button"
            onClick={() => setQuery("")}
            disabled={!query.trim()}
            className="rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium hover:bg-white/15 transition-colors disabled:opacity-60 cursor-pointer"
          >
            Clear
          </button>
        </form>
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
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center py-20 text-blue-200/60">
          No customers found for "{query}".
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-blue-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">Model No</th>
                <th className="px-4 py-3 font-medium">Serial No</th>
                <th className="px-4 py-3 font-medium">Brand</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Repairing Price</th>
                <th className="px-4 py-3 font-medium">Advance</th>
                <th className="px-4 py-3 font-medium">Left Money</th>
                <th className="px-4 py-3 font-medium">Issue</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Job No</th>
                {/* <th className="px-4 py-3 font-medium">Received Date</th> */}
                <th className="px-4 py-3 font-medium">Created At</th>
                <th className="px-4 py-3 font-medium">Updated At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((r) => (
                <tr
                  key={r._id || r.id || `${r.jobNo}-${r.serialNo}`}
                  onClick={() => navigate(`/repairs/edit/${r.jobNo}`)}
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">{r.modelNo || "—"}</td>
                  <td className="px-4 py-3">{r.serialNo || "—"}</td>
                  <td className="px-4 py-3">{r.brand || "—"}</td>
                  <td className="px-4 py-3 font-medium">
                    {r.customerName || "—"}
                  </td>
                  <td className="px-4 py-3">{r.phoneNo || "—"}</td>
                  <td className="px-4 py-3">{r.repairingPrice ?? "—"}</td>
                  <td className="px-4 py-3">{r.advance ?? "—"}</td>
                  <td className="px-4 py-3">{r.leftMoney ?? "—"}</td>
                  <td className="px-4 py-3">{r.issueDescription || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-500/40">
                      {r.status || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-500/40">
                      {r.jobNo || "—"}
                    </span>
                  </td>
                  {/* <td className="px-4 py-3 text-xs">
                    {r.receivedDate
                      ? new Date(r.receivedDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td> */}
                  <td className="px-4 py-3 text-xs">
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "—"}
                  </td>

                  <td className="px-4 py-3 text-xs">
                    {r.updatedAt
                      ? new Date(r.updatedAt).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
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
