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
  /** true면 탄생석 원본 색상 유지(mix-blend-mode 미적용). 그레이/블루 등 본연 톤 노출용 */
  birthstonePreserveColor?: boolean;

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
  /** 기념일 메인 문구 (설날 등 격식 문구용) */
  anniversaryMain?: string;
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
  "02-04": {
    title: "새로운 시작의 설렘",
    event: "입춘",
    meaning: "입춘의 기운처럼 타인의 시선에 구애받지 않고 스스로 빛나는 당당한 자아로 새로움을 시작하는 날입니다.",
    colorCode: "#4C1D95",
    vibe: 93,
    flowerName: "빨간 앵초",
    flowerMeaning: "돌보지 않는 아름다움이라는 꽃말처럼, 타인의 시선에 구애받지 않고 스스로 빛나는 당당한 자아의 에너지입니다.",
    flowerImage: "/images/primrose.png",
    birthstoneName: "바이컬러 사파이어",
    birthstoneDesc:
      "결합과 조화를 상징하며, 서로 다른 두 마음이 만나 하나로 어우러지는 기적 같은 연결을 담습니다.",
    birthstoneImage: "/images/bicolor_sapphire.png",
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune: "입춘의 기운이 물병자리와 맞닿는 하루. 새로운 시작의 설렘이 생동감을 줍니다. 먼저 건넨 한마디가 좋은 인연을 부릅니다.",
    colorNameKo: "딥 바이올렛",
    colorDesc:
      "딥 바이올렛은 새로움과 순수한 시작을 상징합니다. 입춘의 기운을 닮아 마음이 밝고 경쾌해지는 색입니다.",
    energyEmoji: "🌱",
    energyGradientFrom: "from-violet-200/70",
    energyGradientTo: "to-rose-200/50",
    energyDesc:
      "입춘의 기운을 담은 '새로운 시작의 설렘'이 높은 날입니다. 겨우내 잠들었던 기운이 깨어나는 생동감을 느껴 보세요.",
    anniversaryName: "입춘",
    anniversaryDesc: "겨우내 잠들었던 기운이 깨어나는 날입니다.",
  },
  "02-05": {
    title: "예리한 직관력",
    event: "세계 초코 퐁듀의 날",
    meaning: "보이지 않는 곳에서도 묵묵히 뿌리 내리는 성실함과, 고정관념을 넘어서는 직관이 당신의 하루를 이끕니다.",
    colorCode: "#6B21A8",
    vibe: 91,
    flowerName: "양치",
    flowerMeaning: "성실이라는 꽃말처럼, 보이지 않는 곳에서도 묵묵히 뿌리 내리는 단단한 성실함의 에너지입니다.",
    flowerImage: "/images/0205_flower.png",
    birthstoneName: "플럼 플루오라이트",
    birthstoneDesc:
      "자유로운 사고를 상징하며, 고정관념에서 벗어나 창의적인 영감을 주는 보라빛 흐름을 담습니다.",
    birthstoneImage: "/images/0205_stone.png",
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune: "물병자리 기운이 직관을 밝게 하는 하루. 성실한 선택이 좋은 흐름을 만듭니다. 먼저 느낀 생각을 믿어 보세요.",
    colorNameKo: "로열 퍼플",
    colorDesc:
      "로열 퍼플은 고귀함과 직관을 상징합니다. 오늘 이 색을 떠올리면 창의적인 영감이 스며듭니다.",
    energyEmoji: "✦",
    energyGradientFrom: "from-violet-200/70",
    energyGradientTo: "to-purple-200/50",
    energyDesc:
      "예리한 직관력이 높은 날입니다. 보이지 않는 곳의 신호를 읽는 데 유리한 하루예요.",
    anniversaryName: "세계 초코 퐁듀의 날",
    anniversaryDesc: "달콤한 초코 퐁듀처럼, 오늘은 나누는 즐거움이 빛나는 날입니다.",
  },
  "02-06": {
    title: "흔들리지 않는 평온",
    event: "세계 요거트의 날",
    meaning: "척박한 환경에서도 스스로를 지켜내는 강인한 자생력과, 어둠 속에서도 별처럼 빛나는 기품이 당신의 하루를 이끕니다.",
    colorCode: "#6B7280",
    vibe: 90,
    flowerName: "바위솔",
    flowerMeaning: "가사에 근면함이라는 꽃말처럼, 척박한 환경에서도 스스로를 지켜내는 강인한 자생력과 성실함의 에너지입니다.",
    flowerImage: "/images/0206_flower.png",
    birthstoneName: "스타 그레이 사파이어",
    birthstoneDesc:
      "고결을 상징하며, 어둠 속에서도 별처럼 빛나는 중심을 잃지 않는 기품을 담습니다.",
    birthstoneImage: "/images/0206_stone.png",
    birthstonePreserveColor: true,
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune:
      "공기의 원소이자 지성과 혁신을 상징하는 물병자리의 기운이 강해지는 날입니다. 타인의 시선에 얽매이지 않고 자신만의 독창적인 세계를 구축하는 물병자리의 속성처럼, 오늘 여러분은 자유로운 영감 속에서 새로운 해답을 찾게 될 것입니다.",
    colorNameKo: "스모키 그레이",
    colorDesc:
      "스모키 그레이는 차분함과 고결함을 상징합니다. 오늘 이 색을 떠올리면 마음이 흔들리지 않는 평온으로 가득해집니다.",
    energyEmoji: "✦",
    energyGradientFrom: "from-gray-200/70",
    energyGradientTo: "to-slate-200/50",
    energyDesc:
      "흔들리지 않는 평온이 높은 날입니다. 어떤 상황에서도 중심을 잃지 않는 하루예요.",
    anniversaryName: "세계 요거트의 날",
    anniversaryDesc: "부드럽고 상큼한 요거트처럼, 오늘은 가벼운 기쁨이 찾아오는 날입니다.",
  },
  "02-07": {
    title: "진심이 닿는 우정",
    event: "친구에게 편지 쓰는 날",
    meaning: "수평적 관계와 우정을 소중히 여기는 물병자리의 속성이, 물망초의 꽃말과 칸카나이트의 이해력과 맞닿아 소중한 인연에게 진정성이 전해지는 날입니다.",
    colorCode: "#38BDF8",
    vibe: 92,
    flowerName: "물망초",
    flowerMeaning: "나를 잊지 마세요라는 꽃말처럼, 잊히지 않을 진정성을 담은 관계의 에너지입니다.",
    flowerImage: "/images/0207_flower.png",
    birthstoneName: "칸카나이트",
    birthstoneDesc:
      "이해력을 상징하며, 말과 문장이 상대의 마음속에 깊은 공명으로 남도록 돕는 기품을 담습니다.",
    birthstoneImage: "/images/0207_stone.png",
    birthstonePreserveColor: true,
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune:
      "수평적 관계와 우정을 소중히 여기는 물병자리의 속성이 가장 따뜻하게 발현되는 날입니다. 논리적이고 객관적인 물병자리의 지성이 오늘은 '진심'이라는 도구를 만나 소중한 인연에게 닿을 거예요. 물망초의 꽃말처럼 잊히지 않을 진정성을 편지에 담아보세요. 칸카나이트의 이해력이 더해져, 당신의 문장들이 친구의 마음속에 깊은 공명으로 남는 하루가 될 것입니다.",
    colorNameKo: "스카이 블루",
    colorDesc:
      "물망초를 닮은 스카이 블루는 우정과 진심을 상징합니다. 오늘 이 색을 떠올리면 소통이 따뜻해집니다.",
    energyEmoji: "✦",
    energyGradientFrom: "from-sky-200/70",
    energyGradientTo: "to-indigo-200/50",
    energyDesc:
      "우정과 진심이 운세를 밝게 하는 날입니다. 소중한 인연에게 먼저 손길을 건네는 하루예요.",
    anniversaryName: "친구에게 편지 쓰는 날",
    anniversaryDesc: "소중한 인연에게 편지로 마음을 전하는 날입니다.",
  },
  "02-08": {
    title: "웃음이 부르는 행운",
    event: "웃음의 날",
    meaning: "인도주의와 공동체를 중시하는 물병자리의 에너지가, 범의귀의 절실한 사랑과 루틸 쿼츠의 행운과 맞닿아 웃음으로 주변을 밝히는 날입니다.",
    colorCode: "#F59E0B",
    vibe: 93,
    flowerName: "범의귀",
    flowerMeaning: "절실한 사랑이라는 꽃말처럼, 웃음으로 주변을 따뜻하게 물들이는 진심의 에너지입니다.",
    flowerImage: "/images/0208_flower.png",
    birthstoneName: "루틸 쿼츠",
    birthstoneDesc:
      "행운을 상징하며, 금빛 바늘처럼 강력한 행운의 기운을 끌어당기는 힘을 담습니다.",
    birthstoneImage: "/images/0208_stone.png",
    birthstonePreserveColor: true,
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune:
      "인도주의와 공동체를 중시하는 물병자리의 에너지가 세상을 밝게 비추는 날입니다. 지적이고 쿨한 매력을 가진 물병자리가 가장 빛날 때는 바로 활짝 웃으며 긍정의 기운을 전파할 때죠. 웃으면 복이 온다는 말처럼, 오늘 여러분의 미소는 루틸 쿼츠의 금빛 바늘처럼 행운을 강력하게 끌어당길 것입니다. 범의귀의 절실한 사랑이 담긴 웃음으로 주변을 따뜻하게 물들이는 하루가 되길 바랍니다.",
    colorNameKo: "골드 앰버",
    colorDesc:
      "루틸 쿼츠를 닮은 골드 앰버는 행운과 따뜻한 긍정을 상징합니다. 오늘 이 색을 떠올리면 웃음이 번집니다.",
    energyEmoji: "✦",
    energyGradientFrom: "from-amber-200/70",
    energyGradientTo: "to-yellow-200/50",
    energyDesc:
      "웃음과 긍정이 운세를 여는 날이에요. 활짝 웃으며 주변에 행운의 기운을 나눠 보세요.",
    anniversaryName: "웃음의 날",
    anniversaryDesc: "웃으면 복이 온다는 말처럼, 오늘은 미소로 행운을 부르는 날입니다.",
  },
  "02-09": {
    title: "고요한 결단력",
    event: "나쁜 습관 덮어내기의 날",
    meaning: "객관적인 지성과 자유로운 시야를 가진 물병자리의 기운이, 체크 아이언의 결단력과 은매화의 평온한 사랑과 함께 당신의 내면을 명확하게 이끄는 날입니다.",
    colorCode: "#64748B",
    vibe: 90,
    flowerName: "은매화",
    flowerMeaning: "사랑의 속삭임이라는 꽃말처럼, 맑은 향기로 내면을 평온한 사랑으로 채워 주는 에너지입니다.",
    flowerImage: "/images/0209_flower.png",
    birthstoneName: "체크 아이언",
    birthstoneDesc:
      "결단력을 상징하며, 혼란 속에서도 흔들림 없이 명확한 방향을 제시하는 힘을 담습니다.",
    birthstoneImage: "/images/0209_stone.png",
    birthstonePreserveColor: true,
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune:
      "객관적인 지성과 자유로운 시야를 가진 물병자리의 기운이 흐르는 날입니다. 체크 아이언이 상징하는 흔들림 없는 결단력은 혼란 속에서도 명확한 방향을 제시해주며, 은매화의 맑은 향기는 당신의 내면을 평온한 사랑으로 채워줍니다. 오늘은 복잡한 생각에서 벗어나 당신을 가장 당신답게 만드는 가치들에 집중해 보세요. 그 단단하고 맑은 에너지들이 모여, 당신이 바라는 삶을 향한 고요하지만 강력한 흐름을 만들어낼 것입니다.",
    colorNameKo: "슬레이트 그레이",
    colorDesc:
      "슬레이트 그레이는 차분한 결단과 명확함을 상징합니다. 오늘 이 색을 떠올리면 방향이 선명해집니다.",
    energyEmoji: "✦",
    energyGradientFrom: "from-slate-200/70",
    energyGradientTo: "to-gray-200/50",
    energyDesc:
      "결단력과 명확한 시야가 운세를 여는 날입니다. 당신을 당신답게 만드는 가치에 집중해 보세요.",
    anniversaryName: "나쁜 습관 덮어내기의 날",
    anniversaryDesc: "나쁜 습관을 내려놓고 새로운 루틴을 시작하는 날입니다.",
  },
  "02-10": {
    title: "예리한 통찰력",
    event: "테디베어의 날",
    meaning: "지성과 인도주의를 지향하는 물병자리의 기운이, 레드 타이거 아이의 통찰력과 서향의 영광이 담긴 에너지와 맞닿는 날입니다.",
    colorCode: "#B45309",
    vibe: 91,
    flowerName: "서향",
    flowerMeaning: "영광이라는 꽃말처럼, 걸어온 길에 보이지 않는 영광의 기운을 더해 주는 에너지입니다.",
    flowerImage: "/images/0210_flower.png",
    birthstoneName: "레드 타이거 아이",
    birthstoneDesc:
      "통찰력을 상징하며, 상황의 본질을 꿰뚫어 보는 예리한 시야를 선사합니다.",
    birthstoneImage: "/images/0210_stone.png",
    birthstonePreserveColor: true,
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune:
      "똑똑하고 자유로운 생각을 가진 물병자리의 기운이 가득한 날입니다. 레드 타이거 아이가 가진 예리한 눈은 당신이 복잡한 상황 속에서도 진짜 중요한 게 무엇인지 알 수 있게 도와주고, 서향의 깊은 향기는 당신이 하는 일들에 기분 좋은 성공의 기운을 더해줍니다. 오늘은 남들의 시선보다는 당신이 진짜 원하는 것이 무엇인지 스스로에게 물어보세요. 그 솔직하고 단단한 마음이 당신의 오늘을 더욱 빛나고 확실하게 만들어줄 것입니다.",
    colorNameKo: "레드 타이거",
    colorDesc:
      "레드 타이거 아이를 닮은 색은 통찰과 단단한 신념을 상징합니다. 오늘 이 색을 떠올리면 본질이 선명해집니다.",
    energyEmoji: "✦",
    energyGradientFrom: "from-amber-200/70",
    energyGradientTo: "to-orange-200/50",
    energyDesc:
      "통찰력과 내면의 목소리가 운세를 여는 날입니다. 고요한 관찰에 귀 기울여 보세요.",
    anniversaryName: "테디베어의 날",
    anniversaryDesc: "소중한 사람에게 따뜻한 마음을 전하는 날입니다.",
  },
  "02-17": {
    title: "예리한 통찰력",
    event: "설날",
    meaning: "설날의 기운과 블루 오팔의 지적 기운이 맞닿아 새로운 한 해를 여는 날입니다.",
    colorCode: "#5DADE2",
    vibe: 93,
    flowerName: "야생화 (Wild Flower)",
    flowerMeaning: "친숙함. 편안함과 신뢰를 주는 에너지입니다.",
    flowerImage: "/images/0217_flower.png",
    birthstoneName: "블루 오팔 (Blue Opal)",
    birthstoneDesc: "지성과 직관을 상징하며, 학구적인 야심과 지적 성장을 돕습니다.",
    birthstoneImage: "/images/0217_stone.png",
    birthstonePreserveColor: true,
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune:
      "오늘은 물병자리에게 특히 빛나는 날입니다. 아침부터 머릿속이 맑고 창의적인 아이디어가 자연스럽게 떠오를 수 있으니, 생각이 스치면 메모해 두시면 좋습니다. 설날의 기운이 더해져 가족이나 가까운 분들과 보내는 시간이 뜻깊게 이어질 가능성이 큽니다. 대인관계에서는 먼저 관심을 보이는 한마디나 작은 배려가 좋은 흐름을 만들 수 있으니, 부담 없이 마음을 전해 보시기 바랍니다. 오후에는 하고 싶었던 일을 하나 정해 조금씩이라도 시작해 보시면, 그동안 미뤄 두었던 일에 탄력이 붙는 느낌을 받으실 수 있습니다. 금전·결정보다는 사람과의 소통과 계획을 세우는 데 에너지를 쓰시면 유리합니다. 오늘의 행운의 조언은, '새해 첫 목표를 구체적으로 한 가지만 정해 보는 것'입니다. 블루 오팔의 지적인 기운이 당신의 통찰을 밝혀 주는 하루이니, 스스로를 믿고 나아가시길 바랍니다.",
    colorNameKo: "블루 오팔",
    energyEmoji: "✦",
    energyDesc: "통찰력이 높은 날입니다. 한 가지 목표에 집중해 보세요.",
    anniversaryName: "설날",
    anniversaryMain: "오늘은 민족 대명절 설날입니다. 새해 복 많이 받으세요!",
    anniversaryDesc: "설날의 따뜻한 기운이 당신을 감싸는 날입니다.",
  },
  "02-21": {
    title: "차분한 소통",
    event: "카드 읽기의 날",
    meaning: "소중한 마음이 담긴 카드를 읽으며 서로의 진심을 확인하는 날입니다.",
    colorCode: "#0EA5E9",
    vibe: 90,
    flowerName: "네모필라",
    flowerMeaning: "꽃말은 애국심, 가련한 마음입니다. 작지만 단단한 내면의 힘을 기를 수 있는 오늘의 에너지를 담고 있습니다.",
    flowerImage: "/images/0221_flower.png",
    birthstoneName: "블루 레이스 애거트",
    birthstoneDesc: "신뢰와 평온을 상징합니다. 마음의 안정을 찾고 솔직한 대화를 이끌어 내는 에너지를 선사합니다.",
    birthstoneImage: "/images/0221_stone.png",
    birthstonePreserveColor: true,
    zodiacName: "물고기자리",
    zodiacDetail: "공감과 직관",
    zodiacImage: "/images/pisces.png",
    fortune:
      "오늘부터 시작되는 물고기자리 시즌을 진심으로 축하합니다. 물고기자리 특유의 따뜻한 공감 능력과 예리한 직관이 오늘 하루 빛을 발할 수 있는 날입니다. 감정을 잘 읽고 상대의 마음에 공감하는 당신의 힘이 주변을 편안하게 만들 것입니다. 새로운 계절의 시작과 함께 마음속 소원을 하나 정해 보시거나, 가까운 이와 차분히 이야기 나누는 시간을 갖어 보시기 바랍니다. 직관이 밝은 오늘, 먼저 느껴진 생각을 믿어 보시면 좋은 흐름이 이어질 수 있습니다.",
    colorNameKo: "sky blue",
    energyEmoji: "✦",
    energyDesc: "차분한 말 한마디가 관계를 더욱 돈독하게 만드는 날입니다.",
    anniversaryName: "카드 읽기의 날",
    anniversaryMain: "오늘은 소중한 마음이 담긴 카드를 천천히 읽으며 서로의 진심을 확인하는 날입니다.",
    anniversaryDesc: "당신을 향한 따뜻한 문장들이 오늘 하루의 큰 힘이 되어 줄 거예요.",
  },
  "02-22": {
    title: "내면의 평화",
    event: "겸손의 날",
    meaning: "화려한 드러냄보다 내면의 빛에 집중하는 날입니다.",
    colorCode: "#0EA5E9",
    vibe: 88,
    flowerName: "무궁화 (Rose of Sharon)",
    flowerMeaning: "꽃말은 끈기와 섬세한 아름다움입니다. 은은하게 오래 빛나는 에너지를 담고 있습니다.",
    flowerImage: "/images/0222_flower.png",
    birthstoneName: "묘안석 (Cat's Eye)",
    birthstoneDesc: "조용한 야망을 상징합니다. 겉으로 드러내지 않아도 내실을 다지는 오늘의 기운이 당신 곁에 있습니다.",
    birthstoneImage: "/images/0222_stone.png",
    birthstonePreserveColor: true,
    zodiacName: "물고기자리",
    zodiacDetail: "공감과 직관",
    zodiacImage: "/images/pisces.png",
    fortune:
      "오늘은 물고기자리의 감수성과 직관이 특히 잘 드러나는 날입니다. 남의 기분을 읽는 능력이 높아져, 대인관계에서 적절한 말과 배려를 선택하기 쉬운 때입니다. 직관이 스치는 순간을 믿어 보시고, 하고 싶은 말이 있다면 차분히 전해 보시기 바랍니다. 감정의 파도가 있을 수 있으니, 혼자만의 시간을 잠깐 갖는 것도 도움이 됩니다. 가까운 이에게 먼저 손길을 내미는 하루가 되시길 바랍니다.",
    colorNameKo: "sky blue",
    energyEmoji: "✦",
    energyDesc: "마음이 고요해지는 순간이 오늘의 행운입니다. 한가하게 숨 고르는 시간을 가져 보세요.",
    anniversaryName: "겸손의 날",
    anniversaryMain: "진정 아름다운 것은 관심을 끌기 위해 애쓰지 않습니다.",
    anniversaryDesc: "화려한 드러냄보다 내면의 빛에 집중하고, 곁에 있는 소중한 것들을 만끽하는 태도가 진정한 아름다움임을 축복하는 날입니다.",
  },
  "02-12": {
    title: "포용과 보호의 기운",
    event: "포옹의 날",
    meaning: "지성과 포용력을 갖춘 물병자리의 따뜻한 기운이 흐르는 날입니다. 당신의 존재만으로도 주변에 위로가 됩니다.",
    colorCode: "#FDE68A",
    vibe: 92,
    flowerName: "쥐꼬리망초",
    flowerMeaning: "가련함 (보호하고 싶은 순수함)",
    flowerImage: "/images/0212_flower.png",
    birthstoneName: "옐로 자스퍼",
    birthstoneDesc: "보호를 상징하며, 소중한 사람들을 든든하게 지켜주는 수호석입니다.",
    birthstoneImage: "/images/0212_stone.png",
    birthstonePreserveColor: true,
    zodiacName: "물병자리",
    zodiacDetail: "자유로운 영혼",
    zodiacImage: "/images/aquarius.png",
    fortune:
      "지성과 포용력이 함께 흐르는 날입니다. 옐로 자스퍼의 보호가, 쥐꼬리망초의 순수함이 당신 곁에 있습니다. 가까운 이에게 따뜻한 포옹을 건네보세요.",
    colorNameKo: "앰버 옐로",
    colorDesc: "따뜻한 노란빛은 보호와 위로를 상징합니다. 오늘 이 색을 떠올리면 마음이 평온해집니다.",
    energyEmoji: "✦",
    energyGradientFrom: "from-amber-200/70",
    energyGradientTo: "to-yellow-200/50",
    energyDesc: "따뜻한 포옹이 주변을 감싸는 날입니다. 당신의 존재만으로도 큰 위로가 됩니다.",
    anniversaryName: "포옹의 날",
    anniversaryDesc: "가까운 이들에게 포옹을 나누며 마음을 전하는 날입니다.",
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
