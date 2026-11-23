import { Suspense } from "react";
import { Metadata } from "next";
import { OrderFormClient } from "./OrderFormClient";

export const metadata: Metadata = {
  title: "Book & Order Living Digital Invitation | Studio",
  description: "Select your luxury template, link validity plan, and order your custom 3D interactive invitation.",
};

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0e0c0a] flex items-center justify-center text-amber-400 font-cinzel">
          Loading Studio Order Engine...
        </div>
      }
    >
      <OrderFormClient />
    </Suspense>
  );
}
