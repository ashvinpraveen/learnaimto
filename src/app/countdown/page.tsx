import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import CountdownDisplay from "./CountdownDisplay";

export const metadata: Metadata = {
  title: {
    absolute: `Countdown — ${SITE_NAME}`,
  },
  description: `Days until ${SITE_NAME} on 12 August 2026.`,
  alternates: {
    canonical: "/countdown",
  },
};

export default function CountdownPage() {
  return <CountdownDisplay />;
}
