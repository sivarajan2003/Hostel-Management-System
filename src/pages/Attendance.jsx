import { useState } from "react";
import {
  CalendarDays,
  UserCheck,
  UserX,
  Users,
  Search,
  Save,
} from "lucide-react";

export default function AttendanceManagement() {
  const [saved, setSaved] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [students, setStudents] = useState([
    {
  id: 1,
  residentId: "RES001",
  name: "Arun Kumar",
  gender: "Male",
  floor: "Ground Floor",
  roomNo: "A-101",
  status: "In PG",
  image: "https://i.pravatar.cc/100?img=1",
},
{
  id: 2,
  residentId: "RES002",
  name: "Hari Prasad",
  gender: "Male",
  floor: "1st Floor",
  roomNo: "B-202",
  status: "Out",
  image: "https://i.pravatar.cc/100?img=2",
},
{
  id: 3,
  residentId: "RES003",
  name: "Keerthana",
  gender: "Female",
  floor: "2nd Floor",
  roomNo: "F-301",
  status: "Leave",
  image: "https://i.pravatar.cc/100?img=3",
},
  ]);

  const updateStatus = (id, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const totalStudents = students.length;
  const presentStudents = students.filter(
    (s) => s.status === "Present"
  ).length;
  const absentStudents = students.filter(
    (s) => s.status === "Absent"
  ).length;

  const attendancePercentage = Math.round(
    (presentStudents / totalStudents) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Attendance Management
        </h1>

        <p className="text-slate-500 mt-2">
          Track hostel student attendance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500">
                Total Residents
              </p>
              <h2 className="text-4xl font-bold mt-2">
                {totalStudents}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Users className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500">
                Currently In PG
              </p>
              <h2 className="text-4xl font-bold text-green-600 mt-2">
                {presentStudents}
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <UserCheck className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500">
                Outside PG
              </p>
              <h2 className="text-4xl font-bold text-red-600 mt-2">
                {absentStudents}
              </h2>
            </div>

            <div className="bg-red-100 p-4 rounded-2xl">
              <UserX className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500">
               Occupancy %
              </p>
              <h2 className="text-4xl font-bold text-purple-600 mt-2">
                {attendancePercentage}%
              </h2>
            </div>

            <div className="bg-purple-100 p-4 rounded-2xl">
              <CalendarDays className="text-purple-600" />
            </div>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-sm p-5 mt-8">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="date"
            className="border border-slate-200 rounded-xl p-3"
          />

          <select className="border border-slate-200 rounded-xl p-3">
            <option>All Rooms</option>
<option>A-101</option>
<option>B-202</option>
<option>F-301</option>
          </select>

          <select className="border border-slate-200 rounded-xl p-3">
            <option>All Floors</option>
<option>Ground Floor</option>
<option>1st Floor</option>
<option>2nd Floor</option>
          </select>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search Student"
              className="w-full border border-slate-200 rounded-xl pl-12 py-3"
            />
          </div>

        </div>

      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-3xl shadow-sm mt-8 overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">
            Daily Attendance
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-4">
                  Resident
                </th>
                <th className="text-left px-6 py-4">
                  Gender
                </th>
                <th className="text-left px-6 py-4">
                  Floor
                </th>
                <th className="text-left px-6 py-4">
                  Room No
                </th>
                <th className="text-center px-6 py-4">
                  Stay Status
                </th>
              </tr>
            </thead>

            <tbody>

              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <img
                        src={student.image}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />

                      <div>
                        <p className="font-semibold">
                          {student.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {student.studentId}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {student.gender}
                  </td>

                  <td className="px-6 py-4">
                    {student.floor}
                  </td>

                  <td className="px-6 py-4">
                   {student.residentId}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

  <button
    onClick={() => updateStatus(student.id, "In PG")}
    className={`px-4 py-2 rounded-xl ${
      student.status === "In PG"
        ? "bg-green-600 text-white"
        : "bg-green-100 text-green-700"
    }`}
  >
    Check In
  </button>

  <button
    onClick={() => updateStatus(student.id, "Out")}
    className={`px-4 py-2 rounded-xl ${
      student.status === "Out"
        ? "bg-red-600 text-white"
        : "bg-red-100 text-red-700"
    }`}
  >
    Check Out
  </button>

  <button
    onClick={() => updateStatus(student.id, "Leave")}
    className={`px-4 py-2 rounded-xl ${
      student.status === "Leave"
        ? "bg-yellow-600 text-white"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    Leave
  </button>

</div>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">

        <button
  onClick={() => setShowSavePopup(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
>
  <Save size={18} />
  Save Attendance
</button>

      </div>
{showSavePopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white p-8 rounded-3xl w-[400px] text-center">

      <h2 className="text-2xl font-bold text-green-600">
        Attendance Saved
      </h2>

      <p className="text-slate-500 mt-3">
        Today's attendance has been saved successfully.
      </p>

      <button
        onClick={() => setShowSavePopup(false)}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        OK
      </button>

    </div>

  </div>
)}    </div>
  );
}