import {
  LayoutDashboard,
  Bed,
  Users,
  ClipboardList,
  Utensils,
  Star, X,
  Settings, Home,
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
        Hostel Management
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
  {!collapsed && <span>Student Management</span>}
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