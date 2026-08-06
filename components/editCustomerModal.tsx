"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Customer } from "@/lib/types";
import { customerSchema, businessTypes, industries, type CustomerFormValues } from "@/lib/validation";
import { updateCustomer } from "@/lib/customers";

export default function EditCustomerModal({
  customer,
  onClose,
}: {
  customer: Customer;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      businessName: customer.businessName,
      businessType: customer.businessType,
      industry: customer.industry as CustomerFormValues["industry"],
      contactPerson: customer.contactPerson,
      phone: customer.phone,
      email: customer.email,
    },
  });

  // Re-sync the form if a different customer is opened while the modal is mounted
  useEffect(() => {
    reset({
      businessName: customer.businessName,
      businessType: customer.businessType,
      industry: customer.industry as CustomerFormValues["industry"],
      contactPerson: customer.contactPerson,
      phone: customer.phone,
      email: customer.email,
    });
  }, [customer, reset]);

  const onSubmit = async (data: CustomerFormValues) => {
    try {
      await updateCustomer(customer.id, data);
      toast.success("Customer details updated");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update customer.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Edit customer</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Field label="Business name" error={errors.businessName?.message}>
            <input type="text" {...register("businessName")} className={inputClass(!!errors.businessName)} />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Business type" error={errors.businessType?.message}>
              <select {...register("businessType")} className={inputClass(!!errors.businessType)}>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </Field>
            <Field label="Industry" error={errors.industry?.message}>
              <select {...register("industry")} className={inputClass(!!errors.industry)}>
                {industries.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Contact person" error={errors.contactPerson?.message}>
            <input type="text" {...register("contactPerson")} className={inputClass(!!errors.contactPerson)} />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Phone number" error={errors.phone?.message}>
              <input type="tel" {...register("phone")} className={inputClass(!!errors.phone)} />
            </Field>
            <Field label="Email address" error={errors.email?.message}>
              <input type="email" {...register("email")} className={inputClass(!!errors.email)} />
            </Field>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
  }`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}