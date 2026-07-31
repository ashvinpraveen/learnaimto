import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono, Rethink_Sans, Space_Grotesk } from "next/font/google";
import { OG_IMAGE, SITE_NAME } from "@/lib/constants";
import "../index.css";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#070707" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "The Malaysian Learn-a-thon — Learn AI. Build Something.",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "A one-day public AI build experience for every Malaysian. Learn, make and get help from real builders on 12 August 2026 at The Campus, Ampang.",
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/aimto-assets/favicon.png", type: "image/png" }],
    apple: [{ url: "/aimto-assets/favicon.png" }],
  },
  openGraph: {
    title: "The Malaysian Learn-a-thon",
    description: "Learn AI, build something useful and take it home.",
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
  alternates: {
    canonical: "/",
  },
};

const THEME_SCRIPT = `
  (function () {
    try {
      const KEY = "aimto-theme-preference";
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      const saved = window.localStorage.getItem(KEY);
      const preference =
        saved === "light" || saved === "dark" || saved === "system"
          ? saved
          : "system";
      const theme = preference === "system" ? systemTheme : preference;

      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {
      const fallbackTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.dataset.theme = fallbackTheme;
      document.documentElement.style.colorScheme = fallbackTheme;
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rethinkSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_SCRIPT,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
