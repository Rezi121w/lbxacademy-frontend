import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Wrapper //
import RecoilWrapper from "@/app/components/recoilWrapper/recoilWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LBX Academy",
  description: "LBX Academy Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ge">
      <body className={inter.className}>
        <RecoilWrapper>{children}</RecoilWrapper>
      </body>
    </html>
  );
}
