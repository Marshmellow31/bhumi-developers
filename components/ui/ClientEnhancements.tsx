"use client";

import dynamic from "next/dynamic";

/* Non-critical client-only extras, split out of the main bundle:
   - CustomCursor renders nothing on touch devices
   - ContactPopup appears 15–30 s after load */
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const ContactPopup = dynamic(() => import("@/components/ui/ContactPopup"), { ssr: false });

export default function ClientEnhancements() {
  return (
    <>
      <ContactPopup />
      <CustomCursor />
    </>
  );
}
