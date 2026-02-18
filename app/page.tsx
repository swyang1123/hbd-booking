"use client";

import React, { useRef, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { birthdayDatabase, dateParamToKey } from "@/lib/birthday-data";

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

function BirthdayCardContent() {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name");
  const dateParam = searchParams.get("date");

  const displayName = nameParam?.trim() || "친구";
  const dateKey = dateParam ? dateParamToKey(dateParam) : null;
  const data = dateKey ? birthdayDatabase[dateKey] ?? null : null;

  const hasParams = Boolean(dateParam?.trim());
  const cardRef = useRef<HTMLDivElement>(null);

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

  // 파라미터가 없으면 입력창 표시
  if (!hasParams) {
    return (
      <InputForm
        initialName={displayName || undefined}
        initialDate={dateParam || undefined}
      />
    );
  }

  // 날짜 데이터가 없으면 안내 메시지
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-indigo-950/95 via-purple-950/90 to-violet-950/95 text-white">
        <p className="text-center text-white/90 mb-4">
          {dateKey || dateParam}의 생일 데이터가 아직 준비되지 않았어요.
        </p>
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-white/15 border border-white/30 hover:bg-white/25 transition-colors"
        >
          다른 날짜로 시도하기
        </a>
      </div>
    );
  }

  const anniversaryMain =
    (data as { anniversaryMain?: string }).anniversaryMain || data.anniversaryDesc;

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
              <div
                className="p-4 space-y-4 overflow-y-auto flex-1 text-wrap-korean"
                style={{
                  wordBreak: "keep-all",
                  overflowWrap: "break-word",
                }}
              >
                {(data.anniversaryName || data.anniversaryDesc || anniversaryMain) && (
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
                      오늘의 기념일
                    </span>
                    {anniversaryMain && (
                      <p
                        className="font-serif text-base font-semibold mb-1"
                        style={{ color: "rgba(254,243,198,0.98)" }}
                      >
                        {anniversaryMain}
                      </p>
                    )}
                    {data.anniversaryDesc &&
                      anniversaryMain !== data.anniversaryDesc && (
                        <p
                          className="text-[11px] leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                          {data.anniversaryDesc}
                        </p>
                      )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="rounded-xl p-4 flex flex-col"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex flex-col items-center gap-2 mb-3">
                      <div
                        className="w-20 h-20 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                      >
                        <img
                          src={data.birthstoneImage || ""}
                          alt={data.birthstoneName || "Birth stone"}
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
                        className="font-serif text-sm italic text-center"
                        style={{ color: "rgba(255,255,255,0.95)" }}
                      >
                        {data.birthstoneName || "—"}
                      </p>
                    </div>
                    {data.birthstoneDesc && (
                      <p
                        className="text-[11px] leading-relaxed flex-1"
                        style={{ color: "rgba(255,255,255,0.78)" }}
                      >
                        {data.birthstoneDesc}
                      </p>
                    )}
                  </div>
                  <div
                    className="rounded-xl p-4 flex flex-col"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex flex-col items-center gap-2 mb-3">
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
                        className="font-serif text-sm italic text-center"
                        style={{ color: "rgba(255,255,255,0.95)" }}
                      >
                        {data.flowerName}
                      </p>
                    </div>
                    {data.flowerMeaning && (
                      <p
                        className="text-[11px] leading-relaxed flex-1"
                        style={{ color: "rgba(255,255,255,0.78)" }}
                      >
                        {data.flowerMeaning}
                      </p>
                    )}
                  </div>
                </div>

                {(data.zodiacName || data.fortune) && (
                  <div
                    className="rounded-xl p-4 space-y-3"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                        <img
                          src={data.zodiacImage || "/images/aquarius.png"}
                          alt={data.zodiacName || "Zodiac"}
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
                )}

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
          <a
            href="/"
            className="text-[12px] text-white/70 hover:text-white/90 underline underline-offset-2"
          >
            다른 날짜로 다시 만들기
          </a>
        </div>

        <div className="flex justify-center pt-2">
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

function InputForm({
  initialName,
  initialDate,
}: {
  initialName?: string;
  initialDate?: string;
}) {
  const [name, setName] = useState(initialName || "");
  const [date, setDate] = useState(initialDate || "0217");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim() || "친구";
    const d = date.replace(/\D/g, "").padStart(4, "0").slice(0, 4) || "0217";
    const params = new URLSearchParams({ name: n, date: d });
    window.location.href = `/?${params.toString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-indigo-950/95 via-purple-950/90 to-violet-950/95 text-white font-sans">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1
            className="font-serif text-2xl md:text-3xl font-medium italic mb-2"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            생일 카드 만들기
          </h1>
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            이름과 생일을 입력하면 맞춤 생일 카드가 만들어져요.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              이름
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="친구"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
              autoComplete="off"
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              생일 (MMDD)
            </label>
            <input
              id="date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="0217"
              maxLength={4}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
              autoComplete="off"
            />
            <p
              className="mt-1 text-[11px]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              예: 0217 (2월 17일), 0209 (2월 9일)
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 active:scale-[0.98] transition-all"
          >
            카드 보기
          </button>
        </form>

        <p
          className="text-center text-[11px]"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          주소창에 직접 입력해도 돼요:{" "}
          <code className="bg-white/10 px-1.5 py-0.5 rounded">
            ?name=신우&date=0217
          </code>
        </p>

        <div className="flex justify-center pt-4">
          <div className="px-6 py-2.5 rounded-full border border-white/15 bg-white/5">
            <p className="text-[10px] text-white/70 tracking-[0.2em] uppercase">
              Daily birthday project @hbd_.365
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-950 to-violet-950 text-white">
          <p className="font-serif italic text-white/80">잠시만요...</p>
        </div>
      }
    >
      <BirthdayCardContent />
    </Suspense>
  );
}
