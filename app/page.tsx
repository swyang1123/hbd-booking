"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";

const displayName = "친구";
const dateKey = "02-17";

const data = {
  title: "블루 오팔의 지적인 기운과 설날의 풍요로움이 당신의 새로운 시작을 축복합니다.",
  energyDesc:
    "당신의 야심 찬 계획들이 모두 결실을 맺는 한 해가 될 거예요.",
  energyEmoji: "✦",
  anniversaryName: "설날",
  anniversaryDesc:
    "오늘은 민족 대명절 '설날'이야. 새해 복 많이 받으세요! 설날의 따뜻한 기운이 당신을 감싸요.",
  flowerName: "야생화 (Wild Flower)",
  flowerMeaning: "친숙함",
  flowerImage: "/images/0217_flower.png",
  birthstoneName: "블루 오팔 (Blue Opal)",
  birthstoneDesc: "학구적인 야심",
  birthstoneImage: "/images/0217_stone.png",
  birthstonePreserveColor: true,
  zodiacName: "물병자리",
  zodiacDetail: "자유로운 영혼",
  zodiacImage: "/images/aquarius.png",
  fortune:
    "오늘은 창의적인 아이디어가 샘솟는 날입니다. 설날의 기운을 받아 가족들과 즐거운 시간을 보내며 새로운 계획을 세우기에 아주 좋은 날이에요.",
  colorNameKo: "블루 오팔",
  colorCode: "#5DADE2",
};

function waitForImages(el: HTMLElement): Promise<void> {
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
}

