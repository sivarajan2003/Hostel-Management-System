// import { Menu, User, ChevronDown } from "lucide-react";

// export default function Header({
//   collapsed,
//   setCollapsed
// })  {
//   return (
//    <div className="top-header flex items-center justify-between px-4 md:px-6 py-3">

//      <button
//   onClick={() => setCollapsed(!collapsed)}
//   className="p-2 rounded-lg hover:bg-slate-100"
// >
//   <Menu size={24} />
// </button>

//       <div className="flex items-center gap-2 md:gap-3">
//        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center">
//           <User size={18} />
//         </div>

//         <span className="hidden sm:block">
//   Admin
// </span>

//         <ChevronDown size={16} />
//       </div>

//     </div>
//   );
// }
import { useState } from "react";
import {
  Menu,
  User,
  ChevronDown,
  Settings,
  LogOut
} from "lucide-react";

export default function Header({
  collapsed,
  setCollapsed,
  setPage,
  setIsLoggedIn
}) {
  const [showMenu, setShowMenu] = useState(false);

  // Get logged-in user from localStorage
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); }
    catch { return {}; }
  })();
  const displayName = storedUser?.username || storedUser?.email || "Admin";
  return (
    <div className="top-header flex items-center justify-between px-4 md:px-6 py-3">

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 rounded-lg hover:bg-slate-100"
      >
        <Menu size={24} />
      </button>

      <div className="relative">

  <button
    onClick={() => setShowMenu(!showMenu)}
    className="flex items-center gap-2 md:gap-3"
  >

    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center">
      <User size={18} />
    </div>

    <span className="hidden sm:block font-medium">
      {displayName}
    </span>

    <ChevronDown
      size={16}
      className="hidden sm:block"
    />

  </button>

  {showMenu && (

    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border z-50">

      <button
        onClick={() => {
          setPage("settings");
          setShowMenu(false);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
      >
        <Settings size={18} />
        Profile
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
          setShowMenu(false);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>

  )}

</div>
    </div>
  );
}