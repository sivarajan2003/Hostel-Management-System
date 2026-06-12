import { useState } from "react";
import {
  Coffee,
  Utensils,
  Cookie,
  Soup,
  Star,
  Plus,
} from "lucide-react";

export default function FoodManagement() {
 const [showMenuPopup, setShowMenuPopup] = useState(false);

const [menuData, setMenuData] = useState({
  meal: "",
  time: "",
  menu: "",
});

const [schedule, setSchedule] = useState([
    {
      time: "06:00 AM",
      meal: "Morning Coffee",
      menu: "Coffee",
      color: "bg-orange-50",
    },
    {
      time: "08:00 AM",
      meal: "Breakfast",
      menu: "Idly, Sambar, Chutney",
      color: "bg-blue-50",
    },
    {
      time: "10:00 AM",
      meal: "Morning Milk",
      menu: "Milk",
      color: "bg-green-50",
    },
    {
      time: "01:00 PM",
      meal: "Lunch",
      menu: "Rice, Sambar, Potato Fry",
      color: "bg-yellow-50",
    },
    {
      time: "04:30 PM",
      meal: "Evening Snacks",
      menu: "Biscuits",
      color: "bg-pink-50",
    },
    {
      time: "05:00 PM",
      meal: "Tea / Coffee",
      menu: "Tea",
      color: "bg-purple-50",
    },
    {
      time: "08:00 PM",
      meal: "Dinner",
      menu: "Chapathi & Kurma",
      color: "bg-red-50",
    },
    {
      time: "10:00 PM",
      meal: "Night Milk",
      menu: "Milk",
      color: "bg-indigo-50",
    },
]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Food Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage hostel food schedule and weekly menu
          </p>
        </div>

<button
  onClick={() => setShowMenuPopup(true)}
 className="bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl flex items-center gap-2 hover:bg-blue-700"
>
            <Plus size={18} />
          Add Menu
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-slate-500">
                Breakfast
              </p>

              <h2 className="text-xl font-semibold mt-1">
                Idly + Sambar
              </h2>
            </div>

            <div className="bg-blue-100 p-3 rounded-xl">
              <Coffee size={18} className="text-blue-600" />
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-slate-500">
                Lunch
              </p>

              <h2 className="text-xl font-semibold mt-1">
                Meals
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <Utensils size={18} className="text-green-600" />
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-slate-500">
                Snacks
              </p>

              <h2 className="text-xl font-semibold mt-1">
                Biscuits + Tea
              </h2>
            </div>

            <div className="bg-yellow-100 p-4 rounded-2xl">
              <Cookie size={18} className="text-yellow-600" />
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-slate-500">
                Dinner
              </p>

              <h2 className="text-xl font-semibold mt-1">
                Chapathi
              </h2>
            </div>

            <div className="bg-red-100 p-4 rounded-2xl">
              <Soup size={18} className="text-red-600" />
            </div>

          </div>
        </div>

      </div>

      {/* Food Schedule */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mt-6">

        <h2 className="text-lg font-semibold mb-4">
          Today's Food Schedule
        </h2>

        <div className="space-y-4">

          {schedule.map((item, index) => (
            <div
              key={index}
              className={`${item.color} rounded-2xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3`}
            >

              <div>
                <h3 className="font-semibold text-sm">
                  {item.meal}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.time}
                </p>
              </div>

              <span className="bg-white px-4 py-2 rounded-full shadow-sm font-medium">
                {item.menu}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* Weekly Menu */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mt-6">

        <h2 className="text-lg font-semibold mb-4">
          Weekly Menu Planner
        </h2>

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

              <tr className="border-b">
                <td className="p-3 text-sm">Monday</td>
                <td>Idly</td>
                <td>Meals</td>
                <td>Chapathi</td>
              </tr>

              <tr className="border-b">
                <td className="p-3 text-sm">Tuesday</td>
                <td>Pongal</td>
                <td>Rice</td>
                <td>Dosa</td>
              </tr>

              <tr className="border-b">
                <td className="p-3 text-sm">Wednesday</td>
                <td>Poori</td>
                <td>Biryani</td>
                <td>Parotta</td>
              </tr>

              <tr className="border-b">
                <td className="p-3 text-sm">Thursday</td>
                <td>Upma</td>
                <td>Meals</td>
                <td>Chapathi</td>
              </tr>

              <tr className="border-b">
                <td className="p-3 text-sm">Friday</td>
                <td>Dosa</td>
                <td>Variety Rice</td>
                <td>Parotta</td>
              </tr>

            </tbody>

          </table>

        </div>
<div className="md:hidden space-y-4">

  <div className="bg-slate-50 p-4 rounded-xl">
    <h3 className="font-semibold text-sm">Monday</h3>

    <div className="mt-3 space-y-2">
      <p><span className="font-semibold">Breakfast:</span> Idly</p>
      <p><span className="font-semibold">Lunch:</span> Meals</p>
      <p><span className="font-semibold">Dinner:</span> Chapathi</p>
    </div>
  </div>

  <div className="bg-slate-50 p-4 rounded-xl">
    <h3 className="font-semibold text-sm">Tuesday</h3>

    <div className="mt-3 space-y-2">
      <p><span className="font-semibold">Breakfast:</span> Pongal</p>
      <p><span className="font-semibold">Lunch:</span> Rice</p>
      <p><span className="font-semibold">Dinner:</span> Dosa</p>
    </div>
  </div>

  <div className="bg-slate-50 p-4 rounded-xl">
    <h3 className="font-semibold text-sm">Wednesday</h3>

    <div className="mt-3 space-y-2">
      <p><span className="font-semibold">Breakfast:</span> Poori</p>
      <p><span className="font-semibold">Lunch:</span> Biryani</p>
      <p><span className="font-semibold">Dinner:</span> Parotta</p>
    </div>
  </div>

</div>
      </div>

      {/* Reviews */}
      <div className="mt-8">

        <h2 className="text-lg font-semibold mb-4">
          Student Food Reviews
        </h2>

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">

            <div className="flex items-center gap-2 mb-3">
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
            </div>

            <h3 className="text-sm font-semibold">
              Arun Kumar
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Breakfast quality was excellent.
            </p>

          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">

            <div className="flex items-center gap-2 mb-3">
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
            </div>

            <h3 className="text-sm font-semibold">
              Karthik
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Lunch was very tasty and fresh.
            </p>

          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">

            <div className="flex items-center gap-2 mb-3">
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
            </div>

            <h3 className="text-sm font-semibold">
              Praveen
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Need more snack varieties.
            </p>

          </div>

        </div>

      </div>
{showMenuPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-3xl w-full max-w-lg p-6">

      <h2 className="text-lg font-semibold mb-4">
        Add Food Menu
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Meal Name"
          className="w-full border rounded-xl p-2.5 text-sm"
          onChange={(e) =>
            setMenuData({
              ...menuData,
              meal: e.target.value,
            })
          }
        />

        <input
          type="time"
          className="w-full border rounded-xl p-2.5 text-sm"
          onChange={(e) =>
            setMenuData({
              ...menuData,
              time: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Menu Items"
          className="w-full border rounded-xl p-2.5 text-sm"
          onChange={(e) =>
            setMenuData({
              ...menuData,
              menu: e.target.value,
            })
          }
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowMenuPopup(false)}
          className="px-5 py-3 border rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setSchedule([
              ...schedule,
              {
                ...menuData,
                color: "bg-blue-50",
              },
            ]);

            setShowMenuPopup(false);
          }}
          className="px-5 py-3 bg-blue-600 text-white rounded-xl"
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