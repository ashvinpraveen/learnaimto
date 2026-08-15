export const SITE_NAME = "AI Malaysia Takeover";
export const EVENT_NAME = "The Malaysian Learn-a-thon";
export const REGISTRATION_URL =
  "https://event.aimto.my/concierge-menu/registration";
export const SIGN_IN_URL = "https://krackeddevs.com/lat";
export const UNIVERSITY_SIGNUP_URL =
  process.env.NEXT_PUBLIC_UNIVERSITY_SIGNUP_FORM_URL ||
  "https://forms.gle/j5GFhiebYEXwhWT16";

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
      "Yes. Registration is free, and every AI tool we use has a free tier—no payment needed for the day.",
  },
  {
    question: "Is this related to the AI Malaysia Takeover 2026 event?",
    answer:
      "Yes—the Learn-a-thon is day two of the two-day AI Malaysia Takeover (aimto.my). Attend both days for the full experience: more free speaking sessions, workshops, and support and learning opportunities.",
  },
  {
    question: "Are spaces limited?",
    answer:
      "Yes. Capacity at The Campus is limited, so register early to lock in your spot.",
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
    question: "What AI tools will I get to use?",
    answer:
      "Whatever fits your build: Claude Code, Claude Cowork, ChatGPT Desktop, Lovable, Google AI Studio, OpenClaw, Hermes, Notion and Cleve are all on hand, with mentors to help you pick.",
  },
  {
    question: "Do I need to stay the whole day?",
    answer:
      "No. Drop in for an hour or stay for the full 10am–6pm—come and go as it suits you.",
  },
  {
    question: "Where can I eat, and is there parking?",
    answer:
      "The Campus has plenty of cafes and eateries on site and nearby. Parking is available on the grounds, and the nearest LRT (Ampang) is about a 25-minute walk or a short e-hailing ride away.",
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
