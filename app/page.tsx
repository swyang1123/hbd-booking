"use client";

import React, { useMemo, useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { birthdayDatabase, type BirthdayEntry } from '@/lib/birthday-data';

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function Home() {
  const [month, setMonth] = useState<number>(2);
  const [day, setDay] = useState<number>(1);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [data, setData] = useState<BirthdayEntry | null>(null);
  const [isSearched, setIsSearched] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 스크롤 애니메이션을 위한 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isSearched, selectedKey]);

  const handleSearch = () => {
    const key = `${pad2(month)}-${pad2(day)}`;
    const result = birthdayDatabase[key];
    if (result) {
      setData(result);
      setSelectedKey(key);
      setIsSearched(true);
      setTimeout(() => {
        document.querySelectorAll('.scroll-animate').forEach((el) => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
      }, 10);
    } else {
      alert(`${month}월 ${day}일 데이터는 준비 중입니다!`);
    }
  };

  const monthOptions = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const dayOptions = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  const onDownloadBtn = async () => {
    if (cardRef.current === null) return;
    if (!selectedKey) return;

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      backgroundColor: '#fdf2f8',
      pixelRatio: 2,
    });
    const link = document.createElement('a');
    link.download = `hbd-365-${selectedKey}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen text-gray-800 font-sans p-6 md:p-12">
      {/* 헤더 */}
      <header className="animate-fade-in-up max-w-2xl mx-auto text-center mb-16">
        <div className="inline-block glass rounded-full px-6 py-2 mb-6">
          <span className="text-[10px] tracking-[0.4em] text-gray-500 font-medium uppercase">Est. 2026</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-medium italic text-gray-800 mb-4">
          HBD.365
        </h1>
        <p className="text-sm text-gray-500 tracking-wide">
          매일이 특별한 날, 당신만의 이야기를 발견하세요
        </p>
      </header>

      {/* 검색창 섹션 */}
      <div className="animate-fade-in-up animate-delay-100 max-w-lg mx-auto mb-16">
        <div className="glass-strong glow-border rounded-3xl p-8">
          <p className="text-center text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-6 font-medium">
            Search Your Birthday
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full glass rounded-2xl px-6 py-4 text-center text-lg font-serif italic text-gray-700
                           appearance-none focus:outline-none transition-all"
              >
                {monthOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}월
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400/70 pointer-events-none">
                ▼
              </span>
            </div>
            <div className="relative">
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full glass rounded-2xl px-6 py-4 text-center text-lg font-serif italic text-gray-700
                           appearance-none focus:outline-none transition-all"
              >
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}일
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400/70 pointer-events-none">
                ▼
              </span>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="w-full mt-4 glass-button glow-border rounded-2xl py-5 font-semibold
                       tracking-[0.3em] text-[11px] text-gray-700 uppercase
                       hover:text-gray-900 active:scale-[0.98] transition-all"
          >
            확인하기
          </button>
        </div>
      </div>

      {/* 결과 카드 — 버튼 클릭 후에만 표시 */}
      {data && selectedKey && (
        <>
          {/* 메인 카드 영역 — Magazine Layout */}
          <div
            ref={cardRef}
            className="scroll-animate visible max-w-[28rem] mx-auto glass-strong glow-border rounded-[2.5rem] overflow-hidden"
          >
            <div
              className="p-12 md:p-14 space-y-14"
              style={{
                background: `linear-gradient(180deg, rgba(255,255,255,0.65) 0%, ${data.colorCode}33 100%)`
              }}
            >
              {/* 날짜 & 타이틀 — 잡지 헤더 */}
              <div className="scroll-animate visible text-center space-y-4">
                <p className="text-[10px] tracking-[0.45em] text-gray-400 uppercase font-medium">
                  Your Special Day
                </p>
                <h2 className="font-serif text-7xl md:text-8xl font-medium italic text-gray-800 tracking-tight">
                  {selectedKey}
                </h2>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="h-px w-14 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <span className="text-[9px] tracking-[0.2em] text-gray-400 uppercase">✦</span>
                  <div className="h-px w-14 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
              </div>

              {/* 메인 메시지 — 여백 충분 */}
              <div className="scroll-animate visible space-y-5">
                <span className="inline-block glass rounded-full px-4 py-1.5 text-[10px] font-semibold text-rose-400 uppercase tracking-wider">
                  {data.title}
                </span>
                <p className="font-serif text-2xl md:text-[1.75rem] leading-[1.5] text-gray-700 italic">
                  \"{data.meaning}\"
                </p>
                <p className="text-[11px] text-gray-400 tracking-wide">
                  <span className="mr-1">📍</span> {data.event}
                </p>
              </div>

              {/* 탄생화 · 탄생석 — 텍스트 끊김 방지 + 여유 있는 배치 */}
              <div className="scroll-animate visible glass glow-border rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* 탄생화 */}
                  <div className="flex items-center gap-5">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-white/50">
                      {data.flowerImage ? (
                        <img src={data.flowerImage} alt={data.flowerName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl" aria-hidden>🌸</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block mb-1">
                        Birth Flower
                      </span>
                      <p className="font-serif text-xl italic text-gray-700 whitespace-nowrap">{data.flowerName}</p>
                    </div>
                  </div>

                  {/* 탄생석 */}
                  <div className="flex items-center gap-5">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-white/50">
                      {data.birthstoneImage ? (
                        <img
                          src={data.birthstoneImage}
                          alt={data.birthstoneName ? data.birthstoneName : "Birth stone"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl" aria-hidden>💎</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block mb-1">
                        Birth Stone
                      </span>
                      <p className="font-serif text-xl italic text-gray-700 whitespace-nowrap">{data.birthstoneName || "—"}</p>
                    </div>
                  </div>

                  {/* 탄생석 설명 (가독성 위해 아래 블록으로 분리) */}
                  {data.birthstoneDesc && (
                    <div className="md:col-span-2 pt-5 border-t border-white/30">
                      <p className="text-[14px] leading-relaxed text-gray-600">{data.birthstoneDesc}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 별자리 · 오늘의 운세 — 줄 끊김 방지(이름/상세 분리) */}
              {(data.zodiacName || data.fortune) && (
                <div className="scroll-animate visible glass glow-border rounded-2xl p-8 space-y-6">
                  {data.zodiacName && (
                    <div className="text-center">
                      <p className="font-serif text-xl italic text-gray-700 whitespace-nowrap">
                        ✦ {data.zodiacName}
                      </p>
                      {data.zodiacDetail && (
                        <p className="text-[12px] tracking-wide text-gray-500 font-medium whitespace-nowrap">
                          {data.zodiacDetail}
                        </p>
                      )}
                    </div>
                  )}
                  {data.fortune && (
                    <p className="text-[15px] leading-relaxed text-gray-600 text-center font-sans">
                      {data.fortune}
                    </p>
                  )}
                </div>
              )}

              {/* 행운의 컬러 — 한글 이름만 표기 + 세련된 칩 */}
              <div className="scroll-animate visible glass glow-border rounded-2xl p-8 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 shrink-0">
                    <div
                      className="absolute inset-0 rounded-full blur-[6px] opacity-40"
                      style={{ backgroundColor: data.colorCode }}
                    />
                    <div
                      className="relative w-10 h-10 rounded-full shadow-inner border-2 border-white/70"
                      style={{ backgroundColor: data.colorCode }}
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block">
                      Lucky Color
                    </span>
                    <p className="font-serif text-xl italic text-gray-700 whitespace-nowrap">{data.colorNameKo}</p>
                  </div>
                </div>
                {data.colorDesc && (
                  <p className="text-[14px] leading-relaxed text-gray-600 pt-4 border-t border-white/30">
                    {data.colorDesc}
                  </p>
                )}
              </div>

              {/* Lucky Energy — 배경 디자인 강화(그라데이션+블러+아이콘) */}
              <div className="scroll-animate visible glass glow-border rounded-2xl p-8 overflow-hidden relative">
                <div
                  className={`absolute -inset-6 bg-gradient-to-br ${data.energyGradientFrom || "from-rose-200/50"} ${data.energyGradientTo || "to-sky-200/50"} blur-2xl opacity-70`}
                  aria-hidden
                />
                <div className="relative space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider block mb-1">
                        Lucky Energy
                      </span>
                      <p className="font-serif text-2xl italic text-gray-800">{data.title}</p>
                    </div>
                    <div className="text-3xl leading-none" aria-hidden>
                      {data.energyEmoji || "✦"}
                    </div>
                  </div>
                  {data.energyDesc && (
                    <p className="text-[14px] leading-relaxed text-gray-700 pt-4 border-t border-white/40">
                      {data.energyDesc}
                    </p>
                  )}
                </div>
              </div>

              {/* Vibe Bar */}
              <div className="scroll-animate visible glass glow-border rounded-2xl p-6">
                <div className="flex justify-between text-[9px] text-gray-500 uppercase font-bold tracking-wider mb-3">
                  <span>Personal Vibe</span>
                  <span className="text-rose-500">{data.vibe}%</span>
                </div>
                <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${data.vibe}%`,
                      background: 'linear-gradient(90deg, #fda4af 0%, #f472b6 50%, #e879f9 100%)'
                    }}
                  />
                </div>
              </div>

              {/* 브랜딩 — 흐림 개선 */}
              <p className="scroll-animate visible text-center text-[10px] text-gray-500 tracking-[0.35em] uppercase font-semibold pt-4">
                Daily Birthday Project <span className="tracking-normal">@hbd365</span>
              </p>
            </div>
          </div>

          {/* 다운로드 버튼 */}
          <div className="animate-fade-in-up animate-delay-400 max-w-lg mx-auto mt-10">
            <button
              onClick={onDownloadBtn}
              className="w-full glass-button glow-border rounded-2xl py-6 font-semibold
                         tracking-[0.3em] text-[11px] text-gray-700 uppercase
                         hover:text-gray-900 active:scale-[0.98] transition-all"
            >
              ✦ Make My Birthday Card ✦
            </button>
          </div>
        </>
      )}

      {/* 하단 정보 */}
      <footer className="animate-fade-in-up animate-delay-500 max-w-2xl mx-auto mt-20 text-center">
        <div className="glass rounded-full px-8 py-4 inline-block">
          <p className="text-[10px] text-gray-400 tracking-wider">
            <span className="font-serif italic">HBD.365</span> — Celebrating Every Day, Every Story
          </p>
        </div>
      </footer>
    </div>
  );
}
