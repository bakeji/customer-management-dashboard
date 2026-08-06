export type CustomerStatus = "Active" | "Pending" | "Inactive";

export type BusinessType = "Enterprise" | "SME" | "Startup";

export interface Customer {
  id: string;
  businessName: string;
  businessType: BusinessType;
  industry: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: CustomerStatus;
  createdAt?: string;
}
