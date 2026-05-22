import { Loader2 } from "lucide-react";

export const MetaChip = ({ icon, label }) => (
    <span className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1">
        {icon} {label}
    </span>
);

export const InfoCard = ({ title, icon, children }) => (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-teal-600 font-black">
            {icon} <span>{title}</span>
        </div>
        {children}
    </div>
);

export const Row = ({ label, value, highlight }) => (
    <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-bold ${highlight ? 'text-teal-600' : 'text-foreground'}`}>{value}</span>
    </div>
);

export const ReadOnlyField = ({ label, value, icon }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-bold text-muted-foreground">{label}</label>
        <div className="flex items-center gap-3 rounded-xl border bg-muted/40 px-4 py-3 text-sm font-medium text-foreground">
            <span className="text-teal-500">{icon}</span>
            <span className="truncate">{value}</span>
        </div>
    </div>
);

export const PageLoader = () => (
    <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={36} className="animate-spin text-teal-600" />
    </div>
);

export const NotFound = () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
        <p className="text-4xl font-black text-foreground">Tutor Not Found</p>
        <p className="text-muted-foreground">This tutor profile doesn&apos;t exist or has been removed.</p>
    </div>
);