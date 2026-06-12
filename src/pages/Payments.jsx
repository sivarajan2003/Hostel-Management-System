//Payments.jsx
export default function Payments() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">

      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Rent Payments
      </h2>
<div className="hidden md:block overflow-x-auto">

<table className="w-full">
  <thead>
    <tr className="bg-slate-100">
      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Resident</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Amount</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
    </tr>
  </thead>

  <tbody>
    <tr className="border-b">
      <td className="px-4 py-3 text-sm text-slate-700">Arun Kumar</td>
      <td className="px-4 py-3 text-sm text-slate-700">₹8,500</td>
      <td className="px-4 py-3 text-sm text-slate-700">
        <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-medium rounded-full">
          Paid
        </span>
      </td>
    </tr>
  </tbody>
</table>
</div>
<div className="md:hidden space-y-4">

  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">

    <h3 className="text-sm font-semibold text-slate-800">
      Arun Kumar
    </h3>

    <div className="mt-2 space-y-1 text-sm text-slate-600">

      <p>
        <span className="text-sm font-medium">
          Amount:
        </span>{" "}
        ₹8,500
      </p>

      <p>
        <span className="text-sm font-medium">
          Status:
        </span>

        <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 text-xs font-medium rounded-full">
          Paid
        </span>
      </p>

    </div>

  </div>

</div>

    </div>
  );
}