import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Footer } from "@/components/layout/footer";
import { buildMetadata, jsonLdScript, personJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const geist = Geist({ variable: "--font-display", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  icons: {
    icon: "/images/favicon_io/favicon-32x32.png",
    apple: "/images/favicon_io/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = [personJsonLd(), organizationJsonLd(), websiteJsonLd()];

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geist.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        {jsonLd.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
          />
        ))}
        <ThemeProvider>
          <SmoothScroll />
          <Navbar />
          <MobileTopBar />
          <main className="flex-1 pt-20 pb-20 md:pt-28 md:pb-0">{children}</main>
          <MobileBottomNav />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
