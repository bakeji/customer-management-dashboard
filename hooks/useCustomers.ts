"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CUSTOMERS_COLLECTION } from "@/lib/customers";
import type { Customer, BusinessType, CustomerStatus } from "@/lib/types";

const VALID_BUSINESS_TYPES: BusinessType[] = ["Enterprise", "SME", "Startup"];
const VALID_STATUSES: CustomerStatus[] = ["Active", "Pending", "Inactive"];

function toBusinessType(value: unknown): BusinessType {
  return VALID_BUSINESS_TYPES.includes(value as BusinessType) ? (value as BusinessType) : "SME";
}

function toStatus(value: unknown): CustomerStatus {
  return VALID_STATUSES.includes(value as CustomerStatus) ? (value as CustomerStatus) : "Pending";
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, CUSTOMERS_COLLECTION), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: Customer[] = snapshot.docs.map((doc) => {
          const raw = doc.data();
          return {
            id: doc.id,
            businessName: raw.businessName ?? "",
            businessType: toBusinessType(raw.businessType),
            industry: raw.industry ?? "",
            contactPerson: raw.contactPerson ?? "",
            phone: raw.phone ?? "",
            email: raw.email ?? "",
            status: toStatus(raw.status),
          };
        });
        setCustomers(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message || "Failed to load customers.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { customers, loading, error };
}
