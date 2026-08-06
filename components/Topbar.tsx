"use client";

import { Bell, ChevronDown } from "lucide-react";

export default function Topbar(
    {
         title,
  subtitle,
}: {
  title: string;
  subtitle: string;
    }
) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />
          {/* <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
            3
          </span> */}
        </button>

        <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-slate-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
            RM
          </span>
          <span className="text-sm font-medium text-slate-700">Relationship Manager</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
