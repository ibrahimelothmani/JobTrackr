import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../api/statsApi";
import { useAuth } from "../context/AuthContext";

function StatCard({ label, value, sub }: { label: string; value: string; sub: string | undefined }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-medium text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { logout } = useAuth();
  const [stats, setStats]     = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="font-medium text-gray-900">JobTrackr</span>
        <div className="flex gap-4 text-sm">
          <Link to="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
          <Link to="/applications" className="text-gray-500 hover:text-gray-900">Applications</Link>
          <button onClick={logout} className="text-gray-400 hover:text-gray-700">Sign out</button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Your job search overview</h2>

        {loading ? (
          <p className="text-sm text-gray-400">Loading stats...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Total applied" value={stats.total} sub={undefined} />
            <StatCard label="Response rate" value={`${stats.response_rate}%`} sub="replied or progressed" />
            <StatCard label="Active interviews" value={stats.interviews} sub={undefined} />
            <StatCard label="Offers received" value={stats.offers} sub={undefined} />
          </div>
        )}

        <div className="mt-8">
          <Link to="/applications"
            className="inline-block bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700">
            View all applications
          </Link>
        </div>
      </main>
    </div>
  );
}