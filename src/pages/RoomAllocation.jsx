export default function RoomAllocation({
  residents,
  genderTab,
}) {
    const filteredResidents = residents.filter(
  (resident) =>
    resident.gender === genderTab
);
    return (
    <div className="bg-white rounded-3xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        Room Allocation
      </h2>

      <div className="overflow-x-auto">
        <div className="hidden md:block">
  <table className="w-full min-w-[700px]">
  <thead>
    <tr className="bg-slate-100">
      <th className="px-6 py-4 text-left font-semibold">Resident</th>
      <th className="px-6 py-4 text-left font-semibold">Age</th>
      <th className="px-6 py-4 text-left font-semibold">Room</th>
      <th className="px-6 py-4 text-left font-semibold">Bed</th>
      <th className="px-6 py-4 text-left font-semibold">Floor</th>
    </tr>
  </thead>

<tbody>
  {filteredResidents.map((resident) => (
    <tr key={resident.id} className="border-b">

      <td className="px-6 py-5">
        {resident.name}
      </td>

      <td className="px-6 py-5">
        {resident.age}
      </td>

      <td className="px-6 py-5">
        {resident.room}
      </td>

      <td className="px-6 py-5">
        {resident.bed}
      </td>

      <td className="px-6 py-5">
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
      className="border rounded-2xl p-4 bg-slate-50"
    >

      <h3 className="font-bold text-lg">
        {resident.name}
      </h3>

      <div className="mt-3 space-y-2 text-sm">

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