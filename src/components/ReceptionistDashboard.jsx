import {
  BedDouble,
  Users,
  Building2,
  AlertCircle,
  UserPlus,
  Bell,
  Search,
} from "lucide-react";

export default function Dashboard() {
const stats = [
  {
    title: "Total Residents",
    value: "248",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Occupied Rooms",
    value: "186",
    icon: BedDouble,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Vacant Rooms",
    value: "64",
    icon: Building2,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Monthly Revenue",
    value: "₹4.8L",
    icon: Building2,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Complaints",
    value: "8",
    icon: AlertCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Visitors Today",
    value: "32",
    icon: Users,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];
  return (
   <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      {/* <aside className="w-72 bg-slate-900 text-white">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">
            Hostel<span className="text-cyan-400">Pro</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Management System
          </p>
        </div>

        <nav className="p-5 space-y-3">
          <button className="w-full bg-cyan-500 text-white p-3 rounded-xl text-left">
            Dashboard
          </button>

          <button className="w-full hover:bg-slate-800 p-3 rounded-xl text-left">
            Students
          </button>

          <button className="w-full hover:bg-slate-800 p-3 rounded-xl text-left">
            Rooms
          </button>

          <button className="w-full hover:bg-slate-800 p-3 rounded-xl text-left">
            Attendance
          </button>

          <button className="w-full hover:bg-slate-800 p-3 rounded-xl text-left">
            Complaints
          </button>

          <button className="w-full hover:bg-slate-800 p-3 rounded-xl text-left">
            Fees
          </button>

          <button className="w-full hover:bg-slate-800 p-3 rounded-xl text-left">
            Visitors
          </button>

          <button className="w-full hover:bg-slate-800 p-3 rounded-xl text-left">
            Settings
          </button>
        </nav>
      </aside> */}

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-4xl font-bold text-slate-800">
      PG Hostel Dashboard
    </h1>
    <p className="text-slate-500 mt-2">
      Welcome back, manage residents, rooms and revenue.
    </p>
  </div>
</div>

        {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

  {stats.map((item, index) => {
    const Icon = item.icon;

    return (
      <div
        key={index}
        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex justify-between items-center">

          <div>
            <p className="text-slate-500 text-lg">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-3 text-slate-900">
              {item.value}
            </h2>
          </div>

          <div
            className={`${item.iconBg} p-5 rounded-3xl`}
          >
            <Icon
              size={20}
              className={item.iconColor}
            />
          </div>

        </div>
      </div>
    );
  })}

</div>
        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Room Status */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-xl mb-6">
              Room Occupancy
            </h3>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Occupied</span>
                  <span>85%</span>
                </div>

                <div className="h-3 bg-gray-200 rounded-full">
                  <div className="h-3 bg-green-500 rounded-full w-[85%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Available</span>
                  <span>15%</span>
                </div>

                <div className="h-3 bg-gray-200 rounded-full">
                  <div className="h-3 bg-blue-500 rounded-full w-[15%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
           <h3 className="font-bold text-xl mb-6">
  Today's Activities
</h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <UserPlus className="text-green-500" />
                <div>
                  <p className="font-medium">
                    New Resident Checked In
                  </p>
                  <p className="text-sm text-gray-500">
                    5 min ago
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Bell className="text-red-500" />
                <div>
                  <p className="font-medium">
                   Water Issue Complaint
                  </p>
                  <p className="text-sm text-gray-500">
                    15 min ago
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <BedDouble className="text-blue-500" />
                <div>
                  <p className="font-medium">
                    Room Vacated
                  </p>
                  <p className="text-sm text-gray-500">
                    1 hour ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-2xl p-6 mt-8 shadow-sm">
          <h3 className="font-bold text-xl mb-5">
          Recent Residents
          </h3>

          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-slate-50 rounded-xl shadow">
                <th className="text-left py-3">Resident</th>
                <th className="text-left py-3">Room No</th>
                <th className="text-left py-3">Rent</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
               <td className="py-4">
  <div className="flex items-center gap-3">
    <img
      src="https://i.pravatar.cc/40?img=1"
      className="w-10 h-10 rounded-full"
    />
    <span>Arun Kumar</span>
  </div>
</td>
               <td>A-102</td>
<td>₹8,500</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Active
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">
  <div className="flex items-center gap-3">
    <img
      src="https://i.pravatar.cc/40?img=1"
      className="w-10 h-10 rounded-full"
    />
    <span>Hari</span>
  </div>
</td>
                <td>B-205</td>
<td>₹7,500</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Active
                  </span>
                </td>
              </tr>

              <tr>
               <td className="py-4">
  <div className="flex items-center gap-3">
    <img
      src="https://i.pravatar.cc/40?img=1"
      className="w-10 h-10 rounded-full"
    />
    <span> Kumar</span>
  </div>
</td>
              <td>C-110</td>
<td>₹9,000</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">

  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
    <h3 className="text-slate-500 font-medium">
      Monthly Revenue
    </h3>

    <h1 className="text-4xl font-bold mt-3">
      ₹4.8L
    </h1>

    <p className="text-green-600 mt-2">
      +12% Growth This Month
    </p>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
    <h3 className="text-slate-500 font-medium">
      Check-ins Today
    </h3>

    <h1 className="text-4xl font-bold mt-3">
      12
    </h1>

    <p className="text-blue-600 mt-2">
      New Residents
    </p>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
    <h3 className="text-slate-500 font-medium">
      Maintenance Requests
    </h3>

    <h1 className="text-4xl font-bold mt-3">
      5
    </h1>

    <p className="text-red-600 mt-2">
      Pending Issues
    </p>
  </div>

</div>
      </main>
    </div>
  );
}