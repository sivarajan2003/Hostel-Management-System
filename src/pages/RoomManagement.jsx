import {
  BedDouble,
  Building2,
  Users,
  IndianRupee,
  Search,
  Plus,
  Edit,
  Eye,
} from "lucide-react";
import { useState } from "react";
export default function RoomManagement() {
  
const [showModal, setShowModal] = useState(false);
const [rooms, setRooms] = useState([
  {
    id: 1,
    roomNo: "A-101",
    block: "Block A",
    type: "AC Room",
    occupied: 3,
    totalBeds: 4,
    status: "Occupied",
  },
  {
    id: 2,
    roomNo: "A-102",
    block: "Block A",
    type: "Non AC",
    occupied: 1,
    totalBeds: 4,
    status: "Available",
  },
  {
    id: 3,
    roomNo: "B-201",
    block: "Block B",
    type: "Deluxe",
    occupied: 4,
    totalBeds: 4,
    status: "Full",
  },
]);
const [newRoom, setNewRoom] = useState({
  roomNo: "",
  block: "",
  type: "",
  totalBeds: 4,
});

const handleSaveRoom = () => {
  const room = {
    id: Date.now(),
    ...newRoom,
    occupied: 0,
    status: "Available",
  };

  setRooms([...rooms, room]);

  setShowModal(false);

  setNewRoom({
    roomNo: "",
    block: "",
    type: "",
    totalBeds: 4,
  });
};
  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Room Management
        </h1>

        <p className="text-slate-500 mt-2">
          Manage hostel rooms and bed allocations
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Total Rooms</p>
              <h2 className="text-4xl font-bold mt-2">250</h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Building2 className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Occupied Rooms</p>
              <h2 className="text-4xl font-bold mt-2">186</h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <BedDouble className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Available Rooms</p>
              <h2 className="text-4xl font-bold mt-2">64</h2>
            </div>

            <div className="bg-purple-100 p-4 rounded-2xl">
              <Users className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Monthly Revenue</p>
              <h2 className="text-4xl font-bold mt-2">₹1.2L</h2>
            </div>

            <div className="bg-orange-100 p-4 rounded-2xl">
              <IndianRupee className="text-orange-600" />
            </div>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mt-8">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search Room..."
              className="w-full border border-slate-200 rounded-xl pl-12 py-3 outline-none"
            />
          </div>

          <select className="border border-slate-200 rounded-xl px-4 py-3">
            <option>All Blocks</option>
            <option>Block A</option>
            <option>Block B</option>
          </select>

          <select className="border border-slate-200 rounded-xl px-4 py-3">
            <option>All Status</option>
            <option>Available</option>
            <option>Occupied</option>
            <option>Full</option>
          </select>

<button
  onClick={() => setShowModal(true)}
  className="bg-blue-600 text-white px-6 rounded-xl flex items-center gap-2"
>
  <Plus size={18} />
  Add Room
</button>

        </div>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
          >

            <div className="flex justify-between items-start">

              <div>
                <h2 className="text-2xl font-bold">
                  {room.roomNo}
                </h2>

                <p className="text-slate-500 mt-1">
                  {room.block}
                </p>

                <p className="text-sm text-blue-600 mt-2">
                  {room.type}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm
                ${
                  room.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : room.status === "Full"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {room.status}
              </span>

            </div>

            <div className="mt-6">

              <div className="flex justify-between mb-2">
                <span>Beds Occupied</span>
                <span>
                  {room.occupied}/{room.totalBeds}
                </span>
              </div>

              <div className="h-3 bg-slate-200 rounded-full">
                <div
                  className="h-3 bg-blue-600 rounded-full"
                  style={{
                    width: `${
                      (room.occupied / room.totalBeds) * 100
                    }%`,
                  }}
                />
              </div>

            </div>

            {/* Bed View */}

            <div className="grid grid-cols-4 gap-2 mt-6">

              {[1, 2, 3, 4].map((bed) => (
                <div
                  key={bed}
                  className={`h-12 rounded-xl flex items-center justify-center font-semibold
                  ${
                    bed <= room.occupied
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {String.fromCharCode(64 + bed)}
                </div>
              ))}

            </div>

            {/* Actions */}

            <div className="flex gap-3 mt-6">

              <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2">
                <Eye size={16} />
                View
              </button>

              <button className="flex-1 bg-slate-100 py-3 rounded-xl flex items-center justify-center gap-2">
                <Edit size={16} />
                Edit
              </button>

            </div>

          </div>
        ))}

      </div>
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="px-8 py-6 border-b">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Add New Room
            </h2>

            <p className="text-slate-500 mt-1">
              Create a new hostel room
            </p>
          </div>

          <button
            onClick={() => setShowModal(false)}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200"
          >
            ✕
          </button>

        </div>
      </div>

      {/* Form */}
      <div className="p-8">

        <div className="grid grid-cols-2 gap-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Room Number
            </label>

           <input
  type="text"
  value={newRoom.roomNo}
  onChange={(e) =>
    setNewRoom({
      ...newRoom,
      roomNo: e.target.value,
    })
  }
  placeholder="A-101"
  className="w-full border border-slate-300 rounded-xl px-4 py-3"
/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Block
            </label>

            <input
              type="text"
              placeholder="Block A"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Room Type
            </label>

            <select className="w-full border border-slate-300 rounded-xl px-4 py-3">
              <option>AC Room</option>
              <option>Non AC</option>
              <option>Deluxe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Total Beds
            </label>

            <input
              type="number"
              placeholder="4"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Monthly Fee
            </label>

            <input
              type="number"
              placeholder="5000"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select className="w-full border border-slate-300 rounded-xl px-4 py-3">
              <option>Available</option>
              <option>Occupied</option>
            </select>
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="px-8 py-5 bg-slate-50 border-t flex justify-end gap-3">

        <button
          onClick={() => setShowModal(false)}
          className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          onClick={handleSaveRoom}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          Save Room
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}