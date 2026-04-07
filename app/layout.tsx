import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { sequelSans } from "@/lib/fonts";

const siteUrl = "https://epos-admin.local";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | EPOS Admin",
    default: "EPOS Admin",
  },
  description: "EPOS Admin — dashboard and management for your point of sale.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "EPOS Admin",
    description:
      "EPOS Admin — dashboard and management for your point of sale.",
    url: siteUrl,
    siteName: "EPOS Admin",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EPOS Admin",
    description:
      "EPOS Admin — dashboard and management for your point of sale.",
  },
  robots: { index: true, follow: true },
  manifest: "/favicon_io/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon_io/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`min-h-full ${sequelSans.variable} ${isDev ? "debug-screens" : ""}`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
