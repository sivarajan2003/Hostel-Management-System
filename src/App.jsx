import { useState } from "react";

// Layout
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Pages
import Login              from "./pages/Login";
import ReceptionistDashboard from "./components/ReceptionistDashboard";
import RoomManagement     from "./pages/RoomManagement";
import RoomAllocation     from "./pages/RoomAllocation";
import ResidentsManagement from "./pages/ResidentsManagement";
import Residents          from "./pages/Residents";
import ResidentProfile    from "./pages/ResidentProfile";
import VacatedResident    from "./pages/VacatedResident";
import Attendance         from "./pages/Attendance";
import FoodManagement     from "./pages/FoodManagement";
import Payments           from "./pages/Payments";
import Visitors           from "./pages/Visitors";
import Complaints         from "./pages/Complaints";
import Documents          from "./pages/Documents";
import Reviews            from "./pages/Reviews";
import Settings           from "./pages/Settings";

export default function App() {
  const [isLoggedIn, setIsLoggedIn]       = useState(false);
  const [userRole, setUserRole]           = useState("");
  const [page, setPage]                   = useState("dashboard");
  const [collapsed, setCollapsed]         = useState(window.innerWidth <= 768);
  const [selectedResident, setSelectedResident] = useState(null);

  // ── Not logged in → show Login ──────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        setUserRole={setUserRole}
      />
    );
  }

  // ── Render the active page ───────────────────────────────────────────
  const renderPage = () => {
    switch (page) {

      case "dashboard":
        return <ReceptionistDashboard />;

      case "rooms":
        return <RoomManagement />;

      case "roomAllocation":
        return <RoomAllocation />;

      case "residents":
        return selectedResident ? (
          <Residents
            resident={selectedResident}
            onBack={() => setSelectedResident(null)}
          />
        ) : (
          <ResidentsManagement
            setSelectedResident={setSelectedResident}
          />
        );

      case "profile":
        return <ResidentProfile />;

      case "vacatedResident":
        return <VacatedResident />;

      case "attendance":
        return <Attendance />;

      case "food":
        return <FoodManagement />;

      case "payments":
        return <Payments />;

      case "visitors":
        return <Visitors />;

      case "complaints":
        return <Complaints />;

      case "documents":
        return <Documents />;

      case "reviews":
        return <Reviews />;

      case "settings":
        return <Settings />;

      default:
        return (
          <div className="p-10 text-center text-slate-400">
            Page not found
          </div>
        );
    }
  };

  return (
    <div className="layout">
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <Sidebar
        page={page}
        setPage={(p) => {
          setPage(p);
          // Reset resident detail view when navigating away
          if (p !== "residents") setSelectedResident(null);
        }}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="content-area">
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setPage={setPage}
          setIsLoggedIn={setIsLoggedIn}
        />

        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
