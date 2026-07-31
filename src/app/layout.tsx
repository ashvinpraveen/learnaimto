import type { Metadata, Viewport } from "next";
import "../index.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070707",
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Malaysian Learn-a-thon — Learn AI. Build Something.",
  description:
    "A one-day public AI build experience for every Malaysian. Learn, make and get help from real builders on 12 August 2026 at The Campus, Ampang.",
  icons: { icon: "/aimto-assets/favicon.png" },
  openGraph: {
    title: "The Malaysian Learn-a-thon",
    description: "Learn AI, build something useful and take it home.",
    url: "/aimto/learnathon",
    type: "website",
    images: [{ url: "/aimto-assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Malaysian Learn-a-thon",
    description: "Learn AI, build something useful and take it home.",
    images: ["/aimto-assets/og-image.png"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_SCRIPT,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
