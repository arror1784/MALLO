export interface MetricDetail {
  id: string;
  label: string;
  value: string;
  refRangeLabel: string;
  deltaLabel: string;
  description: string;
  refTable: { ageRange: string; range: string }[];
}

export const metricDetails: MetricDetail[] = [
  {
    id: "open-questions",
    label: "열린 질문",
    value: "42%",
    refRangeLabel: "월령 참고 범위 35~55%",
    deltaLabel: "+6% ↑",
    description: "“왜?”, “어떻게 생각해?”처럼 아이가 자유롭게 대답하는 질문이에요.",
    refTable: [
      { ageRange: "24~30개월", range: "25~45%" },
      { ageRange: "31~36개월", range: "35~55%" },
      { ageRange: "37~48개월", range: "40~60%" },
    ],
  },
  {
    id: "utterances",
    label: "발화량",
    value: "127회",
    refRangeLabel: "월령 참고 범위 100~160회",
    deltaLabel: "+12회 ↑",
    description: "10분 대화 동안 부모가 아이에게 건넨 발화 총 횟수예요.",
    refTable: [
      { ageRange: "24~30개월", range: "80~140회" },
      { ageRange: "31~36개월", range: "100~160회" },
      { ageRange: "37~48개월", range: "120~180회" },
    ],
  },
  {
    id: "vocabulary",
    label: "어휘 다양도",
    value: "보통",
    refRangeLabel: "월령 참고 범위 안",
    deltaLabel: "유지",
    description: "같은 뜻이라도 다양한 단어로 표현했는지를 보여주는 지표예요.",
    refTable: [
      { ageRange: "24~30개월", range: "낮음~보통" },
      { ageRange: "31~36개월", range: "보통~높음" },
      { ageRange: "37~48개월", range: "보통~높음" },
    ],
  },
  {
    id: "emotion",
    label: "감정 반응",
    value: "18회",
    refRangeLabel: "월령 참고 범위 15~30회",
    deltaLabel: "+3회 ↑",
    description: "아이의 감정에 이름을 붙이거나 반영해 준 반응의 횟수예요.",
    refTable: [
      { ageRange: "24~30개월", range: "10~20회" },
      { ageRange: "31~36개월", range: "15~30회" },
      { ageRange: "37~48개월", range: "18~32회" },
    ],
  },
];
