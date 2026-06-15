import { useState } from "react";
import { message } from "antd";
import { Mail, Eye, EyeOff, Building2, Lock } from "lucide-react";
import { motion } from "framer-motion";

const BackgroundCard = ({ className, index = 1 }) => {
  const isEven = index % 2 === 0;

  const residents = 150 + (index * 12);
  const rooms = 50 + index;
  const revenue = 50000 + (index * 5000);

  const hostelData = [
    {
      title: `Room ${rooms}`,
      subtitle: "Occupied",
      value: `${residents}`,
      status: "Active",
    },
    {
      title: `Resident ${residents}`,
      subtitle: "Checked In",
      value: `₹${revenue}`,
      status: "Paid",
    },
    {
      title: `Block ${String.fromCharCode(65 + (index % 5))}`,
      subtitle: "Available Beds",
      value: `${20 + index}`,
      status: "Vacant",
    },
  ];

  const data = hostelData[index % hostelData.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.6, y: 0 }}
      transition={{
        delay: (index % 5) * 0.1,
        duration: 0.8,
      }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200/60 p-4 ${className}`}
    >
      <div className="flex justify-between">
        <div>
          <div className="font-semibold text-gray-700 text-sm">
            {data.title}
          </div>

          <div className="text-xs text-gray-400">
            {data.subtitle}
          </div>
        </div>

        <span className="text-xs font-bold text-gray-700">
          {data.value}
        </span>
      </div>

      <span
        className={`text-[10px] px-2 py-1 rounded-full font-medium ${
          isEven
            ? "bg-emerald-50 text-emerald-600"
            : "bg-blue-50 text-blue-600"
        }`}
      >
        {data.status}
      </span>
    </motion.div>
  );
};
const FloatingColumn = ({ speed = 20, children, className }) => (
  <motion.div
    animate={{ y: [0, "-50%"] }}
    transition={{ duration: speed, ease: "linear", repeat: Infinity }}
    className={className}
  >
    {children}
    {children}
  </motion.div>
);

const Login = ({ onLogin, setUserRole }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      return message.error("Email and password are required");
    }

    const API_BASE = import.meta.env.VITE_API_BASE || "";

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Login failed");
      }

      // Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      if (setUserRole) setUserRole(data.user?.role || "");

      message.success(`Welcome, ${data.user?.username || "User"}!`);

      if (onLogin) onLogin();
    } catch (err) {
      message.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center relative overflow-hidden p-4">

  {/* Background Floating Cards */}
      <div className="absolute inset-0 flex gap-6 justify-center opacity-30 pointer-events-none -skew-y-6 scale-110">
        <FloatingColumn speed={40} className="flex flex-col gap-6 w-64">
          {[1, 2, 3, 4, 5].map(i => <BackgroundCard key={i} index={i} />)}
        </FloatingColumn>
        <FloatingColumn speed={55} className="flex flex-col gap-6 w-64 pt-20">
          {[6, 7, 8, 9, 10].map(i => <BackgroundCard key={i} index={i} />)}
        </FloatingColumn>
        <FloatingColumn speed={45} className="flex flex-col gap-6 w-64 hidden md:flex">
          {[11, 12, 13, 14, 15].map(i => <BackgroundCard key={i} index={i} />)}
        </FloatingColumn>
        <FloatingColumn speed={45} className="flex flex-col gap-6 w-64 hidden md:flex">
          {[16, 17, 18, 19, 20].map(i => <BackgroundCard key={i} index={i} />)}
        </FloatingColumn>
      </div>

   <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pointer-events-none" />

      {/* Login Card */}
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40 relative z-10">

        {/* Logo */}
        <div className="text-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
  <Building2 className="text-white" size={40} />
</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-0">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-0">
            Sign in to your account
          </p>
        </div>
      {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email / Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Email or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                autoComplete="username"
              />
              <Mail size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold rounded-xl text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">Application Developed and maintained by</p>
          <p className="text-sm font-medium text-gray-600 mt-1">Hostel Management System</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
