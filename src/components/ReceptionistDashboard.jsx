import {
  Users,
  BedDouble,
  IndianRupee,
  Building2,
  UserCheck,
  AlertTriangle,
  Wrench,
  Eye,
  TrendingUp, ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dashboardApi } from "../utils/api";

export default function Dashboard() {
  const [filter, setFilter] = useState("Today");
  const [revenueFilter, setRevenueFilter] = useState("This Month");
  const [complaintFilter, setComplaintFilter] = useState("Recent");
  const [maintenanceFilter, setMaintenanceFilter] = useState("Recent");
  const [apiStats, setApiStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    dashboardApi.getStats().then(setApiStats).catch(() => {});
    dashboardApi.getRecentCheckins().then(setCheckins).catch(() => {});
  }, []);

  useEffect(() => {
    dashboardApi.getRevenue(revenueFilter).then(setRevenueData).catch(() => {});
  }, [revenueFilter]);

  const stats = [
    {
      title: "Total Residents",
      value: apiStats ? String(apiStats.totalResidents) : "—",
      change: "+12%",
      icon: Users,
      delay: "0s",
    },
    {
      title: "Occupancy Rate",
      value: apiStats ? `${apiStats.occupancyRate}%` : "—",
      change: "+4%",
      icon: BedDouble,
      delay: "0.5s",
    },
    {
      title: "Visitors Today",
      value: apiStats ? String(apiStats.todayVisitors) : "—",
      change: "",
      icon: IndianRupee,
      delay: "1s",
    },
    {
      title: "Vacant Rooms",
      value: apiStats ? String(apiStats.availableRooms) : "—",
      change: "",
      icon: Building2,
      delay: "1.5s",
    },
  ];

  const complaints = [
    {
      title: "WiFi Issue",
      status: "Pending",
    },
    {
      title: "Water Leakage",
      status: "In Progress",
    },
    {
      title: "AC Repair",
      status: "Resolved",
    },
  ];
const revenueDatasets = {
  "This Week": revenueData,
  "This Month": revenueData,
  "This Year": revenueData,
};
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">
          Hostel Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">

                <div>
                  <p className="text-slate-500 text-sm">
                    {stat.title}
                  </p>

                  <h2 className="text-2xl font-semibold mt-2 text-slate-800">
                    {stat.value}
                  </h2>

                  <div className="flex items-center mt-3 text-green-600 text-sm">
                    <TrendingUp size={15} />
                    <span className="ml-1">
                      {stat.change}
                    </span>
                  </div>
                </div>

                <div
  className="
    bg-blue-50
    p-3
    rounded-2xl
    transition-all
    duration-300
    group-hover:scale-110
    group-hover:rotate-6
  "
>
 <Icon
  size={28}
  className="text-blue-600 floating-icon"
  style={{
    animationDelay: stat.delay,
  }}
/>
</div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Section */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-lg font-semibold">
        Revenue Overview
      </h2>

      <p className="text-sm text-slate-500">
        Last 6 Months Revenue
      </p>
    </div>

    <div className="flex items-center gap-3">

  <div className="relative">
    <select
      value={revenueFilter}
      onChange={(e) => setRevenueFilter(e.target.value)}
      className="
        appearance-none
        bg-slate-100
        border
        border-slate-200
        rounded-xl
        px-4
        py-2
        pr-10
        text-sm
        cursor-pointer
      "
    >
      <option>This Week</option>
      <option>This Month</option>
      <option>This Year</option>
    </select>

    <ChevronDown
      size={16}
      className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        pointer-events-none
        text-slate-500
      "
    />
  </div>

  <div className="text-right">
    <h3 className="text-2xl font-bold text-green-600">
      ₹15.2L
    </h3>

    <p className="text-sm text-green-500">
      +18.4%
    </p>
  </div>

</div>
  </div>

  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={revenueDatasets[revenueFilter]}>
        <defs>
          <linearGradient
            id="colorRevenue"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#2563EB"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="#2563EB"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#2563EB"
          fillOpacity={1}
          fill="url(#colorRevenue)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>

