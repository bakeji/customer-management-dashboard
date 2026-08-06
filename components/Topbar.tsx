"use client";

import { Bell, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 sm:h-10 sm:w-10"
        >
          <Bell className="h-5 w-5" onClick={()=>{toast.info("you have no Notification")}} />
        </button>

        <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-slate-100">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
            RM
          </span>
          <span className="hidden text-sm font-medium text-slate-700 sm:inline">
            Relationship Manager
          </span>
        </button>
      </div>
    </div>
  );
}
