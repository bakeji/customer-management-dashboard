"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Topbar from "@/components/Topbar";
import { customerSchema, businessTypes, industries, type CustomerFormValues } from "@/lib/validation";
import DashboardShell from "@/components/dashboardshell";
import { toast } from "sonner";
import { addCustomer } from "@/lib/customers";

export default function RegisterCustomerPage() {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
  });


  const onSubmit = async (data: CustomerFormValues) => {
  setSubmitState("idle");
  setErrorMessage("");
  try {
    await addCustomer(data);
    setSubmitState("success");
    toast.success("Customer registered successfully");
    reset();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong while saving this customer.";
    setSubmitState("error");
    setErrorMessage(message);
    toast.error(message);
  }
};


  return (
    <DashboardShell>
      <Topbar title="Register Customer" subtitle="Add a new business customer to FinBank." />

      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        {submitState === "success" && (
          <div className="mb-6 flex items-start gap-3 rounded-lg bg-emerald-50 p-4 text-emerald-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-semibold">Customer registered</p>
              <p className="text-sm">The business has been saved and is pending review.</p>
            </div>
          </div>
        )}

        {submitState === "error" && (
          <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-semibold">Registration failed</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <Field label="Business name" error={errors.businessName?.message}>
            <input
              type="text"
              {...register("businessName")}
              placeholder="e.g. Alpha Logistics Ltd."
              className={inputClass(!!errors.businessName)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Business type" error={errors.businessType?.message}>
              <select {...register("businessType")} defaultValue="" className={inputClass(!!errors.businessType)}>
                <option value="" disabled>
                  Select type
                </option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Industry" error={errors.industry?.message}>
              <select {...register("industry")} defaultValue="" className={inputClass(!!errors.industry)}>
                <option value="" disabled>
                  Select industry
                </option>
                {industries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Contact person" error={errors.contactPerson?.message}>
            <input
              type="text"
              {...register("contactPerson")}
              placeholder="e.g. John Adewale"
              className={inputClass(!!errors.contactPerson)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Phone number" error={errors.phone?.message}>
              <input
                type="tel"
                {...register("phone")}
                placeholder="e.g. +234 803 123 4567"
                className={inputClass(!!errors.phone)}
              />
            </Field>

            <Field label="Email address" error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                placeholder="e.g. john.adewale@alphalog.com"
                className={inputClass(!!errors.email)}
              />
            </Field>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Registering..." : "Register Customer"}
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
