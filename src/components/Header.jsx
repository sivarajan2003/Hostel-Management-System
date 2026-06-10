import { Menu,X, User, ChevronDown } from "lucide-react";

export default function Header({
  collapsed,
  setCollapsed
})  {
  return (
    <div className="top-header">

     <button
  onClick={() => setCollapsed(!collapsed)}
  className="p-2 rounded-lg hover:bg-slate-100"
>
  {collapsed ? (
    <Menu size={24} />
  ) : (
    <X size={24} />
  )}
</button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#e0e7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <User size={18} />
        </div>

        <span>Admin</span>

        <ChevronDown size={16} />
      </div>

    </div>
  );
}