import { ChecklistItem, TravelTheme } from '@/types';

// 공통 기본 항목
const commonItems: ChecklistItem[] = [
  {
    id: '1',
    type: 'passport',
    title: '여권',
    checked: false,
    passportExpiry: '',
  },
  {
    id: '2',
    type: 'license',
    title: '국제 운전면허증',
    checked: false,
    licenseExpiry: '',
  },
  {
    id: '3',
    type: 'ticket',
    title: '비행기 티켓',
    checked: false,
    birthDate: '',
    passportNumber: '',
  },
  {
    id: '4',
    type: 'normal',
    title: '여행자 보험',
    checked: false,
  },
  {
    id: '5',
    type: 'normal',
    title: '호텔 예약 확인서',
    checked: false,
  },
  {
    id: '6',
    type: 'normal',
    title: '비자 (필요시)',
    checked: false,
  },
  {
    id: '7',
    type: 'normal',
    title: '신용카드/현금',
    checked: false,
  },
  {
    id: '8',
    type: 'normal',
    title: '여행 어댑터',
    checked: false,
  },
  {
    id: '9',
    type: 'normal',
    title: '휴대폰 충전기',
    checked: false,
  },
  {
    id: '10',
    type: 'normal',
    title: '노트북',
    checked: false,
  },
  {
    id: '11',
    type: 'normal',
    title: '의류',
    checked: false,
  },
  {
    id: '12',
    type: 'normal',
    title: '속옷',
    checked: false,
  },
  {
    id: '13',
    type: 'normal',
    title: '양말',
    checked: false,
  },
  {
    id: '14',
    type: 'normal',
    title: '화장품',
    checked: false,
  },
  {
    id: '15',
    type: 'normal',
    title: '세면도구',
    checked: false,
  },
  {
    id: '16',
    type: 'normal',
    title: '약품',
    checked: false,
  },
  {
    id: '17',
    type: 'normal',
    title: '보조배터리',
    checked: false,
  },
  {
    id: '18',
    type: 'normal',
    title: '여권 사본/사진',
    checked: false,
  },
  {
    id: '19',
    type: 'normal',
    title: '비상 연락처',
    checked: false,
  },
  {
    id: '20',
    type: 'normal',
    title: '손 세정제/물티슈',
    checked: false,
  },
  {
    id: '21',
    type: 'normal',
    title: '여행용 베개/안대',
    checked: false,
  },
  {
    id: '22',
    type: 'normal',
    title: '압축팩',
    checked: false,
  },
  {
    id: '23',
    type: 'normal',
    title: '에코백/접이식 가방',
    checked: false,
  },
  {
    id: '24',
    type: 'normal',
    title: '비상금',
    checked: false,
  },
];

// 동남아 특화 항목
const southeastAsiaItems: ChecklistItem[] = [
  {
    id: 'sea-1',
    type: 'normal',
    title: '모기기피제',
    checked: false,
  },
  {
    id: 'sea-2',
    type: 'normal',
    title: '선크림 (SPF50+)',
    checked: false,
  },
  {
    id: 'sea-3',
    type: 'normal',
    title: '방수팩',
    checked: false,
  },
  {
    id: 'sea-4',
    type: 'normal',
    title: '수영복',
    checked: false,
  },
  {
    id: 'sea-5',
    type: 'normal',
    title: '샌들/슬리퍼',
    checked: false,
  },
  {
    id: 'sea-6',
    type: 'normal',
    title: '선글라스',
    checked: false,
  },
  {
    id: 'sea-7',
    type: 'normal',
    title: '모자',
    checked: false,
  },
  {
    id: 'sea-8',
    type: 'normal',
    title: '소화제',
    checked: false,
  },
  {
    id: 'sea-9',
    type: 'normal',
    title: '래쉬가드',
    checked: false,
  },
  {
    id: 'sea-10',
    type: 'normal',
    title: '아쿠아슈즈',
    checked: false,
  },
  {
    id: 'sea-11',
    type: 'normal',
    title: '비치타월',
    checked: false,
  },
];

// 유럽 특화 항목
const europeItems: ChecklistItem[] = [
  {
    id: 'eur-1',
    type: 'normal',
    title: '환전 (유로)',
    checked: false,
  },
  {
    id: 'eur-2',
    type: 'normal',
    title: '전압 변환기',
    checked: false,
  },
  {
    id: 'eur-3',
    type: 'normal',
    title: '따뜻한 옷',
    checked: false,
  },
  {
    id: 'eur-4',
    type: 'normal',
    title: '우산',
    checked: false,
  },
  {
    id: 'eur-5',
    type: 'normal',
    title: '여행용 어댑터 (C타입)',
    checked: false,
  },
  {
    id: 'eur-6',
    type: 'normal',
    title: '스카프/목도리',
    checked: false,
  },
  {
    id: 'eur-7',
    type: 'normal',
    title: '편한 신발',
    checked: false,
  },
  {
    id: 'eur-8',
    type: 'normal',
    title: '여행용 돗자리',
    checked: false,
  },
  {
    id: 'eur-9',
    type: 'normal',
    title: '자물쇠',
    checked: false,
  },
  {
    id: 'eur-10',
    type: 'normal',
    title: '멀티탭',
    checked: false,
  },
];

export function getThemedItems(theme: TravelTheme): ChecklistItem[] {
  const baseItems = [...commonItems];
  
  switch (theme) {
    case 'southeast-asia':
      return [...baseItems, ...southeastAsiaItems];
    case 'europe':
      return [...baseItems, ...europeItems];
    case 'general':
    default:
      return baseItems;
  }
}

// 테마별 특화 항목만 가져오기
export function getThemeSpecificItems(theme: TravelTheme): ChecklistItem[] {
  switch (theme) {
    case 'southeast-asia':
      return southeastAsiaItems;
    case 'europe':
      return europeItems;
    case 'general':
    default:
      return [];
  }
}

// 모든 테마 특화 항목의 제목 목록 가져오기
export function getAllThemeSpecificTitles(): string[] {
  return [
    ...southeastAsiaItems.map(item => item.title),
    ...europeItems.map(item => item.title),
  ];
}

export const themeLabels: Record<TravelTheme, { label: string; emoji: string }> = {
  'southeast-asia': { label: '동남아', emoji: '🏝️' },
  'europe': { label: '유럽', emoji: '🏛️' },
  'general': { label: '일반', emoji: '✈️' },
};

