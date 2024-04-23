import { DefaultLayout, Loading, SaveMockEmployees, ThemeProvider } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", });

export const metadata: Metadata = {
  title: "Employee Management System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DefaultLayout>
            {children}
          </DefaultLayout>
          <Toaster />
          <Loading />
          <SaveMockEmployees />
        </ThemeProvider>
      </body>
    </html>
  );
}
