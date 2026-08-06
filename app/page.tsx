"use client";

import DashboardShell from "@/components/dashboardshell";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";
import StatCard from "@/components/statCards";
import Topbar from "@/components/Topbar";
import { mockCustomers, dashboardStats } from "@/lib/mock-data";





type LoadState = "ready" | "loading" | "error";

export default function DashboardPage() {





  return (
    <DashboardShell>
      <Topbar />

      {/* stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Customers"
          value={dashboardStats.total.toLocaleString()}
          helper="All time"
          tone="blue"
        />

         <StatCard
          icon={UserCheck}
          label="Active Customers"
          value={dashboardStats.active.toLocaleString()}
          helper={`${((dashboardStats.active / dashboardStats.total) * 100).toFixed(1)}% of total`}
          tone="green"
        />
        <StatCard
          icon={UserX}
          label="Inactive Customers"
          value={dashboardStats.inactive.toLocaleString()}
          helper={`${((dashboardStats.inactive / dashboardStats.total) * 100).toFixed(1)}% of total`}
          tone="amber"
        />
        <StatCard
          icon={UserPlus}
          label="New This Month"
          value={dashboardStats.newThisMonth.toLocaleString()}
          helper={`↑ ${dashboardStats.newThisMonthGrowth}% vs last month`}
          tone="violet"
        />
       
      </div>

    </DashboardShell>
  );
}
