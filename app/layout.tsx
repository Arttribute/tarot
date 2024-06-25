import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import OnchainProviders from "@/components/providers/OnchainProviders";

const chakra_petch = Chakra_Petch({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Tarot",
  description: "Tarot readings and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OnchainProviders>
      <html lang="en">
        <body className={chakra_petch.className}>{children}</body>
      </html>
    </OnchainProviders>
  );
}
