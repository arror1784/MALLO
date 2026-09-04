export interface Situation {
  id: string;
  emoji: string;
  label: string;
}

export const situations: Situation[] = [
  { id: "meal", emoji: "🍽", label: "식사" },
  { id: "play", emoji: "🧸", label: "놀이" },
  { id: "bedtime", emoji: "🌙", label: "잠자리" },
  { id: "daycare", emoji: "🎒", label: "등원" },
];
