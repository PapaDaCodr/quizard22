import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizard",
  description: "Interactive quiz app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </head>
        <body className={`${font.className} h-full overflow-x-hidden`}>
          <Toaster />
          <ExitModal />
          <PracticeModal />
          <HeartsModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}