//Settings.jsx
import { useState } from "react";
import {
  Building2,
  User,
  Lock,
  Bell,
  IndianRupee,
  Save,
  RefreshCcw,
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    hostelName: "Sunrise PG Hostel",
    ownerName: "Admin",
    email: "hostel@gmail.com",
    phone: "9876543210",
    monthlyFee: "5000",
    securityDeposit: "10000",
    notifications: true,
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage hostel configuration and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Hostel Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <div className="flex items-center gap-3 mb-6">
            <Building2 size={18} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Hostel Information
            </h2>
          </div>

          <div className="space-y-4">

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Hostel Name
              </label>

              <input
                type="text"
                value={settings.hostelName}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Contact Number
              </label>

              <input
                type="text"
                value={settings.phone}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

          </div>

        </div>

        {/* Admin Profile */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <div className="flex items-center gap-3 mb-6">
            <User className="text-green-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Admin Profile
            </h2>
          </div>

          <div className="space-y-4">

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Admin Name
              </label>

              <input
                type="text"
                value={settings.ownerName}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                value={settings.email}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

          </div>

        </div>

        {/* Fee Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <div className="flex items-center gap-3 mb-6">
            <IndianRupee className="text-orange-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Fee Settings
            </h2>
          </div>

          <div className="space-y-4">

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Monthly Fee
              </label>

              <input
                type="number"
                value={settings.monthlyFee}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Security Deposit
              </label>

              <input
                type="number"
                value={settings.securityDeposit}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

          </div>

        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-purple-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Notification Settings
            </h2>
          </div>

          <div className="flex items-center justify-between border border-slate-200 rounded-xl p-3">

            <div>
             <p className="text-sm font-semibold">
                Enable Notifications
              </p>

              <p className="text-xs text-slate-500">
                Receive complaint and fee alerts
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.notifications}
              className="w-4 h-4"
            />

          </div>

        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-red-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Security
            </h2>
          </div>

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
            />

          </div>

        </div>

        {/* Backup */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <div className="flex items-center gap-3 mb-6">
            <RefreshCcw className="text-cyan-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Backup & Reset
            </h2>
          </div>

          <div className="flex gap-4">

            <button className="bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl">
              Backup Data
            </button>

            <button className="bg-red-600 text-white px-5 py-2.5 text-sm rounded-xl">
              Reset System
            </button>

          </div>

        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm rounded-xl flex items-center gap-2">

          <Save size={16} />

          Save Settings

        </button>

      </div>

    </div>
  );
}