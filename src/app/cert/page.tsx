import type { Metadata } from "next";
import CertApp from "./CertApp";

export const metadata: Metadata = {
  title: "Certificate of Participation",
  description:
    "Generate your Malaysian Learn-a-thon Certificate of Participation for AI Malaysia Takeover 2026.",
  alternates: { canonical: "/cert" },
  robots: { index: false, follow: false },
};

export default function CertPage() {
  return <CertApp />;
}
