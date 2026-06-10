//Payments.jsx
export default function Payments() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        Rent Payments
      </h2>
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
  );
}