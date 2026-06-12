
import { useState } from "react";
import { message } from "antd";
import {
  Mail,
  Eye,
  EyeOff,
  Building2,
  BedDouble,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";


const HostelCard = ({ title, status }) => (
  <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
    <div className="flex items-center gap-3">
      <BedDouble className="text-blue-500" size={20} />
      <div>
        <h4 className="font-semibold text-gray-700">
          {title}
        </h4>

        <p className="text-sm text-gray-400">
          {status}
        </p>
      </div>
    </div>
  </div>
);

const FloatingColumn = ({ children, speed }) => (
  <motion.div
    animate={{ y: [0, -500] }}
    transition={{
      repeat: Infinity,
      duration: speed,
      ease: "linear",
    }}
    className="flex flex-col gap-4"
  >
    {children}
    {children}
  </motion.div>
);
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === "hostel@gmail.com" &&
      password === "123456"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      message.success("Login Successful");

      if (onLogin) {
        onLogin();
      }
    } else {
      message.error("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center relative overflow-hidden p-4">

      {/* Login Card */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-3">
            <Building2 className="text-white" size={30} />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Hostel Management
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                placeholder="hostel@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <Mail
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
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
                placeholder="123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            Sign In
          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            Application Developed and maintained by
          </p>

          <p className="text-sm font-medium text-gray-600 mt-1">
            Hostel Management System
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
