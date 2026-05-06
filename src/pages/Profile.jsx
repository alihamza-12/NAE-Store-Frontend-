import { useEffect, useState } from "react";
import { adminProfile } from "../../api/lcd-repairs";

function Profile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await adminProfile();
        setAdmin(data.admin || data);
      } catch (err) {
        setError(err.message);
        // Fallback to localStorage
        const local = JSON.parse(localStorage.getItem("admin") || "{}");
        setAdmin(local);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-white/30 border-t-white"></div>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Profile</h1>
        <p className="text-blue-200/70 text-sm mt-1">
          Your account information
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 px-4 py-3 mb-4">
          {error} (Showing cached data)
        </div>
      )}

      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold">
            {admin?.email?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <div className="text-lg font-semibold">
              {admin?.email || "Admin"}
            </div>
            <div className="text-sm text-blue-300">Administrator</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-blue-300 uppercase tracking-wider mb-1">
              Email
            </label>
            <div className="text-sm bg-white/5 rounded-lg px-4 py-2.5 border border-white/10">
              {admin?.email || "—"}
            </div>
          </div>

          <div>
            <label className="block text-xs text-blue-300 uppercase tracking-wider mb-1">
              Admin ID
            </label>
            <div className="text-sm bg-white/5 rounded-lg px-4 py-2.5 border border-white/10 font-mono">
              {admin?.id || admin?._id || "—"}
            </div>
          </div>

          <div>
            <label className="block text-xs text-blue-300 uppercase tracking-wider mb-1">
              Session
            </label>
            <div className="text-sm bg-white/5 rounded-lg px-4 py-2.5 border border-white/10 text-green-300">
              ● Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
