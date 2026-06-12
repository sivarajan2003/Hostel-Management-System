
import { useState } from "react";
import {
  BedDouble,
  Home,
  IndianRupee,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  LogOut,
} from "lucide-react";

export default function ResidentDashboard() {
  const [status, setStatus] = useState("In PG");

const [lastActionTime, setLastActionTime] = useState(
  new Date().toLocaleString()
);

  const [activities, setActivities] = useState([
    "Checked In - Today 08:15 AM",
    "Rent Paid - ₹8,500",
    "Food Review Submitted",
  ]);
const [showAllActivities, setShowAllActivities] =
  useState(false);
  const handleCheckIn = () => {
  const time = new Date().toLocaleString();

  setStatus("In PG");
  setLastActionTime(time);

  setActivities([
    `Checked In - ${time}`,
    ...activities,
  ]);
};

  const handleCheckOut = () => {
  const time = new Date().toLocaleString();

  setStatus("Out");
  setLastActionTime(time);

  setActivities([
    `Checked Out - ${time}`,
    ...activities,
  ]);
};
const [showPaymentPopup, setShowPaymentPopup] =
  useState(false);

const [selectedPlan, setSelectedPlan] =
  useState(null);

const [paymentSuccess, setPaymentSuccess] =
  useState(false);
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
     {/* Header */}
<div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 md:p-6 shadow-sm text-white">

  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

    <div className="flex flex-col md:flex-row items-center gap-6">

      <img
        src="https://i.pravatar.cc/150?img=12"
        alt=""
        className="w-28 h-28 rounded-full border-4 border-white"
      />

      <div>

        <h1 className="text-2xl md:text-3xl font-semibold">
          Welcome Back, Arun Kumar 👋
        </h1>

        <p className="mt-1 text-sm text-white/90">
          Resident ID : RES001
        </p>

        <p className="text-white/90">
          Software Engineer
        </p>

        <p className="text-sm mt-2 text-white/80">
          Last Activity : {lastActionTime}
        </p>

      </div>

    </div>

    <div className="flex flex-col sm:flex-row gap-3">

      <button
        onClick={handleCheckIn}
        disabled={status === "In PG"}
        className={`px-6 py-3 rounded-2xl font-semibold
        ${
          status === "In PG"
            ? "bg-white/30 text-white cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        Check In
      </button>

      <button
        onClick={handleCheckOut}
        disabled={status === "Out"}
        className={`px-6 py-3 rounded-2xl font-semibold
        ${
          status === "Out"
            ? "bg-white/30 text-white cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        Check Out
      </button>

    </div>

  </div>

</div>
{paymentSuccess && (
  <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-2xl mt-5">

    Payment Successful ✅

  </div>
)}
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <Home className="text-blue-600 mb-3" />
          <h3 className="text-sm text-slate-500">Room Number</h3>
          <p className="text-2xl font-semibold mt-1">A-101</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <BedDouble className="text-green-600 mb-3" />
          <h3 className="text-sm text-slate-500">Bed Number</h3>
          <p className="text-2xl font-semibold mt-1">Bed-01</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <IndianRupee className="text-orange-600 mb-3" />
          <h3 className="text-sm text-slate-500">Monthly Rent</h3>
          <p className="text-2xl font-semibold mt-1">₹8,500</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <CheckCircle className="text-purple-600 mb-3" />
          <h3 className="text-sm text-slate-500">Current Status</h3>

          <p
            className={`text-2xl font-bold ${
              status === "In PG"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {status}
          </p>

        </div>

      </div>

      {/* Check In / Check Out */}
      {/* <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">

        <h2 className="text-lg font-semibold mb-4">
          Attendance Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <button
            onClick={handleCheckIn}
            className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold"
          >
            Check In
          </button>

          <button
            onClick={handleCheckOut}
            className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-semibold"
          >
            Check Out
          </button>

        </div>

      </div> */}

      {/* Personal Details */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">

        <h2 className="text-lg font-semibold mb-4">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="bg-slate-50 rounded-xl p-4">
            <User className="mb-3 text-blue-600" />
            <h3 className="text-sm font-semibold">Gender</h3>
            <p className="text-sm text-slate-600">Male</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <Phone className="mb-3 text-green-600" />
            <h3 className="text-sm font-semibold">Mobile</h3>
            <p className="text-sm text-slate-600">9876543210</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <Mail className="mb-3 text-red-600" />
            <h3 className="text-sm font-semibold">Email</h3>
            <p className="text-sm text-slate-600">arun@gmail.com</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <MapPin className="mb-3 text-purple-600" />
            <h3 className="text-sm font-semibold">Address</h3>
            <p className="text-sm text-slate-600">Salem, Tamil Nadu</p>
          </div>

        </div>

      </div>

      {/* Rent Information */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">

        <h2 className="text-lg font-semibold mb-4">
          Rent Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-green-50 rounded-2xl p-5">
            <h3 className="text-sm font-semibold">
              Monthly Rent
            </h3>

            <p className="text-2xl font-semibold mt-1">
              ₹8,500
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-5">
            <h3 className="text-sm font-semibold">
              Due Date
            </h3>

            <p className="text-2xl font-semibold mt-1">
              05
            </p>
          </div>

          <div className="bg-red-50 rounded-2xl p-5">
            <h3 className="text-sm font-semibold">
              Payment Status
            </h3>

            <p className="text-green-600 text-xl font-semibold mt-1">
              Paid
            </p>
          </div>

        </div>

      </div>
<div className="bg-white rounded-3xl p-6 shadow-sm mt-6">

  <h2 className="text-lg font-semibold mb-4">
    Rent Fee Plans
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    <div className="border rounded-xl p-4">

      <h3 className="font-semibold text-base">
        Monthly
      </h3>

      <p className="text-2xl font-semibold mt-1">
        ₹8,500
      </p>

      <button
        onClick={() => {
          setSelectedPlan("Monthly");
          setShowPaymentPopup(true);
        }}
        className="mt-4 w-full bg-blue-600 text-white py-2.5 text-sm rounded-xl"
      >
        Pay Now
      </button>

    </div>

    <div className="border rounded-xl p-4">

      <h3 className="font-semibold text-base">
        Quarterly
      </h3>

      <p className="text-2xl font-semibold mt-1">
        ₹25,500
      </p>

      <button
        onClick={() => {
          setSelectedPlan("Quarterly");
          setShowPaymentPopup(true);
        }}
        className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl"
      >
        Pay Now
      </button>

    </div>

    <div className="border rounded-xl p-4">

      <h3 className="font-semibold text-base">
        Yearly
      </h3>

     <p className="text-2xl font-semibold mt-1">
        ₹1,02,000
      </p>

      <button
        onClick={() => {
          setSelectedPlan("Yearly");
          setShowPaymentPopup(true);
        }}
        className="mt-4 w-full bg-purple-600 text-white py-3 rounded-xl"
      >
        Pay Now
      </button>

    </div>

  </div>

</div>
      {/* Activity */}
      {/* Activity */}
<div className="bg-white rounded-3xl p-6 shadow-sm mt-6">

  <div className="flex justify-between items-center mb-5">

    <h2 className="text-xl font-bold">
      Recent Activity
    </h2>

    {activities.length > 3 && (
      <button
        onClick={() =>
          setShowAllActivities(
            !showAllActivities
          )
        }
        className="text-blue-600 font-medium"
      >
        {showAllActivities
          ? "Show Less"
          : "Show More"}
      </button>
    )}

  </div>

  <div className="space-y-3">

    {(showAllActivities
      ? activities
      : activities.slice(0, 3)
    ).map((activity, index) => (

      <div
        key={index}
        className="border rounded-xl p-3 text-sm hover:bg-slate-50 transition"
      >
        {activity}
      </div>

    ))}

  </div>

</div>

{showPaymentPopup && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-3xl p-6 w-[95%] max-w-lg">

     <h2 className="text-xl font-semibold mb-4">
        Rent Payment
      </h2>

      <div className="space-y-4">

        <div>
          <label className="font-medium">
            Resident Name
          </label>
          <input
            value="Arun Kumar"
            readOnly
            className="w-full border rounded-xl p-2.5 mt-1 text-sm"
          />
        </div>

        <div>
          <label className="font-medium">
            Room Number
          </label>
          <input
            value="A-101"
            readOnly
            className="w-full border rounded-xl p-2.5 mt-1 text-sm"
          />
        </div>

        <div>
          <label className="font-medium">
            Aadhaar Number
          </label>
          <input
            value="XXXX XXXX 4567"
            readOnly
            className="w-full border rounded-xl p-2.5 mt-1 text-sm"
          />
        </div>

        <div>
          <label className="font-medium">
            Payment Plan
          </label>
          <input
            value={selectedPlan}
            readOnly
            className="w-full border rounded-xl p-2.5 mt-1 text-sm"
          />
        </div>

        <div>
          <label className="font-medium">
            Payment Method
          </label>

          <select className="w-full border rounded-xl p-2.5 mt-1 text-sm">
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Reception Payment</option>
          </select>
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() =>
            setShowPaymentPopup(false)
          }
          className="border px-5 py-2 rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setPaymentSuccess(true);
            setShowPaymentPopup(false);

            setTimeout(() => {
              setPaymentSuccess(false);
            }, 3000);
          }}
          className="bg-green-600 text-white px-5 py-2 rounded-xl"
        >
          Pay
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}

