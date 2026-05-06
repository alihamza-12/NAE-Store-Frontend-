import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchLcdRepairs } from "../../api/lcd-repairs";

function SearchByPhone() {
  const [phone, setPhone] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await searchLcdRepairs(phone);

      setResults(Array.isArray(data) ? data : data.repairs || []);
    } catch {
      setResults([]);
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
        <h1 className="text-2xl md:text-3xl font-bold">Search by Phone</h1>
        <p className="text-blue-200/70 text-sm mt-1">
          Find repair jobs by customer phone number
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="tel"
          maxLength={11}
          value={phone}
          onChange={(e) => setPhone(e.target.value.trimStart().trimEnd())}
          placeholder="Enter phone number..."
          className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium hover:bg-blue-500 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-white/30 border-t-white"></div>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-16 text-blue-200/60">
          No jobs found for phone "{phone}"
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-blue-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">Job No</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Brand</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Left</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {results.map((r) => (
                <tr
                  key={r._id}
                  onClick={() => navigate(`/repairs/edit/${r.jobNo}`)}
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-mono text-xs">{r.jobNo}</td>
                  <td className="px-4 py-3">{r.customerName}</td>
                  <td className="px-4 py-3">{r.brand}</td>
                  <td className="px-4 py-3">Rs.{r.repairingPrice}</td>
                  <td className="px-4 py-3 text-red-300">₹{r.leftMoney}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        r.status,
                      )}`}
                    >
                      {r.status}
                    </span>
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

export default SearchByPhone;
