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

export default function AllCustomers() {
  const { customers, loading, error } = useCustomers();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [businessType, setBusinessType] = useState("All Types");
  const [industry, setIndustry] = useState("All Industries");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filtered = useMemo(() => {
    return customers.filter((customer) => {
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
  }, [customers, search, status, businessType, industry]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

 useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const handleClearAll = () => {
    setSearch("");
    setStatus("All Statuses");
    setBusinessType("All Types");
    setIndustry("All Industries");
    setPage(1);
  };

  return (
    

      <div className="rounded-2xl border border-slate-200 bg-white">
        <CustomerFilters
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          status={status}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          businessType={businessType}
          onBusinessTypeChange={(value) => {
            setBusinessType(value);
            setPage(1);
          }}
          industry={industry}
          onIndustryChange={(value) => {
            setIndustry(value);
            setPage(1);
          }}
          onClearAll={handleClearAll}
          statusOptions={["Active", "Pending", "Inactive"]}
          businessTypeOptions={[...businessTypes]}
          industryOptions={[...industries]}
        />

        {loading && <LoadingState />}
        {!loading && error && <ErrorState onRetry={() => window.location.reload()} />}
        {!loading && !error && (
          <>
            <CustomerTable customers={paginated} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </>
        )}
      </div>
  
  );
}
