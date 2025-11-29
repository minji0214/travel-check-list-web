import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://travel-checklist.vercel.app'),
  title: {
    default: "해외 여행 체크리스트 - 놓치지 말고 꼼꼼히 확인하세요",
    template: "%s | 해외 여행 체크리스트",
  },
  description: "동남아, 유럽 여행을 위한 완벽한 체크리스트 앱. 여권 만료일, 비행기 티켓 정보, 필수 준비물을 놓치지 않고 확인하세요. 드래그 앤 드롭으로 순서 변경 가능.",
  keywords: [
    "해외여행 체크리스트",
    "여행 준비물",
    "동남아 여행",
    "유럽 여행",
    "여권 만료일 확인",
    "비행기 티켓 체크",
    "여행 필수템",
    "해외여행 준비",
    "여행 체크리스트 앱",
    "여행 준비물 리스트",
  ],
  authors: [{ name: "Travel Checklist" }],
  creator: "Travel Checklist",
  publisher: "Travel Checklist",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "해외 여행 체크리스트",
    title: "해외 여행 체크리스트 - 놓치지 말고 꼼꼼히 확인하세요",
    description: "동남아, 유럽 여행을 위한 완벽한 체크리스트 앱. 여권 만료일, 비행기 티켓 정보, 필수 준비물을 놓치지 않고 확인하세요.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "해외 여행 체크리스트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "해외 여행 체크리스트 - 놓치지 말고 꼼꼼히 확인하세요",
    description: "동남아, 유럽 여행을 위한 완벽한 체크리스트 앱. 여권 만료일, 비행기 티켓 정보, 필수 준비물을 놓치지 않고 확인하세요.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    // Google Search Console, Naver Search Advisor 등에서 받은 인증 코드를 추가할 수 있습니다
    // google: "your-google-verification-code",
    // other: {
    //   "naver-site-verification": "your-naver-verification-code",
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
