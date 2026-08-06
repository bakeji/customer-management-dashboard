"use client";

import DashboardShell from "@/components/dashboardshell";





type LoadState = "ready" | "loading" | "error";

export default function DashboardPage() {





  return (
    <DashboardShell>

            {/* stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      
      </div>

    </DashboardShell>
  );
}
