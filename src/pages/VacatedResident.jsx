import { LogOut, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { vacatedApi } from "../utils/api";
import { message } from "antd";

export default function VacatedResident() {
  const [vacatedResidents, setVacatedResidents] = useState([]);
  const [residentName, setResidentName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("");
  const [vacatedDate, setVacatedDate] = useState("");
  const [reason, setReason] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchVacated = async () => {
    try {
      const data = await vacatedApi.getAll();
      setVacatedResidents(data);
    } catch (_) {
      message.error("Failed to load vacated residents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacated();
  }, []);

  const handleVacate = async () => {
    if (!residentName) return message.error("Resident name is required");
    try {
      await vacatedApi.vacate({
        resident_name: residentName,
        phone,
        room_no: roomNo,
        room_type: roomType,
        vacated_date: vacatedDate || new Date().toISOString().split("T")[0],
        reason,
        refund_amount: refundAmount ? parseFloat(refundAmount) : 0,
        remarks,
      });
      setSuccessMessage("✅ Resident vacated successfully.");
      setResidentName(""); setPhone(""); setRoomNo(""); setRoomType("");
      setVacatedDate(""); setReason(""); setRefundAmount(""); setRemarks("");
      fetchVacated();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      message.error(err.message || "Failed to vacate resident");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

      {/* Vacate Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-1">Vacate Resident</h1>
        <p className="text-sm text-slate-500 mb-6">Fill resident vacating details</p>

        {successMessage && (
          <div className="mb-5 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {[
            { label: "Resident Name *", value: residentName, set: setResidentName, placeholder: "Enter Resident Name" },
            { label: "Phone Number", value: phone, set: setPhone, placeholder: "9876543210" },
            { label: "Room Number", value: roomNo, set: setRoomNo, placeholder: "A-101" },
            { label: "Refund Amount (₹)", value: refundAmount, set: setRefundAmount, placeholder: "0", type: "number" },
          ].map(({ label, value, set, placeholder, type = "text" }) => (
            <div key={label}>
              <label className="block text-sm font-medium mb-2">{label}</label>
              <input type={type} value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm" />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-2">Room Type</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm">
              <option value="">Select Room Type</option>
              <option>Single Sharing</option><option>Double Sharing</option><option>Triple Sharing</option><option>Four Sharing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Vacated Date</label>
            <input type="date" value={vacatedDate} onChange={(e) => setVacatedDate(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Vacated Reason</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm">
              <option value="">Select Reason</option>
              <option>Course Completed</option><option>Job Transfer</option><option>Personal Reason</option><option>Family Relocation</option><option>Other</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium mb-2">Remarks</label>
          <textarea rows={4} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Enter remarks..."
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm resize-none" />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <button onClick={() => { setResidentName(""); setPhone(""); setRoomNo(""); setRoomType(""); setVacatedDate(""); setReason(""); setRefundAmount(""); setRemarks(""); }}
            className="w-full sm:w-auto px-5 py-3 border border-slate-300 rounded-xl text-sm font-medium">
            Cancel
          </button>
          <button onClick={handleVacate} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm">
            Vacate Resident
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Vacated History</h2>
        {loading ? (
          <div className="text-center text-slate-400 py-6">Loading...</div>
        ) : vacatedResidents.length === 0 ? (
          <div className="text-center text-slate-400 py-6">No vacated records yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Room</th>
                  <th className="p-3 text-left font-semibold">Vacated Date</th>
                  <th className="p-3 text-left font-semibold">Reason</th>
                  <th className="p-3 text-left font-semibold">Refund</th>
                </tr>
              </thead>
              <tbody>
                {vacatedResidents.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-medium">{r.resident_name}</td>
                    <td className="p-3">{r.room_no || "—"}</td>
                    <td className="p-3">{r.vacated_date || "—"}</td>
                    <td className="p-3">{r.reason || "—"}</td>
                    <td className="p-3">₹{r.refund_amount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
