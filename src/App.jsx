import React, { useState, useEffect } from 'react';
import { getInitialState, saveState } from './utils/mockData';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import StudentDashboard from './components/StudentDashboard';
import { Shield, User, RefreshCw } from 'lucide-react';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import RoomManagement from "./pages/RoomManagement";
import Attendance from "./pages/Attendance";
import FoodManagement from "./pages/FoodManagement";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Residents from "./pages/Residents";
import ResidentsManagement from "./pages/ResidentsManagement";
import ResidentProfile from "./pages/ResidentProfile";

export default function App() {
  // Load initial state from local storage or defaults
  const [state, setState] = useState(() => getInitialState());
  //room management 
const [page,setPage] = useState("dashboard");
  
const [isLoggedIn, setIsLoggedIn] = useState(false);
//const [residentTab, setResidentTab] = useState("residents");
  // Navigation / Role selection: 'receptionist' or 'student'
  const [role, setRole] = useState('receptionist');
  
 const [collapsed, setCollapsed] = useState(
  window.innerWidth <= 768
);
  // Active student ID for testing student view
  const [activeStudentId, setActiveStudentId] = useState(state.students[0]?.id || '');
  
  // Sync state with localStorage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const addLogMessage = (msg) => {
    // Log message helper (no-op since live console is removed)
  };

  // Helper State Modifiers passed to components
  const updateRooms = (newRooms) => {
    setState(prev => ({ ...prev, rooms: newRooms }));
  };

  const updateStudents = (newStudents) => {
    setState(prev => ({ ...prev, students: newStudents }));
  };

  const updateFoodMenu = (newFoodMenu) => {
    setState(prev => ({ ...prev, foodMenu: newFoodMenu }));
  };

  // Student reviews food
  const submitFoodReview = (newReview) => {
    setState(prev => ({
      ...prev,
      foodReviews: [...prev.foodReviews, newReview]
    }));
  };

  // Student attendance check-in/out
  const performAttendance = (studentId, session, type) => {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    const newLog = {
      id: 'ATT' + Date.now(),
      studentId,
      studentName: student.name,
      date: new Date().toISOString().split('T')[0],
      session,
      type,
      timestamp: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      attendance: [...prev.attendance, newLog]
    }));
  };

  // Vacate hostel bed allocation
  const vacateHostel = (studentId) => {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    const roomId = student.allocatedRoom;
    const bedId = student.allocatedBed;

    // Reset student status & allocation
    const updatedStudents = state.students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          status: 'Vacated',
          allocatedRoom: null,
          allocatedBed: null
        };
      }
      return s;
    });

    // Reset room bed status
    const updatedRooms = state.rooms.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          beds: r.beds.map(b => {
            if (b.id === bedId) {
              return {
                ...b,
                allocatedTo: null,
                status: 'Available'
              };
            }
            return b;
          })
        };
      }
      return r;
    });

    setState(prev => ({
      ...prev,
      students: updatedStudents,
      rooms: updatedRooms
    }));

    addLogMessage(`Student ${student.name} vacated Bed ${bedId} in Room ${roomId}. Bed is now available.`);
  };

  // Reset database state back to default
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset the entire database to default mock data?')) {
      localStorage.removeItem('hostel_management_state');
      const freshState = getInitialState();
      setState(freshState);
      setActiveStudentId(freshState.students[0]?.id || '');
      setLogs([
        'System Initialized: Loading database state...',
        'Database reset to default settings.'
      ]);
    }
  };
const [userRole,setUserRole] =
useState("");
const [selectedResident,setSelectedResident] =
useState(null);
  // Find active student object
  const activeStudent = state.students.find(s => s.id === activeStudentId);
if (!isLoggedIn) {
  return (
   <Login
  onLogin={() => setIsLoggedIn(true)}
  setUserRole={setUserRole}
/>
  );
}
  return (
  <div className="layout">
    {!collapsed && (
  <div
    className="sidebar-overlay"
    onClick={() => setCollapsed(true)}
  />
)}
<Sidebar
  page={page}
  setPage={setPage}
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
      {/* Sticky Premium Navbar */}
      {/* <header className="navbar">
        <div className="nav-logo">
          <Shield size={24} style={{ color: 'var(--primary)' }} />
          <span>Hostel Management </span>
        </div>
        
        <div className="nav-controls">
          
          <div className="role-selector">
            <button 
              className={`role-btn ${role === 'receptionist' ? 'active' : ''}`}
              onClick={() => setRole('receptionist')}
            >
              <Shield size={14} /> Receptionist
            </button>
            <button 
              className={`role-btn ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
            >
              <User size={14} /> Student Portal
            </button>
          </div>

        
          {role === 'student' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Profile:</span>
              <select 
                className="student-picker"
                value={activeStudentId}
                onChange={(e) => setActiveStudentId(e.target.value)}
              >
                {state.students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.status})
                  </option>
                ))}
              </select>
            </div>
          )}

        
          <button 
            onClick={handleResetData}
            className="btn btn-secondary" 
            style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '12px' }}
            title="Reset to default mock data"
          >
            <RefreshCw size={14} /> Reset Data
          </button>
        </div>
      </header> */}

      {/* Main Content Dashboard */}
      {/* <main style={{ flex: 1, paddingBottom: '40px' }}> */}
        {page === "dashboard" && (
  <ReceptionistDashboard
    rooms={state.rooms}
    students={state.students}
    foodMenu={state.foodMenu}
    foodReviews={state.foodReviews}
    attendance={state.attendance}
    updateRooms={updateRooms}
    updateStudents={updateStudents}
    updateFoodMenu={updateFoodMenu}
    addLogMessage={addLogMessage}
  />
)}

{page === "rooms" && (
  <RoomManagement />
)}

{page === "student" && (
  <StudentDashboard
    currentStudent={activeStudent}
    rooms={state.rooms}
    foodMenu={state.foodMenu}
    foodReviews={state.foodReviews}
    attendance={state.attendance}
    submitFoodReview={submitFoodReview}
    performAttendance={performAttendance}
    vacateHostel={vacateHostel}
    addLogMessage={addLogMessage}
  />
  
)}
{page === "residents" && (

  selectedResident ? (

    <Residents
      resident={selectedResident}
      onBack={() =>
        setSelectedResident(null)
      }
    />

  ) : (

    <ResidentsManagement
      setSelectedResident={
        setSelectedResident
      }
    />

  )

)}
{page === "profile" && (
  <ResidentProfile />
)}
{page === "attendance" && (
  <Attendance />
)}

{page === "food" && (
  <FoodManagement />
)}

{page === "reviews" && (
  <Reviews />
)}

{page === "settings" && (
  <Settings />
)}
          </main>
 
  </div>
  </div>
);
}
