import { Customer } from "./types";


export const mockCustomers: Customer[] = [
  {
    id: "1",
    businessName: "Alpha Logistics Ltd.",
    businessType: "Enterprise",
    industry: "Logistics",
    contactPerson: "John Adewale",
    phone: "+234 803 123 4567",
    email: "john.adewale@alphalog.com",
    status: "Active",
  },
  {
    id: "2",
    businessName: "Beta Stores Nigeria",
    businessType: "SME",
    industry: "Retail",
    contactPerson: "Mary Okafor",
    phone: "+234 809 234 5678",
    email: "mary.okafor@betastores.ng",
    status: "Active",
  },
  {
    id: "3",
    businessName: "Crest Technology",
    businessType: "Enterprise",
    industry: "Technology",
    contactPerson: "Emeka Nwosu",
    phone: "+234 806 345 6789",
    email: "emeka.nwosu@cresttech.io",
    status: "Pending",
  },
  {
    id: "4",
    businessName: "Delta Global Services",
    businessType: "SME",
    industry: "Consulting",
    contactPerson: "Tunde Balogun",
    phone: "+234 802 456 7890",
    email: "tunde.balogun@deltaglobal.ng",
    status: "Active",
  },
  {
    id: "5",
    businessName: "Eastgate Farms Ltd.",
    businessType: "SME",
    industry: "Agriculture",
    contactPerson: "Grace Daniel",
    phone: "+234 805 567 8901",
    email: "grace.daniel@eastgatefarms.ng",
    status: "Inactive",
  },
];

export const dashboardStats = {
  total: 1250,
  active: 980,
  inactive: 270,
  newThisMonth: 45,
  newThisMonthGrowth: 12,
};
