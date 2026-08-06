"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2, CircleDot } from "lucide-react";
import { toast } from "sonner";
import type { Customer, CustomerStatus } from "@/lib/types";
import { deleteCustomer, updateCustomerStatus } from "@/lib/customers";
import DeleteConfirmModal from "./deletemodal";


const statusOptions: CustomerStatus[] = ["Active", "Pending", "Inactive"];

export default function CustomerActionsMenu({
  customer,
  onEdit,
}: {
  customer: Customer;
  onEdit: (customer: Customer) => void;
}) {
  const [open, setOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
        setStatusMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = async (status: CustomerStatus) => {
    if (status === customer.status) {
      setOpen(false);
      setStatusMenuOpen(false);
      return;
    }
    setStatusUpdating(true);
    try {
      await updateCustomerStatus(customer.id, status);
      toast.success(`${customer.businessName} marked as ${status}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setStatusUpdating(false);
      setOpen(false);
      setStatusMenuOpen(false);
    }
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteCustomer(customer.id);
      toast.success(`${customer.businessName} deleted`);
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete customer.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        aria-label="More actions"
        onClick={() => setOpen((prev) => !prev)}
        disabled={statusUpdating}
        className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          <button
            onClick={() => {
              onEdit(customer);
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
            Edit details
          </button>

          <div className="relative">
            <button
              onClick={() => setStatusMenuOpen((prev) => !prev)}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              <CircleDot className="h-4 w-4" />
              Change status
            </button>

            {statusMenuOpen && (
              <div className="ml-2 border-l border-slate-100 pl-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={statusUpdating}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 disabled:opacity-50 ${
                      status === customer.status ? "font-semibold text-blue-600" : "text-slate-600"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="my-1 border-t border-slate-100" />

          <button
            onClick={() => {
              setDeleteModalOpen(true);
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete customer
          </button>
        </div>
      )}

      {deleteModalOpen && (
        <DeleteConfirmModal
          businessName={customer.businessName}
          isDeleting={deleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
