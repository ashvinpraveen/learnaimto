import {
  EVENT_END_ISO,
  EVENT_NAME,
  EVENT_START_ISO,
  EVENT_VENUE,
  LEARNATHON_FAQS,
  OG_IMAGE,
  REGISTRATION_URL,
  SITE_NAME,
} from "./constants";

function siteOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function absoluteUrl(path: string) {
  const origin = siteOrigin().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function learnathonEventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT_NAME,
    description:
      "A one-day public AI build experience for every Malaysian. Learn, make and get help from real builders.",
    startDate: EVENT_START_ISO,
    endDate: EVENT_END_ISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [absoluteUrl(OG_IMAGE.url)],
    url: absoluteUrl("/"),
    isAccessibleForFree: true,
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    location: {
      "@type": "Place",
      name: EVENT_VENUE.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: EVENT_VENUE.addressLocality,
        addressRegion: EVENT_VENUE.addressRegion,
        addressCountry: EVENT_VENUE.addressCountry,
      },
    },
    offers: {
      "@type": "Offer",
      url: REGISTRATION_URL,
      price: 0,
      priceCurrency: "MYR",
      availability: "https://schema.org/InStock",
    },
  };
}

export function learnathonFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LEARNATHON_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function welcomeQuizJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Builder Scorecard",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    url: absoluteUrl("/welcome"),
    description:
      "Take the AIMTO AI Builder Scorecard. Get your BUILD score, builder type, and a personalised Learn-a-thon day plan.",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "MYR",
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };
}
