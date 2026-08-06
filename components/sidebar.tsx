"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  UserPlus,
  LogOut,
  Landmark,
  X
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutGrid },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Register Customer", href: "/register", icon: UserPlus },
];

export default function Sidebar({   
     isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {

  const pathname = usePathname();

  return (
   
     <>
      {/* Backdrop — only rendered on mobile while the drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside    className={`
    fixed inset-y-0 left-0 z-50
    w-64 bg-white border-r border-slate-200 px-4 py-6
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}

    lg:sticky
    lg:top-0
    lg:h-screen
    lg:translate-x-0
    lg:flex
    lg:flex-col
  `} >
        <div className="mb-8 flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Landmark className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold text-slate-900">CustHub</span>
          </Link>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
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
    </>
  );
}
