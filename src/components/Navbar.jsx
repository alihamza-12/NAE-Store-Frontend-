import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = (admin) => {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div>
      {" "}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Armeco Electronics Logo"
                className="w-10 h-10 rounded-full object-cover border border-white/30"
              />
              <span className="text-lg font-bold tracking-tight">
                Armeco Electronics
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-200">
                {admin.email || "Admin"}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500/20 border border-red-500/40 px-4 py-2 text-sm font-medium text-red-200 hover:bg-red-500/30 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
