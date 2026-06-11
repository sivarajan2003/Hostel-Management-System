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
  <div className="min-h-screen flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#5ad1ff,#90bfff,#d7f3c4)] px-4">

    {/* Background Blur */}
{/* Animated Background */}
<div className="absolute inset-0 overflow-hidden">
<img
  src="/hostel.svg"
  className="absolute top-20 left-20 w-24 opacity-10 animate-float"
/>

<img
  src="/hostel.svg"
  className="absolute bottom-20 right-20 w-32 opacity-10 animate-float-reverse"
/>
  <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-400/30 rounded-full blur-[140px] animate-blob"></div>

  <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[140px] animate-blob animation-delay-2000"></div>

  <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-[140px] animate-blob animation-delay-4000"></div>

</div>
   <div className="relative w-full max-w-5xl">

<div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.15)] p-6">
        <div className="grid lg:grid-cols-2 gap-0">

          {/* LEFT SIDE */}
          <div className="hidden lg:flex items-center justify-center">

  <div
    className="
    w-full
    h-full
    rounded-[40px]
    bg-gradient-to-br
    from-cyan-400/80
    via-blue-500/80
    to-purple-500/80
    flex
    flex-col
    items-center
    justify-center
    p-12
    "
  >

    <h1 className="text-5xl font-bold text-white">
      Welcome Back!
    </h1>

    <p className="text-white/80 text-center mt-6 text-lg max-w-sm">
      To keep connected with us please login
      with your personal information
    </p>

  </div>

</div>
          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center">

<div className="w-full max-w-sm backdrop-blur-xl bg-white/20 border border-white/30 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-8">
              <div className="text-center">

                <h2 className="text-3xl font-bold text-slate-800">
                  Login
                </h2>

                <p className="text-slate-600 mt-2">
                  Sign In to your account
                </p>

              </div>

              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5"
              >

                {/* EMAIL */}
                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Email Address"
                    className="w-full h-14 bg-white/70 rounded-full pl-12 pr-4 outline-none border border-white"
                  />

                </div>

                {/* PASSWORD */}
                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Password"
                    className="w-full h-14 bg-white/70 rounded-full pl-12 pr-12 outline-none border border-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                {/* OPTIONS */}
                <div className="flex justify-between text-sm">
{/* 
                  <label className="flex gap-3">
                    <input type="checkbox" />
                    Remember me
                  </label> */}

                  <button
                    type="button"
                    className="text-blue-600"
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full h-14 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 text-white font-bold text-lg hover:scale-105 transition"
                >
                  SIGN IN
                </button>

                
               

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}