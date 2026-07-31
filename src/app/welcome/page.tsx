import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME } from "@/lib/constants";
import { JsonLd, welcomeQuizJsonLd } from "@/lib/seo";
import WelcomeQuiz from "./WelcomeQuiz";

export const metadata: Metadata = {
  title: {
    absolute: "AI Builder Scorecard — Aimto Learn-a-thon",
  },
  description:
    "Take the AIMTO AI Builder Scorecard. Get your BUILD score, builder type, and a personalised Learn-a-thon day plan.",
  alternates: {
    canonical: "/welcome",
  },
  openGraph: {
    title: "AI Builder Scorecard",
    description:
      "How ready are you to build with AI? Get your score, type, and day plan for the Malaysian Learn-a-thon.",
    url: "/welcome",
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
    title: "AI Builder Scorecard",
    description:
      "How ready are you to build with AI? Get your score, type, and day plan for the Malaysian Learn-a-thon.",
    images: [OG_IMAGE.url],
  },
};

export default function WelcomePage() {
  return (
    <>
      <JsonLd data={welcomeQuizJsonLd()} />
      <WelcomeQuiz />
    </>
  );
}
