export type BusinessType =
  | "sole_proprietorship"
  | "partnership"
  | "llc"
  | "corporation"
  | "ngo";

export type CustomerStatus = "active" | "pending" | "inactive" | "closed";

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  sole_proprietorship: "Sole proprietorship",
  partnership: "Partnership",
  llc: "Limited liability company",
  corporation: "Corporation",
  ngo: "NGO / Non-profit",
};

export const CUSTOMER_STATUS_LABELS: Record<CustomerStatus, string> = {
  active: "Active",
  pending: "Pending review",
  inactive: "Inactive",
  closed: "Closed",
  
};

export const INDUSTRY_OPTIONS = [
  "Agriculture",
  "Construction & Real Estate",
  "Education",
  "Financial Services",
  "Healthcare",
  "Hospitality",
  "Logistics & Transport",
  "Manufacturing",
  "Oil & Gas",
  "Retail & Trade",
  "Technology",
  "Other",
] as const;

export interface Customer {
  id: string;
  businessName: string;
  businessType: BusinessType;
  industry: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: CustomerStatus;
  registeredAt: string;
}

export type CustomerFormValues = Omit<Customer, "id" | "registeredAt">;