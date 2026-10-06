import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnHub",
  description: "A modern platform to learn, practice, and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkProvider
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            afterSignOutUrl="/"
            appearance={{
              theme: shadcn,
              options: {
                unsafe_disableDevelopmentModeWarnings: true,
              },
            }}
            unsafe_disableDevelopmentModeConsoleWarning
          >
            <SiteHeader />
            <ConvexClientProvider>{children}</ConvexClientProvider>
            {/* <SiteFooter /> */}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
