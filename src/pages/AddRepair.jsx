import { useState } from "react";
import { createRepair } from "../../api/lcd-repairs";

function AddRepair() {
  const [form, setForm] = useState({
    modelNo: "",
    serialNo: "",
    brand: "",
    customerName: "",
    phoneNo: "",
    repairingPrice: "",
    advance: "",
    issueDescription: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        ...form,
        repairingPrice: Number(form.repairingPrice),
        advance: Number(form.advance || 0),
      };
      //calling api for to create repair
      const data = await createRepair(payload);

      setMessage(`Repair created! Job No: ${data.repair?.jobNo || ""}`);
      setForm({
        modelNo: "",
        serialNo: "",
        brand: "",
        customerName: "",
        phoneNo: "",
        repairingPrice: "",
        advance: "",
        issueDescription: "",
        status: "Pending",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/15 focus:ring-2 focus:ring-blue-500/30";

  const labelClass = "block text-sm font-medium text-gray-200 mb-1.5";

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Add Repair Job</h1>
        <p className="text-blue-200/70 text-sm mt-1">
          Create a new LCD repair record
        </p>
      </div>

      {message && (
        <div className="rounded-lg bg-green-500/10 border border-green-500/30 text-green-200 px-4 py-3 mb-4">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Customer Name</label>
            <input
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              required
              placeholder="New Armeco Client name"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              name="phoneNo"
              maxLength={11}
              value={form.phoneNo}
              onChange={handleChange}
              required
              placeholder="03376543210"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Brand</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
              placeholder="Samsung"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Model No</label>
            <input
              name="modelNo"
              value={form.modelNo}
              onChange={handleChange}
              required
              placeholder="SM-A52"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Serial No</label>
            <input
              name="serialNo"
              value={form.serialNo}
              onChange={handleChange}
              required
              placeholder="SN123456"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={form.status}
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
            <label className={labelClass}>Repairing Price (₹)</label>
            <input
              name="repairingPrice"
              type="number"
              value={form.repairingPrice}
              onChange={handleChange}
              required
              min="0"
              placeholder="5000"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Advance (₹)</label>
            <input
              name="advance"
              type="number"
              value={form.advance}
              onChange={handleChange}
              min="0"
              placeholder="1000"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Issue Description</label>
          <textarea
            name="issueDescription"
            value={form.issueDescription}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Screen flickering, touch not working..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Creating..." : "Create Repair Job"}
        </button>
      </form>
    </div>
  );
}

export default AddRepair;
