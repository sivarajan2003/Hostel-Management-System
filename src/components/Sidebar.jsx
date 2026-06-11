import {
  LayoutDashboard,
  Bed,
  Users,
  ClipboardList,
  Utensils,
  Star,
  Settings,
  Home,
   Building2,
     X,
       BedDouble,
UserCircle ,
} from "lucide-react";

export default function Sidebar({
  page,
  setPage,
  collapsed,
  setCollapsed
}) {
  
  return (
   <aside
  className={`sidebar ${
    collapsed ? "collapsed" : ""
  }`}
>

<div className="mobile-close">
  <X
    size={24}
    onClick={() => setCollapsed(true)}
  />
</div>

<div className="sidebar-logo">

  <div className="logo-icon">
   <Home size={22} />
  </div>

  {!collapsed && (
    <div className="logo-text">
      <h2>Hostel</h2>
      <p>Management</p>
    </div>
  )}

</div>
      <div className="sidebar-menu">
        <div
  title="Dashboard"
  className={`sidebar-item ${page === "dashboard" ? "active" : ""}`}
  onClick={() => setPage("dashboard")}
>
  <LayoutDashboard size={20} />
  {!collapsed && <span>Dashboard</span>}
</div>

        <div
  title="Room Management"
  className={`sidebar-item ${page === "rooms" ? "active" : ""}`}
  onClick={() => setPage("rooms")}
>
  <Bed size={20} />
  {!collapsed && <span>Room Management</span>}
</div>
<div
  title="Student Management"
  className={`sidebar-item ${page === "student" ? "active" : ""}`}
  onClick={() => setPage("student")}
>
  <Users size={20} />
  {!collapsed && <span>Resident Management</span>}
</div>
<div
  title="My Profile"
  className={`sidebar-item ${
    page === "profile" ? "active" : ""
  }`}
  onClick={() => setPage("profile")}
>
  <UserCircle size={20} />
  {!collapsed && <span>Resident Dashboard</span>}
</div>
<div
  title="Residents"
  className={`sidebar-item ${
    page === "residents" ? "active" : ""
  }`}
  onClick={() => setPage("residents")}
>
  <Home size={20} />
  {!collapsed && <span>Residents</span>}
</div>

<div
  title="Attendance"
  className={`sidebar-item ${page === "attendance" ? "active" : ""}`}
  onClick={() => setPage("attendance")}
>
  <ClipboardList size={20} />
  {!collapsed && <span>Attendance</span>}
</div><div
  title="Food Management"
  className={`sidebar-item ${page === "food" ? "active" : ""}`}
  onClick={() => setPage("food")}
>
  <Utensils size={20} />
  {!collapsed && <span>Food Management</span>}
</div>

       <div
  title="Reviews"
  className={`sidebar-item ${page === "reviews" ? "active" : ""}`}
  onClick={() => setPage("reviews")}
>
  <Star size={20} />
  {!collapsed && <span>Reviews</span>}
</div>

     <div
  title="Settings"
  className={`sidebar-item ${page === "settings" ? "active" : ""}`}
  onClick={() => setPage("settings")}
>
  <Settings size={20} />
  {!collapsed && <span>Settings</span>}
</div>
      </div>
    </aside>
  );
}