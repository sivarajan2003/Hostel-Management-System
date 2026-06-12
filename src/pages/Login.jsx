
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
  <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-5 border border-white">
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
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden p-4">

    {/* Animated Background */}
   {/* <div className="absolute inset-0 w-full h-full overflow-hidden opacity-40">

      <div className="absolute inset-0 flex justify-around gap-8 -rotate-12 scale-125 w-full">

        <FloatingColumn speed={30}>
          <HostelCard title="Room A-101" status="Occupied" />
          <HostelCard title="Room A-102" status="Available" />
          <HostelCard title="Room B-201" status="Occupied" />
          <HostelCard title="Room B-202" status="Available" />
        </FloatingColumn>

        <FloatingColumn speed={35}>
          <HostelCard title="4 Sharing" status="18 Residents" />
          <HostelCard title="Attendance" status="95%" />
          <HostelCard title="Food Review" status="4.8 Rating" />
          <HostelCard title="Vacant Beds" status="12 Beds" />
        </FloatingColumn>

        <FloatingColumn speed={40}>
          <HostelCard title="Room C-301" status="Occupied" />
          <HostelCard title="Room C-302" status="Available" />
          <HostelCard title="Fee Collection" status="₹85,000" />
          <HostelCard title="Complaints" status="3 Pending" />
        </FloatingColumn>
        <FloatingColumn speed={45}>
          <HostelCard title="Room A-101" status="Occupied" />
          <HostelCard title="Room A-102" status="Available" />
          <HostelCard title="Room B-201" status="Occupied" />
          <HostelCard title="Room B-202" status="Available" />
        </FloatingColumn>

        <FloatingColumn speed={50}>
          <HostelCard title="4 Sharing" status="18 Residents" />
          <HostelCard title="Attendance" status="95%" />
          <HostelCard title="Food Review" status="4.8 Rating" />
          <HostelCard title="Vacant Beds" status="12 Beds" />
        </FloatingColumn>

        <FloatingColumn speed={55}>
          <HostelCard title="Room C-301" status="Occupied" />
          <HostelCard title="Room C-302" status="Available" />
          <HostelCard title="Fee Collection" status="₹85,000" />
          <HostelCard title="Complaints" status="3 Pending" />
        </FloatingColumn>

      </div>

    </div> */}
<div className="absolute inset-0 overflow-hidden">

  <motion.div
    animate={{
      x: [0, 100, 0],
      y: [0, -80, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 15,
    }}
    className="absolute top-10 left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"
  />

  <motion.div
    animate={{
      x: [0, -120, 0],
      y: [0, 100, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 18,
    }}
    className="absolute bottom-10 right-20 w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl"
  />

</div>
{/* Premium Background */}
<div className="absolute inset-0 overflow-hidden">

  {/* Blue Gradient Circle */}
  <motion.div
    animate={{
      x: [0, 80, 0],
      y: [0, -60, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 12,
    }}
    className="absolute top-10 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
  />

  {/* Purple Circle */}
  <motion.div
    animate={{
      x: [0, -100, 0],
      y: [0, 80, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 15,
    }}
    className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-400/20 rounded-full blur-3xl"
  />

  {/* Hostel Building Icon */}
  <div className="absolute inset-0 overflow-hidden">

  {/* Gradient Blob 1 */}
  <motion.div
    animate={{
      x: [0, 120, 0],
      y: [0, -80, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 18,
      repeat: Infinity,
    }}
    className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
  />

  {/* Gradient Blob 2 */}
  <motion.div
    animate={{
      x: [0, -150, 0],
      y: [0, 100, 0],
      scale: [1.1, 1, 1.1],
    }}
    transition={{
      duration: 22,
      repeat: Infinity,
    }}
    className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[140px]"
  />

  {/* Gradient Blob 3 */}
  <motion.div
    animate={{
      y: [0, -60, 0],
      scale: [1, 1.15, 1],
    }}
    transition={{
      duration: 14,
      repeat: Infinity,
    }}
    className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-[100px]"
  />

</div>
{[...Array(15)].map((_, i) => (
  <motion.div
    key={i}
    animate={{
      y: [0, -100, 0],
      opacity: [0.2, 1, 0.2],
    }}
    transition={{
      duration: 5 + i,
      repeat: Infinity,
    }}
    className="absolute w-2 h-2 bg-white rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
))}
</div>
    {/* Login Card */}
    <div className="max-w-lg w-full bg-white/70 backdrop-blur-2xl backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40 relative z-10">        {/* Logo */}
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
