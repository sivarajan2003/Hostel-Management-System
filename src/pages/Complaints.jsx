//Complaints.jsx

export default function Complaints() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

        <h2 className="text-lg font-semibold text-slate-800">
          Complaints
        </h2>

        <select className="border border-slate-300 rounded-xl px-4 py-2.5 text-sm">
          <option>All Complaints</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

      </div>

      <div className="space-y-4">

        <div className="border border-slate-200 rounded-xl p-3 hover:bg-slate-50">

          <div className="flex justify-between items-start">

            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Water leakage in Room A-101
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Reported 2 hours ago
              </p>
            </div>

            <span className="bg-red-100 text-red-600 px-3 py-1 text-xs font-medium rounded-full">
              Pending
            </span>

          </div>

        </div>

        <div className="border border-slate-200 rounded-xl p-3 hover:bg-slate-50">

          <div className="flex justify-between items-start">

            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                WiFi not working on Floor 2
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Reported yesterday
              </p>
            </div>

            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 text-xs font-medium rounded-full">
              In Progress
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}