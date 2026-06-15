import { useState, useEffect } from "react";
import { Coffee, Utensils, Cookie, Soup, Star, Plus, Trash2 } from "lucide-react";
import { foodApi } from "../utils/api";
import { message } from "antd";

const COLORS = ["bg-orange-50", "bg-blue-50", "bg-green-50", "bg-yellow-50", "bg-pink-50", "bg-purple-50", "bg-red-50", "bg-indigo-50"];

export default function FoodManagement() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [menuData, setMenuData] = useState({ meal: "", time: "", menu: "", color: "bg-blue-50" });

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const data = await foodApi.getSchedule();
      setSchedule(data);
    } catch (_) {
      message.error("Failed to load food schedule");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleAdd = async () => {
    if (!menuData.meal) return message.error("Meal name is required");
    try {
      await foodApi.addMenuItem({ ...menuData, color: menuData.color || "bg-blue-50" });
      message.success("Menu item added");
      setShowMenuPopup(false);
      setMenuData({ meal: "", time: "", menu: "", color: "bg-blue-50" });
      fetchSchedule();
    } catch (err) {
      message.error(err.message || "Failed to add menu item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await foodApi.deleteMenuItem(id);
      message.success("Menu item removed");
      fetchSchedule();
    } catch (_) {
      message.error("Failed to delete item");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Food Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage hostel food schedule and weekly menu</p>
        </div>
        <button onClick={() => setShowMenuPopup(true)} className="bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Add Menu
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Breakfast", value: schedule.find(s => s.meal?.toLowerCase().includes("breakfast"))?.menu || "—", icon: Coffee, color: "blue" },
          { label: "Lunch", value: schedule.find(s => s.meal?.toLowerCase().includes("lunch"))?.menu || "—", icon: Utensils, color: "green" },
          { label: "Snacks", value: schedule.find(s => s.meal?.toLowerCase().includes("snack"))?.menu || "—", icon: Cookie, color: "yellow" },
          { label: "Dinner", value: schedule.find(s => s.meal?.toLowerCase().includes("dinner"))?.menu || "—", icon: Soup, color: "red" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <h2 className="text-base font-semibold mt-1 truncate max-w-[140px]">{value}</h2>
              </div>
              <div className={`bg-${color}-100 p-3 rounded-xl`}>
                <Icon size={18} className={`text-${color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mt-6">
        <h2 className="text-lg font-semibold mb-4">Today's Food Schedule</h2>
        {loading ? (
          <div className="text-center text-slate-400 py-8">Loading...</div>
        ) : schedule.length === 0 ? (
          <div className="text-center text-slate-400 py-8">No menu items yet. Add your first one.</div>
        ) : (
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div key={item.id || index} className={`${item.color || COLORS[index % COLORS.length]} rounded-2xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3`}>
                <div>
                  <h3 className="font-semibold text-sm">{item.meal}</h3>
                  <p className="text-sm text-slate-500">{item.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-white px-4 py-2 rounded-full shadow-sm font-medium text-sm">{item.menu}</span>
                  <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Menu */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mt-6">
        <h2 className="text-lg font-semibold mb-4">Weekly Menu Planner</h2>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left text-sm font-semibold">Day</th>
                <th className="p-3 text-left text-sm font-semibold">Breakfast</th>
                <th className="p-3 text-left text-sm font-semibold">Lunch</th>
                <th className="p-3 text-left text-sm font-semibold">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {[
                { day: "Monday", b: "Idly", l: "Meals", d: "Chapathi" },
                { day: "Tuesday", b: "Pongal", l: "Rice", d: "Dosa" },
                { day: "Wednesday", b: "Poori", l: "Biryani", d: "Parotta" },
                { day: "Thursday", b: "Upma", l: "Meals", d: "Chapathi" },
                { day: "Friday", b: "Dosa", l: "Variety Rice", d: "Parotta" },
                { day: "Saturday", b: "Idly", l: "Fried Rice", d: "Chapathi" },
                { day: "Sunday", b: "Poori", l: "Biryani", d: "Parotta" },
              ].map(({ day, b, l, d }) => (
                <tr key={day} className="border-b">
                  <td className="p-3 text-sm font-medium">{day}</td>
                  <td className="p-3 text-sm">{b}</td>
                  <td className="p-3 text-sm">{l}</td>
                  <td className="p-3 text-sm">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Student Food Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            { name: "Arun Kumar", rating: 5, comment: "Breakfast quality was excellent." },
            { name: "Karthik", rating: 4, comment: "Lunch was very tasty and fresh." },
            { name: "Praveen", rating: 3, comment: "Need more snack varieties." },
          ].map(({ name, rating, comment }) => (
            <div key={name} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200 fill-slate-200"} />
                ))}
              </div>
              <h3 className="text-sm font-semibold">{name}</h3>
              <p className="text-sm text-slate-500 mt-1">{comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Menu Popup */}
      {showMenuPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Add Food Menu</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Meal Name (e.g. Breakfast)"
                value={menuData.meal}
                className="w-full border rounded-xl p-2.5 text-sm"
                onChange={(e) => setMenuData({ ...menuData, meal: e.target.value })}
              />
              <input
                type="text"
                placeholder="Time (e.g. 08:00 AM)"
                value={menuData.time}
                className="w-full border rounded-xl p-2.5 text-sm"
                onChange={(e) => setMenuData({ ...menuData, time: e.target.value })}
              />
              <input
                type="text"
                placeholder="Menu Items (e.g. Idly, Sambar)"
                value={menuData.menu}
                className="w-full border rounded-xl p-2.5 text-sm"
                onChange={(e) => setMenuData({ ...menuData, menu: e.target.value })}
              />
              <select
                value={menuData.color}
                onChange={(e) => setMenuData({ ...menuData, color: e.target.value })}
                className="w-full border rounded-xl p-2.5 text-sm"
              >
                {COLORS.map((c) => <option key={c} value={c}>{c.replace("bg-", "").replace("-50", "")}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowMenuPopup(false)} className="px-5 py-3 border rounded-xl text-sm">Cancel</button>
              <button onClick={handleAdd} className="px-5 py-3 bg-blue-600 text-white rounded-xl text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
