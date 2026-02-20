"use client";

import React, { useState } from "react";

/**
 * 루트 페이지: 이름과 생일을 입력받아 /surprise?name=&date= 로 넘겨주는 입력 폼만 제공.
 * 2월 9일 버전의 생일 카드 웹 플로우 (입력 → 카드 결과).
 */
export default function Home() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("0217");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim() || "친구";
    const d = date.replace(/\D/g, "").padStart(4, "0").slice(0, 4) || "0217";
    const params = new URLSearchParams({ name: n, date: d });
    window.location.href = `/surprise?${params.toString()}`;
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
            이름과 생일을 입력하면 맞춤 생일 카드가 만들어집니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <div className="flex justify-center pt-4">
          <div className="px-6 py-2.5 rounded-full border border-white/15 bg-white/5">
            <p
              className="text-[10px] text-white/70 tracking-[0.2em] uppercase"
            >
              Daily birthday project @hbd_.365
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
