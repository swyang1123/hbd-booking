import { redirect } from "next/navigation";

/**
 * 루트(/) 접속 시 오늘 날짜 기준 생일 카드 페이지로 바로 이동.
 * 검색창 없이 생일 카드 결과 페이지가 첫 화면으로 보이도록 함.
 */
export default function Home() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayParam = `${month}${day}`;

  redirect(`/surprise?date=${todayParam}&name=${encodeURIComponent("친구")}`);
}
