import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = ({ admin, onMenuToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/admin/logout", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem("admin");
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      });
  };

  return (
    <nav className="border-b border-white/10 bg-white/5 backdrop-blur-md z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger menu */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <img
              src={logo}
              alt="Armeco Electronics Logo"
              className="w-10 h-10 rounded-full object-cover border border-white/30"
            />
            <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
              Armeco Electronics
            </span>
          </div>

          {/* Right: Admin email + Logout */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-blue-200 hidden sm:block">
              {admin?.email || "Admin"}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500/20 border border-red-500/40 px-4 py-2 text-sm font-medium text-red-200 hover:bg-red-500/30 transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">Logout</span>
              <svg
                className="w-5 h-5 sm:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
