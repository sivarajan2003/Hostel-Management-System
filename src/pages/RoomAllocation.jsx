import { useState, useEffect } from "react";
import { BedDouble, Search } from "lucide-react";
import { residentsApi } from "../utils/api";
import { message } from "antd";

export default function RoomAllocation() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderTab, setGenderTab] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    residentsApi
      .getAll({ status: "Active" })
      .then(setResidents)
      .catch(() => message.error("Failed to load residents"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = residents.filter((r) => {
    const matchGender = genderTab === "All" || r.gender === genderTab;
    const matchSearch =
      !search ||
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.room_no?.toLowerCase().includes(search.toLowerCase());
    return matchGender && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">Room Allocation</h1>
        <p className="text-sm text-slate-500 mt-1">
          View bed and room assignments for all active residents
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Gender tabs */}
          <div className="flex gap-2">
            {["All", "Male", "Female", "Others"].map((g) => (
              <button
                key={g}
                onClick={() => setGenderTab(g)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  genderTab === g
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-10 py-2.5 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            No residents found.
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {["Resident", "Gender", "Age", "Room No", "Bed No", "Floor", "Room Type", "Status"].map(
                      (h) => (
                        <th key={h} className="px-4 py-3 text-left font-semibold text-slate-700">
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={r.image || "https://i.pravatar.cc/150"}
                            alt=""
                            className="w-9 h-9 rounded-full"
                          />
                          <span className="font-medium">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{r.gender}</td>
                      <td className="px-4 py-3">{r.age || "—"}</td>
                      <td className="px-4 py-3">
                        {r.room_no ? (
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-medium">
                            {r.room_no}
                          </span>
                        ) : (
                          <span className="text-slate-400">Not Assigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3">{r.bed_no || "—"}</td>
                      <td className="px-4 py-3">{r.floor || "—"}</td>
                      <td className="px-4 py-3">{r.room_type || "—"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            r.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-4 p-4">
              {filtered.map((r) => (
                <div key={r.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={r.image || "https://i.pravatar.cc/150"}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">{r.name}</h3>
                      <p className="text-xs text-slate-500">{r.gender}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <p><strong>Room:</strong> {r.room_no || "Not Assigned"}</p>
                    <p><strong>Bed:</strong> {r.bed_no || "—"}</p>
                    <p><strong>Floor:</strong> {r.floor || "—"}</p>
                    <p><strong>Type:</strong> {r.room_type || "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Summary footer */}
      <div className="mt-4 text-sm text-slate-500 text-right">
        Showing {filtered.length} of {residents.length} residents
      </div>
    </div>
  );
}
