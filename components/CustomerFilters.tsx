"use client";

import { Search, SlidersHorizontal, RotateCcw, Plus } from "lucide-react";
import Link from "next/link";

interface CustomerFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  businessType: string;
  onBusinessTypeChange: (value: string) => void;
  industry: string;
  onIndustryChange: (value: string) => void;
  onClearAll: () => void;
  statusOptions: string[];
  businessTypeOptions: string[];
  industryOptions: string[];
}

export default function CustomerFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  businessType,
  onBusinessTypeChange,
  industry,
  onIndustryChange,
  onClearAll,
  statusOptions,
  businessTypeOptions,
  industryOptions,
}: CustomerFiltersProps) {
  return (
    <div className="border-b border-slate-100 p-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by business name, contact person or email..."
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>

        <Link
          href="/register"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Register Customer
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
        <FilterSelect label="Status" value={status} onChange={onStatusChange} options={["All Statuses", ...statusOptions]} />
        <FilterSelect
          label="Business Type"
          value={businessType}
          onChange={onBusinessTypeChange}
          options={["All Types", ...businessTypeOptions]}
        />
        <div className="flex items-end gap-4">
          <FilterSelect
            label="Industry"
            value={industry}
            onChange={onIndustryChange}
            options={["All Industries", ...industryOptions]}
          />
          <button
            onClick={onClearAll}
            className="mb-0.5 flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({label, value, onChange, options,}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
