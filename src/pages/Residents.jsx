import { useState, useEffect } from "react";
import {
  User,
  Phone,
  CreditCard,
  BedDouble,
  Home,
  Calendar,
  IndianRupee,
} from "lucide-react";
export default function Residents({
  resident,
  onBack,
}) {
    if (!resident) {
    return <h2>No Resident Selected</h2>;
  }

  const [showPayment, setShowPayment] = useState(false);
const [showProfile, setShowProfile] = useState(false);
const [checkedIn, setCheckedIn] = useState(true);
const [checkInTime, setCheckInTime] = useState(
  new Date()
);

const [checkOutTime, setCheckOutTime] = useState(null);
const [paymentStatus, setPaymentStatus] = useState("Pending");
const [stayTime, setStayTime] = useState("");
const [checkInDate] = useState(
  new Date("2025-01-01T08:00:00")
);
//   const resident = {
//     name: "Arun Kumar",
//     age: 22,
//     mobile: "9876543210",
//     aadhaar: "1234 5678 9012",
//     roomNo: "A-101",
//     roomType: "AC Single",
//     bedNo: "B1",
//     joinDate: "01-Jan-2025",
//     rent: 4500,
//     paymentStatus: "Pending",
//     image: "https://i.pravatar.cc/150?img=12",
//   };
useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();

    const diff = now - checkInDate;

    const days = Math.floor(
      diff / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (diff / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (diff / (1000 * 60)) % 60
    );

    setStayTime(
      `${days} Days ${hours} Hrs ${minutes} Min`
    );
  }, 1000);

  return () => clearInterval(interval);
}, [checkInDate]);
  return (
  <div className="min-h-screen bg-slate-50 p-4 md:p-6">

  <button
  onClick={onBack}
  className="mb-6 bg-slate-700 text-white px-5 py-3 rounded-xl"
>
  ← Back To Residents
</button>
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

  <div>
    <h1 className="text-3xl font-bold">
      My Hostel Profile
    </h1>

    <p className="text-slate-500 mt-2">
      Resident Information & Rent Details
    </p>
  </div>

  <div className="flex gap-3 mt-4 md:mt-0">

    <button
      disabled={checkedIn}
     onClick={() => {
  setCheckedIn(true);
  setCheckInTime(new Date());
  setCheckOutTime(null);
}}
      className={`px-6 py-3 rounded-xl font-semibold ${
        checkedIn
          ? "bg-green-200 text-green-700 cursor-not-allowed"
          : "bg-green-600 text-white"
      }`}
    >
      Check In
    </button>

    <button
      disabled={!checkedIn}
      onClick={() => {
  setCheckedIn(false);
  setCheckOutTime(new Date());
}}
      className={`px-6 py-3 rounded-xl font-semibold ${
        !checkedIn
          ? "bg-red-200 text-red-700 cursor-not-allowed"
          : "bg-red-600 text-white"
      }`}
    >
      Check Out
    </button>

  </div>

</div>
      {/* Profile Card */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Top Banner */}

        <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="px-8 pb-8">

          {/* Profile */}

          <div className="-mt-16 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">

            <img
              src={resident.image}
              alt=""
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />

            <div>

              <h2 className="text-3xl font-bold">
                {resident.name}
              </h2>

              <p className="text-slate-500">
                Resident ID : PG001
              </p>

            </div>

          </div>

          {/* Details */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">

            <div className="bg-slate-50 p-5 rounded-2xl">
              <User className="text-blue-600 mb-2" />
              <p className="text-sm text-slate-500">Age</p>
              <h3 className="font-semibold">
                {resident.age}
              </h3>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <Phone className="text-green-600 mb-2" />
              <p className="text-sm text-slate-500">Mobile</p>
              <h3 className="font-semibold">
                {resident.mobile}
              </h3>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <CreditCard className="text-purple-600 mb-2" />
              <p className="text-sm text-slate-500">Aadhaar</p>
              <h3 className="font-semibold">
                {resident.aadhaar}
              </h3>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <Home className="text-orange-600 mb-2" />
              <p className="text-sm text-slate-500">Room No</p>
              <h3 className="font-semibold">
                {resident.roomNo}
              </h3>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <BedDouble className="text-pink-600 mb-2" />
              <p className="text-sm text-slate-500">Room Type</p>
              <h3 className="font-semibold">
                {resident.roomType}
              </h3>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <BedDouble className="text-cyan-600 mb-2" />
              <p className="text-sm text-slate-500">Bed No</p>
              <h3 className="font-semibold">
                {resident.bedNo}
              </h3>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <Calendar className="text-red-600 mb-2" />
              <p className="text-sm text-slate-500">
                Joining Date
              </p>
              <h3 className="font-semibold">
                {resident.joinDate}
              </h3>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <IndianRupee className="text-green-600 mb-2" />
              <p className="text-sm text-slate-500">
                Monthly Rent
              </p>
              <h3 className="font-semibold">
                ₹ {resident.rent}
              </h3>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <p className="text-sm text-slate-500">
                Payment Status
              </p>

              <span
  className={`mt-2 inline-block px-4 py-2 rounded-full ${
    paymentStatus === "Paid"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600"
  }`}
>
  {paymentStatus}
</span>
            </div>

          </div>
<div className="grid md:grid-cols-3 gap-5 mt-8">

  <div className="bg-green-50 p-5 rounded-2xl">
    <p className="text-slate-500">Current Status</p>

    <h3 className="text-xl font-bold text-green-600">
      {checkedIn ? "Checked In" : "Checked Out"}
    </h3>
  </div>
<div className="bg-blue-50 p-5 rounded-2xl">
  <p className="text-slate-500">
    Check In Time
  </p>

  <h3 className="font-bold text-blue-600">
    {checkInTime.toLocaleString()}
  </h3>
</div>

<div className="bg-red-50 p-5 rounded-2xl">
  <p className="text-slate-500">
    Check Out Time
  </p>

  <h3 className="font-bold text-red-600">
    {checkOutTime
      ? checkOutTime.toLocaleString()
      : "--"}
  </h3>
</div>
  <div className="bg-blue-50 p-5 rounded-2xl">
    <p className="text-slate-500">Check In Date</p>

    <h3 className="font-semibold">
      10-Jun-2026
    </h3>
  </div>

  <div className="bg-purple-50 p-5 rounded-2xl">
  <p className="text-slate-500">
    Live Stay Duration
  </p>

  <h3 className="font-bold text-purple-600">
    {stayTime}
  </h3>
</div>

</div>
<div className="mt-10">

  <h2 className="text-2xl font-bold mb-4">
    Payment History
  </h2>

  <div className="overflow-x-auto">

    <table className="w-full bg-white rounded-2xl overflow-hidden">

      <thead>

        <tr className="bg-slate-100">

          <th className="text-left p-4">
            Date
          </th>

          <th className="text-left p-4">
            Amount
          </th>

          <th className="text-left p-4">
            Method
          </th>

          <th className="text-left p-4">
            Status
          </th>

        </tr>

      </thead>

      <tbody>

        <tr className="border-b">

          <td className="p-4">
            01-Jan-2025
          </td>

          <td className="p-4">
            ₹4500
          </td>

          <td className="p-4">
            UPI
          </td>

          <td className="p-4">

            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
              Paid
            </span>

          </td>

        </tr>

        <tr className="border-b">

          <td className="p-4">
            01-Feb-2025
          </td>

          <td className="p-4">
            ₹4500
          </td>

          <td className="p-4">
            Card
          </td>

          <td className="p-4">

            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
              Paid
            </span>

          </td>

        </tr>

        <tr>

          <td className="p-4">
            01-Mar-2025
          </td>

          <td className="p-4">
            ₹4500
          </td>

          <td className="p-4">
            Pending
          </td>

          <td className="p-4">

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
              Pending
            </span>

          </td>

        </tr>

      </tbody>

    </table>

  </div>

</div>
          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-10">

  <button
    onClick={() => setShowProfile(true)}
    className="bg-slate-700 text-white px-6 py-3 rounded-xl"
  >
    View Details
  </button>

  <button
    onClick={() => setShowPayment(true)}
    className="bg-blue-600 text-white px-6 py-3 rounded-xl"
  >
    Pay Rent
  </button>

  
</div>
        </div>

      </div>

      {/* Payment Popup */}

      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-3xl p-8 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-5">
              Rent Payment
            </h2>

            <input
              placeholder="Resident Name"
              className="w-full border p-3 rounded-xl mb-4"
            />

            <select className="w-full border p-3 rounded-xl mb-4">
              <option>Monthly - ₹4500</option>
              <option>Weekly - ₹2000</option>
              <option>Yearly - ₹30000</option>
            </select>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowPayment(false)}
                className="border px-5 py-3 rounded-xl"
              >
                Cancel
              </button>

<button
 onClick={() => {
  setPaymentStatus("Paid");

  alert(
    "Payment Successful ✅"
  );

  setShowPayment(false);
}}
  className="bg-green-600 text-white px-5 py-3 rounded-xl"
>
  Pay Now
</button>

            </div>

          </div>

        </div>
      )}
{showProfile && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

      <h2 className="text-2xl font-bold mb-6">
        Resident Details
      </h2>

      <div className="space-y-3">

        <p><strong>Name:</strong> {resident.name}</p>

        <p><strong>Age:</strong> {resident.age}</p>

        <p><strong>Mobile:</strong> {resident.mobile}</p>

        <p><strong>Aadhaar:</strong> {resident.aadhaar}</p>

        <p><strong>Room No:</strong> {resident.roomNo}</p>

        <p><strong>Room Type:</strong> {resident.roomType}</p>

        <p><strong>Bed No:</strong> {resident.bedNo}</p>

        <p><strong>Rent:</strong> ₹{resident.rent}</p>

      </div>

      <div className="flex justify-end mt-6">

        <button
          onClick={() => setShowProfile(false)}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}