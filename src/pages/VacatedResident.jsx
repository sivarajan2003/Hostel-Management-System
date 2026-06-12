import {
  LogOut,
  Calendar,
  BedDouble,
  Search,
} from "lucide-react";
import { useState } from "react";
export default function VacatedResident() {
  const vacatedResidents = [
    {
      id: 1,
      name: "Arun Kumar",
      room: "A-101",
      vacatedDate: "10-Jun-2026",
      reason: "Job Transfer",
    },
    {
      id: 2,
      name: "Hari Prasad",
      room: "B-204",
      vacatedDate: "08-Jun-2026",
      reason: "Course Completed",
    },
    {
      id: 3,
      name: "Vignesh",
      room: "C-302",
      vacatedDate: "05-Jun-2026",
      reason: "Personal Reason",
    },
  ];
  const [residentName, setResidentName] = useState("");
const [phone, setPhone] = useState("");
const [roomNo, setRoomNo] = useState("");
const [roomType, setRoomType] = useState("");
const [vacatedDate, setVacatedDate] = useState("");
const [reason, setReason] = useState("");
const [refundAmount, setRefundAmount] = useState("");
const [remarks, setRemarks] = useState("");
const [successMessage, setSuccessMessage] = useState("");
const handleVacate = () => {
  setSuccessMessage(
    "✅ Resident vacated successfully."
  );

  // Clear form
  setResidentName("");
  setPhone("");
  setRoomNo("");
  setRoomType("");
  setVacatedDate("");
  setReason("");
  setRefundAmount("");
  setRemarks("");

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);
};

return (
  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8">

      <h1 className="text-xl font-semibold text-slate-800 mb-1">
        Vacate Resident
      </h1>

      <p className="text-sm text-slate-500 mb-6">
        Fill resident vacating details
      </p>
{successMessage && (
  <div className="mb-5 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm">
    {successMessage}
  </div>
)}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

        <div>
          <label className="block text-sm font-medium mb-2">
            Resident Name
          </label>

          <input
  type="text"
  value={residentName}
  onChange={(e) => setResidentName(e.target.value)}
  placeholder="Enter Resident Name"
  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Phone Number
          </label>

         <input
  type="text"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="9876543210"
  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Room Number
          </label>

         <input
  type="text"
  value={roomNo}
  onChange={(e) => setRoomNo(e.target.value)}
  placeholder="A-101"
  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Room Type
          </label>

          <select
  value={roomType}
  onChange={(e) => setRoomType(e.target.value)}
  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
>            <option>Select Room Type</option>
            <option>Single Sharing</option>
            <option>Double Sharing</option>
            <option>Triple Sharing</option>
            <option>Four Sharing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Vacated Date
          </label>

         <input
  type="date"
  value={vacatedDate}
  onChange={(e) => setVacatedDate(e.target.value)}
  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Vacated Reason
          </label>

         <select
  value={reason}
  onChange={(e) => setReason(e.target.value)}
  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
>            <option>Select Reason</option>
            <option>Course Completed</option>
            <option>Job Transfer</option>
            <option>Personal Reason</option>
            <option>Family Relocation</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Refund Amount
          </label>

         <input
  type="number"
  value={refundAmount}
  onChange={(e) => setRefundAmount(e.target.value)}
  placeholder="₹ 0"
  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
/>
        </div>

      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium mb-2">
          Remarks
        </label>

       <textarea
  rows={5}
  value={remarks}
  onChange={(e) => setRemarks(e.target.value)}
  placeholder="Enter remarks..."
  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm resize-none"
/>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

        <button className="w-full sm:w-auto px-5 py-3 border border-slate-300 rounded-xl text-sm font-medium">
          Cancel
        </button>

        <button
  onClick={handleVacate}
  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm"
>
  Vacate Resident
</button>

      </div>

    </div>

  </div>
);
}