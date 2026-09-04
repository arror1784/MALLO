import { useState } from "react";
import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import imageExportIcon from "@/assets/icons/image-export.svg";
import pdfExportIcon from "@/assets/icons/pdf-export.svg";
import shareIcon from "@/assets/icons/share2.svg";

type ContentType = "summary" | "detailed";
type Format = "image" | "pdf" | "share";

const FORMATS: { id: Format; icon: string; label: string }[] = [
  { id: "image", icon: imageExportIcon, label: "이미지 저장" },
  { id: "pdf", icon: pdfExportIcon, label: "PDF 저장" },
  { id: "share", icon: shareIcon, label: "공유하기" },
];

/** Figma node 1:1295 "ExportReport" */
export function ReportExport() {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState<ContentType>("summary");
  const [format, setFormat] = useState<Format | null>(null);

  return (
    <div className="flex h-full w-full flex-col bg-bg px-5 pt-8" data-node-id="1:1295">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="-ml-2 flex size-10 items-center justify-center rounded-full"
      >
        <img src={backIcon} alt="" className="size-[21px]" />
      </button>

      <h1 className="mt-5 text-[23px] font-bold text-text-primary">리포트 내보내기</h1>
      <p className="mt-2 text-[13px] text-text-body">공유 전에 포함되는 정보를 확인해 보세요.</p>

      <button
        type="button"
        role="radio"
        aria-checked={contentType === "summary"}
        onClick={() => setContentType("summary")}
        className={`mt-4 flex items-start gap-3 rounded-2xl border-[0.5px] p-4 text-left ${
          contentType === "summary" ? "border-primary bg-selected-card-bg" : "border-border bg-surface"
        }`}
      >
        <span
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-[0.5px] ${
            contentType === "summary" ? "border-primary" : "border-radio-border"
          }`}
        >
          {contentType === "summary" && <span className="size-2.5 rounded-full bg-primary" />}
        </span>
        <div>
          <p className="text-[15px] font-semibold text-text-primary">기본 요약본 (권장)</p>
          <p className="mt-1 text-xs text-text-body">기간 · 핵심 변화 · 개선 포인트</p>
          <p className="mt-3 text-[11px] text-report-good">✓ 포함: 핵심 변화 · 개선 포인트</p>
          <p className="text-[11px] text-text-subtle">— 제외: 전사 원문 · 아이 이름 · 날짜 태그</p>
        </div>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={contentType === "detailed"}
        onClick={() => setContentType("detailed")}
        className={`mt-4 flex items-start gap-3 rounded-2xl border-[0.5px] p-4 text-left ${
          contentType === "detailed" ? "border-primary bg-selected-card-bg" : "border-border bg-surface"
        }`}
      >
        <span
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-[0.5px] ${
            contentType === "detailed" ? "border-primary" : "border-radio-border"
          }`}
        >
          {contentType === "detailed" && <span className="size-2.5 rounded-full bg-primary" />}
        </span>
        <div>
          <p className="text-[15px] font-semibold text-text-primary">상세 포함본</p>
          <p className="mt-1 text-xs text-text-body">세부 수치와 날짜가 추가돼요</p>
        </div>
      </button>

      <h2 className="mt-6 text-[15px] font-semibold text-text-primary">형식 선택</h2>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={format === f.id}
            onClick={() => setFormat(f.id)}
            className={`flex flex-col items-center gap-2 rounded-[20px] border-[0.5px] py-[18px] ${
              format === f.id ? "border-primary bg-selected-card-bg" : "border-border bg-surface"
            }`}
          >
            <img src={f.icon} alt="" className="size-[19px]" />
            <span className="text-[11px] font-medium text-text-primary">{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
