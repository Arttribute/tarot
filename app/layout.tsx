"use client";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const chakra_petch = Chakra_Petch({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body className={chakra_petch.className}>{children}</body>
        </html>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
