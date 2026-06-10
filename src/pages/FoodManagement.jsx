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
          <h1 className="text-3xl font-bold text-slate-800">
            Food Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage hostel food schedule and weekly menu
          </p>
        </div>

<button
  onClick={() => setShowMenuPopup(true)}
  className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
>
            <Plus size={18} />
          Add Menu
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-500">
                Breakfast
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Idly + Sambar
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Coffee className="text-blue-600" />
            </div>

          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-500">
                Lunch
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Meals
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <Utensils className="text-green-600" />
            </div>

          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-500">
                Snacks
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Biscuits + Tea
              </h2>
            </div>

            <div className="bg-yellow-100 p-4 rounded-2xl">
              <Cookie className="text-yellow-600" />
            </div>

          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-500">
                Dinner
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Chapathi
              </h2>
            </div>

            <div className="bg-red-100 p-4 rounded-2xl">
              <Soup className="text-red-600" />
            </div>

          </div>
        </div>

      </div>

      {/* Food Schedule */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Today's Food Schedule
        </h2>

        <div className="space-y-4">

          {schedule.map((item, index) => (
            <div
              key={index}
              className={`${item.color} rounded-2xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3`}
            >

              <div>
                <h3 className="font-semibold text-lg">
                  {item.meal}
                </h3>

                <p className="text-slate-500">
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
      <div className="bg-white rounded-3xl p-6 shadow-sm mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Weekly Menu Planner
        </h2>

       <div className="hidden md:block overflow-x-auto">
  <table className="w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="p-4 text-left">Day</th>
                <th className="p-4 text-left">Breakfast</th>
                <th className="p-4 text-left">Lunch</th>
                <th className="p-4 text-left">Dinner</th>
              </tr>

            </thead>

            <tbody>

              <tr className="border-b">
                <td className="p-4">Monday</td>
                <td>Idly</td>
                <td>Meals</td>
                <td>Chapathi</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Tuesday</td>
                <td>Pongal</td>
                <td>Rice</td>
                <td>Dosa</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Wednesday</td>
                <td>Poori</td>
                <td>Biryani</td>
                <td>Parotta</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Thursday</td>
                <td>Upma</td>
                <td>Meals</td>
                <td>Chapathi</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Friday</td>
                <td>Dosa</td>
                <td>Variety Rice</td>
                <td>Parotta</td>
              </tr>

            </tbody>

          </table>

        </div>
<div className="md:hidden space-y-4">

  <div className="bg-slate-50 p-4 rounded-2xl">
    <h3 className="font-bold text-lg">Monday</h3>

    <div className="mt-3 space-y-2">
      <p><span className="font-semibold">Breakfast:</span> Idly</p>
      <p><span className="font-semibold">Lunch:</span> Meals</p>
      <p><span className="font-semibold">Dinner:</span> Chapathi</p>
    </div>
  </div>

  <div className="bg-slate-50 p-4 rounded-2xl">
    <h3 className="font-bold text-lg">Tuesday</h3>

    <div className="mt-3 space-y-2">
      <p><span className="font-semibold">Breakfast:</span> Pongal</p>
      <p><span className="font-semibold">Lunch:</span> Rice</p>
      <p><span className="font-semibold">Dinner:</span> Dosa</p>
    </div>
  </div>

  <div className="bg-slate-50 p-4 rounded-2xl">
    <h3 className="font-bold text-lg">Wednesday</h3>

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

        <h2 className="text-2xl font-bold mb-6">
          Student Food Reviews
        </h2>

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-3xl shadow-sm">

            <div className="flex items-center gap-2 mb-3">
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
            </div>

            <h3 className="font-bold">
              Arun Kumar
            </h3>

            <p className="text-slate-500 mt-2">
              Breakfast quality was excellent.
            </p>

          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm">

            <div className="flex items-center gap-2 mb-3">
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
            </div>

            <h3 className="font-bold">
              Karthik
            </h3>

            <p className="text-slate-500 mt-2">
              Lunch was very tasty and fresh.
            </p>

          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm">

            <div className="flex items-center gap-2 mb-3">
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
              <Star className="text-yellow-500 fill-yellow-500" size={18}/>
            </div>

            <h3 className="font-bold">
              Praveen
            </h3>

            <p className="text-slate-500 mt-2">
              Need more snack varieties.
            </p>

          </div>

        </div>

      </div>
{showMenuPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-3xl w-full max-w-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Add Food Menu
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Meal Name"
          className="w-full border rounded-xl p-3"
          onChange={(e) =>
            setMenuData({
              ...menuData,
              meal: e.target.value,
            })
          }
        />

        <input
          type="time"
          className="w-full border rounded-xl p-3"
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
          className="w-full border rounded-xl p-3"
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