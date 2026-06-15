import { useState, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";
import { visitorsApi } from "../utils/api";
import { message } from "antd";

export default function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [form, setForm] = useState({ visitor_name: "", resident_name: "", phone: "", purpose: "" });

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const params = {};
      if (date) params.date = date;
      if (search) params.search = search;
      const data = await visitorsApi.getAll(params);
      setVisitors(data);
    } catch (_) {
      message.error("Failed to load visitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [date, search]);

  const handleAdd = async () => {
    if (!form.visitor_name) return message.error("Visitor name is required");
    try {
      await visitorsApi.create(form);
      message.success("Visitor added");
      setShowAdd(false);
      setForm({ visitor_name: "", resident_name: "", phone: "", purpose: "" });
      fetchVisitors();
    } catch (err) {
      message.error(err.message || "Failed to add visitor");
    }
  };

  const toggleStatus = async (visitor) => {
    const newStatus = visitor.status === "In" ? "Out" : "In";
    try {
      await visitorsApi.updateStatus(visitor.id, newStatus);
      setVisitors((prev) => prev.map((v) => v.id === visitor.id ? { ...v, status: newStatus } : v));
    } catch (_) {
      message.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Visitor Records</h1>
          <p className="text-sm text-slate-500 mt-1">Track all hostel visitors</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl flex items-center gap-2">
          <Plus size={18} /> Add Visitor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center">
          <p className="text-sm text-slate-500">Total Visitors Today</p>
          <h2 className="text-2xl font-semibold mt-1">{visitors.filter(v => v.visit_date === new Date().toISOString().split("T")[0]).length}</h2>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center">
          <p className="text-sm text-slate-500">Currently Inside</p>
          <h2 className="text-2xl font-semibold mt-1 text-green-600">{visitors.filter(v => v.status === "In").length}</h2>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center">
          <p className="text-sm text-slate-500">Checked Out</p>
          <h2 className="text-2xl font-semibold mt-1 text-slate-500">{visitors.filter(v => v.status === "Out").length}</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-slate-200 rounded-xl p-2.5 text-sm" />
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
            <input type="text" placeholder="Search visitor or resident..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-12 py-2.5 text-sm" />
          </div>
          {date && (
            <button onClick={() => setDate("")} className="text-sm text-blue-600 underline">Clear Date</button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : visitors.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No visitor records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left font-semibold">Visitor</th>
                  <th className="p-3 text-left font-semibold">Resident</th>
                  <th className="p-3 text-left font-semibold">Purpose</th>
                  <th className="p-3 text-left font-semibold">Date</th>
                  <th className="p-3 text-left font-semibold">Time</th>
                  <th className="p-3 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v) => (
                  <tr key={v.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      <p className="font-medium">{v.visitor_name}</p>
                      <p className="text-xs text-slate-400">{v.phone}</p>
                    </td>
                    <td className="p-3">{v.resident_name || "—"}</td>
                    <td className="p-3">{v.purpose || "—"}</td>
                    <td className="p-3">{v.visit_date}</td>
                    <td className="p-3">{v.visit_time || "—"}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => toggleStatus(v)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          v.status === "In" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                        }`}>
                        {v.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Popup */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Add Visitor</h2>
              <button onClick={() => setShowAdd(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Visitor Name *", key: "visitor_name", placeholder: "Ravi Kumar" },
                { label: "Visiting Resident", key: "resident_name", placeholder: "Arun Kumar" },
                { label: "Phone", key: "phone", placeholder: "9876543210" },
                { label: "Purpose", key: "purpose", placeholder: "Personal visit" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input placeholder={placeholder} value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-sm" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="px-5 py-3 border rounded-xl text-sm">Cancel</button>
              <button onClick={handleAdd} className="px-5 py-3 bg-blue-600 text-white rounded-xl text-sm">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
