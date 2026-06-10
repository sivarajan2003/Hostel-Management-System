import { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Login({ onLogin }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);
const [page, setPage] = useState(
  localStorage.getItem("page") || "dashboard"
);
 const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const handleLogin = (e) => {
  e.preventDefault();

  if (
  email === "hostel@gmail.com" &&
  password === "123456"
) {
  localStorage.setItem("isLoggedIn", "true");
  onLogin();
} else {
    alert("Invalid Email or Password");
  }
};
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("page");
  setIsLoggedIn(false);
};
useEffect(() => {
  localStorage.setItem("page", page);
}, [page]);
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px] animate-blob"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-xl px-4">

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-10">

          {/* Logo */}
          <div className="text-center mb-8">

            <div className="w-16 h-16 mx-auto bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center">
              <Building2 size={32} className="text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white mt-4">
              Hostel Management
            </h1>

            <p className="text-slate-300 mt-2">
              Smart Hostel Management System
            </p>

          </div>

         <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div className="relative w-full">
  <Mail
    size={18}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
  />

  <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email Address"
  className="
    w-full
    h-14
    bg-white/5
    border
    border-white/10
    rounded-xl
    pl-12
    pr-4
    text-white
    placeholder:text-slate-400
    focus:outline-none
    focus:border-blue-500
  "
/>
</div>
            {/* Password */}
            <div className="relative w-full">
  <Lock
    size={18}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
  />
<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
>
  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
 <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  className="
    w-full
    h-14
    bg-white/5
    border
    border-white/10
    rounded-xl
    pl-12
    pr-12
    text-white
    placeholder:text-slate-400
    focus:outline-none
    focus:border-blue-500
  "
/>
</div>
            {/* Options */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-blue-400 hover:text-blue-300"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              text-white
              font-semibold
              shadow-lg
              hover:scale-[1.02]
              transition-all
              duration-300
              "
            >
              Sign In
            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm">
              © 2026 Hostel Management System
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}