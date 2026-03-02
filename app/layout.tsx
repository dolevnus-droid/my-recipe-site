import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ['200', '300', '400', '600'],
});

export const metadata: Metadata = {
  title: {
    default: "Bake & Balance | אפייה ביתית באיזון מושלם",
    template: "%s | Bake & Balance"
  },
  description: "Bake & Balance - הבלוג של שירה למתכונים לאפייה ביתית מדויקת, מאוזנת ומלאה באהבה.",
  keywords: ["Bake & Balance", "בייק אנד באלאנס", "מתכונים לאפייה", "אפייה ביתית", "עוגות מאוזנות"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="google-site-verification" content="DzqfHmjKgX52nmGDdLVbMfmAYvR6k9Zhvl1mfvDar7k" />
        <meta name="google-adsense-account" content="ca-pub-4019778982285051" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4019778982285051"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${assistant.className} antialiased`}>
        {/* ללא Header גלובלי - משתמשים בתפריט שקיים כבר בעמודים */}
        <main>
          {children}
        </main>

        <footer className="py-12 border-t border-gray-50 mt-20">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-xs italic">
            Bake & Balance 2026 © | כל הזכויות שמורות לשירה נוסבוים
          </div>
        </footer>
      </body>
    </html>
  );
}