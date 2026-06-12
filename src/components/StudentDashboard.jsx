import { useState } from "react";
import {
  Users,
  Search,
  UserPlus,
  BedDouble,
  CreditCard,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
   LogOut,
  UserRound,

 
  FileText,
} from "lucide-react";
import RoomAllocation from "../pages/RoomAllocation";
import Visitors from "../pages/Visitors";
import Complaints from "../pages/Complaints";
import Payments from "../pages/Payments";
import Documents from "../pages/Documents";
import VacatedResidents from "../pages/VacatedResidents";

export default function ResidentManagement() {

  const [residentTab, setResidentTab] = useState("residents");
const [showModal, setShowModal] = useState(false);
const [genderTab, setGenderTab] = useState("Male");
const [residents, setResidents] = useState([
  {
    id: 1,
    name: "Arun Kumar",
    age: 22,
    gender: "Male",
    room: "A-101",
    bed: "Bed-1",
    floor: "Ground",
    phone: "9876543210",
    rent: "8500",
    status: "Active",
  },

  {
    id: 2,
    name: "Hari Prasad",
    age: 21,
    gender: "Male",
    room: "A-102",
    bed: "Bed-2",
    floor: "Ground",
    phone: "9876543211",
    rent: "8000",
    status: "Pending",
  },

  {
    id: 3,
    name: "Priya",
    age: 20,
    gender: "Female",
    room: "F-201",
    bed: "Bed-1",
    floor: "First",
    phone: "9876543212",
    rent: "9000",
    status: "Active",
  },

  {
    id: 4,
    name: "Keerthana",
    age: 23,
    gender: "Female",
    room: "F-202",
    bed: "Bed-2",
    floor: "First",
    phone: "9876543213",
    rent: "9500",
    status: "Pending",
  },

  {
    id: 5,
    name: "Alex",
    age: 24,
    gender: "Others",
    room: "O-301",
    bed: "Bed-1",
    floor: "Second",
    phone: "9876543214",
    rent: "10000",
    status: "Active",
  },
]);
const [vacatedResidents, setVacatedResidents] = useState([
  {
    id: 101,
    name: "Karthik",
    room: "A-110",
    vacatedDate: "10-06-2026",
    reason: "Course Completed",
  },
]);
const [formData, setFormData] = useState({
  name: "",
  age: "",
  gender: "Male",
  room: "",
  bed: "",
  floor: "",
  phone: "",
  rent: "",
  status: "Active",
});
const [selectedResident, setSelectedResident] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);

const [searchTerm, setSearchTerm] = useState("");
const [roomFilter, setRoomFilter] = useState("All");
const [statusFilter, setStatusFilter] = useState("All");
const filteredResidents = residents.filter((resident) => {

  const genderMatch =
    resident.gender === genderTab;

  const searchMatch =
    resident.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const roomMatch =
    roomFilter === "All" ||
    resident.room === roomFilter;

  const statusMatch =
    statusFilter === "All" ||
    resident.status === statusFilter;

  return (
    genderMatch &&
    searchMatch &&
    roomMatch &&
    statusMatch
  );
});