function safeFileName(name: string): string {
  return name.replace(/[/\\:*?"<>|]/g, "_").trim() || "친구";
}

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
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

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-b from-indigo-950/98 via-purple-950/95 to-violet-950/98 text-white font-sans">
      <div className="max-w-[28rem] mx-auto space-y-6">
        <div
          ref={cardRef}
          className="w-full max-w-[min(100%,360px)] mx-auto aspect-[9/16] rounded-2xl overflow-hidden flex flex-col bg-[#1e1b4b]"
          style={{
            background:
              "linear-gradient(180deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #5b21b6 100%)",
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex-1 flex flex-col p-4 overflow-hidden min-h-0">
            <div className="text-center space-y-0.5 shrink-0 mb-3">
              <p
                className="text-[9px] tracking-[0.3em] uppercase font-medium"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                For {displayName}
              </p>
              <h1
                className="font-serif text-2xl md:text-3xl font-medium italic"
                style={{ color: "rgba(255,255,255,0.95)" }}
              >
                생일 카드
              </h1>
              <p
                className="text-[9px] tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {dateKey} · 설날 특별 에디션
              </p>
            </div>

            <div
              className="flex-1 rounded-xl overflow-hidden flex flex-col min-h-0"
              style={{
                background: `linear-gradient(160deg, rgba(255,255,255,0.08) 0%, ${data.colorCode}18 50%, rgba(255,255,255,0.05) 100%)`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="p-4 space-y-4 overflow-y-auto flex-1 text-wrap-korean"
                style={{
                  wordBreak: "keep-all",
                  overflowWrap: "break-word",
                }}
              >
                {/* 설날 기념일 */}
                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    backgroundColor: "rgba(249,156,0,0.15)",
                    border: "1px solid rgba(254,230,133,0.35)",
                  }}
                >
                  <span
                    className="text-[7px] uppercase font-bold tracking-wider block mb-1"
                    style={{ color: "rgba(254,230,133,0.9)" }}
                  >
                    오늘의 기념일 · 설날
                  </span>
                  <p
                    className="font-serif text-base font-semibold mb-1"
                    style={{ color: "rgba(254,243,198,0.98)" }}
                  >
                    새해 복 많이 받으세요
                  </p>
                  {data.anniversaryDesc && (
                    <p
                      className="text-[11px] leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {data.anniversaryDesc}
                    </p>
                  )}
                </div>

                {/* 탄생석 & 탄생화 이미지 - 카드 중앙에 배치 */}
                <div className="flex flex-col items-center gap-4 py-2">
                  <div className="grid grid-cols-2 gap-5 w-full max-w-[200px] mx-auto">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-20 h-20 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                      >
                        <img
                          src={data.birthstoneImage || ""}
                          alt={data.birthstoneName}
                          className="w-full h-full object-contain"
                          crossOrigin="anonymous"
                          style={{
                            objectFit: "contain",
                            backgroundColor: "transparent",
                          }}
                        />
                      </div>
                      <span
                        className="text-[7px] uppercase font-bold tracking-wider"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Birth Stone
                      </span>
                      <p
                        className="font-serif text-xs italic text-center"
                        style={{ color: "rgba(255,255,255,0.95)" }}
                      >
                        {data.birthstoneName}
                      </p>
                      <p
                        className="text-[10px] text-center leading-snug"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {data.birthstoneDesc}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-20 h-20 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                      >
                        <img
                          src={data.flowerImage || ""}
                          alt={data.flowerName}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <span
                        className="text-[7px] uppercase font-bold tracking-wider"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Birth Flower
                      </span>
                      <p
                        className="font-serif text-xs italic text-center"
                        style={{ color: "rgba(255,255,255,0.95)" }}
                      >
                        {data.flowerName}
                      </p>
                      <p
                        className="text-[10px] text-center leading-snug"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {data.flowerMeaning}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 별자리 운세 */}
                <div
                  className="rounded-xl p-4 space-y-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src={data.zodiacImage || "/images/aquarius.png"}
                        alt={data.zodiacName}
                        width={56}
                        height={56}
                        className="block w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    {data.zodiacName && (
                      <>
                        <p
                          className="font-serif text-sm italic"
                          style={{ color: "rgba(255,255,255,0.95)" }}
                        >
                          {data.zodiacName}
                        </p>
                        {data.zodiacDetail && (
                          <p
                            className="text-[10px]"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            {data.zodiacDetail}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  {data.fortune && (
                    <p
                      className="text-[12px] leading-relaxed text-center"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {data.fortune}
                    </p>
                  )}
                </div>

                {/* 이지 리딩 에너지 문구 */}
                <div
                  className="relative rounded-xl overflow-hidden p-4"
                  style={{
                    background:
                      "linear-gradient(to bottom right, rgba(255,204,211,0.2), rgba(184,230,254,0.2))",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                >
                  <div
                    className="absolute inset-0 backdrop-blur-[1px]"
                    style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                    aria-hidden
                  />
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <span
                        className="text-[7px] uppercase font-bold tracking-wider block mb-0.5"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        Lucky Energy
                      </span>
                      <p
                        className="font-serif text-sm italic"
                        style={{ color: "rgba(255,255,255,0.95)" }}
                      >
                        {data.title}
                      </p>
                      {data.energyDesc && (
                        <p
                          className="text-[12px] leading-relaxed mt-1"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          {data.energyDesc}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-xl shrink-0 opacity-90"
                      aria-hidden
                    >
                      {data.energyEmoji || "✦"}
                    </span>
                  </div>
                </div>

                {/* Lucky Color */}
                <div
                  className="flex items-center justify-center gap-3 rounded-xl p-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full shrink-0"
                    style={{ backgroundColor: data.colorCode }}
                  />
                  <div className="min-w-0 text-center sm:text-left">
                    <span
                      className="text-[7px] uppercase font-bold tracking-wider block"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Lucky Color
                    </span>
                    <p
                      className="font-serif text-xs italic"
                      style={{ color: "rgba(255,255,255,0.95)" }}
                    >
                      {data.colorNameKo}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p
              className="text-center text-[8px] tracking-[0.2em] uppercase font-semibold pt-2 shrink-0"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Daily birthday project{" "}
              <span className="tracking-normal">@hbd_.365</span>
            </p>
          </div>
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
              Daily birthday project{" "}
              <span className="tracking-normal text-white/90">@hbd_.365</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
