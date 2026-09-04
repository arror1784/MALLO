import { useState } from "react";
import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import shieldIcon from "@/assets/icons/shield.svg";
import { CheckRow } from "@/components/CheckRow";

const PROMISES = [
  "음성 원본은 분석 후 30일 뒤 자동 삭제돼요",
  "전사 · 분석 결과는 24개월 뒤 자동 삭제돼요",
  "리포트 공유 시 아이 이름 · 전사 원문은 기본 제외돼요",
];

/** Figma node 1:164 "약관 동의" — 첫 녹음 전 데이터 처리 동의 */
export function Consent() {
  const navigate = useNavigate();
  const [agreeRecording, setAgreeRecording] = useState(false);
  const [agreeAnalysis, setAgreeAnalysis] = useState(false);
  const [agreeImprovement, setAgreeImprovement] = useState(false);
  const [agreeNews, setAgreeNews] = useState(false);

  const canSubmit = agreeRecording && agreeAnalysis;

  return (
    <div className="flex h-full w-full flex-col bg-bg px-6 pt-8" data-node-id="1:164">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="-ml-2 flex size-10 items-center justify-center rounded-full"
      >
        <img src={backIcon} alt="" className="size-[21px]" />
      </button>

      <div className="pt-7">
        <h1 className="text-2xl font-bold leading-[36px] tracking-[-0.72px] text-text-primary">
          녹음 전에,
          <br />
          약속 하나 할게요
        </h1>
        <p className="mt-2 text-sm leading-[21px] text-text-body">하늘이의 이야기는 안전하게 다룰게요.</p>
      </div>

      <div className="mt-5 rounded-2xl bg-surface-dark p-5">
        <div className="flex items-center gap-2">
          <img src={shieldIcon} alt="" className="size-[15px]" />
          <span className="text-[13px] leading-[19.5px] font-semibold text-primary">말로의 데이터 약속</span>
        </div>
        <ul className="mt-4">
          {PROMISES.map((text, i) => (
            <li
              key={text}
              className={`flex gap-2 py-3 text-xs leading-[20px] text-white ${
                i > 0 ? "border-t border-white/15" : ""
              }`}
            >
              <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-col">
        <CheckRow checked={agreeRecording} onChange={setAgreeRecording} label="음성 녹음 수집 · 처리" required />
        <CheckRow checked={agreeAnalysis} onChange={setAgreeAnalysis} label="STT 전사 · AI 분석" required />
        <div className="my-2 h-px bg-border" />
        <CheckRow checked={agreeImprovement} onChange={setAgreeImprovement} label="익명화 데이터 서비스 개선 활용" />
        <CheckRow checked={agreeNews} onChange={setAgreeNews} label="코칭 콘텐츠 소식 수신" />
      </div>

      <div className="flex flex-1 flex-col justify-end pb-7">
        <p className="text-center text-xs leading-[18px] text-text-subtle">
          선택 동의는 하지 않아도 모든 기본 기능을 쓸 수 있어요.
        </p>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => navigate("/home")}
          className="mt-3 flex h-[52px] w-full items-center justify-center rounded-[20px] bg-primary text-[15px] leading-[22.5px] font-semibold text-text-primary shadow-[0_6px_8px_rgba(255,161,2,0.18)] disabled:opacity-45"
        >
          동의하고 녹음 시작하기
        </button>
      </div>
    </div>
  );
}
