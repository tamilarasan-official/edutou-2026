import type { Metadata, Viewport } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";

const body = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const wordmark = Work_Sans({ variable: "--font-work-sans", subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Edutou | The Future of Learning, Powered by AI",
  description:
    "Edutou Skill Academy combines AI-personalised learning paths, real-world projects and on-campus mentors to help learners thrive in the digital economy.",
  icons: "/logo.svg",
  openGraph: {
    title: "Edutou | The Future of Learning, Powered by AI",
    description: "AI-personalised learning paths, real projects and on-campus mentors.",
    images: ["/images/photo-12.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#171717", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${wordmark.variable}`}>
      <body>{children}</body>
    </html>
  );
}
