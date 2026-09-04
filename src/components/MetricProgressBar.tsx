/** 지표 카드 하단의 참고 범위 내 위치를 나타내는 점-트랙 바. progress는 0~1. */
export function MetricProgressBar({ progress }: { progress: number }) {
  const clamped = Math.min(1, Math.max(0, progress));
  return (
    <div className="relative h-1.5 w-full rounded-full bg-metric-track">
      <span
        className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-primary"
        style={{ left: `calc(${clamped * 100}% - ${clamped * 12}px)` }}
      />
    </div>
  );
}
