"use client";

import DashboardShell from "@/components/dashboardshell";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";
import StatCard from "@/components/statCards";
import Topbar from "@/components/Topbar";
import { mockCustomers, dashboardStats } from "@/lib/mock-data";
import CustomerFilters from "@/components/CustomerFilters";
import { useMemo, useState } from "react";
import { businessTypes, industries } from "@/lib/validation";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/errorState";
import CustomerTable from "@/components/customerTables";
import Pagination from "@/components/Pagination";
import CustomersPage from "./customers/page";
import AllCustomers from "@/components/allCustomers";
import { useCustomers } from "@/hooks/useCustomers";
type LoadState = "ready" | "loading" | "error";

export default function DashboardPage() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [businessType, setBusinessType] = useState("All Types");
  const [industry, setIndustry] = useState("All Industries");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loadState, setLoadState] = useState<LoadState>("ready");

  const {stats} = useCustomers()

  const filtered = useMemo(() => {
    return mockCustomers.filter((customer) => {
      const matchesSearch =
        search.trim() === "" ||
        [customer.businessName, customer.contactPerson, customer.email]
          .join(" ")
          .toLowerCase()
          .includes(search.trim().toLowerCase());
      const matchesStatus = status === "All Statuses" || customer.status === status;
      const matchesType = businessType === "All Types" || customer.businessType === businessType;
      const matchesIndustry = industry === "All Industries" || customer.industry === industry;
      return matchesSearch && matchesStatus && matchesType && matchesIndustry;
    });
  }, [search, status, businessType, industry]);

  const totalItems = dashboardStats.total; 
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));





  return (
    <DashboardShell>
      <Topbar title="Customer Dashboard" subtitle="Manage and monitor your business customers." />

      {/* stat cards */}
      <div className="grid mb-8 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Customers"
          value={stats.all.toLocaleString()}
          helper="All time"
          tone="blue"
        />

         <StatCard
          icon={UserCheck}
          label="Active Customers"
          value={stats.active.toLocaleString()}
          helper={ stats.active? `${((stats.active / stats.all) * 100).toFixed(1)}% of total`: ""}
          tone="green"
        />
        <StatCard
          icon={UserX}
          label="Inactive Customers"
          value={stats.inactive.toLocaleString()}
          helper={ stats.inactive? `${((stats.inactive / stats.all) * 100).toFixed(1)}% of total` : ""}
          tone="amber"
        />
        <StatCard
          icon={UserPlus}
          label="Pending Customers"
          value={stats.pending.toLocaleString()}
          helper={ stats.pending?  `${((stats.pending / stats.all) * 100).toFixed(1)}% of total`  : ""  }
          tone="violet"
        />
</div>

<AllCustomers />
       
   

    </DashboardShell>
  );
}
