import type { Metadata } from "next";
import WelcomeQuiz from "./WelcomeQuiz";

export const metadata: Metadata = {
  title: "Your First AI Learning Experience",
  description:
    "A playful, beginner-friendly AI building tutorial from AIMTO Learn-a-thon.",
  alternates: { canonical: "/welcome" },
};

export default function WelcomePage() {
  return <WelcomeQuiz />;
}
