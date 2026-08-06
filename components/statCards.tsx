import type { LucideIcon } from "lucide-react";

type Tone = "blue" | "green" | "amber" | "violet";

const toneStyles: Record<Tone, { bg: string; text: string; stroke: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", stroke: "#2563eb" },
  green: { bg: "bg-emerald-50", text: "text-emerald-600", stroke: "#059669" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", stroke: "#d97706" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", stroke: "#7c3aed" },
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  helper: string;
  tone: Tone;
}) {
  const styles = toneStyles[tone];

  return (
    <div className="rounded-2xl border hover:shadow-lg flex flex-col justify-center items-center border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${styles.bg} ${styles.text}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{helper}</p>
    </div>
  );
}
