//Payments.jsx
export default function Payments() {
  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        Rent Payments
      </h2>
<div className="hidden md:block overflow-x-auto">

<table className="w-full">
  <thead>
    <tr className="bg-slate-100">
      <th className="px-6 py-4 text-left font-semibold">Resident</th>
      <th className="px-6 py-4 text-left font-semibold">Amount</th>
      <th className="px-6 py-4 text-left font-semibold">Status</th>
    </tr>
  </thead>

  <tbody>
    <tr className="border-b">
      <td className="px-6 py-5">Arun Kumar</td>
      <td className="px-6 py-5">₹8,500</td>
      <td className="px-6 py-5">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          Paid
        </span>
      </td>
    </tr>
  </tbody>
</table>
</div>
<div className="md:hidden space-y-4">

  <div className="border rounded-2xl p-4">

    <h3 className="font-bold text-lg">
      Arun Kumar
    </h3>

    <div className="mt-3 space-y-2">

      <p>
        <span className="font-medium">
          Amount:
        </span>{" "}
        ₹8,500
      </p>

      <p>
        <span className="font-medium">
          Status:
        </span>

        <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Paid
        </span>
      </p>

    </div>

  </div>

</div>

    </div>
  );
}