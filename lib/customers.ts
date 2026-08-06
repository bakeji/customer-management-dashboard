import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { CustomerFormValues } from "./validation";

const CUSTOMERS_COLLECTION = "customers";

export async function addCustomer(data: CustomerFormValues) {
  return addDoc(collection(db, CUSTOMERS_COLLECTION), {
    ...data,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
}

export { CUSTOMERS_COLLECTION };
