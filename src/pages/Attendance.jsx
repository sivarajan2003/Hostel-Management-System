import { useState, useEffect } from "react";
import { CalendarDays, UserCheck, UserX, Users, Search, Save } from "lucide-react";
import { attendanceApi } from "../utils/api";
import { message } from "antd";

export default function AttendanceManagement() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ total: 0, inPG: 0, out: 0, onLeave: 0 });
  const [loading, setLoading] = useState(true);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [roomFilter, setRoomFilter] = useState("All Rooms");
  const [floorFilter, setFloorFilter] = useState("All Floors");
  const [search, setSearch] = useState("");

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const params = { date };
      if (roomFilter !== "All Rooms") params.room_no = roomFilter;
      if (floorFilter !== "All Floors") params.floor = floorFilter;
      if (search) params.search = search;
      const data = await attendanceApi.getAll(params);
      setStudents(data);
    } catch (_) {
      message.error("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await attendanceApi.getStats(date);
      setStats(data);
    } catch (_) {}
  };

  useEffect(() => {
    fetchAttendance();
    fetchStats();
  }, [date, roomFilter, floorFilter, search]);

  const updateStatus = async (student, newStatus) => {
    // Optimistic update
    setStudents((prev) =>
      prev.map((s) => s.id === student.id ? { ...s, status: newStatus } : s)
    );
    try {
      await attendanceApi.updateStatus({
        resident_id: student.id,
        resident_name: student.name,
        date,
        status: newStatus,
      });
      fetchStats();
    } catch (_) {
      message.error("Failed to update status");
      fetchAttendance(); // revert on error
    }
  };

  const occupancyPct = stats.total > 0 ? Math.round((stats.inPG / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">Attendance Management</h1>
        <p className="text-sm text-slate-500 mt-1">Track hostel student attendance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Total Residents", value: stats.total, icon: Users, color: "blue" },
          { label: "Currently In PG", value: stats.inPG, icon: UserCheck, color: "green" },
          { label: "Outside PG", value: stats.out, icon: UserX, color: "red" },
          { label: "Occupancy %", value: `${occupancyPct}%`, icon: CalendarDays, color: "purple" },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-slate-500">{label}</p>
                <h2 className="text-2xl font-semibold mt-1">{value}</h2>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-blue-600 animate-bounce" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-slate-200 rounded-xl p-2.5 text-sm"
          />
          <select value={roomFilter} onChange={(e) => setRoomFilter(e.target.value)} className="border border-slate-200 rounded-xl p-2.5 text-sm">
            <option>All Rooms</option>
            {[...new Set(students.map(s => s.roomNo).filter(Boolean))].map(r => <option key={r}>{r}</option>)}
          </select>
          <select value={floorFilter} onChange={(e) => setFloorFilter(e.target.value)} className="border border-slate-200 rounded-xl p-2.5 text-sm">
            <option>All Floors</option>
            {[...new Set(students.map(s => s.floor).filter(Boolean))].map(f => <option key={f}>{f}</option>)}
          </select>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Resident"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-12 py-2.5 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block bg-white rounded-3xl shadow-sm mt-8 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Daily Attendance</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : students.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No residents found. Add residents first.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Resident</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Gender</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Floor</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Room No</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold">Stay Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={student.image || "https://i.pravatar.cc/100"} alt="" className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="text-sm font-semibold">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.residentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{student.gender}</td>
                    <td className="px-4 py-3 text-sm">{student.floor || "—"}</td>
                    <td className="px-4 py-3 text-sm">{student.roomNo || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        {["In PG", "Out", "Leave"].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(student, s)}
                            className={`px-4 py-2 rounded-xl text-sm ${
                              student.status === s
                                ? s === "In PG" ? "bg-green-600 text-white"
                                  : s === "Out" ? "bg-red-600 text-white"
                                  : "bg-yellow-600 text-white"
                                : s === "In PG" ? "bg-green-100 text-green-700"
                                  : s === "Out" ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {s === "In PG" ? "Check In" : s === "Out" ? "Check Out" : "Leave"}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden mt-6 space-y-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <img src={student.image || "https://i.pravatar.cc/100"} alt="" className="w-14 h-14 rounded-full" />
              <div>
                <h3 className="text-sm font-semibold">{student.name}</h3>
                <p className="text-xs text-slate-500">{student.residentId} · {student.roomNo}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["In PG", "Out", "Leave"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(student, s)}
                  className={`px-3 py-2 rounded-xl text-sm ${
                    student.status === s
                      ? s === "In PG" ? "bg-green-600 text-white"
                        : s === "Out" ? "bg-red-600 text-white"
                        : "bg-yellow-600 text-white"
                      : s === "In PG" ? "bg-green-100 text-green-700"
                        : s === "Out" ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {s === "In PG" ? "Check In" : s === "Out" ? "Check Out" : "Leave"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={() => setShowSavePopup(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm rounded-xl flex items-center gap-2">
          <Save size={18} /> Save Attendance
        </button>
      </div>

      {showSavePopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-3xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold text-green-600">Attendance Saved</h2>
            <p className="text-slate-500 mt-3">Today's attendance has been saved successfully.</p>
            <button onClick={() => setShowSavePopup(false)} className="mt-6 bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
