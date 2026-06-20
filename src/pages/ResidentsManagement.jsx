import { useState, useEffect } from "react";
import {
  Search, Eye, Trash2, UserPlus, X,
  BedDouble, CheckCircle, XCircle, ChevronRight,
} from "lucide-react";
import { residentsApi, roomsApi } from "../utils/api";
import { message } from "antd";

// ── Step indicator ──────────────────────────────────────────────────────
function StepDot({ n, current, label }) {
  const done = current > n;
  const active = current === n;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
        done    ? "bg-green-500 text-white" :
        active  ? "bg-blue-600 text-white"  :
                  "bg-slate-200 text-slate-500"
      }`}>
        {done ? "✓" : n}
      </div>
      <span className={`text-xs font-medium ${active ? "text-blue-600" : "text-slate-400"}`}>{label}</span>
    </div>
  );
}

// ── Bed slot grid ───────────────────────────────────────────────────────
function BedGrid({ room, selectedBed, onSelect }) {
  const beds = Array.from({ length: room.total_beds }, (_, i) => {
    const label = String.fromCharCode(65 + i);          // A, B, C …
    const bedId = `${room.room_no}-${label}`;
    const occupied = i < room.occupied_beds;
    return { label, bedId, occupied };
  });

  return (
    <div className="grid grid-cols-4 gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
      {beds.map(({ label, bedId, occupied }) => (
        <button
          key={bedId}
          type="button"
          disabled={occupied}
          onClick={(e) => {
            e.stopPropagation();
            if (!occupied) onSelect(bedId, label);
          }}
          className={`h-14 rounded-xl flex flex-col items-center justify-center text-xs font-semibold transition-all border-2 ${
            occupied
              ? "bg-red-50 border-red-200 text-red-400 cursor-not-allowed"
              : selectedBed === bedId
              ? "bg-blue-600 border-blue-600 text-white scale-105 shadow-md"
              : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:scale-105"
          }`}
        >
          <BedDouble size={14} />
          Bed {label}
        </button>
      ))}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────
export default function ResidentsManagement({ setSelectedResident }) {
  const [residents, setResidents]       = useState([]);
  const [rooms, setRooms]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [gender, setGender]             = useState("All");
  const [status, setStatus]             = useState("All");
  const [stats, setStats]               = useState({ total: 0, active: 0 });

  // Add-resident modal state
  const [showAdd, setShowAdd]           = useState(false);
  const [step, setStep]                 = useState(1);          // 1=Info, 2=Pick room, 3=Confirm
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedBed, setSelectedBed]   = useState("");
  const [selectedBedLabel, setSelectedBedLabel] = useState("");
  const [roomSearch, setRoomSearch]     = useState("");

  const [newResident, setNewResident]   = useState({
    name: "", gender: "Male", phone: "", age: "",
    email: "", aadhaar: "", floor: "",
    rent: "", join_date: "", status: "Active",
  });

  // Delete state
  const [showDelete, setShowDelete]     = useState(false);
  const [residentToDelete, setResidentToDelete] = useState(null);

  // ── Fetch helpers ───────────────────────────────────────────────────
  const fetchResidents = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (gender !== "All") params.gender = gender;
      if (status !== "All") params.status = status;
      setResidents(await residentsApi.getAll(params));
    } catch { message.error("Failed to load residents"); }
    finally { setLoading(false); }
  };

  const fetchStats = async () => {
    try { setStats(await residentsApi.getStats()); } catch { /* silent */ }
  };

  const fetchRooms = async () => {
    try { setRooms(await roomsApi.getAll()); } catch { /* silent */ }
  };

  useEffect(() => { fetchResidents(); fetchStats(); }, [search, gender, status]);

  // ── Reset add modal ─────────────────────────────────────────────────
  const resetAdd = () => {
    setShowAdd(false);
    setStep(1);
    setSelectedRoom(null);
    setSelectedBed("");
    setSelectedBedLabel("");
    setRoomSearch("");
    setNewResident({
      name: "", gender: "Male", phone: "", age: "",
      email: "", aadhaar: "", floor: "",
      rent: "", join_date: "", status: "Active",
    });
  };

  const openAdd = () => { fetchRooms(); setShowAdd(true); };

  // ── Validate step 1 ─────────────────────────────────────────────────
  const validateInfo = () => {
    if (!newResident.name.trim()) { message.error("Name is required"); return false; }
    return true;
  };

  // ── Save resident ───────────────────────────────────────────────────
  const saveResident = async () => {
    try {
      await residentsApi.create({
        ...newResident,
        age:  newResident.age  ? parseInt(newResident.age)      : null,
        rent: newResident.rent ? parseFloat(newResident.rent)   : 0,
        room_no:   selectedRoom   ? selectedRoom.room_no  : "",
        room_type: selectedRoom   ? selectedRoom.type     : "",
        bed_no:    selectedBedLabel ? `Bed-${selectedBedLabel}` : "",
        floor:     selectedRoom   ? selectedRoom.block || newResident.floor : newResident.floor,
        image: "https://i.pravatar.cc/150",
      });
      message.success("Resident added successfully");
      resetAdd();
      fetchResidents();
      fetchStats();
    } catch (err) {
      message.error(err.message || "Failed to add resident");
    }
  };

  // ── Delete resident ─────────────────────────────────────────────────
  const deleteResident = async () => {
    try {
      await residentsApi.remove(residentToDelete.id);
      message.success("Resident deleted");
      setShowDelete(false);
      setResidentToDelete(null);
      fetchResidents();
      fetchStats();
    } catch (err) { message.error(err.message || "Failed to delete"); }
  };

  const mapResident = (r) => ({
    ...r,
    room: r.room_no, bed: r.bed_no, mobile: r.phone,
    aadhaar: r.aadhaar || "N/A", roomNo: r.room_no,
    roomType: r.room_type, bedNo: r.bed_no,
    joinDate: r.join_date, paymentStatus: r.payment_status,
  });

  // ── Filtered rooms in picker ────────────────────────────────────────
  const filteredRooms = rooms.filter((r) => {
    const q = roomSearch.toLowerCase();
    return (
      r.room_no?.toLowerCase().includes(q) ||
      r.block?.toLowerCase().includes(q)   ||
      r.type?.toLowerCase().includes(q)
    );
  });

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Residents Management</h1>
          <p className="text-sm text-slate-500 mt-1">Total: {stats.total}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">
            Active: {stats.active}
          </span>
          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl flex items-center gap-2 hover:bg-blue-700"
          >
            <UserPlus size={18} /> Add Resident
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input type="text" placeholder="Search Resident..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 py-2.5 text-sm" />
        </div>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="border rounded-xl px-4 py-2.5 text-sm">
          <option>All</option><option>Male</option><option>Female</option><option>Others</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-xl px-4 py-2.5 text-sm">
          <option>All</option><option>Active</option><option>Pending</option><option>Vacated</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : residents.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No residents found</div>
        ) : (
          <table className="w-full table-fixed">
            <thead className="bg-slate-100">
              <tr>
                <th className="w-[28%] p-3 text-left text-sm font-semibold">Resident</th>
                <th className="w-[10%] text-center text-sm font-semibold">Room</th>
                <th className="w-[10%] text-center text-sm font-semibold">Bed</th>
                <th className="w-[14%] text-center text-sm font-semibold">Phone</th>
                <th className="w-[10%] text-center text-sm font-semibold">Rent</th>
                <th className="w-[12%] text-center text-sm font-semibold">Status</th>
                <th className="w-[16%] text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((r) => (
                <tr key={r.id} className="border-b hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={r.image || "https://i.pravatar.cc/150"} className="w-10 h-10 rounded-full" alt="" />
                      <div>
                        <h3 className="font-semibold text-sm cursor-pointer text-blue-600"
                          onClick={() => setSelectedResident(mapResident(r))}>
                          {r.name}
                        </h3>
                        <p className="text-xs text-gray-500">{r.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center text-sm">
                    {r.room_no
                      ? <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg text-xs font-medium">{r.room_no}</span>
                      : <span className="text-slate-400 text-xs">—</span>}
                  </td>
                  <td className="text-center text-sm">{r.bed_no || "—"}</td>
                  <td className="text-center text-sm">{r.phone || "—"}</td>
                  <td className="text-center font-medium text-sm">₹{r.rent || 0}</td>
                  <td className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      r.status === "Active"  ? "bg-green-100 text-green-600" :
                      r.status === "Vacated" ? "bg-red-100 text-red-600"    :
                                               "bg-yellow-100 text-yellow-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => setSelectedResident(mapResident(r))}
                        className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200" title="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => { setResidentToDelete(r); setShowDelete(true); }}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {residents.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl p-4 shadow">
            <div className="flex gap-3">
              <img src={r.image || "https://i.pravatar.cc/150"} className="w-12 h-12 rounded-full" alt="" />
              <div>
                <h3 className="font-bold text-sm">{r.name}</h3>
                <p className="text-xs text-slate-500">{r.room_no || "No room"} · {r.phone}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => setSelectedResident(mapResident(r))} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs">View</button>
              <button onClick={() => { setResidentToDelete(r); setShowDelete(true); }} className="bg-red-600 text-white px-3 py-2 rounded-lg text-xs">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════ ADD RESIDENT MODAL ═══════════ */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-start justify-center z-50 pt-16 px-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">

            {/* Modal header */}
            <div className="px-6 py-5 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Add New Resident</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {step === 1 && "Step 1 — Fill resident details"}
                  {step === 2 && "Step 2 — Pick a room & bed"}
                  {step === 3 && "Step 3 — Confirm & save"}
                </p>
              </div>
              <button onClick={resetAdd} className="p-2 hover:bg-slate-100 rounded-xl"><X size={20} /></button>
            </div>

            {/* Step dots */}
            <div className="flex items-center justify-center gap-6 py-4 border-b">
              <StepDot n={1} current={step} label="Details" />
              <div className={`flex-1 max-w-[60px] h-0.5 ${step > 1 ? "bg-green-400" : "bg-slate-200"}`} />
              <StepDot n={2} current={step} label="Room" />
              <div className={`flex-1 max-w-[60px] h-0.5 ${step > 2 ? "bg-green-400" : "bg-slate-200"}`} />
              <StepDot n={3} current={step} label="Confirm" />
            </div>

            {/* Modal body — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-5">

              {/* ── STEP 1: Personal details ── */}
              {step === 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Full Name *",    key: "name",      placeholder: "e.g. Arun Kumar" },
                    { label: "Phone",          key: "phone",     placeholder: "9876543210" },
                    { label: "Email",          key: "email",     placeholder: "arun@email.com" },
                    { label: "Aadhaar",        key: "aadhaar",   placeholder: "XXXX XXXX XXXX" },
                    { label: "Age",            key: "age",       placeholder: "22", type: "number" },
                    { label: "Monthly Rent ₹", key: "rent",      placeholder: "5000", type: "number" },
                    { label: "Join Date",      key: "join_date", placeholder: "", type: "date" },
                    { label: "Floor",          key: "floor",     placeholder: "1st Floor" },
                  ].map(({ label, key, placeholder, type = "text" }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                      <input type={type} placeholder={placeholder} value={newResident[key]}
                        onChange={(e) => setNewResident({ ...newResident, [key]: e.target.value })}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-300 outline-none" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
                    <select value={newResident.gender}
                      onChange={(e) => setNewResident({ ...newResident, gender: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm">
                      <option>Male</option><option>Female</option><option>Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                    <select value={newResident.status}
                      onChange={(e) => setNewResident({ ...newResident, status: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm">
                      <option>Active</option><option>Pending</option>
                    </select>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Room picker ── */}
              {step === 2 && (
                <div>
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input type="text" placeholder="Search room no or block…" value={roomSearch}
                      onChange={(e) => setRoomSearch(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl pl-9 py-2.5 text-sm" />
                  </div>

                  {/* Legend */}
                  <div className="flex gap-4 text-xs mb-4">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"/> Available bed</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"/> Occupied bed</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block"/> Selected</span>
                  </div>

                  {/* Rooms */}
                  {filteredRooms.length === 0 ? (
                    <div className="text-center text-slate-400 py-10">No rooms found. Create rooms first.</div>
                  ) : (
                    <div className="space-y-3">
                      {filteredRooms.map((room) => {
                        const isFull    = room.status === "Full";
                        const isSelected = selectedRoom?.id === room.id;
                        const available  = room.total_beds - room.occupied_beds;

                        return (
                          <div key={room.id}
                            className={`border-2 rounded-2xl p-4 transition-all ${
                              isFull
                                ? "border-slate-200 bg-slate-50 opacity-60"
                                : isSelected
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 hover:border-blue-300 cursor-pointer"
                            }`}
                            onClick={() => {
                              if (!isFull) {
                                setSelectedRoom(room);
                                setSelectedBed("");
                                setSelectedBedLabel("");
                              }
                            }}
                          >
                            {/* Room header */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                                  isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                                }`}>
                                  {room.room_no}
                                </div>
                                <div>
                                  <p className="font-semibold text-sm text-slate-800">{room.block || "—"} · {room.type}</p>
                                  <p className="text-xs text-slate-500">₹{room.monthly_fee}/month</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  isFull             ? "bg-red-100 text-red-600"    :
                                  available === room.total_beds ? "bg-green-100 text-green-700" :
                                                                  "bg-yellow-100 text-yellow-700"
                                }`}>
                                  {isFull ? "Full" : `${available} bed${available !== 1 ? "s" : ""} free`}
                                </span>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="h-2 bg-slate-200 rounded-full mb-3">
                              <div
                                className={`h-2 rounded-full transition-all ${isFull ? "bg-red-500" : "bg-blue-500"}`}
                                style={{ width: `${(room.occupied_beds / room.total_beds) * 100}%` }}
                              />
                            </div>
                            <p className="text-xs text-slate-500 mb-2">
                              {room.occupied_beds} / {room.total_beds} beds occupied
                            </p>

                            {/* Bed grid — only when this room is selected */}
                            {isSelected && !isFull && (
                              <div
                                className="border-t pt-3 mt-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <p className="text-xs font-semibold text-slate-600 mb-1">Select a bed:</p>
                                <BedGrid
                                  room={room}
                                  selectedBed={selectedBed}
                                  onSelect={(id, label) => {
                                    setSelectedBed(id);
                                    setSelectedBedLabel(label);
                                  }}
                                />
                                {selectedBed && (
                                  <p className="text-xs text-blue-600 font-medium mt-2">
                                    ✓ Bed {selectedBedLabel} selected
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 3: Confirm ── */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-2xl p-5 space-y-3 text-sm">
                    <h3 className="font-semibold text-slate-700 mb-3">Resident Details</h3>
                    {[
                      ["Name",   newResident.name],
                      ["Gender", newResident.gender],
                      ["Phone",  newResident.phone],
                      ["Email",  newResident.email],
                      ["Age",    newResident.age],
                      ["Rent",   newResident.rent ? `₹${newResident.rent}` : "—"],
                      ["Join Date", newResident.join_date],
                    ].map(([label, value]) => value ? (
                      <div key={label} className="flex justify-between">
                        <span className="text-slate-500">{label}</span>
                        <span className="font-medium text-slate-800">{value}</span>
                      </div>
                    ) : null)}
                  </div>

                  <div className={`rounded-2xl p-5 text-sm ${selectedRoom ? "bg-blue-50" : "bg-yellow-50"}`}>
                    <h3 className="font-semibold text-slate-700 mb-3">Room Assignment</h3>
                    {selectedRoom ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Room</span>
                          <span className="font-semibold text-blue-700">{selectedRoom.room_no}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Block</span>
                          <span className="font-medium">{selectedRoom.block || "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Type</span>
                          <span className="font-medium">{selectedRoom.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Bed</span>
                          <span className="font-semibold text-blue-700">
                            {selectedBedLabel ? `Bed ${selectedBedLabel}` : <span className="text-yellow-600 font-medium">Not selected</span>}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Monthly Fee</span>
                          <span className="font-medium">₹{selectedRoom.monthly_fee}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-yellow-700 text-sm">⚠ No room assigned. Resident will be added without a room.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t flex justify-between items-center">
              <button
                onClick={() => step > 1 ? setStep(step - 1) : resetAdd()}
                className="px-5 py-2.5 border border-slate-300 rounded-xl text-sm hover:bg-slate-50"
              >
                {step === 1 ? "Cancel" : "← Back"}
              </button>

              <div className="flex gap-3">
                {step === 2 && (
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 border border-slate-300 rounded-xl text-sm hover:bg-slate-50"
                  >
                    Skip Room →
                  </button>
                )}
                {step < 3 ? (
                  <button
                    onClick={() => {
                      if (step === 1 && !validateInfo()) return;
                      setStep(step + 1);
                    }}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 flex items-center gap-2"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={saveResident}
                    className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle size={16} /> Save Resident
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold text-slate-800">Delete Resident?</h2>
            <p className="text-slate-500 mt-2">{residentToDelete?.name}</p>
            <p className="text-xs text-slate-400 mt-1">This will also free up their room bed.</p>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowDelete(false)} className="border px-5 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={deleteResident} className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
