//VacatedResidents.jsx
export default function VacatedResidents({
  vacatedResidents,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Vacated Residents
      </h2>

     <div className="hidden md:block overflow-x-auto">

<table className="w-full">

        <thead>
          <tr className="bg-slate-50">

            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Resident
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Room
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Vacated Date
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Reason
            </th>

          </tr>
        </thead>

        <tbody>

          {vacatedResidents.map((resident) => (
            <tr
              key={resident.id}
              className="border-b"
            >
              <td className="px-4 py-3 text-sm text-slate-700">
                {resident.name}
              </td>

              <td className="px-4 py-3 text-sm text-slate-700">
                {resident.room}
              </td>

              <td className="px-4 py-3 text-sm text-slate-700">
                {resident.vacatedDate}
              </td>

              <td className="px-4 py-3 text-sm text-slate-700">
                {resident.reason}
              </td>
            </tr>
          ))}

        </tbody>

      </table>
</div>
<div className="md:hidden space-y-4">

  {vacatedResidents.map((resident) => (

    <div
      key={resident.id}
      className="border border-slate-200 rounded-xl p-4 bg-slate-50"
    >

      <h3 className="text-sm font-semibold text-slate-800">
        {resident.name}
      </h3>

      <div className="mt-2 space-y-1 text-xs text-slate-600">

        <p>
          <strong>Room:</strong> {resident.room}
        </p>

        <p>
          <strong>Vacated Date:</strong>{" "}
          {resident.vacatedDate}
        </p>

        <p>
          <strong>Reason:</strong>{" "}
          {resident.reason}
        </p>

      </div>

    </div>

  ))}

</div>
    </div>
  );
}