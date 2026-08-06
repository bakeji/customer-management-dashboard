import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import type { CustomerFormValues } from "./validation";

const CUSTOMERS_COLLECTION = "customers";

export async function addCustomer(data: CustomerFormValues) {
  const customersRef = collection(db, CUSTOMERS_COLLECTION);

  // Check business name
  const businessQuery = query(
    customersRef,
    where("businessName", "==", data.businessName)
  );

  const businessSnapshot = await getDocs(businessQuery);

  if (!businessSnapshot.empty) {
    throw new Error("A customer with this business name already exists.");
  }

  // Check email
  const emailQuery = query(
    customersRef,
    where("email", "==", data.email)
  );

  const emailSnapshot = await getDocs(emailQuery);

  if (!emailSnapshot.empty) {
    throw new Error("A customer with this email already exists.");
  }

  // Check phone number
  const phoneQuery = query(
    customersRef,
    where("phoneNumber", "==", data.phone)
  );

  const phoneSnapshot = await getDocs(phoneQuery);

  if (!phoneSnapshot.empty) {
    throw new Error("A customer with this phone number already exists.");
  }

  // Add customer
  return addDoc(customersRef, {
    ...data,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
}

export { CUSTOMERS_COLLECTION };