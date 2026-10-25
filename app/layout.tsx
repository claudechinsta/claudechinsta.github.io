import type { Metadata } from "next";
import Script from "next/script";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Claude Chen — Full-Stack Engineer & Music Producer",
  description: "Portfolio of Claude Chen — full-stack software engineer, technology enthusiast and beatmaker based in Melbourne.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="is-loading">
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2Q10QP13RK" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2Q10QP13RK');`}
        </Script>
      </body>
    </html>
  );
}
