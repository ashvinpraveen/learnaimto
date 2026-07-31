export const SITE_NAME = "AI Malaysia Takeover";
export const EVENT_NAME = "The Malaysian Learn-a-thon";
export const REGISTRATION_URL =
  "https://event.aimto.my/concierge-menu/registration";

export const EVENT_START_ISO = "2026-08-12T10:00:00+08:00";
export const EVENT_END_ISO = "2026-08-12T18:00:00+08:00";

export const EVENT_VENUE = {
  name: "The Campus",
  addressLocality: "Ampang",
  addressRegion: "Kuala Lumpur",
  addressCountry: "MY",
} as const;

export const OG_IMAGE = {
  url: "/aimto-assets/og-image.png",
  width: 1200,
  height: 630,
  alt: "The Malaysian Learn-a-thon — Learn AI. Build Something.",
} as const;

export const LEARNATHON_FAQS = [
  {
    question: "Is the Learn-a-thon free?",
    answer:
      "Yes. Public registration is free. Some AI tools may have optional paid plans after the event; we will make any tool requirements clear before the day.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "No. Complete beginners are welcome, with setup support, practical sessions and mentors who can help you take the next step.",
  },
  {
    question: "Should I bring a laptop?",
    answer:
      "Yes—bring a laptop and charger if you want to build. We will share any account or setup guidance before the day.",
  },
  {
    question: "What if I have no idea what to build?",
    answer:
      "That is exactly what the Inspiration Board is for. Choose a beginner prompt, browse community problems or find a teammate at the Build Wall.",
  },
  {
    question: "Can experienced builders join?",
    answer:
      "Absolutely. Take on a challenge, explore advanced tools, meet other builders, showcase a project or help someone who is just getting started.",
  },
  {
    question: "Do I have to present my project?",
    answer:
      "No. Show and Tell is optional. You can submit to the Builder Gallery, quietly take your project home or volunteer for a five-minute demo.",
  },
] as const;
