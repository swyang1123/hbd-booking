"use client";

import React, { useMemo, useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { birthdayDatabase, dateParamToKey } from "@/lib/birthday-data";

function safeFileName(name: string): string {
  return name.replace(/[/\\:*?"<>|]/g, "_").trim() || "친구";
}

const INTRO_DURATION_MS = 3000;
const FADE_OUT_MS = 500;

function IntroOverlay({
  visible,
  displayName,
}: {
  visible: boolean;
  displayName: string;
}) {
  return (
    <div
      className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6 transition-opacity duration-500 ease-out"
      style={{
        background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 40%, #4c1d95 70%, #5b21b6 100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <p className="font-serif text-lg md:text-xl text-center leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.92)" }}>
        {displayName}님, 당신만을 위한 특별한 생일 카드가 곧 열립니다...
      </p>
      <div className="flex justify-center gap-1.5 mb-16">
        <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce [animation-delay:300ms]" />
      </div>
      <div className="absolute bottom-12 left-0 right-0 text-center">
        <p className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
          MYSTERY BIRTHDAY CENTER
        </p>
        <p className="text-[8px] tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
          Daily birthday project @hbd_.365
        </p>
      </div>
    </div>
  );
}

function SurpriseContent() {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name");
  const dateParam = searchParams.get("date");

  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  const dateKey = useMemo(() => dateParamToKey(dateParam), [dateParam]);
  const data = useMemo(
    () => (dateKey ? birthdayDatabase[dateKey] ?? null : null),
    [dateKey]
  );

  const displayName = nameParam?.trim() || "친구";
  const hasRequiredParams = Boolean(dateParam?.trim());
  const cardRef = useRef<HTMLDivElement>(null);

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
    const t = setTimeout(() => setShowIntro(false), INTRO_DURATION_MS);
    return () => clearTimeout(t);
  }, [mounted]);

  if (!hasRequiredParams) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-indigo-950/95 via-purple-950/90 to-violet-950/95 text-white">
        <div className="max-w-md w-full text-center space-y-6">
          <p className="font-serif text-lg italic text-white/90">이름과 생일을 입력해 주세요.</p>
          <a href="/" className="inline-block px-6 py-3 rounded-xl bg-white/15 border border-white/30 hover:bg-white/25 transition-colors">
            입력하러 가기
          </a>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-indigo-950/95 via-purple-950/90 to-violet-950/95 text-white">
        <div className="max-w-md w-full text-center space-y-6">
          <p className="font-serif text-lg italic text-white/90">{dateKey}의 생일 데이터가 아직 준비되지 않았습니다.</p>
          <a href="/" className="inline-block px-6 py-3 rounded-xl bg-white/15 border border-white/30 hover:bg-white/25 transition-colors">
            다른 날짜로 시도하기
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <IntroOverlay visible={showIntro} displayName={displayName} />
      <div
        className="min-h-screen py-10 px-4 bg-gradient-to-b from-indigo-950/98 via-purple-950/95 to-violet-950/98 text-white font-sans transition-opacity duration-500 ease-out"
        style={{ opacity: showIntro ? 0 : 1 }}
      >
      <div className="max-w-[28rem] mx-auto space-y-6">
        <div
          ref={cardRef}
          className="w-full max-w-[min(100%,360px)] mx-auto aspect-[9/16] rounded-2xl overflow-hidden flex flex-col bg-[#1e1b4b]"
          style={{
            background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #5b21b6 100%)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex-1 flex flex-col p-4 overflow-hidden min-h-0">
            <div className="text-center space-y-0.5 shrink-0 mb-3">
              <p className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                For {displayName}
              </p>
              <h1 className="font-serif text-2xl md:text-3xl font-medium italic" style={{ color: "rgba(255,255,255,0.95)" }}>
                생일 카드
              </h1>
              <p className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                {dateKey} · Mystery Birthday Center
              </p>
            </div>

            <div
              className="flex-1 rounded-xl overflow-hidden flex flex-col min-h-0"
              style={{
                background: `linear-gradient(160deg, rgba(255,255,255,0.08) 0%, ${data.colorCode}18 50%, rgba(255,255,255,0.05) 100%)`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="p-4 overflow-y-auto flex-1 text-wrap-korean" style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}>
                {/* 1. 기념일 섹션: 중앙 정렬, [무슨 날] 타이틀 강조, 하단 여백 */}
                {(data.anniversaryName || (data as { anniversaryMain?: string }).anniversaryMain || data.anniversaryDesc) && (
                  <section className="mb-8 text-center">
                    <p className="text-[7px] uppercase font-bold tracking-wider mb-2" style={{ color: "rgba(254,230,133,0.85)" }}>
                      오늘의 기념일
                    </p>
                    {data.anniversaryName && (
                      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 leading-tight" style={{ color: "rgba(254,243,198,0.98)" }}>
                        {data.anniversaryName}
                      </h2>
                    )}
                    {(data as { anniversaryMain?: string }).anniversaryMain && (
                      <p className="text-[12px] font-medium leading-relaxed mb-1.5" style={{ color: "rgba(254,243,198,0.95)" }}>
                        {(data as { anniversaryMain?: string }).anniversaryMain}
                      </p>
                    )}
                    {data.anniversaryDesc && (
                      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                        {data.anniversaryDesc}
                      </p>
                    )}
                  </section>
                )}

                {/* 2. 별자리 운세 (비중 확대): 카드에서 가장 비중 있게 */}
                {(data.zodiacName || data.fortune) && (
                  <section className="mb-8 rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex flex-col items-center text-center gap-2 mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                        <img
                          src={(data.zodiacImage ?? "/images/aquarius.png").trim()}
                          alt={data.zodiacName || "Zodiac"}
                          width={64}
                          height={64}
                          className="block w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                      {data.zodiacName && (
                        <p className="font-serif text-base font-semibold italic" style={{ color: "rgba(255,255,255,0.98)" }}>
                          {data.zodiacName}
                        </p>
                      )}
                      {data.zodiacDetail && (
                        <p className="text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                          {data.zodiacDetail}
                        </p>
                      )}
                    </div>
                    {data.fortune && (
                      <p className="text-[13px] leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.9)" }}>
                        {data.fortune}
                      </p>
                    )}
                  </section>
                )}

                {/* 3. 탄생석 / 탄생화: 핵심 요약만 간결하게 */}
                <section className="mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative mb-2" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
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
                        <div className="hidden absolute inset-0 flex items-center justify-center text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.7)" }} aria-hidden>
                          {data.birthstoneName || "—"}
                        </div>
                      </div>
                      <p className="text-[7px] uppercase font-bold tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Birth Stone
                      </p>
                      <p className="font-serif text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.95)" }}>
                        {data.birthstoneName || "—"}
                      </p>
                      {data.birthstoneDesc && (
                        <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                          {data.birthstoneDesc}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative mb-2" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
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
                        <div className="hidden absolute inset-0 flex items-center justify-center text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.7)" }} aria-hidden>
                          {data.flowerName}
                        </div>
                      </div>
                      <p className="text-[7px] uppercase font-bold tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Birth Flower
                      </p>
                      <p className="font-serif text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.95)" }}>
                        {data.flowerName}
                      </p>
                      {data.flowerMeaning && (
                        <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                          {data.flowerMeaning}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* 4. LUCKY ENERGY: 키워드 옆에 별빛(에모지) 배치 */}
                <section className="rounded-xl overflow-hidden p-4 mt-2" style={{ background: "linear-gradient(to bottom right, rgba(255,204,211,0.18), rgba(184,230,254,0.18))", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="text-[7px] uppercase font-bold tracking-[0.2em] mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                    LUCKY ENERGY
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-serif text-lg md:text-xl font-bold leading-tight" style={{ color: "rgba(255,255,255,0.98)" }}>
                      {data.title}
                    </p>
                    {data.energyEmoji && (
                      <span className="text-lg opacity-90" aria-hidden>
                        {data.energyEmoji}
                      </span>
                    )}
                  </div>
                  {data.energyDesc && (
                    <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                      {data.energyDesc}
                    </p>
                  )}
                </section>

                {/* LUCKY COLOR: LUCKY ENERGY와 완전 동일한 폰트·스타일 */}
                <section className="rounded-xl overflow-hidden p-4 mt-4" style={{ background: "linear-gradient(to bottom right, rgba(255,204,211,0.18), rgba(184,230,254,0.18))", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="text-[7px] uppercase font-bold tracking-[0.2em] mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                    LUCKY COLOR
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full shrink-0" style={{ backgroundColor: data.colorCode }} />
                    <p className="font-serif text-lg md:text-xl font-bold leading-tight" style={{ color: "rgba(255,255,255,0.98)" }}>
                      {data.colorNameKo}
                    </p>
                  </div>
                </section>
              </div>
            </div>

            <p className="text-center text-[8px] tracking-[0.2em] uppercase font-semibold pt-2 shrink-0" style={{ color: "rgba(255,255,255,0.6)" }}>
              Daily birthday project <span className="tracking-normal">@hbd_.365</span>
            </p>
          </div>
        </div>

        {/* 추측 유도 섹션: 가독성·강조 (줄바꿈, 추측 키워드 #FFFFFF Bold) */}
        <div
          className="w-full max-w-[min(100%,360px)] mx-auto rounded-xl p-5 mb-4 text-center"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p className="text-[15px] md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.92)" }}>
            내 생일을 축하해 준 사람이 누구인지 궁금하시다면?
            <br />
            인스타그램 DM으로 <strong className="font-bold" style={{ color: "#FFFFFF" }}>추측</strong>이라고 보내 주세요!
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveImage}
          className="w-full max-w-[min(100%,360px)] mx-auto flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 hover:border-white/30 active:scale-[0.98] transition-all"
        >
          <span className="opacity-90">🎂</span>
          내 생일 저장하기
        </button>

        <div className="flex justify-center pt-4">
          <div className="px-8 py-3.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
            <p className="text-[11px] text-white/80 tracking-[0.35em] uppercase font-semibold">
              Daily birthday project <span className="tracking-normal text-white/90">@hbd_.365</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
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