return (
   <div className="p-4 md:p-8 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">
          Resident Management
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage residents, room allocation and hostel operations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between">
            <div>
             <p className="text-sm text-slate-500">Total Residents</p>
              <h2 className="text-2xl font-semibold mt-1">248</h2>
            </div>

           <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
  <Users size={22} className="
    text-blue-600
    animate-bounce
  " />
</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-slate-500">Checked In Today</p>
              <h2 className="text-2xl font-semibold mt-1">12</h2>
            </div>

            {/* <div className="bg-blue-100 p-3 rounded-2xl">
             
            </div> */}
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
  <UserPlus size={28}
  className="
    text-green-600
    animate-bounce
  "
/>
</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-slate-500">Vacant Rooms</p>
              <h2 className="text-2xl font-semibold mt-1">14</h2>
            </div>

            {/* <div className="bg-blue-100 p-3 rounded-2xl">
             
            </div> */}
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
   <BedDouble size={28}
  className="
    text-red-600
    animate-bounce
  "
/>
</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending Payments</p>
              <h2 className="text-2xl font-semibold mt-1">8</h2>
            </div>

         {/* <div className="bg-blue-100 p-3 rounded-2xl">
              
            </div> */}
             <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
  <AlertCircle size={28}
  className="
    text-orange-600
    animate-bounce
  "
/>
</div>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="bg-white mt-8 rounded-3xl shadow p-6">

        <div className="flex gap-8 border-b pb-4 overflow-x-auto">

  <button
    onClick={() => setResidentTab("residents")}
    className={`flex items-center gap-2 pb-2 transition-all ${
      residentTab === "residents"
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
        : "text-slate-600 hover:text-blue-600"
    }`}
  >
    <Users size={18} />
    Residents
  </button>

  <button
    onClick={() => setResidentTab("rooms")}
    className={`flex items-center gap-2 pb-2 transition-all ${
      residentTab === "rooms"
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
        : "text-slate-600 hover:text-blue-600"
    }`}
  >
    <BedDouble size={18} />
    Room Allocation
  </button>

  {/* <button
    onClick={() => setResidentTab("visitors")}
    className={`flex items-center gap-2 pb-2 transition-all ${
      residentTab === "visitors"
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
        : "text-slate-600 hover:text-blue-600"
    }`}
  >
    <UserRound size={18} />
    Visitors
  </button> */}

  <button
    onClick={() => setResidentTab("complaints")}
    className={`flex items-center gap-2 pb-2 transition-all ${
      residentTab === "complaints"
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
        : "text-slate-600 hover:text-blue-600"
    }`}
  >
    <AlertCircle size={18} />
    Complaints
  </button>

  <button
    onClick={() => setResidentTab("payments")}
    className={`flex items-center gap-2 pb-2 transition-all ${
      residentTab === "payments"
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
        : "text-slate-600 hover:text-blue-600"
    }`}
  >
    <CreditCard size={18} />
    Payments
  </button>

  <button
    onClick={() => setResidentTab("documents")}
    className={`flex items-center gap-2 pb-2 transition-all ${
      residentTab === "documents"
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
        : "text-slate-600 hover:text-blue-600"
    }`}
  >
    <FileText size={18} />
    Documents
  </button>
<button
  onClick={() => setResidentTab("vacated")}
  className={`flex items-center gap-2 pb-2 ${
    residentTab === "vacated"
      ? "text-blue-600 border-b-2 border-blue-600"
      : "text-slate-600"
  }`}
>
  <LogOut size={18} />
  Vacated
</button>
</div>
{residentTab === "rooms" && (
  <RoomAllocation
    residents={residents}
    genderTab={genderTab}
  />
)}
{residentTab === "visitors" && <Visitors />}
{residentTab === "complaints" && <Complaints />}
{residentTab === "payments" && <Payments />}
{residentTab === "documents" && <Documents />}
{residentTab === "vacated" && (
  <VacatedResidents
    vacatedResidents={vacatedResidents}
  />
)}
{residentTab === "residents" && (
  <>
<div className="flex gap-3 mt-5 mb-5">

  <button
    onClick={() => setGenderTab("Male")}
    className={`px-4 py-2 rounded-xl ${
      genderTab === "Male"
        ? "bg-blue-600 text-white"
        : "bg-slate-100"
    }`}
  >
    Male
  </button>

  <button
    onClick={() => setGenderTab("Female")}
    className={`px-4 py-2 rounded-xl ${
      genderTab === "Female"
        ? "bg-pink-600 text-white"
        : "bg-slate-100"
    }`}
  >
    Female
  </button>

  <button
    onClick={() => setGenderTab("Others")}
    className={`px-4 py-2 rounded-xl ${
      genderTab === "Others"
        ? "bg-purple-600 text-white"
        : "bg-slate-100"
    }`}
  >
    Others
  </button>

</div>
        {/* Search Area */}
        <div className="flex flex-wrap gap-4 mt-6">

          <div className="flex items-center border rounded-xl px-4 py-3 flex-1 min-w-[300px]">
            <Search size={20} className="text-slate-400" />

            <input
  type="text"
  placeholder="Search Resident..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="outline-none ml-3 w-full"
/>
          </div>

         <select
  value={roomFilter}
  onChange={(e) => setRoomFilter(e.target.value)}
  className="border rounded-xl px-4 py-3"
>
  <option value="All">All Rooms</option>
  <option value="A-101">A-101</option>
  <option value="B-205">B-205</option>
</select>

          <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="border rounded-xl px-4 py-3"
>
  <option value="All">All Status</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
</select>

<button
  onClick={() => setShowModal(true)}
  className="bg-blue-600 text-white px-6 py-3 rounded-xl"
>
  + Add Resident
</button>
        </div>

        {/* Resident Table */}
       <div className="hidden md:block mt-8 overflow-x-auto">

         <table className="w-full">

            <thead>
  <tr className="bg-slate-100 border-b">

  <th className="text-left px-4 py-4 font-semibold">
  Resident
</th>

<th className="text-left px-4 py-4 font-semibold">
  Room No
</th>

<th className="text-left px-4 py-4 font-semibold">
  Bed No
</th>

<th className="text-left px-4 py-4 font-semibold">
  Age
</th>
<th className="text-left px-4 py-4 font-semibold">
  Gender
</th>

<th className="text-left px-4 py-4 font-semibold">
  Phone
</th>

<th className="text-left px-4 py-4 font-semibold">
  Rent
</th>

<th className="text-left px-4 py-4 font-semibold">
  Joining Date
</th>

<th className="text-center px-4 py-4 font-semibold">
  Status
</th>

<th className="text-center px-4 py-4 font-semibold">
  Actions
</th>
  </tr>
</thead>
            

             <tbody>
  {filteredResidents.map((resident) => (
    <tr key={resident.id} className="border-b hover:bg-slate-50">

      <td className="px-4 py-5">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <p className="font-medium">{resident.name}</p>
            <p className="text-xs text-slate-500">
              RES{resident.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-5">{resident.room}</td>
      <td className="px-5 py-5">{resident.bed}</td>
      <td className="px-5 py-5">{resident.age}</td>
      <td className="px-5 py-5">
  {resident.gender}
</td>
      <td className="px-5 py-5">{resident.phone}</td>
      <td className="px-5 py-5">₹{resident.rent}</td>
      <td className="px-5 py-5">Today</td>

      <td className="text-center">
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
          {resident.status}
        </span>
      </td>

      <td>
        <div className="flex justify-center gap-3">
          <Eye
  size={18}
  className="cursor-pointer"
  onClick={() => {
    setSelectedResident(resident);
    setShowViewModal(true);
  }}
/>
         <Edit
  size={18}
  className="cursor-pointer"
  onClick={() => {
    setSelectedResident(resident);
    setFormData(resident);
    setShowEditModal(true);
  }}
/>
         <Trash2
  size={18}
  className="cursor-pointer text-red-600"
  onClick={() => {
    if (
      window.confirm(
        `Delete ${resident.name}?`
      )
    ) {
      setResidents(
        residents.filter(
          (r) => r.id !== resident.id
        )
      );
    }
  }}
/>
        </div>
      </td>

    </tr>
  ))}
</tbody>
        

          </table>

        </div>
        <div className="md:hidden mt-6 space-y-4">

  {filteredResidents.map((resident) => (

    <div
      key={resident.id}
      className="bg-white border rounded-2xl p-4 shadow-sm"
    >

      <div className="flex items-center gap-3 mb-4">

        <img
          src="https://i.pravatar.cc/40"
          className="w-14 h-14 rounded-full"
        />

        <div>
          <h3 className="font-bold">
            {resident.name}
          </h3>

          <p className="text-sm text-slate-500">
            RES{resident.id}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">

        <p>
          <strong>Room:</strong> {resident.room}
        </p>

        <p>
          <strong>Bed:</strong> {resident.bed}
        </p>

        <p>
          <strong>Age:</strong> {resident.age}
        </p>

        <p>
          <strong>Gender:</strong> {resident.gender}
        </p>

        <p>
          <strong>Phone:</strong> {resident.phone}
        </p>

        <p>
          <strong>Rent:</strong> ₹{resident.rent}
        </p>

      </div>

      <div className="flex justify-between mt-4">

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {resident.status}
        </span>

        <div className="flex gap-3">

          <Eye
            size={18}
            className="cursor-pointer"
            onClick={() => {
              setSelectedResident(resident);
              setShowViewModal(true);
            }}
          />

          <Edit
            size={18}
            className="cursor-pointer"
            onClick={() => {
              setSelectedResident(resident);
              setFormData(resident);
              setShowEditModal(true);
            }}
          />

          <Trash2
            size={18}
            className="cursor-pointer text-red-600"
          />

        </div>

      </div>

    </div>

  ))}

</div>
</>
)}
      </div>
{showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-8 w-[600px]">

      <h2 className="text-2xl font-bold mb-6">
        Add Resident
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          placeholder="Resident Name"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          placeholder="Age"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, age: e.target.value })
          }
        />
        <select
  className="border p-3 rounded-xl"
  onChange={(e) =>
    setFormData({
      ...formData,
      gender: e.target.value,
    })
  }
