import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Nunito, Montserrat } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EventzHub",
  description:
    "A web app to host, connect & schedule nearby events. Built using NextJs, Tailwind, TypeScript, Mongoose, ShadCn, React Hook Form, Zod, Uploadthing, React Datepicker & Stripe. Date: Thursday 29 February 2024 ",
  icons: {
    icon: '/assets/images/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
