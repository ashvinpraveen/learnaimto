import type { Metadata } from "next";
import WelcomeQuiz from "./WelcomeQuiz";

export const metadata: Metadata = {
  title: {
    absolute: "AI Builder Scorecard — Aimto Learn-a-thon",
  },
  description:
    "Take the AIMTO AI Builder Scorecard. Get your BUILD score, builder type, and a personalised Learn-a-thon day plan.",
  openGraph: {
    title: "AI Builder Scorecard",
    description:
      "How ready are you to build with AI? Get your score, type, and day plan for the Malaysian Learn-a-thon.",
    url: "/welcome",
    type: "website",
    images: [{ url: "/aimto-assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Builder Scorecard",
    description:
      "How ready are you to build with AI? Get your score, type, and day plan for the Malaysian Learn-a-thon.",
    images: ["/aimto-assets/og-image.png"],
  },
};

export default function WelcomePage() {
  return <WelcomeQuiz />;
}
