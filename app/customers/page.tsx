"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/dashboardshell";
import Topbar from "@/components/Topbar";
import CustomerFilters from "@/components/CustomerFilters";
import CustomerTable from "@/components/customerTables"
import Pagination from "@/components/Pagination";
import { useCustomers } from "@/hooks/useCustomers";
import { businessTypes, industries } from "@/lib/validation";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/errorState";
import AllCustomers from "@/components/allCustomers";

export default function CustomersPage() {

  return (
    <DashboardShell>
      <Topbar title="Customers" subtitle="View and manage all registered business customers." />

      <div className="rounded-2xl border border-slate-200 bg-white">
            <AllCustomers />
      </div>
    </DashboardShell>
  );
}
