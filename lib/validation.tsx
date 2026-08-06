import { z } from "zod";

export const businessTypes = ["Enterprise", "SME", "Startup"] as const;

export const industries = [
  "Logistics",
  "Retail",
  "Technology",
  "Consulting",
  "Agriculture",
  "Manufacturing",
  "Healthcare",
  "Finance",
  "Other",
] as const;

// Nigerian phone number: optional +234 / 0 prefix, then 9-10 digits.
const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;

export const customerSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be under 100 characters"),
  businessType: z.enum(businessTypes, {
    message: "Select a business type",
  }),
  industry: z.enum(industries, {
    message: "Select an industry",
  }),
  contactPerson: z
    .string()
    .trim()
    .min(2, "Contact person's name must be at least 2 characters")
    .max(100, "Contact person's name must be under 100 characters"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid Nigerian phone number, e.g. +234 803 123 4567"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
