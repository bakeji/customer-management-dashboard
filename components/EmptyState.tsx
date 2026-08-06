
import {  Users, Plus, } from "lucide-react";
import Link from "next/link";


export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Users className="h-6 w-6" />
      </span>
      <p className="text-base font-semibold text-slate-900">No customers found</p>
      <p className="text-sm text-slate-500">Get started by registering your first customer.</p>
      <Link
        href="/register"
        className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        <Plus className="h-4 w-4" />
        Register Customer
      </Link>
    </div>
  );
}