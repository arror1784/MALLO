export interface SessionMetric {
  id: string;
  label: string;
  value: string;
  refLabel: string;
  progress: number;
}

export const sessionMetrics: SessionMetric[] = [
  { id: "utterances", label: "발화량", value: "127회", refLabel: "참고 100~160", progress: 0.72 },
  { id: "open-questions", label: "열린 질문", value: "34%", refLabel: "참고 25~45%", progress: 0.58 },
  { id: "vocabulary", label: "어휘 다양도", value: "보통", refLabel: "참고 범위 안", progress: 0.55 },
];

export const sessionOpportunities = [
  "아이가 스스로 생각을 말할 질문을 하나 늘려보세요.",
  "하늘이가 대답할 때까지 한 박자 더 기다려보세요.",
  "아이의 말을 한 문장 더 길게 되돌려 말해보세요.",
];

/** "최근 4주 발화량" 미니 차트 더미 값(회). */
export const fourWeekUtterances = [92, 105, 112, 127];
