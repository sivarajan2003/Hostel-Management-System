//├── Visitors.jsx

export default function Visitors() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        Visitor Records
      </h2>

      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-4">Visitor</th>
            <th className="p-4">Resident</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-4">Ravi</td>
            <td>Arun Kumar</td>
            <td>10-06-2026</td>
            <td>05:30 PM</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}