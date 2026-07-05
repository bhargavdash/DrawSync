import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/context/loading-context";
import { LoadingOverlay } from "@/components/loading-overlay";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-readout",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DrawSync — Draw together, in real time",
  description:
    "A collaborative whiteboard built on a hand-rolled canvas engine and a Redis-pub/sub WebSocket architecture. Multiple people, one live canvas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <LoadingProvider>
          {children}
          <LoadingOverlay />
        </LoadingProvider>
      </body>
    </html>
  );
}
