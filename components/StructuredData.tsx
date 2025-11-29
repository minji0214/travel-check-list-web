export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travel-checklist.vercel.app';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "해외 여행 체크리스트",
    "description": "동남아, 유럽 여행을 위한 완벽한 체크리스트 앱. 여권 만료일, 비행기 티켓 정보, 필수 준비물을 놓치지 않고 확인하세요.",
    "url": baseUrl,
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1"
    },
    "featureList": [
      "여권 만료일 확인",
      "비행기 티켓 정보 확인",
      "드래그 앤 드롭으로 순서 변경",
      "동남아/유럽 테마별 체크리스트",
      "로컬 저장소로 데이터 보관"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

