import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/theme-provider";
import SmoothScroll from "@/components/providers/smooth-scroll";
import PageTransition from "@/components/providers/page-transition";
import LoadingScreen from "@/components/ui/loading-screen";
import CustomCursor from "@/components/ui/custom-cursor";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CommandPalette from "@/components/ui/command-palette";
import { personalInfo, projects } from "@/data/portfolio";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bilal.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${personalInfo.name} | ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.summary,
  keywords: [
    personalInfo.name,
    "Full Stack Developer",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Web Development",
    "Software Engineer",
  ],
  authors: [
    {
      name: personalInfo.name,
      url: personalInfo.website,
    },
  ],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.summary,
    siteName: `${personalInfo.name} Portfolio`,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - ${personalInfo.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.summary,
    images: ["/og.png"],
    creator: "@bilal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: baseUrl,
  },
  category: "portfolio",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: personalInfo.location,
    url: personalInfo.website,
    sameAs: [
      personalInfo.github,
      personalInfo.linkedin,
      personalInfo.twitter,
    ],
    knowsAbout: projects.map((p) => p.title),
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <head>
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="relative min-h-screen bg-bgdark text-white overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen />
          <CustomCursor />
          <SmoothScroll>
            <PageTransition>
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 relative">{children}</main>
                <Footer />
              </div>
            </PageTransition>
          </SmoothScroll>
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
