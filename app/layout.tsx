import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";


const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizard",
  description: "interactive quiz app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={font.className}>
      <Toaster />
        <ExitModal />
        <PracticeModal/>
        <HeartsModal />
        {children}
      
      </body>
    </html>
    </ClerkProvider>
  );
}
