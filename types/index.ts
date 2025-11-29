export type ChecklistItemType = 'passport' | 'license' | 'ticket' | 'normal';
export type TravelTheme = 'southeast-asia' | 'europe' | 'general';

export interface ChecklistItem {
  id: string;
  type: ChecklistItemType;
  title: string;
  checked: boolean;
  // 여권 관련
  passportExpiry?: string;
  // 국제 운전면허증 관련
  licenseExpiry?: string;
  // 비행기 티켓 관련
  birthDate?: string;
  passportNumber?: string;
}

export interface ChecklistState {
  items: ChecklistItem[];
  theme?: TravelTheme;
}

