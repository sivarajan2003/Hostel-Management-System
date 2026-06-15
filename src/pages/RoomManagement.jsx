import { BedDouble, Building2, Users, IndianRupee, Search, Plus, Edit, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { roomsApi } from "../utils/api";
import { message } from "antd";

export default function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [stats, setStats] = useState({ total: 0, occupied: 0, available: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockFilter, setBlockFilter] = useState("All Blocks");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [newRoom, setNewRoom] = useState({ room_no: "", block: "", type: "Non AC", total_beds: 4, monthly_fee: 5000, status: "Available" });

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (blockFilter !== "All Blocks") params.block = blockFilter;
      if (statusFilter !== "All Status") params.status = statusFilter;
      const data = await roomsApi.getAll(params);
      setRooms(data);
    } catch (_) {
      message.error("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await roomsApi.getStats();
      setStats(data);
    } catch (_) {}
  };

  useEffect(() => {
    fetchRooms();
    fetchStats();
  }, [searchTerm, blockFilter, statusFilter]);

  const handleSaveRoom = async () => {
    try {
      await roomsApi.create({ ...newRoom, total_beds: Number(newRoom.total_beds), monthly_fee: Number(newRoom.monthly_fee) });
      message.success("Room added");
      setShowModal(false);
      setNewRoom({ room_no: "", block: "", type: "Non AC", total_beds: 4, monthly_fee: 5000, status: "Available" });
      fetchRooms();
      fetchStats();
    } catch (err) {
      message.error(err.message || "Failed to add room");
    }
  };

  const handleSaveEdit = async () => {
    try {
      await roomsApi.update(selectedRoom.id, {
        room_no: selectedRoom.room_no,
        block: selectedRoom.block,
        type: selectedRoom.type,
        status: selectedRoom.status,
        total_beds: Number(selectedRoom.total_beds),
        monthly_fee: Number(selectedRoom.monthly_fee),
      });
      message.success("Room updated");
      setShowEditModal(false);
      fetchRooms();
    } catch (err) {
      message.error(err.message || "Failed to update room");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">Room Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage hostel rooms and bed allocations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Total Rooms", value: stats.total, icon: Building2, color: "blue" },
          { label: "Occupied Rooms", value: stats.occupied, icon: BedDouble, color: "green" },
          { label: "Available Rooms", value: stats.available, icon: Users, color: "purple" },
          { label: "Total Beds", value: stats.totalBeds ?? 0, icon: IndianRupee, color: "orange" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <h2 className="text-2xl font-semibold mt-1">{value}</h2>
              </div>
              <div className={`bg-${color}-100 p-4 rounded-2xl`}>
                <Icon size={22} className={`text-${color}-600 animate-bounce`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mt-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-12 py-2.5 text-sm outline-none"
            />
          </div>
          <select value={blockFilter} onChange={(e) => setBlockFilter(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm">
            <option>All Blocks</option><option>Block A</option><option>Block B</option><option>Block C</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm">
            <option>All Status</option><option>Available</option><option>Occupied</option><option>Full</option><option>Maintenance</option>
          </select>
          <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-6 rounded-xl flex items-center gap-2 py-2.5">
            <Plus size={18} /> Add Room
          </button>
        </div>
      </div>

      {/* Room Cards */}
      {loading ? (
        <div className="mt-10 text-center text-slate-400">Loading rooms...</div>
      ) : rooms.length === 0 ? (
        <div className="mt-10 text-center text-slate-400">No rooms found. Add your first room.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{room.room_no}</h2>
                  <p className="text-slate-500 mt-1">{room.block}</p>
                  <p className="text-xs text-blue-600 mt-1">{room.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  room.status === "Available" ? "bg-green-100 text-green-700" :
                  room.status === "Full" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {room.status}
                </span>
              </div>
              <div className="mt-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Beds Occupied</span>
                  <span>{room.occupied_beds}/{room.total_beds}</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full">
                  <div
                    className="h-3 bg-blue-600 rounded-full transition-all"
                    style={{ width: `${room.total_beds > 0 ? (room.occupied_beds / room.total_beds) * 100 : 0}%` }}
                  />
                </div>
              </div>
              {/* Bed grid */}
              <div className="grid grid-cols-4 gap-2 mt-6">
                {Array.from({ length: room.total_beds }, (_, i) => (
                  <div key={i} className={`h-12 rounded-xl flex items-center justify-center font-semibold text-sm ${
                    i < room.occupied_beds ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setSelectedRoom(room); setShowViewModal(true); }} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                  <Eye size={16} /> View
                </button>
                <button onClick={() => { setSelectedRoom({ ...room }); setShowEditModal(true); }} className="flex-1 bg-slate-100 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm">
                  <Edit size={16} /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">Add New Room</h2>
                <p className="text-slate-500 mt-1">Create a new hostel room</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">✕</button>
            </div>
            <div className="p-8 grid grid-cols-2 gap-5">
              {[
                { label: "Room Number", placeholder: "A-101", key: "room_no" },
                { label: "Block", placeholder: "Block A", key: "block" },
                { label: "Total Beds", placeholder: "4", key: "total_beds", type: "number" },
                { label: "Monthly Fee (₹)", placeholder: "5000", key: "monthly_fee", type: "number" },
              ].map(({ label, placeholder, key, type = "text" }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-2">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={newRoom[key]}
                    onChange={(e) => setNewRoom({ ...newRoom, [key]: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-2">Room Type</label>
                <select value={newRoom.type} onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })} className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm">
                  <option>AC Room</option><option>Non AC</option><option>Deluxe</option><option>Single</option><option>Double</option><option>Triple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select value={newRoom.status} onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })} className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm">
                  <option>Available</option><option>Occupied</option><option>Maintenance</option>
                </select>
              </div>
            </div>
            <div className="px-8 py-5 bg-slate-50 border-t flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-sm">Cancel</button>
              <button onClick={handleSaveRoom} className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-sm">Save Room</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">Room Details</h2>
            <div className="space-y-3 text-sm">
              <p><b>Room No:</b> {selectedRoom.room_no}</p>
              <p><b>Block:</b> {selectedRoom.block}</p>
              <p><b>Type:</b> {selectedRoom.type}</p>
              <p><b>Occupied:</b> {selectedRoom.occupied_beds}/{selectedRoom.total_beds}</p>
              <p><b>Monthly Fee:</b> ₹{selectedRoom.monthly_fee}</p>
              <p><b>Status:</b> {selectedRoom.status}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowViewModal(false)} className="px-5 py-3 bg-slate-200 rounded-xl text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-6">Edit Room</h2>
            <div className="grid grid-cols-2 gap-4">
              <input value={selectedRoom.room_no || ""} onChange={(e) => setSelectedRoom({ ...selectedRoom, room_no: e.target.value })} placeholder="Room No" className="border rounded-xl p-3 text-sm" />
              <input value={selectedRoom.block || ""} onChange={(e) => setSelectedRoom({ ...selectedRoom, block: e.target.value })} placeholder="Block" className="border rounded-xl p-3 text-sm" />
              <input type="number" value={selectedRoom.total_beds || 4} onChange={(e) => setSelectedRoom({ ...selectedRoom, total_beds: e.target.value })} placeholder="Total Beds" className="border rounded-xl p-3 text-sm" />
              <input type="number" value={selectedRoom.monthly_fee || 0} onChange={(e) => setSelectedRoom({ ...selectedRoom, monthly_fee: e.target.value })} placeholder="Monthly Fee" className="border rounded-xl p-3 text-sm" />
              <select value={selectedRoom.status} onChange={(e) => setSelectedRoom({ ...selectedRoom, status: e.target.value })} className="border rounded-xl p-3 text-sm">
                <option>Available</option><option>Occupied</option><option>Full</option><option>Maintenance</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="px-5 py-3 border rounded-xl text-sm">Cancel</button>
              <button onClick={handleSaveEdit} className="px-5 py-3 bg-blue-600 text-white rounded-xl text-sm">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
