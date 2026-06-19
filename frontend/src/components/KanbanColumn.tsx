import ApplicationCard from "./ApplicationCard";
import type { Application, ApplicationStatus } from "../types/application";

const COLUMN_STYLES: Record<ApplicationStatus, { label: string; dot: string }> = {
  applied:   { label: "Applied",   dot: "bg-blue-400" },
  screening: { label: "Screening", dot: "bg-amber-400" },
  interview: { label: "Interview", dot: "bg-purple-400" },
  offer:     { label: "Offer",     dot: "bg-green-400" },
  rejected:  { label: "Rejected",  dot: "bg-red-400" },
};

export default function KanbanColumn({ status, apps, onUpdate, onDelete }: { status: ApplicationStatus; apps: Application[]; onUpdate: (app: Application) => void; onDelete: (id: string) => void }) {
  const { label, dot } = COLUMN_STYLES[status];

  return (
    <div className="bg-gray-50 rounded-xl p-3 min-w-[200px] flex-1">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${dot}`} />
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className="text-xs text-gray-400 ml-auto">{apps.length}</span>
      </div>

      {apps.length === 0 && (
        <p className="text-xs text-gray-300 text-center py-6">No applications</p>
      )}

      {apps.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
