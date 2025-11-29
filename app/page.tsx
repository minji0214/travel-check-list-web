'use client';

import { useState, useEffect } from 'react';
import { ChecklistItem, TravelTheme } from '@/types';
import { getThemedItems, getThemeSpecificItems, getAllThemeSpecificTitles, themeLabels } from '@/lib/themedItems';
import Checklist from '@/components/Checklist';

export default function Home() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [theme, setTheme] = useState<TravelTheme>('general');

  useEffect(() => {
    // localStorage에서 저장된 데이터 불러오기
    const savedData = localStorage.getItem('travel-checklist');
    const savedTheme = localStorage.getItem('travel-theme') as TravelTheme;
    
    if (savedData) {
      try {
        const parsedItems = JSON.parse(savedData);
        setItems(parsedItems);
        if (savedTheme && ['southeast-asia', 'europe', 'general'].includes(savedTheme)) {
          setTheme(savedTheme);
        }
      } catch (e) {
        const defaultItems = getThemedItems(savedTheme || 'general');
        setItems(defaultItems);
        setTheme(savedTheme || 'general');
      }
    } else {
      const defaultItems = getThemedItems('general');
      setItems(defaultItems);
    }
  }, []);

  useEffect(() => {
    // items가 변경될 때마다 localStorage에 저장
    if (items.length > 0) {
      localStorage.setItem('travel-checklist', JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    // theme이 변경될 때마다 localStorage에 저장
    localStorage.setItem('travel-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme: TravelTheme) => {
    if (theme === newTheme) return; // 같은 테마면 변경하지 않음
    
    setTheme(newTheme);
    
    // 이전 테마와 새 테마의 특화 항목 가져오기
    const prevThemeItems = getThemeSpecificItems(theme);
    const newThemeItems = getThemeSpecificItems(newTheme);
    const prevThemeTitles = prevThemeItems.map(item => item.title);
    const newThemeTitles = newThemeItems.map(item => item.title);
    
    // 기존 항목들에서 이전 테마의 특화 항목만 제거
    let updatedItems = items.filter(item => 
      !prevThemeTitles.includes(item.title)
    );
    
    // 새 테마의 특화 항목 추가 (이미 있지 않은 것만)
    const existingTitles = updatedItems.map(item => item.title);
    newThemeItems.forEach(newItem => {
      if (!existingTitles.includes(newItem.title)) {
        updatedItems.push(newItem);
      }
    });
    
    setItems(updatedItems);
  };

  const handleItemsChange = (newItems: ChecklistItem[]) => {
    // 노트북 체크 상태 확인
    const laptopItem = newItems.find(item => item.title === '노트북');
    const laptopChargerItem = newItems.find(item => item.title === '노트북 충전기');
    const hasLaptop = laptopItem?.checked === true;
    const hasLaptopCharger = laptopChargerItem !== undefined;

    let updatedItems = [...newItems];

    if (hasLaptop && !hasLaptopCharger) {
      // 노트북이 체크되었고 노트북 충전기가 없으면 추가
      const laptopIndex = updatedItems.findIndex(item => item.title === '노트북');
      const newChargerItem: ChecklistItem = {
        id: `laptop-charger-${Date.now()}`,
        type: 'normal',
        title: '노트북 충전기',
        checked: false,
      };
      // 노트북 바로 다음에 추가
      updatedItems.splice(laptopIndex + 1, 0, newChargerItem);
    } else if (!hasLaptop && hasLaptopCharger) {
      // 노트북이 체크 해제되었고 노트북 충전기가 있으면 제거
      updatedItems = updatedItems.filter(item => item.title !== '노트북 충전기');
    }

    setItems(updatedItems);
  };

  const handleReset = () => {
    if (confirm('체크리스트를 초기화하시겠습니까?')) {
      const resetItems = getThemedItems(theme);
      setItems(resetItems);
    }
  };

  const checkedCount = items.filter((item) => item.checked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-purple-50/30 to-pink-50/50 pb-20">
      <div className="max-w-md mx-auto px-5 pt-12">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 shadow-lg shadow-pink-200/50 mb-5">
            <span className="text-4xl">{themeLabels[theme].emoji}</span>
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
            여행 체크리스트
          </h1>
          <p className="text-slate-500 text-sm font-medium mb-4">
            놓치지 말고 꼼꼼히 확인하세요
          </p>
          
          {/* 테마 선택 */}
          <div className="flex gap-2 justify-center">
            {(Object.keys(themeLabels) as TravelTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => handleThemeChange(t)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  theme === t
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-md'
                    : 'bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 hover:border-purple-300'
                }`}
              >
                <span className="mr-1.5">{themeLabels[t].emoji}</span>
                {themeLabels[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* 진행률 표시 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-sm shadow-slate-200/50 mb-6 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">
              준비 완료
            </span>
            <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {checkedCount} / {totalCount}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 체크리스트 */}
        <div className="mb-6">
          <Checklist items={items} onItemsChange={handleItemsChange} />
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 font-semibold py-3.5 px-4 rounded-2xl hover:bg-white hover:border-slate-300 transition-all shadow-sm active:scale-[0.98]"
          >
            초기화
          </button>
          <button
            onClick={() => {
              const newItem: ChecklistItem = {
                id: Date.now().toString(),
                type: 'normal',
                title: '새 항목',
                checked: false,
              };
              setItems([...items, newItem]);
            }}
            className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-semibold py-3.5 px-4 rounded-2xl hover:shadow-lg hover:shadow-pink-300/50 transition-all active:scale-[0.98]"
          >
            + 항목 추가
          </button>
        </div>

        {/* 안내 문구 */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 font-medium">
            드래그로 순서 변경 · × 버튼으로 삭제
          </p>
        </div>
      </div>
    </div>
  );
}
