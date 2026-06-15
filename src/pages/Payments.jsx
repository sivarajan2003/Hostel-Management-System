import { useState, useEffect } from "react";
import { Search, Plus, X, IndianRupee } from "lucide-react";
import { paymentsApi, residentsApi } from "../utils/api";
import { message } from "antd";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [residents, setResidents] = useState([]);
  const [form, setForm] = useState({ resident_id: "", resident_name: "", amount: "", method: "Cash", status: "Paid", month: "" });

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (statusFilter !== "All") params.status = statusFilter;
      const data = await paymentsApi.getAll(params);
      setPayments(data);
    } catch (_) {
      message.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await paymentsApi.getStats();
      setStats(data);
    } catch (_) {}
  };

  const fetchResidents = async () => {
    try {
      const data = await residentsApi.getAll({ status: "Active" });
      setResidents(data);
    } catch (_) {}
  };

  useEffect(() => {
    fetchPayments();
    fetchStats();
    fetchResidents();
  }, [search, statusFilter]);

  const handleAdd = async () => {
    if (!form.resident_name || !form.amount) return message.error("Resident name and amount are required");
    try {
      await paymentsApi.create({
        ...form,
        amount: parseFloat(form.amount),
        payment_date: new Date().toISOString().split("T")[0],
      });
      message.success("Payment recorded");
      setShowAdd(false);
      setForm({ resident_id: "", resident_name: "", amount: "", method: "Cash", status: "Paid", month: "" });
      fetchPayments();
      fetchStats();
    } catch (err) {
      message.error(err.message || "Failed to record payment");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await paymentsApi.updateStatus(id, status);
      message.success("Status updated");
      fetchPayments();
      fetchStats();
    } catch (_) {
      message.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Rent Payments</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage resident rent payments</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl flex items-center gap-2">
          <Plus size={18} /> Add Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Payments", value: stats.total, color: "blue" },
          { label: "Paid", value: stats.paid, color: "green" },
          { label: "Pending", value: stats.pending, color: "yellow" },
          { label: "Overdue", value: stats.overdue, color: "red" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">{label}</p>
            <h2 className={`text-2xl font-semibold mt-1 text-${color}-600`}>{value}</h2>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
            <input type="text" placeholder="Search resident..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-12 py-2.5 text-sm" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm">
            <option>All</option><option>Paid</option><option>Pending</option><option>Overdue</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : payments.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No payment records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Resident</th>
                  <th className="px-4 py-3 text-left font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Method</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Month</th>
                  <th className="px-4 py-3 text-center font-semibold">Status</th>
                  <th className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{p.resident_name}</td>
                    <td className="px-4 py-3">₹{parseFloat(p.amount).toLocaleString()}</td>
                    <td className="px-4 py-3">{p.method}</td>
                    <td className="px-4 py-3">{p.payment_date || "—"}</td>
                    <td className="px-4 py-3">{p.month || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "Paid" ? "bg-green-100 text-green-700" :
                        p.status === "Overdue" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {p.status === "Pending" && (
                        <button onClick={() => updateStatus(p.id, "Paid")}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700">
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Payment Popup */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Add Payment</h2>
              <button onClick={() => setShowAdd(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Resident</label>
                <select
                  value={form.resident_id}
                  onChange={(e) => {
                    const r = residents.find(r => r.id === e.target.value);
                    setForm({ ...form, resident_id: e.target.value, resident_name: r?.name || "" });
                  }}
                  className="w-full border rounded-xl p-2.5 text-sm"
                >
                  <option value="">Select Resident</option>
                  {residents.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                <input type="number" placeholder="5000" value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Method</label>
                  <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="w-full border rounded-xl p-2.5 text-sm">
                    <option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded-xl p-2.5 text-sm">
                    <option>Paid</option><option>Pending</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Month</label>
                <input type="month" value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="px-5 py-3 border rounded-xl text-sm">Cancel</button>
              <button onClick={handleAdd} className="px-5 py-3 bg-blue-600 text-white rounded-xl text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
