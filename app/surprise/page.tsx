"use client";

import React, { useMemo, useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { birthdayDatabase, dateParamToKey, type BirthdayEntry } from "@/lib/birthday-data";

/** 파일명용 이름 정리 (특수문자 제거) */
function safeFileName(name: string): string {
  return name.replace(/[/\\:*?"<>|]/g, "_").trim() || "친구";
}

const LOADING_DURATION_MS = 2000;

// 로딩 문구 (데이터 없을 때 사용) — 생일 + 미스터리
const MYSTERY_MESSAGES = [
  "별이 당신의 생일 주파수를 찾고 있어요...",
  "당신만을 위한 생일 카드가 준비 중입니다...",
  "숨겨진 생일 카드가 펼쳐지기까지 잠시만요...",
];

function SurpriseContent() {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name");
  const dateParam = searchParams.get("date");

  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const dateKey = useMemo(() => dateParamToKey(dateParam), [dateParam]);
  const data = useMemo(
    () => (dateKey ? birthdayDatabase[dateKey] ?? null : null),
    [dateKey]
  );

  const displayName = nameParam?.trim() || "친구";
  const hasRequiredParams = Boolean(nameParam?.trim() && dateParam?.trim());
  const cardRef = useRef<HTMLDivElement>(null);

  /** 카드 내부 모든 img 로드 완료 대기 (public/images 포함) */
  const waitForImages = (el: HTMLElement): Promise<void> => {
    const imgs = el.querySelectorAll("img");
    if (imgs.length === 0) return Promise.resolve();
    return Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
              resolve();
              return;
            }
            img.onload = () => resolve();
            img.onerror = () => resolve();
            setTimeout(resolve, 2000);
          })
      )
    ).then(() => {});
  };

  const handleSaveImage = async () => {
    if (!cardRef.current || !data) return;
    try {
      await waitForImages(cardRef.current);
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#1e1b4b",
        logging: false,
        imageTimeout: 0,
        removeContainer: false,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `hbd365_Birthday_Card_${safeFileName(displayName)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => setLoading(false), LOADING_DURATION_MS);
    return () => clearTimeout(t);
  }, [mounted]);

  // 데이터 없음 → 신비로운 로딩 문구 (끝없이)
  if (!hasRequiredParams || !data) {
    const msg = MYSTERY_MESSAGES[Math.abs(displayName.length) % MYSTERY_MESSAGES.length];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-indigo-950/95 via-purple-950/90 to-violet-950/95 text-white">
        <div className="max-w-md w-full text-center space-y-8">
          <p className="font-serif text-2xl italic text-white/90 animate-pulse">
            {msg}
          </p>
          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
        <div className="mt-16 px-6 py-3 rounded-full border border-white/20 bg-white/5">
          <p className="text-[10px] text-white/60 tracking-[0.35em] uppercase font-semibold">
            Daily birthday project <span className="tracking-normal text-white/80">@hbd_.365</span>
          </p>
        </div>
      </div>
    );
  }

  // 로딩 중: "당신만을 위한 특별한 생일 주파수" + 반짝이는 효과
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-indigo-950/95 via-purple-950/90 to-violet-950/95 text-white">
        <div className="max-w-md w-full text-center space-y-8">
          <p className="font-serif text-xl md:text-2xl italic text-white/95">
            <span className="text-amber-200/90">{displayName}</span>님, 당신만을 위한 특별한 생일 주파수를 맞추는 중...
          </p>
          <div className="flex justify-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-300/80 animate-pulse shadow-lg shadow-amber-400/50 [animation-duration:1.2s]" />
            <span className="w-3 h-3 rounded-full bg-violet-300/80 animate-pulse shadow-lg shadow-violet-400/50 [animation-duration:1.2s] [animation-delay:0.2s]" />
            <span className="w-3 h-3 rounded-full bg-pink-300/80 animate-pulse shadow-lg shadow-pink-400/50 [animation-duration:1.2s] [animation-delay:0.4s]" />
          </div>
          <p className="text-[11px] text-white/40 tracking-widest uppercase">
            Mystery Birthday Center
          </p>
        </div>
        <div className="mt-16 px-6 py-3 rounded-full border border-white/20 bg-white/5">
          <p className="text-[10px] text-white/60 tracking-[0.35em] uppercase font-semibold">
            Daily birthday project <span className="tracking-normal text-white/80">@hbd_.365</span>
          </p>
        </div>
      </div>
    );
  }

  // 결과 카드 — 캡처 영역(ref)에는 생일 카드 본문만, 버튼·하단 브랜딩 제외
  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-b from-indigo-950/98 via-purple-950/95 to-violet-950/98 text-white font-sans">
      <div className="max-w-[28rem] mx-auto space-y-6">
        {/* 캡처 영역: 9:16 비율, 배경 꽉 채움 — 버튼 제외, 저장 시 완벽한 이미지 */}
        <div
          ref={cardRef}
          className="w-full max-w-[min(100%,360px)] mx-auto aspect-[9/16] rounded-2xl overflow-hidden flex flex-col bg-[#1e1b4b]"
          style={{
            background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #5b21b6 100%)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 80px rgba(251,191,36,0.06)",
          }}
        >
          <div className="flex-1 flex flex-col p-4 overflow-hidden min-h-0">
            {/* 헤더 — html2canvas 호환: rgba 인라인 (oklab/color-mix 미사용) */}
            <div className="text-center space-y-0.5 shrink-0 mb-3">
              <p className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>For {displayName}</p>
              <h1 className="font-serif text-2xl md:text-3xl font-medium italic" style={{ color: "rgba(255,255,255,0.95)" }}>생일 카드</h1>
              <p className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>{dateKey} · Mystery Birthday Center</p>
            </div>

            {/* 카드 본문 — word-break: keep-all 적용, 간격·패딩 정돈 (테두리 없음) */}
            <div
              className="flex-1 rounded-xl overflow-hidden flex flex-col min-h-0"
              style={{
                background: `linear-gradient(160deg, rgba(255,255,255,0.08) 0%, ${data.colorCode}18 50%, rgba(255,255,255,0.05) 100%)`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="p-4 space-y-4 overflow-y-auto flex-1 text-wrap-korean" style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}>
                {/* 1. 오늘의 기념일 */}
                {(data.anniversaryName || data.anniversaryDesc) && (
                  <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "rgba(249,156,0,0.1)" }}>
                    <span className="text-[7px] uppercase font-bold tracking-wider block mb-1" style={{ color: "rgba(254,230,133,0.8)" }}>오늘의 기념일</span>
                    {data.anniversaryName && <p className="font-serif text-sm font-medium" style={{ color: "rgba(254,243,198,0.95)" }}>{data.anniversaryName}</p>}
                    {data.anniversaryDesc && <p className="text-[11px] leading-relaxed mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>{data.anniversaryDesc}</p>}
                  </div>
                )}

                {/* 2. 물병자리 — 원본 꽉 채우기 + 선명 (object-fit: cover, 로컬 파일 그대로 사용) */}
                {(data.zodiacName || data.fortune) && (
                  <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-transparent flex items-center justify-center">
                        <img
                          src={(data.zodiacImage ?? "/images/aquarius.png").trim()}
                          alt={data.zodiacName || "Zodiac"}
                          width={64}
                          height={64}
                          className="block w-full h-full object-cover"
                          style={{ objectFit: "cover", minWidth: "100%", minHeight: "100%" }}
                          crossOrigin="anonymous"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) (fallback as HTMLElement).classList.remove("hidden");
                          }}
                        />
                        <div className="hidden flex w-full h-full items-center justify-center text-[10px] font-medium" style={{ background: "linear-gradient(to bottom right, rgba(98,95,255,0.15), rgba(172,75,255,0.15))", color: "rgba(255,255,255,0.7)" }} aria-hidden>
                          {data.zodiacName || "Zodiac"}
                        </div>
                      </div>
                      {data.zodiacName && (
                        <>
                          <p className="font-serif text-sm italic" style={{ color: "rgba(255,255,255,0.95)" }}>{data.zodiacName}</p>
                          {data.zodiacDetail && <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>{data.zodiacDetail}</p>}
                        </>
                      )}
                    </div>
                    {data.fortune && <p className="text-[12px] leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.8)" }}>{data.fortune}</p>}
                  </div>
                )}

                {/* 3. Birth Flower & Birth Stone — 테두리 없음 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                      <img
                        src={data.flowerImage || ""}
                        alt={data.flowerName}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const el = e.currentTarget.nextElementSibling;
                          if (el) (el as HTMLElement).classList.remove("hidden");
                        }}
                      />
                      <div className="hidden flex w-full h-full items-center justify-center" style={{ background: "linear-gradient(to bottom right, rgba(255,35,87,0.2), rgba(141,84,255,0.2))" }} aria-hidden>
                        <span className="text-xl opacity-80">🌸</span>
                      </div>
                    </div>
                    <div className="min-w-0 w-full">
                      <span className="text-[7px] uppercase font-bold tracking-wider block mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Birth Flower</span>
                      <p className="font-serif text-xs italic" style={{ color: "rgba(255,255,255,0.95)" }}>{data.flowerName}</p>
                      {data.flowerMeaning && <p className="text-[10px] mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>{data.flowerMeaning}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-14 h-14 shrink-0 flex items-center justify-center" style={{ backgroundColor: "transparent" }}>
                      <img
                        src={data.birthstoneImage || ""}
                        alt={data.birthstoneName || "Birth stone"}
                        className="w-full h-full object-contain"
                        style={{
                          objectFit: "contain",
                          backgroundColor: "transparent",
                          ...(data.birthstonePreserveColor ? {} : { mixBlendMode: "multiply" }),
                        }}
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const el = e.currentTarget.nextElementSibling;
                          if (el) (el as HTMLElement).classList.remove("hidden");
                        }}
                      />
                      <div className="hidden flex w-full h-full items-center justify-center" style={{ background: "linear-gradient(to bottom right, rgba(141,84,255,0.2), rgba(98,95,255,0.2))" }} aria-hidden>
                        <span className="text-xl opacity-80">💎</span>
                      </div>
                    </div>
                    <div className="min-w-0 w-full">
                      <span className="text-[7px] uppercase font-bold tracking-wider block mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Birth Stone</span>
                      <p className="font-serif text-xs italic" style={{ color: "rgba(255,255,255,0.95)" }}>{data.birthstoneName || "—"}</p>
                      {data.birthstoneDesc && <p className="text-[10px] mt-1 leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>{data.birthstoneDesc}</p>}
                    </div>
                  </div>
                </div>

                {/* 4. Lucky Energy */}
                <div className="relative rounded-xl overflow-hidden p-4" style={{ background: "linear-gradient(to bottom right, rgba(255,204,211,0.2), rgba(184,230,254,0.2))" }}>
                  <div className="absolute inset-0 backdrop-blur-[1px]" style={{ backgroundColor: "rgba(0,0,0,0.2)" }} aria-hidden />
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <span className="text-[7px] uppercase font-bold tracking-wider block mb-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Lucky Energy</span>
                      <p className="font-serif text-sm italic" style={{ color: "rgba(255,255,255,0.95)" }}>{data.title}</p>
                      {data.energyDesc && <p className="text-[12px] leading-relaxed mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>{data.energyDesc}</p>}
                    </div>
                    <span className="text-xl shrink-0 opacity-90" aria-hidden>{data.energyEmoji || "✦"}</span>
                  </div>
                </div>

                {/* 5. Lucky Color */}
                <div className="flex items-center justify-center gap-3 rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <div className="w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: data.colorCode }} />
                  <div className="min-w-0 text-center sm:text-left">
                    <span className="text-[7px] uppercase font-bold tracking-wider block" style={{ color: "rgba(255,255,255,0.5)" }}>Lucky Color</span>
                    <p className="font-serif text-xs italic" style={{ color: "rgba(255,255,255,0.95)" }}>{data.colorNameKo}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 캡처 영역 내부 브랜딩 */}
            <p className="text-center text-[8px] tracking-[0.2em] uppercase font-semibold pt-2 shrink-0" style={{ color: "rgba(255,255,255,0.6)" }}>
              Daily birthday project <span className="tracking-normal">@hbd_.365</span>
            </p>
          </div>
        </div>

        {/* [중간] 당신을 예약한 사람은 누구일까요? — 순서 격상 (카드 바로 아래) */}
        <section
          className="w-full max-w-[min(100%,360px)] mx-auto rounded-2xl overflow-hidden text-center"
          style={{
            background: "rgba(88, 28, 135, 0.35)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="px-8 py-10 flex flex-col items-center justify-center space-y-6">
            <h2
              className="font-serif text-xl md:text-2xl font-medium italic leading-snug max-w-[320px] mx-auto"
              style={{
                color: "rgba(255, 255, 255, 0.98)",
                letterSpacing: "0.06em",
              }}
            >
              당신을 예약한 사람은 누구일까요?
            </h2>
            <p
              className="text-[13px] leading-relaxed max-w-[300px] mx-auto"
              style={{
                color: "rgba(226, 232, 240, 0.9)",
                letterSpacing: "0.02em",
              }}
            >
              궁금하면 <span className="font-semibold text-white">@hbd_.365</span> 팔로우하고 DM으로 <span className="font-semibold text-white">[추측]</span>을 보내보세요!
            </p>
            <a
              href="https://www.instagram.com/hbd_.365/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-sm tracking-[0.12em] transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                background: "transparent",
                border: "1.5px solid rgba(255, 255, 255, 0.5)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
              }}
            >
              비밀 확인하러 가기
            </a>
          </div>
        </section>

        {/* [하단] 내 생일 저장하기 버튼 섹션 */}
        <button
          type="button"
          onClick={handleSaveImage}
          className="w-full max-w-[min(100%,360px)] mx-auto flex items-center justify-center gap-2 py-4 px-6 rounded-2xl
                     bg-white/10 border border-white/20 text-white font-semibold text-sm tracking-wide
                     hover:bg-white/20 hover:border-white/30 active:scale-[0.98] transition-all shadow-lg shadow-black/20"
        >
          <span className="opacity-90">🎂</span>
          내 생일 저장하기
        </button>

        {/* 브랜딩 — 고급스럽게 배치 (캡처 제외) */}
        <div className="flex justify-center pt-4">
          <div className="px-8 py-3.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
            <p className="text-[11px] text-white/80 tracking-[0.35em] uppercase font-semibold">
              Daily birthday project <span className="tracking-normal text-white/90">@hbd_.365</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SurprisePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-950 to-violet-950 text-white">
          <p className="font-serif italic text-white/80">잠시만요...</p>
        </div>
      }
    >
      <SurpriseContent />
    </Suspense>
  );
}
