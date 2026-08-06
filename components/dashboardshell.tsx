"use client";

import { useState } from "react";
import { Menu, Landmark } from "lucide-react";
import Sidebar from "./sidebar";


export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <Sidebar isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile-only top strip with menu toggle — the persistent sidebar takes over at lg */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <span className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Landmark className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold text-slate-900">CustHub</span>
          </span>
          <button
            aria-label="Open menu"
            onClick={() => setMobileNavOpen(true)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
