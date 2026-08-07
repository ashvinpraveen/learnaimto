import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME } from "@/lib/constants";
import LearnathonThreePage from "./v2/page";

export default function HomePage() {
  return <LearnathonThreePage includeAdditionalPartners={false} />;
}

export const metadata: Metadata = {
  title: {
    absolute: "The Malaysian Learn-a-thon — Learn AI. Build Something.",
  },
  description:
    "A one-day public AI build experience for every Malaysian. Learn, make and get help from real builders on 12 August 2026 at The Campus, Ampang.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Malaysian Learn-a-thon",
    description:
      "Learn AI, build something useful and take it home. 12 August 2026 at The Campus Ampang.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Malaysian Learn-a-thon",
    description: "Learn AI, build something useful and take it home.",
    images: [OG_IMAGE.url],
  },
};
