/**
 * 아직 구현되지 않은 화면의 자리표시자. "완료"를 위장하지 않도록 라벨을
 * 명확히 노출한다 — screens.ts의 implemented: false 항목이 이걸 렌더한다.
 */
export function ComingSoon({ label, figmaNodeId }: { label: string; figmaNodeId: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-bg px-6 text-center">
      <p className="text-sm font-semibold text-text-subtle">구현 예정</p>
      <p className="text-lg font-bold text-text-primary">{label}</p>
      <p className="text-xs text-text-subtle">Figma node {figmaNodeId}</p>
    </div>
  );
}
