import { useState } from "react";
import { updateApplication, deleteApplication } from "../api/applicationsApi";

const STATUS_OPTIONS = ["applied", "screening", "interview", "offer", "rejected"];

const STATUS_COLORS = {
  applied:   "bg-blue-50  text-blue-700",
  screening: "bg-amber-50 text-amber-700",
  interview: "bg-purple-50 text-purple-700",
  offer:     "bg-green-50 text-green-700",
  rejected:  "bg-red-50   text-red-700",
};

export default function ApplicationCard({ app, onUpdate, onDelete }: { app: any; onUpdate: (app: any) => void; onDelete: (id: number) => void }) {
  const [saving, setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true);
    try {
      const updated = await updateApplication(app.id, { status: newStatus });
      onUpdate(updated);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete application for ${app.role} at ${app.company.name}?`)) return;
    setDeleting(true);
    try {
      await deleteApplication(app.id);
      onDelete(app.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-2 group">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{app.role}</p>
          <p className="text-xs text-gray-500 truncate">{app.company.name}</p>
          <p className="text-xs text-gray-400 mt-1">{new Date(app.applied_at).toLocaleDateString()}</p>
        </div>
        <button onClick={handleDelete} disabled={deleting}
          className="text-gray-300 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {deleting ? "..." : "✕"}
        </button>
      </div>

      <select
        value={app.status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={saving}
        className={`mt-2 w-full text-xs rounded-md px-2 py-1 border-0 font-medium cursor-pointer ${STATUS_COLORS[app.status]}`}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>

      {app.notes && (
        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{app.notes}</p>
      )}
    </div>
  );
}