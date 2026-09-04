/** 데이터 배열로부터 그리는 작은 추이 라인 차트. 정적 아이콘이 아니라 실제 값을 반영한다. */
export function Sparkline({ values, height = 72 }: { values: number[]; height?: number }) {
  const width = 320;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);

  const points = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 12) - 6;
    return [x, y] as const;
  });

  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-[72px] w-full" preserveAspectRatio="none">
      <path d={path} fill="none" stroke="var(--color-primary)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 4 : 3} fill="var(--color-primary)" />
      ))}
    </svg>
  );
}
