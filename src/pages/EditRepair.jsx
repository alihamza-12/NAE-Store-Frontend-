import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { lcdRepair, updateLcdRepair } from "../../api/lcd-repairs";

function EditRepair() {
  const [searchJobNo, setSearchJobNo] = useState("");
  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { jobNo } = useParams();
  useEffect(() => {
    if (jobNo) {
      const cleanJobNo = jobNo.replace(":", ""); // remove accidental colon
      // setSearchJobNo(cleanJobNo);
      fetchRepairByJobNo(cleanJobNo);
    }
  }, [jobNo]);

  const fetchRepairByJobNo = async (job) => {
    setSearching(true);
    setError("");
    setRepair(null);

    try {
      const data = await lcdRepair();

      const repairs = Array.isArray(data) ? data : data.repairs || [];

      const found = repairs.find(
        (r) => r.jobNo.toLowerCase() === job.toLowerCase() || r._id === job,
      );

      if (found) {
        setRepair(found);
      } else {
        setError("Repair job not found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSearching(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchJobNo.trim()) return;
    fetchRepairByJobNo(searchJobNo.trim());
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        status: repair.status,
        repairingPrice: Number(repair.repairingPrice),
        advance: Number(repair.advance),
        issueDescription: repair.issueDescription,
      };
      const data = await updateLcdRepair(repair._id, payload);

      setMessage("Repair updated successfully!");
      setRepair(data.repair || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setRepair({ ...repair, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/30";
  const labelClass = "block text-sm font-medium text-gray-200 mb-1.5";

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Edit Repair</h1>
        <p className="text-blue-200/70 text-sm mt-1">
          Search by job number to edit a repair record
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={searchJobNo}
          onChange={(e) => setSearchJobNo(e.target.value)}
          placeholder="Enter Job Number (e.g., JOB-1728000000-1234)"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={searching}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium hover:bg-blue-500 transition-colors disabled:opacity-60 cursor-pointer whitespace-nowrap"
        >
          {searching ? "Searching..." : "Find"}
        </button>
      </form>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 mb-4">
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-lg bg-green-500/10 border border-green-500/30 text-green-200 px-4 py-3 mb-4">
          {message}
        </div>
      )}

      {/* Edit Form */}
      {repair && (
        <form
          onSubmit={handleUpdate}
          className="space-y-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-medium border border-blue-500/40">
              {repair.jobNo}
            </span>
            <span className="text-sm text-blue-300/60">
              {repair.customerName} — {repair.phoneNo}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Status</label>
              <select
                name="status"
                value={repair.status}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="Pending" className="bg-slate-800">
                  Pending
                </option>
                <option value="In Progress" className="bg-slate-800">
                  In Progress
                </option>
                <option value="Completed" className="bg-slate-800">
                  Completed
                </option>
                <option value="Delivered" className="bg-slate-800">
                  Delivered
                </option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Repairing Price (Rs)</label>
              <input
                name="repairingPrice"
                type="number"
                value={repair.repairingPrice}
                onChange={handleChange}
                min="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Advance (Rs)</label>
              <input
                name="advance"
                type="number"
                value={repair.advance}
                onChange={handleChange}
                min="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Left Amount (Rs)</label>
              <div className={`${inputClass} bg-white/5 text-red-300`}>
                Rs.{Number(repair.repairingPrice) - Number(repair.advance || 0)}
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Issue Description</label>
            <textarea
              name="issueDescription"
              value={repair.issueDescription}
              onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Repair"}
          </button>
        </form>
      )}
    </div>
  );
}

export default EditRepair;