</div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

         <h2 className="text-lg font-semibold">
            Occupancy Status
          </h2>

          <div className="space-y-5">

            <div>
              <div className="flex justify-between mb-2">
                <span>Occupied</span>
                <span>94%</span>
              </div>

              <div className="w-full bg-slate-200 h-3 rounded-full">
                <div className="bg-green-500 h-3 rounded-full w-[94%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Vacant</span>
                <span>6%</span>
              </div>

              <div className="w-full bg-slate-200 h-3 rounded-full">
                <div className="bg-orange-400 h-3 rounded-full w-[6%]"></div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Middle Section */}
      <div className="grid xl:grid-cols-3 gap-6 mb-8">

        {/* Check-ins */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

  <div className="flex items-center justify-between mb-6">
    <h2 className="text-lg font-semibold">
      Recent Check-ins
    </h2>

   <div className="relative">
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="
      appearance-none
      bg-slate-100
      border
      border-slate-200
      rounded-xl
      px-4
      py-2
      pr-10
      text-sm
      cursor-pointer
    "
  >
    <option>Today</option>
    <option>Check In</option>
    <option>Check Out</option>
    <option>This Week</option>
    <option>This Month</option>
  </select>

  <ChevronDown
    size={16}
    className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      pointer-events-none
      text-slate-500
    "
  />
</div>
  </div>

  <div className="space-y-4">

    {checkins.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition"
      >
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
            {item.name.charAt(0)}
          </div>

          <div>
            <h4 className="font-medium">
              {item.name}
            </h4>

            <p className="text-sm text-slate-500">
              Room {item.room}
            </p>
          </div>

        </div>

        <span className="text-xs text-slate-500">
          {item.time}
        </span>

      </div>
    ))}

  </div>

</div>

        {/* Complaints */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-lg font-semibold">
      Complaints
    </h2>

   <div className="relative">
  <select
    value={complaintFilter}
    onChange={(e) => setComplaintFilter(e.target.value)}
    className="
      appearance-none
      bg-slate-100
      border
      border-slate-200
      rounded-xl
      px-4
      py-2
      pr-10
      text-sm
      cursor-pointer
    "
  >
    <option>Recent</option>
    <option>Pending</option>
    <option>In Progress</option>
    <option>Resolved</option>
    <option>All</option>
  </select>

  <ChevronDown
    size={16}
    className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      pointer-events-none
      text-slate-500
    "
  />
</div>

  </div>

  <div className="space-y-4">

    {complaints.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
      >

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <AlertTriangle
              size={18}
              className="text-orange-500"
            />
          </div>

          <span className="font-medium">
            {item.title}
          </span>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.status === "Pending"
              ? "bg-red-100 text-red-600"
              : item.status === "In Progress"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {item.status}
        </span>

      </div>
    ))}

  </div>

</div>

        {/* Maintenance */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-lg font-semibold">
      Maintenance
    </h2>

   <div className="relative">
  <select
    value={maintenanceFilter}
    onChange={(e) => setMaintenanceFilter(e.target.value)}
    className="
      appearance-none
      bg-slate-100
      border
      border-slate-200
      rounded-xl
      px-4
      py-2
      pr-10
      text-sm
      cursor-pointer
    "
  >
    <option>Recent</option>
    <option>Pending</option>
    <option>Completed</option>
    <option>Assigned</option>
    <option>All</option>
  </select>

  <ChevronDown
    size={16}
    className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      pointer-events-none
      text-slate-500
    "
  />
</div>

  </div>

  <div className="space-y-4">

    <div className="p-4 rounded-2xl bg-slate-50">

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
            <Wrench
              size={18}
              className="text-yellow-600"
            />
          </div>

          <div>
            <h4 className="font-medium">
              Electric Repair
            </h4>

            <p className="text-xs text-slate-500">
              Block A
            </p>
          </div>

        </div>

        <span className="text-yellow-600 font-medium">
          Pending
        </span>

      </div>

    </div>

    <div className="p-4 rounded-2xl bg-slate-50">

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Wrench
              size={18}
              className="text-green-600"
            />
          </div>

          <div>
            <h4 className="font-medium">
              Bathroom Repair
            </h4>

            <p className="text-xs text-slate-500">
              Block C
            </p>
          </div>

        </div>

        <span className="text-green-600 font-medium">
          Completed
        </span>

      </div>

    </div>

  </div>

</div>
      </div>

      {/* Bottom Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <Users
  size={32}
  className="
    text-blue-600
    animate-bounce
  "
/>
            <div>
              <h3 className="font-semibold">
                Visitors Today
              </h3>
              <p className="text-2xl font-semibold mt-1">
                38
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <UserCheck  size={32}
  className="
    text-blue-600
    animate-bounce
  "
/>
            <div>
              <h3 className="font-semibold">
                Staff Attendance
              </h3>
              <p className="text-2xl font-semibold mt-1">
                96%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <Eye  size={32}
  className="
    text-blue-600
    animate-bounce
  "
/>
            <div>
              <h3 className="font-semibold">
                Notifications
              </h3>
              <p className="text-2xl font-semibold mt-1">
                12
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}