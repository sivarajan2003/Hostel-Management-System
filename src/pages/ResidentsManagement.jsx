//ResidentsManagement.jsx
import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
export default function ResidentsManagement({
  setSelectedResident,
}) {
  const [residents, setResidents] = useState([
    {
      id: 1,
      name: "Arun Kumar",
      gender: "Male",
      room: "A-101",
      bed: "Bed-1",
      phone: "9876543210",
      rent: 4500,
      status: "Active",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "Hari Prasad",
      gender: "Male",
      room: "A-102",
      bed: "Bed-2",
      phone: "9876543211",
      rent: 5000,
      status: "Pending",
      image: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: 3,
      name: "Keerthana",
      gender: "Female",
      room: "F-201",
      bed: "Bed-1",
      phone: "9876543212",
      rent: 6000,
      status: "Active",
      image: "https://i.pravatar.cc/150?img=14",
    },
  ]);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");

  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

//   const [selectedResident, setSelectedResident] =
//     useState(null);

  const [newResident, setNewResident] = useState({
    name: "",
    gender: "Male",
    room: "",
    bed: "",
    phone: "",
    rent: "",
    status: "Active",
  });

  const filteredResidents = residents.filter(
    (resident) => {
      const matchesSearch = resident.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGender =
        gender === "All"
          ? true
          : resident.gender === gender;

      const matchesStatus =
        status === "All"
          ? true
          : resident.status === status;

      return (
        matchesSearch &&
        matchesGender &&
        matchesStatus
      );
    }
  );

  const addResident = () => {
    const resident = {
      id: Date.now(),
      image: "https://i.pravatar.cc/150",
      ...newResident,
    };

    setResidents([...residents, resident]);

    setShowAdd(false);

    setNewResident({
      name: "",
      gender: "Male",
      room: "",
      bed: "",
      phone: "",
      rent: "",
      status: "Active",
    });
  };

  const deleteResident = () => {
    setResidents(
      residents.filter(
        (r) => r.id !== selectedResident.id
      )
    );

    setShowDelete(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
<div className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-2xl font-semibold text-slate-800">
      Admin Residents Management
    </h1>

    <p className="text-sm text-slate-500 mt-1">
      Total Residents: {residents.length}
    </p>
  </div>

  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium">
    Active Residents: {
      residents.filter(
        r => r.status === "Active"
      ).length
    }
  </div>
</div>
      <div className="flex flex-col lg:flex-row gap-4 mb-6">

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Resident..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-xl pl-12 py-2.5 text-sm"
          />
        </div>

        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value)
          }
          className="border rounded-xl px-4 py-2.5 text-sm"
        >
          <option>All</option>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border rounded-xl px-4 py-2.5 text-sm"
        >
          <option>All</option>
          <option>Active</option>
          <option>Pending</option>
        </select>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl flex items-center gap-2"
        >
          <UserPlus size={18} />
          Add Resident
        </button>
      </div>

      {/* Desktop Table */}

 <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <table className="w-full table-fixed">

          <thead className="bg-slate-100">
  <tr>
    <th className="w-[30%] p-3 text-left text-sm font-semibold">Resident</th>
    <th className="w-[10%] text-center text-sm font-semibold">Room</th>
     <th className="w-[10%] text-center text-sm font-semibold">Room Bed</th>
     <th className="w-[10%] text-center text-sm font-semibold">Room Phone</th>
    <th className="w-[10%] text-center text-sm font-semibold">Room Rent</th>
     <th className="w-[10%] text-center text-sm font-semibold">Room Status</th>
     <th className="w-[10%] text-center text-sm font-semibold">Room Actions</th>
  </tr>
</thead>

          <tbody>

            {filteredResidents.map(
              (resident) => (
                <tr
                  key={resident.id}
                  className="border-b"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">

                      <img
                        src={resident.image}
                        className="w-12 h-12 rounded-full"
                      />

                      <div>
                        <h3
  className="font-bold cursor-pointer text-blue-600"
  onClick={() =>
    openResidentProfile(resident)
  }
>
  {resident.name}
</h3>

                        <p className="text-sm text-gray-500">
                          {resident.gender}
                        </p>
                      </div>

                    </div>
                  </td>

                  <td className="text-center">
  {resident.room}
</td>

<td className="text-center">
  {resident.bed}
</td>

<td className="text-center">
  {resident.phone}
</td>

<td className="text-center font-medium">
  ₹{resident.rent}
</td>

              <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        resident.status ===
                        "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {resident.status}
                    </span>
                  </td>

              <td className="text-center">
  <div className="flex justify-center items-center gap-3">
    <button
      onClick={() => {
        setSelectedResident(resident);
      }}
      className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200"
    >
      <Eye size={18} />
    </button>

    <button
      onClick={() => {
        setSelectedResident(resident);
        setShowDelete(true);
      }}
      className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
    >
      <Trash2 size={18} />
    </button>

  </div>
</td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="md:hidden space-y-4">

        {filteredResidents.map(
          (resident) => (
            <div
              key={resident.id}
              className="bg-white rounded-2xl p-4 shadow"
            >
              <div className="flex gap-3">

                <img
                  src={resident.image}
                  className="w-14 h-14 rounded-full"
                />

                <div>
                  <h3 className="font-bold">
                    {resident.name}
                  </h3>

                  <p>{resident.room}</p>

                  <p>{resident.phone}</p>
                </div>

              </div>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() => {
                    setSelectedResident(
                      resident
                    );
                    setShowView(true);
                  }}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                >
                  View
                </button>

                <button
                  onClick={() => {
                    setSelectedResident(
                      resident
                    );
                    setShowDelete(true);
                  }}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>
            </div>
          )
        )}

      </div>

      {/* View Popup */}

      {showView && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-8 rounded-3xl w-[90%] max-w-md">

            <h2 className="text-2xl font-bold mb-4">
              Resident Details
            </h2>

            <p>Name : {selectedResident.name}</p>
            <p>Gender : {selectedResident.gender}</p>
            <p>Room : {selectedResident.room}</p>
            <p>Bed : {selectedResident.bed}</p>
            <p>Phone : {selectedResident.phone}</p>
            <p>Rent : ₹{selectedResident.rent}</p>

            <button
              onClick={() => setShowView(false)}
              className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl"
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* Add Popup */}

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-8 rounded-3xl w-[90%] max-w-lg">

            <h2 className="text-2xl font-bold mb-5">
              Add Resident
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <input
                placeholder="Name"
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  setNewResident({
                    ...newResident,
                    name: e.target.value,
                  })
                }
              />

              <input
                placeholder="Room"
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  setNewResident({
                    ...newResident,
                    room: e.target.value,
                  })
                }
              />

              <input
                placeholder="Bed"
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  setNewResident({
                    ...newResident,
                    bed: e.target.value,
                  })
                }
              />

              <input
                placeholder="Phone"
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  setNewResident({
                    ...newResident,
                    phone: e.target.value,
                  })
                }
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setShowAdd(false)
                }
                className="border px-5 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={addResident}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Delete Popup */}

      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-8 rounded-3xl">

            <h2 className="text-xl font-bold">
              Delete Resident?
            </h2>

            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() =>
                  setShowDelete(false)
                }
                className="border px-5 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={deleteResident}
                className="bg-red-600 text-white px-5 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}