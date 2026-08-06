"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  UserPlus,
  LogOut,
  Landmark,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutGrid },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Register Customer", href: "/register", icon: UserPlus },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 lg:flex">
      <Link href="/" className="mb-8 flex items-center gap-2 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Landmark className="h-5 w-5" />
        </span>
        <span className="text-lg font-semibold text-slate-900">FinBank</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4.5 w-4.5" />
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <button className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900">
        <LogOut className="h-4.5 w-4.5" />
        Log out
      </button>
    </aside>
  );
}
