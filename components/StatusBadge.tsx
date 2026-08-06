import type { CustomerStatus } from "@/lib/types";

const statusStyles: Record<CustomerStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Inactive: "bg-red-50 text-red-700",
};

export default function StatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
