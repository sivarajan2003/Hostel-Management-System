export default function Complaints() {
  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl shadow">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

        <h2 className="text-xl md:text-2xl font-bold">
          Complaints
        </h2>

        <select className="border rounded-xl px-4 py-2 text-sm">
          <option>All Complaints</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

      </div>

      <div className="space-y-4">

        <div className="border rounded-xl p-4 hover:bg-slate-50">

          <div className="flex justify-between items-start">

            <div>
              <h3 className="font-semibold">
                Water leakage in Room A-101
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Reported 2 hours ago
              </p>
            </div>

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
              Pending
            </span>

          </div>

        </div>

        <div className="border rounded-xl p-4 hover:bg-slate-50">

          <div className="flex justify-between items-start">

            <div>
              <h3 className="font-semibold">
                WiFi not working on Floor 2
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Reported yesterday
              </p>
            </div>

            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
              In Progress
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}