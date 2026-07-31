import type { Metadata } from "next";
import WelcomeQuiz from "./WelcomeQuiz";

export const metadata: Metadata = {
  title: {
    absolute: "Get Your AI Score — Aimto Learn-a-thon",
  },
  description:
    "A quick Typeform-style quiz to map your AI fluency and get ready for the Malaysian Learn-a-thon.",
  openGraph: {
    title: "Get Your AI Score",
    description:
      "Answer six quick questions and find out where you stand with AI.",
    url: "/welcome",
    type: "website",
    images: [{ url: "/aimto-assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Your AI Score",
    description:
      "Answer six quick questions and find out where you stand with AI.",
    images: ["/aimto-assets/og-image.png"],
  },
};

export default function WelcomePage() {
  return <WelcomeQuiz />;
}