>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Others">Others</option>
</select>

        <input
          placeholder="Room"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, room: e.target.value })
          }
        />

        <input
          placeholder="Bed"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, bed: e.target.value })
          }
        />

        <input
          placeholder="Floor"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, floor: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />

        <input
          placeholder="Rent"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, rent: e.target.value })
          }
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowModal(false)}
          className="px-5 py-3 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={() => {
  setResidents([
    ...residents,
    {
      ...formData,
      id: Date.now(),
    },
  ]);

  setShowModal(false);

  setFormData({
    name: "",
    age: "",
    gender: "Male",
    room: "",
    bed: "",
    floor: "",
    phone: "",
    rent: "",
    status: "Active",
  });
          }}
          className="px-5 py-3 rounded-xl bg-blue-600 text-white"
        >
          Save
        </button>

      </div>

    </div>

  </div>
)}
{showViewModal && selectedResident && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-3xl w-[500px]">

      <h2 className="text-2xl font-bold mb-6">
        Resident Details
      </h2>

      <p><b>Name:</b> {selectedResident.name}</p>
      <p><b>Age:</b> {selectedResident.age}</p>
      <p><b>Room:</b> {selectedResident.room}</p>
      <p><b>Bed:</b> {selectedResident.bed}</p>
      <p><b>Floor:</b> {selectedResident.floor}</p>
      <p><b>Phone:</b> {selectedResident.phone}</p>

      <button
        onClick={() => setShowViewModal(false)}
        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl"
      >
        Close
      </button>

    </div>
  </div>
)}
{showEditModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-8 w-[600px]">

      <h2 className="text-2xl font-bold mb-6">
        Edit Resident
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

        <input
          value={formData.age}
          onChange={(e) =>
            setFormData({
              ...formData,
              age: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

        <select
          value={formData.gender}
          onChange={(e) =>
            setFormData({
              ...formData,
              gender: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select>

        <input
          value={formData.room}
          onChange={(e) =>
            setFormData({
              ...formData,
              room: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

        <input
          value={formData.bed}
          onChange={(e) =>
            setFormData({
              ...formData,
              bed: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

        <input
          value={formData.floor}
          onChange={(e) =>
            setFormData({
              ...formData,
              floor: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

        <input
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

        <input
          value={formData.rent}
          onChange={(e) =>
            setFormData({
              ...formData,
              rent: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowEditModal(false)}
          className="border px-5 py-3 rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setResidents(
              residents.map((r) =>
                r.id === selectedResident.id
                  ? {
                      ...formData,
                      id: selectedResident.id,
                    }
                  : r
              )
            );

            setShowEditModal(false);
          }}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Save
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}