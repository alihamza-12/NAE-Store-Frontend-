import LoginForm from "../components/LoginForm";
import logo from "../assets/logo.jpg";

function LoginPage() {
  const handleLogin = (user) => {
    console.log("Admin logged in:", user);
    // TODO: redirect to admin dashboard or store auth state
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 px-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Login card */}
      <div className="relative w-full max-w-md">
        {/* Floating card with glass effect */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
          {/* Logo section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl" />
              <img
                src={logo}
                alt="Armeco Electronics Logo"
                className="relative w-24 h-24 rounded-full object-cover border-2 border-white/30 shadow-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Armeco Electronics
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px w-8 bg-blue-400/50" />
              <span className="text-blue-300 text-sm font-medium uppercase tracking-widest">
                Admin Portal
              </span>
              <div className="h-px w-8 bg-blue-400/50" />
            </div>
          </div>

          {/* Welcome text */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-blue-200/80 text-sm">
              Sign in to access the administration dashboard
            </p>
          </div>

          {/* Login form */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <LoginForm onLogin={handleLogin} />
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-blue-300/60 text-xs">Secure Admin Access Only</p>
          </div>

          {/* Bottom decorative glow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-blue-500/30 rounded-full blur-xl" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
