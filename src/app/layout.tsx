import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/ui";
import { CursorFX } from "@/components/effects";
import { NoiseOverlay } from "@/components/shapes";
import { ThemeProvider } from "@/components/theme";
import { InteractiveGrid } from "@/components/effects/InteractiveGrid";

const pixelFont = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JUST WHY US | Quiet Power Partner Behind Brands",
  description: "Premium brand studio. Strategic positioning, identity systems, and growth infrastructure for brands that prefer proof over noise.",
  openGraph: {
    title: "JUST WHY US | Quiet Power Partner Behind Brands",
    description: "Premium brand studio. Strategic positioning, identity systems, and growth infrastructure for brands that prefer proof over noise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pixelFont.variable} font-pixel`}>
        <ThemeProvider>
          <InteractiveGrid />
          <NoiseOverlay />
          <CursorFX />
          <Header />
          <main className="min-h-screen pt-[80px]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
