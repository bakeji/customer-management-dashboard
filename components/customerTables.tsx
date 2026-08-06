"use client";

import { ChevronUp, Eye, MoreVertical} from "lucide-react";
import Link from "next/link";
import type { Customer } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge"
import { EmptyState } from "./EmptyState";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

const avatarTones = [
  "bg-blue-50 text-blue-600",
  "bg-emerald-50 text-emerald-600",
  "bg-amber-50 text-amber-600",
  "bg-violet-50 text-violet-600",
  "bg-red-50 text-red-600",
];

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  if (customers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-225 text-left text-sm">
        <thead>
          <tr className="border-b  border-slate-100 text-xs font-medium uppercase tracking-wide text-slate-400">
            <th className="px-3 py-3"> Business Name</th>
            <th className="px-3 py-3">Business Type</th>
            <th className="px-3 py-3">Industry</th>
            <th className="px-3 py-3">Contact Person</th>
            <th className="px-3 py-3">Phone</th>
            <th className="px-3 py-3">Email</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
              <td className="px-5 py-4">
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      avatarTones[index % avatarTones.length]
                    }`}
                  >
                    {initials(customer.businessName)}
                  </span>
                  <span className="font-medium text-slate-900">{customer.businessName}</span>
                </span>
              </td>
              <td className="px-5 py-4 text-slate-600">{customer.businessType}</td>
              <td className="px-5 py-4 text-slate-600">{customer.industry}</td>
              <td className="px-5 py-4 text-slate-600">{customer.contactPerson}</td>
              <td className="px-5 py-4 text-slate-600">{customer.phone}</td>
              <td className="px-5 py-4 text-slate-600">{customer.email}</td>
              <td className="px-5 py-4">
                <StatusBadge status={customer.status} />
              </td>
              <td className="px-5 py-4">
                <span className="flex items-center justify-end gap-1 text-slate-400">
                  <button aria-label="More actions" className="rounded-md p-1.5 hover:bg-slate-100 hover:text-slate-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





