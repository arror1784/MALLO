/** 회원가입/약관 동의 화면에서 반복되는 체크박스 + 라벨 + "전체보기" 행. */
export function CheckRow({
  checked,
  onChange,
  label,
  required,
  onViewAll,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  required?: boolean;
  onViewAll?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`size-5 shrink-0 rounded-[7px] border-[0.5px] ${
          checked ? "border-primary bg-primary" : "border-checkbox-border bg-white"
        }`}
      />
      <span className="flex-1 text-sm font-medium text-text-primary">
        {label} {required && <span className="text-text-link">(필수)</span>}
      </span>
      <button
        type="button"
        onClick={onViewAll}
        className="text-xs font-medium text-text-subtle underline"
      >
        전체보기
      </button>
    </div>
  );
}
