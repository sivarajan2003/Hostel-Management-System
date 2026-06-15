import {
  LayoutDashboard,
  Bed,
  Users,
  ClipboardList,
  Utensils,
  Star,
  Settings,
  Home,
  LogOut,
  X,
  UserCircle,
  CreditCard,
  UserCheck,
  MessageSquareWarning,
  FileText,
  BedDouble,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Main",
    items: [
      { key: "dashboard",     icon: LayoutDashboard,       label: "Dashboard" },
    ],
  },
  {
    label: "Rooms",
    items: [
      { key: "rooms",         icon: Bed,                   label: "Room Management" },
      { key: "roomAllocation",icon: BedDouble,             label: "Room Allocation" },
    ],
  },
  {
    label: "Residents",
    items: [
      { key: "residents",     icon: Users,                 label: "Residents" },
      { key: "profile",       icon: UserCircle,            label: "Resident Profile" },
      { key: "vacatedResident",icon: LogOut,               label: "Vacated Residents" },
    ],
  },
  {
    label: "Operations",
    items: [
      { key: "attendance",    icon: ClipboardList,         label: "Attendance" },
      { key: "food",          icon: Utensils,              label: "Food Management" },
      { key: "payments",      icon: CreditCard,            label: "Payments" },
      { key: "visitors",      icon: UserCheck,             label: "Visitors" },
    ],
  },
  {
    label: "More",
    items: [
      { key: "complaints",    icon: MessageSquareWarning,  label: "Complaints" },
      { key: "documents",     icon: FileText,              label: "Documents" },
      { key: "reviews",       icon: Star,                  label: "Reviews" },
      { key: "settings",      icon: Settings,              label: "Settings" },
    ],
  },
];

export default function Sidebar({ page, setPage, collapsed, setCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* Mobile close button */}
      <div className="mobile-close">
        <X size={24} onClick={() => setCollapsed(true)} />
      </div>

      {/* Logo */}
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

      {/* Nav */}
      <div className="sidebar-menu">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {/* Group label — only show when expanded */}
            {!collapsed && (
              <p className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400 select-none">
                {group.label}
              </p>
            )}
            {group.items.map(({ key, icon: Icon, label }) => (
              <div
                key={key}
                title={label}
                className={`sidebar-item ${page === key ? "active" : ""}`}
                onClick={() => {
                  setPage(key);
                  // auto-close on mobile
                  if (window.innerWidth <= 768) setCollapsed(true);
                }}
              >
                <Icon size={20} />
                {!collapsed && <span>{label}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
