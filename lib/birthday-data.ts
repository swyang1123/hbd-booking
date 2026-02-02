// 날짜별 데이터 타입 (확장 구조) — 메인·서프라이즈 페이지 공유
export type BirthdayEntry = {
  title: string;
  event: string;
  meaning: string;
  vibe: number;

  flowerName: string;
  /** 꽃말 또는 의미 설명 (예: 나를 생각해 주세요) */
  flowerMeaning?: string;
  flowerImage?: string;

  birthstoneName?: string;
  birthstoneDetail?: string;
  birthstoneDesc?: string;
  birthstoneImage?: string;

  zodiacName?: string;
  zodiacDetail?: string;
  /** 별자리 상징 이미지 경로 — public/images/aquarius.png → /images/aquarius.png (소문자) */
  zodiacImage?: string;
  fortune?: string;

  colorNameKo: string;
  colorCode: string;
  colorDesc?: string;

  energyEmoji?: string;
  energyGradientFrom?: string;
  energyGradientTo?: string;
  energyDesc?: string;

  /** 오늘의 기념일 (예: 골든리트리버의 날) */
  anniversaryName?: string;
  anniversaryDesc?: string;
};

export const birthdayDatabase: Record<string, BirthdayEntry> = {
  "02-01": {
    title: "새로운 시작의 에너지",
    event: "새해 결심 격려의 날",
    meaning: "2월의 첫 페이지를 장식하는 당신은 다시 시작할 용기를 주는 원동력입니다.",
    colorCode: "#E0F2FE",
    vibe: 95,
    flowerName: "앵초",
    flowerMeaning: "행복의 열쇠처럼, 당신이 있는 곳에 새로운 시작이 피어납니다.",
    flowerImage: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&q=85",
    birthstoneName: "자수정",
    birthstoneDesc:
      "마음의 평화와 고귀함을 상징하며, 당신의 내면을 단단하게 지켜주는 수호석입니다.",
    birthstoneImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=85",
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune:
      "새로운 달의 시작과 함께 멈췄던 운의 흐름이 다시 트이는 날입니다. 물병자리의 자유로운 기운이 생각의 틀을 넓혀 주어, 오래 미뤄 둔 계획을 다시 세우기 좋은 타이밍입니다.",
    colorNameKo: "스카이 블루",
    colorDesc:
      "맑은 겨울 하늘을 닮은 스카이 블루는 복잡한 생각을 정리해 줍니다. 집중력과 평온함을 높여 주어 창작·공부처럼 머리를 쓰는 일에 특히 잘 어울립니다.",
    energyEmoji: "♻️",
    energyGradientFrom: "from-sky-200/60",
    energyGradientTo: "to-rose-200/60",
    energyDesc:
      "무너진 계획을 다시 세우는 '회복의 에너지'가 가장 강한 날입니다. 작은 것부터 하나씩 시작하면 흐름이 자연스럽게 되살아납니다.",
    anniversaryName: "새해 결심 격려의 날",
    anniversaryDesc: "새 달의 첫날, 다시 시작할 용기를 나누는 날입니다.",
  },
  "02-02": {
    title: "맑고 강한 생명력",
    event: "세계 습지의 날",
    meaning: "지구를 정화하는 습지처럼 주변의 갈등을 치유하고 편안함을 주는 존재입니다.",
    colorCode: "#DCFCE7",
    vibe: 88,
    flowerName: "모과",
    flowerMeaning: "평범한 사랑이 주는 따뜻함처럼, 당신 주변을 포근하게 감싸 줍니다.",
    flowerImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=85",
    birthstoneName: "자수정",
    birthstoneDesc:
      "마음의 평화와 고귀함을 상징하며, 당신의 내면을 단단하게 지켜주는 수호석입니다.",
    birthstoneImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=85",
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune: "물병자리의 영향 아래, 독창적인 아이디어가 떠오르기 쉬운 날입니다. 고정관념을 깨는 한 마디가 분위기를 바꿉니다.",
    colorNameKo: "포레스트 그린",
    colorDesc: "숲의 녹색은 피로를 풀어 주고 마음을 정화하는 힘이 있습니다. 자연과 가까이 할수록 컨디션이 안정됩니다.",
    energyEmoji: "🌿",
    energyGradientFrom: "from-emerald-200/60",
    energyGradientTo: "to-sky-200/40",
    energyDesc: "주변을 치유하고 포용하는 '포용의 에너지'가 강한 날입니다. 말보다 태도가 힘이 되는 날이에요.",
    anniversaryName: "세계 습지의 날",
    anniversaryDesc: "지구의 숨통인 습지를 돌아보고, 자연과 함께 숨 쉬는 날입니다.",
  },
  "02-03": {
    title: "따스한 보살핌의 손길",
    event: "사료 한 그릇의 날",
    meaning: "작은 생명까지 소중히 여기는 당신의 따뜻함이 세상을 더 살만하게 만듭니다.",
    colorCode: "#FFDAB9",
    vibe: 92,
    flowerName: "황새냉이",
    flowerMeaning: "그대에게 바치는 승리라는 꽃말처럼, 당신의 모든 걸음을 응원하는 순수한 에너지입니다.",
    flowerImage: "/images/cardamine.png",
    birthstoneName: "자수정",
    birthstoneDesc:
      "마음의 평화와 고귀함을 상징하며, 당신의 내면을 단단하게 지켜주는 수호석입니다.",
    birthstoneImage: "/images/amethyst.png",
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune: "물병자리 기운이 이끄는 하루. 소통과 나눔이 운세를 밝게 합니다. 먼저 건넨 관심이 좋은 인연을 부릅니다.",
    colorNameKo: "크림 오렌지",
    colorDesc: "따뜻한 크림 오렌지는 위로와 희망을 전합니다. 오늘 이 색을 떠올리면 마음이 부드러워집니다.",
    energyEmoji: "🫶",
    energyGradientFrom: "from-orange-200/70",
    energyGradientTo: "to-rose-200/50",
    energyDesc: "작은 생명을 돌보는 '보살핌의 에너지'가 높은 날입니다. 나를 돌보는 루틴도 함께 챙겨 보세요.",
    anniversaryName: "골든리트리버의 날",
    anniversaryDesc: "충성스럽고 따뜻한 골든리트리버처럼, 오늘은 사랑받고 사랑 주는 날입니다.",
  },
};

/** URL date 파라미터(MMDD)를 DB 키(MM-DD)로 변환 */
export function dateParamToKey(param: string | null): string | null {
  if (!param || param.length < 3) return null;
  const cleaned = param.replace(/\D/g, "");
  if (cleaned.length < 4) return null;
  const month = cleaned.slice(0, 2);
  const day = cleaned.slice(2, 4);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  return `${month}-${day}`;
}
