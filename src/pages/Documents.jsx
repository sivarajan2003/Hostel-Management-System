import { useState } from "react";
import { FileText, Download, Eye, X } from "lucide-react";

export default function Documents() {
  const [showUpload, setShowUpload] = useState(false);
const [viewDoc, setViewDoc] = useState(null);

const [documents, setDocuments] = useState([
  {
    id: 1,
    resident: "Arun Kumar",
    type: "Aadhaar",
    fileName: "Aadhaar.pdf",
    fileUrl: "/docs/aadhaar.pdf",
  },
  {
    id: 2,
    resident: "Hari Prasad",
    type: "PAN",
    fileName: "PAN.pdf",
    fileUrl: "/docs/pan.pdf",
  },
]);

const [newDoc, setNewDoc] = useState({
  resident: "",
  type: "",
  file: null,
});
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

        <h2 className="text-lg font-semibold text-slate-800">
          Resident Documents
        </h2>

        <button
  onClick={() => setShowUpload(true)}
  className="bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl"
>
  Upload Document
</button>

      </div>

      <div className="space-y-4">

       {documents.map((doc) => (
  <div
    key={doc.id}
    className="border border-slate-200 rounded-xl p-3 hover:bg-slate-50"
  >
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <FileText
          size={18}
          className="text-red-500"
        />

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            {doc.resident}
          </h3>

          <p className="text-xs text-slate-500">
            {doc.fileName}
          </p>
        </div>

      </div>

      <div className="flex gap-2">

        <button
          onClick={() => setViewDoc(doc)}
          className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200"
        >
          <Eye size={16} />
        </button>

        <a
          href={doc.fileUrl}
          download={doc.fileName}
          className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200"
        >
          <Download size={16} />
        </a>

      </div>

    </div>
  </div>
))}

      </div>

{viewDoc && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-2xl p-5 w-[90%] max-w-3xl shadow-sm">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-semibold text-slate-800">
          {viewDoc.fileName}
        </h2>

        <button
          onClick={() => setViewDoc(null)}
        >
       <X size={18} />
        </button>

      </div>

      <iframe
        src={viewDoc.fileUrl}
        className="w-full h-[500px] rounded-xl border"
        title="Document Preview"
      />

    </div>

  </div>
)}
{showUpload && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-2xl p-5 w-[90%] max-w-lg shadow-sm">

      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Upload Document
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Resident Name"
          className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
          onChange={(e) =>
            setNewDoc({
              ...newDoc,
              resident: e.target.value,
            })
          }
        />

        <select
          className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
          onChange={(e) =>
            setNewDoc({
              ...newDoc,
              type: e.target.value,
            })
          }
        >
          <option>Select Document Type</option>
          <option>Aadhaar</option>
          <option>PAN</option>
          <option>Driving License</option>
          <option>Passport</option>
          <option>College ID</option>
        </select>

        <input
          type="file"
          className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
          onChange={(e) =>
            setNewDoc({
              ...newDoc,
              file: e.target.files[0],
            })
          }
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowUpload(false)}
          className="border border-slate-300 px-5 py-2.5 text-sm rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            const document = {
              id: Date.now(),
              resident: newDoc.resident,
              type: newDoc.type,
              fileName: newDoc.file?.name,
              fileUrl: URL.createObjectURL(
                newDoc.file
              ),
            };

            setDocuments([
              ...documents,
              document,
            ]);

            setShowUpload(false);
          }}
          className="bg-blue-600 text-white px-5 py-2.5 text-sm rounded-xl"
        >
          Save
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}