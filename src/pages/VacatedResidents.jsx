//VacatedResidents.jsx
export default function VacatedResidents({
  vacatedResidents,
}) {
  return (
    <div className="bg-white rounded-3xl p-4 md:p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        Vacated Residents
      </h2>

     <div className="hidden md:block overflow-x-auto">

<table className="w-full">

        <thead>
          <tr className="bg-slate-100">

            <th className="px-6 py-4 text-left">
              Resident
            </th>

            <th className="px-6 py-4 text-left">
              Room
            </th>

            <th className="px-6 py-4 text-left">
              Vacated Date
            </th>

            <th className="px-6 py-4 text-left">
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
              <td className="px-6 py-5">
                {resident.name}
              </td>

              <td className="px-6 py-5">
                {resident.room}
              </td>

              <td className="px-6 py-5">
                {resident.vacatedDate}
              </td>

              <td className="px-6 py-5">
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
      className="border rounded-2xl p-4 bg-slate-50"
    >

      <h3 className="font-bold text-lg">
        {resident.name}
      </h3>

      <div className="mt-3 space-y-2 text-sm">

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