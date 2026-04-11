import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApplications, createApplication } from "../api/applicationsApi";
import { useAuth } from "../context/AuthContext";
import KanbanColumn from "../components/KanbanColumn";

const STATUSES = ["applied", "screening", "interview", "offer", "rejected"];

export default function Applications() {
  const { logout } = useAuth();
  const [apps, setApps]         = useState<any[]>([]);
  const [loading, setLoading]   = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [form, setForm]         = useState<{
    [x: string]: any;
    company_name: string;
    role: string;
    applied_at: string;
    notes: string;
  }>({
    company_name: "",
    role: "",
    applied_at: "",
    notes: "",
  });

  useEffect(() => {
    getApplications()
      .then(setApps)
      .finally(() => setLoading(false));
  }, []);

  const grouped = STATUSES.reduce((acc: any, s: string) => {
    acc[s] = apps.filter((a: any) => a.status === s);
    return acc;
  }, {});

  const handleUpdate = (updated: any) => {
    setApps((prev: any) => prev.map((a: any) => (a.id === updated.id ? updated : a)));
  };

  const handleDelete = (id: any) => {
    setApps((prev: any) => prev.filter((a: any) => a.id !== id));
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    try {
      // For simplicity: create company first, then application
      // In a full app you'd have a company selector — for now pass inline
      const res = await createApplication({
        role:       form.role,
        applied_at: form.applied_at,
        notes:      form.notes,
        status:     "applied",
        company_id: form.company_id, // see tip below
      });
      setApps((prev: any) => [res, ...prev]);
      setShowForm(false);
      setForm({ company_name: "", role: "", applied_at: "", notes: "" });
    } catch (err: any) {
      alert(err.response?.data?.detail || "Could not create application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="font-medium text-gray-900">JobTrackr</span>
        <div className="flex gap-4 text-sm">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-900">Dashboard</Link>
          <Link to="/applications" className="text-blue-600 font-medium">Applications</Link>
          <button onClick={logout} className="text-gray-400 hover:text-gray-700">Sign out</button>
        </div>
      </nav>

      <main className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Applications</h2>
          <button onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700">
            + Add application
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading applications...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STATUSES.map((s) => (
              <KanbanColumn
                key={s} status={s}
                apps={grouped[s]}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
             onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
               onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-medium text-gray-900 mb-4">Add application</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <input placeholder="Role title" required value={form.role}
                onChange={e => setForm({...form, role: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Date applied (YYYY-MM-DD)" required value={form.applied_at}
                type="date" onChange={e => setForm({...form, applied_at: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <textarea placeholder="Notes (optional)" value={form.notes}
                onChange={e => setForm({...form, notes: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-20" />
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}