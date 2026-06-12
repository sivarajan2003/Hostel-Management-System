export default function RoomAllocation({
  residents,
  genderTab,
}) {
    const filteredResidents = residents.filter(
  (resident) =>
    resident.gender === genderTab
);
    return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Room Allocation
      </h2>

      <div className="overflow-x-auto">
        <div className="hidden md:block">
  <table className="w-full min-w-[700px]">
  <thead>
    <tr className="bg-slate-50">
      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Resident</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Age</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Room</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Bed</th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Floor</th>
    </tr>
  </thead>

<tbody>
  {filteredResidents.map((resident) => (
    <tr key={resident.id} className="border-b">

      <td className="px-4 py-3 text-sm text-slate-700">
        {resident.name}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {resident.age}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {resident.room}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {resident.bed}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {resident.floor}
      </td>

    </tr>
  ))}
</tbody>
</table>
</div>
<div className="md:hidden space-y-4">

  {filteredResidents.map((resident) => (
    <div
      key={resident.id}
      className="border border-slate-200 rounded-xl p-4 bg-slate-50"
    >

      <h3 className="text-sm font-semibold text-slate-800">
        {resident.name}
      </h3>

      <div className="mt-2 space-y-1 text-xs text-slate-600">

        <p>
          <strong>Age:</strong> {resident.age}
        </p>

        <p>
          <strong>Room:</strong> {resident.room}
        </p>

        <p>
          <strong>Bed:</strong> {resident.bed}
        </p>

        <p>
          <strong>Floor:</strong> {resident.floor}
        </p>

      </div>

    </div>
  ))}

</div>
</div>
    </div>
  );
}