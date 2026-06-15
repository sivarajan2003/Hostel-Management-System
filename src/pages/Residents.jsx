import { useState, useEffect } from "react";
import {
  User, Phone, CreditCard, BedDouble, Home,
  Calendar, IndianRupee, Mail, MapPin, ArrowLeft,
  CheckCircle, XCircle, Clock, Plus, X,
} from "lucide-react";
import { paymentsApi, attendanceApi } from "../utils/api";
import { message } from "antd";

export default function Residents({ resident, onBack }) {
  if (!resident) return <p className="p-10 text-slate-400">No resident selected.</p>;

  /* ── live attendance state ─────────────────────────────── */
  const [checkedIn, setCheckedIn]       = useState(false);
  const [checkInTime, setCheckInTime]   = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [stayTime, setStayTime]         = useState("");

  /* ── payment state ─────────────────────────────────────── */
  const [payments, setPayments]         = useState([]);
  const [payLoading, setPayLoading]     = useState(true);
  const [showPayPopup, setShowPayPopup] = useState(false);
  const [payMethod, setPayMethod]       = useState("Cash");
  const [payAmount, setPayAmount]       = useState(resident.rent || "");

  /* ── live stay timer ────────────────────────────────────── */
  useEffect(() => {
    if (!checkInTime) return;
    const iv = setInterval(() => {
      const diff = Date.now() - new Date(checkInTime).getTime();
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setStayTime(`${d}d ${h}h ${m}m`);
    }, 30000);
    return () => clearInterval(iv);
  }, [checkInTime]);

  /* ── fetch today's attendance ───────────────────────────── */
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    attendanceApi.getAll({ date: today, search: resident.name })
      .then((rows) => {
        const rec = rows.find((r) => r.id === resident.id || r.name === resident.name);
        if (rec) {
          setCheckedIn(rec.status === "In PG");
          if (rec.check_in_time)  setCheckInTime(rec.check_in_time);
          if (rec.check_out_time) setCheckOutTime(rec.check_out_time);
        }
      })
      .catch(() => {});
  }, []);

  /* ── fetch payment history ──────────────────────────────── */
  const fetchPayments = () => {
    setPayLoading(true);
    paymentsApi.getAll({ search: resident.name })
      .then(setPayments)
      .catch(() => {})
      .finally(() => setPayLoading(false));
  };
  useEffect(fetchPayments, []);

  /* ── check-in handler ───────────────────────────────────── */
  const handleCheckIn = async () => {
    try {
      await attendanceApi.updateStatus({
        resident_id:   resident.id,
        resident_name: resident.name,
        status: "In PG",
      });
      const now = new Date();
      setCheckedIn(true);
      setCheckInTime(now.toISOString());
      setCheckOutTime(null);
      message.success("Checked In");
    } catch { message.error("Check-in failed"); }
  };

  /* ── check-out handler ──────────────────────────────────── */
  const handleCheckOut = async () => {
    try {
      await attendanceApi.updateStatus({
        resident_id:   resident.id,
        resident_name: resident.name,
        status: "Out",
      });
      const now = new Date();
      setCheckedIn(false);
      setCheckOutTime(now.toISOString());
      message.success("Checked Out");
    } catch { message.error("Check-out failed"); }
  };

  /* ── pay rent handler ───────────────────────────────────── */
  const handlePay = async () => {
    if (!payAmount) return message.error("Enter amount");
    try {
      await paymentsApi.create({
        resident_id:   resident.id,
        resident_name: resident.name,
        amount:        parseFloat(payAmount),
        method:        payMethod,
        status:        "Paid",
        payment_date:  new Date().toISOString().split("T")[0],
        month:         new Date().toISOString().slice(0, 7),
      });
      message.success("Payment recorded ✅");
      setShowPayPopup(false);
      fetchPayments();
    } catch (err) { message.error(err.message || "Payment failed"); }
  };

  /* ── helpers ────────────────────────────────────────────── */
  const fmt    = (v) => v || "—";
  const fmtDt  = (v) => v ? new Date(v).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";
  const fmtDate= (v) => v ? new Date(v).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "—";

  /* ── stay duration from join_date ───────────────────────── */
  const joinDiff = resident.join_date
    ? (() => {
        const ms   = Date.now() - new Date(resident.join_date).getTime();
        const days = Math.floor(ms / 86400000);
        const mo   = Math.floor(days / 30);
        return mo > 0 ? `${mo} month${mo > 1 ? "s" : ""} ${days % 30} days` : `${days} days`;
      })()
    : null;

  /* ── info cards config ──────────────────────────────────── */
  const infoCards = [
    { icon: User,        color: "blue",   label: "Age",         value: fmt(resident.age) },
    { icon: Phone,       color: "green",  label: "Mobile",      value: fmt(resident.phone) },
    { icon: Mail,        color: "red",    label: "Email",       value: fmt(resident.email) },
    { icon: CreditCard,  color: "purple", label: "Aadhaar",     value: fmt(resident.aadhaar) },
    { icon: Home,        color: "orange", label: "Room No",     value: fmt(resident.room_no) },
    { icon: BedDouble,   color: "pink",   label: "Room Type",   value: fmt(resident.room_type) },
    { icon: BedDouble,   color: "cyan",   label: "Bed No",      value: fmt(resident.bed_no) },
    { icon: MapPin,      color: "indigo", label: "Floor",       value: fmt(resident.floor) },
    { icon: Calendar,    color: "red",    label: "Join Date",   value: fmtDate(resident.join_date) },
    { icon: IndianRupee, color: "green",  label: "Monthly Rent",value: `₹ ${resident.rent || 0}` },
    {
      icon: CheckCircle,
      color: resident.payment_status === "Paid" ? "green" : "red",
      label: "Payment Status",
      value: fmt(resident.payment_status),
    },
    {
      icon: User,
      color: resident.status === "Active" ? "green" : "yellow",
      label: "Status",
      value: fmt(resident.status),
    },
  ];

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">

      {/* Back */}
      <button onClick={onBack}
        className="mb-6 flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm">
        <ArrowLeft size={16} /> Back To Residents
      </button>

      {/* Page title + Check-in/out */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Resident Profile</h1>
          <p className="text-sm text-slate-500 mt-1">Full details, attendance & payment history</p>
        </div>
        <div className="flex gap-3">
          <button
            disabled={checkedIn}
            onClick={handleCheckIn}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              checkedIn ? "bg-green-100 text-green-600 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            ✅ Check In
          </button>
          <button
            disabled={!checkedIn}
            onClick={handleCheckOut}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              !checkedIn ? "bg-red-100 text-red-400 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            🚪 Check Out
          </button>
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="h-36 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <div className="px-6 pb-6">
          <div className="-mt-14 flex flex-col md:flex-row gap-5 items-center md:items-end">
            <img
              src={resident.image || `https://i.pravatar.cc/150?u=${resident.id}`}
              alt={resident.name}
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-center md:text-left pb-1">
              <h2 className="text-2xl font-bold text-slate-800">{resident.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                ID: {resident.id?.slice(0, 8).toUpperCase()} &nbsp;·&nbsp; {resident.gender}
              </p>
              {joinDiff && (
                <p className="text-xs text-blue-600 font-medium mt-1">🏠 Staying for {joinDiff}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {infoCards.map(({ icon: Icon, color, label, value }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <Icon size={18} className={`text-${color}-500 mb-2`} />
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate">{value}</p>
          </div>
        ))}
      </div>

      {/* Attendance status row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`rounded-2xl p-4 ${checkedIn ? "bg-green-50" : "bg-slate-50"}`}>
          <p className="text-xs text-slate-500">Current Status</p>
          <p className={`text-base font-bold mt-1 ${checkedIn ? "text-green-600" : "text-slate-500"}`}>
            {checkedIn ? "In PG" : "Out"}
          </p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-xs text-slate-500">Check-In Time</p>
          <p className="text-sm font-semibold text-blue-700 mt-1">{fmtDt(checkInTime)}</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-4">
          <p className="text-xs text-slate-500">Check-Out Time</p>
          <p className="text-sm font-semibold text-red-600 mt-1">{fmtDt(checkOutTime)}</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4">
          <p className="text-xs text-slate-500">Session Duration</p>
          <p className="text-sm font-semibold text-purple-700 mt-1">
            {checkInTime && checkedIn ? (stayTime || "Just now") : "—"}
          </p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Payment History</h2>
          <button
            onClick={() => setShowPayPopup(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={16} /> Pay Rent
          </button>
        </div>

        {payLoading ? (
          <p className="text-center text-slate-400 py-6 text-sm">Loading payments…</p>
        ) : payments.length === 0 ? (
          <p className="text-center text-slate-400 py-6 text-sm">No payment records yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["Date", "Month", "Amount", "Method", "Status"].map((h) => (
                    <th key={h} className="p-3 text-left font-semibold text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">{fmtDate(p.payment_date)}</td>
                    <td className="p-3">{p.month || "—"}</td>
                    <td className="p-3 font-medium">₹{parseFloat(p.amount).toLocaleString()}</td>
                    <td className="p-3">{p.method}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "Paid"    ? "bg-green-100 text-green-700" :
                        p.status === "Overdue" ? "bg-red-100 text-red-600"    :
                                                 "bg-yellow-100 text-yellow-700"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pay Rent popup */}
      {showPayPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Pay Rent</h2>
              <button onClick={() => setShowPayPopup(false)}><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Resident</label>
                <input value={resident.name} readOnly
                  className="w-full border rounded-xl p-2.5 text-sm bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Room</label>
                <input value={resident.room_no || "Not assigned"} readOnly
                  className="w-full border rounded-xl p-2.5 text-sm bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                <input type="number" value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border rounded-xl p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full border rounded-xl p-2.5 text-sm">
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowPayPopup(false)}
                className="border px-5 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={handlePay}
                className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm hover:bg-green-700">
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
