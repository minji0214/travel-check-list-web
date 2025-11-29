'use client';

import { ChecklistItem as ChecklistItemType } from '@/types';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ChecklistItemType>) => void;
  onRemove: (id: string) => void;
}

export default function ChecklistItem({
  item,
  onToggle,
  onUpdate,
  onRemove,
}: ChecklistItemProps) {
  const handleDateChange = (field: 'passportExpiry' | 'licenseExpiry', value: string) => {
    onUpdate(item.id, { [field]: value });
  };

  const handleTicketInfoChange = (field: 'birthDate' | 'passportNumber', value: string) => {
    onUpdate(item.id, { [field]: value });
  };

  const getItemIcon = () => {
    switch (item.type) {
      case 'passport':
        return '🛂';
      case 'license':
        return '🚗';
      case 'ticket':
        return '✈️';
      default:
        return '📋';
    }
  };

  const isSpecialItem = item.type === 'passport' || item.type === 'license' || item.type === 'ticket';
  
  // 입력 확인 여부 체크
  const isPassportIncomplete = item.type === 'passport' && !item.passportExpiry;
  const isLicenseIncomplete = item.type === 'license' && !item.licenseExpiry;
  const isTicketIncomplete = item.type === 'ticket' && (!item.birthDate || !item.passportNumber);
  const hasWarning = isPassportIncomplete || isLicenseIncomplete || isTicketIncomplete;

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm shadow-slate-200/50 p-4 mb-3 border transition-all ${
      hasWarning && !item.checked 
        ? 'border-orange-300 bg-orange-50/30' 
        : 'border-slate-100 hover:border-slate-200 hover:shadow-md'
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(item.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            item.checked
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-transparent shadow-sm'
              : 'border-slate-300 bg-white hover:border-purple-300'
          }`}
        >
          {item.checked && (
            <span className="text-white text-xs font-bold">✓</span>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-xl">{getItemIcon()}</span>
            <h3
              className={`font-semibold text-base ${
                item.checked ? 'line-through text-slate-400' : 'text-slate-800'
              }`}
            >
              {item.title}
            </h3>
            {hasWarning && !item.checked && (
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
                ⚠️ 확인 필요
              </span>
            )}
          </div>

          {item.type === 'passport' && (
            <div className="mt-2 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <span>여권 만료일 확인</span>
                {!item.passportExpiry && (
                  <span className="text-orange-500 text-[10px]">⚠️ 필수</span>
                )}
              </label>
              <input
                type="date"
                value={item.passportExpiry || ''}
                onChange={(e) => handleDateChange('passportExpiry', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-lg border bg-white focus:ring-2 focus:outline-none text-sm transition-all ${
                  !item.passportExpiry 
                    ? 'border-orange-300 focus:border-purple-400 focus:ring-purple-100' 
                    : 'border-slate-200 focus:border-purple-400 focus:ring-purple-100'
                }`}
                placeholder="만료일을 입력하세요"
              />
              {item.passportExpiry && (
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  ✓ 만료일: {new Date(item.passportExpiry).toLocaleDateString('ko-KR')}
                </p>
              )}
            </div>
          )}

          {item.type === 'license' && (
            <div className="mt-2 p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
              <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <span>국제 운전면허증 만료일 확인</span>
                <span className="text-xs text-slate-500 normal-case font-normal">(유효기간 1년)</span>
                {!item.licenseExpiry && (
                  <span className="text-orange-500 text-[10px]">⚠️ 필수</span>
                )}
              </label>
              <input
                type="date"
                value={item.licenseExpiry || ''}
                onChange={(e) => handleDateChange('licenseExpiry', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-lg border bg-white focus:ring-2 focus:outline-none text-sm transition-all ${
                  !item.licenseExpiry 
                    ? 'border-orange-300 focus:border-orange-400 focus:ring-orange-100' 
                    : 'border-slate-200 focus:border-orange-400 focus:ring-orange-100'
                }`}
                placeholder="만료일을 입력하세요"
              />
              {item.licenseExpiry && (
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  ✓ 만료일: {new Date(item.licenseExpiry).toLocaleDateString('ko-KR')}
                </p>
              )}
            </div>
          )}

          {item.type === 'ticket' && (
            <div className="mt-2 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <span>생년월일 확인</span>
                  {!item.birthDate && (
                    <span className="text-orange-500 text-[10px]">⚠️ 필수</span>
                  )}
                </label>
                <input
                  type="date"
                  value={item.birthDate || ''}
                  onChange={(e) => handleTicketInfoChange('birthDate', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-lg border bg-white focus:ring-2 focus:outline-none text-sm transition-all ${
                    !item.birthDate 
                      ? 'border-orange-300 focus:border-blue-400 focus:ring-blue-100' 
                      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                  }`}
                  placeholder="생년월일을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <span>여권번호 확인</span>
                  {!item.passportNumber && (
                    <span className="text-orange-500 text-[10px]">⚠️ 필수</span>
                  )}
                </label>
                <input
                  type="text"
                  value={item.passportNumber || ''}
                  onChange={(e) => handleTicketInfoChange('passportNumber', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-lg border bg-white focus:ring-2 focus:outline-none text-sm transition-all ${
                    !item.passportNumber 
                      ? 'border-orange-300 focus:border-blue-400 focus:ring-blue-100' 
                      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                  }`}
                  placeholder="여권번호를 입력하세요"
                />
              </div>
              {item.birthDate && item.passportNumber && (
                <p className="text-xs text-slate-600 font-medium pt-1">
                  ✓ 모든 정보 확인 완료
                </p>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="flex-shrink-0 text-slate-400 hover:text-red-500 transition-colors text-xl font-light w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50"
          aria-label="삭제"
        >
          ×
        </button>
      </div>
    </div>
  );
}

