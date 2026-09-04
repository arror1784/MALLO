import { Link } from "react-router";
import arrowRightIcon from "@/assets/icons/arrow-right.svg";

/** Figma node 1:9 "첫화면" */
export function Onboarding() {
  return (
    <div className="flex h-full w-full flex-col bg-surface" data-node-id="1:9">
      <div className="relative h-[340px] shrink-0 overflow-hidden rounded-b-[30px] bg-surface-cream">
        <div className="absolute left-6 top-10 flex items-center">
          <span className="font-['Pretendard'] text-[27px] leading-[27px] font-black tracking-[-1.2px] text-text-primary">
            MALL
          </span>
          <span className="ml-px flex size-[23px] items-center justify-center rounded-full bg-primary text-[14px] leading-[21px] font-black tracking-[-1.2px] text-text-primary">
            O
          </span>
        </div>

        <div className="absolute left-[96px] top-[93px] flex w-[200px] items-end gap-4">
          <div className="relative flex h-[151px] w-[104px] flex-col items-center justify-end rounded-t-[52px] bg-surface-dark">
            <span className="pb-5 text-[40px] leading-[60px]">👩🏻</span>
          </div>
          <div className="flex h-[103px] w-20 flex-col items-center justify-end rounded-t-[38px] bg-primary pb-1">
            <span className="pb-3 text-[34px] leading-[51px]">🧒🏻</span>
          </div>
          <div className="absolute left-[-28px] top-3 whitespace-nowrap rounded-2xl rounded-bl-xl bg-white px-3 py-2 text-[17px] leading-[25.5px] font-bold text-text-link shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
            오늘은?
          </div>
          <div className="absolute left-[145px] top-11 whitespace-nowrap rounded-2xl rounded-br-xl bg-surface-dark px-3 py-2 text-base text-text-inverse shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
            재밌었어!
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-7">
        <h1 className="text-[25px] leading-[31.25px] font-bold tracking-[-0.625px] text-text-primary">
          아이는 말로 자랍니다
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-text-muted">
          하루 10분 대화 녹음으로,
          <br />
          우리 집 대화 습관을 비춰드려요.
        </p>

        <div className="mt-6 rounded-2xl border-[0.5px] border-border bg-surface p-4 shadow-[0_4px_7px_rgba(50,31,0,0.04)]">
          <p className="text-[23px] leading-[34.5px]">🎙</p>
          <p className="mt-2 text-[15px] leading-[22.5px] font-semibold text-text-primary">대화를 들려주세요</p>
          <p className="mt-1 text-[13px] leading-[19.5px] text-text-subtle">발화량 · 어휘 · 질문을 분석해요</p>
        </div>

        <div className="mt-3 flex justify-center gap-1.5">
          <span className="h-1.5 w-5 rounded-full bg-primary" aria-hidden />
          <span className="size-1.5 rounded-full bg-border-strong" aria-hidden />
          <span className="size-1.5 rounded-full bg-border-strong" aria-hidden />
        </div>

        <div className="flex flex-1 flex-col justify-end pb-8 pt-4">
          <Link
            to="/signup"
            className="flex h-[52px] w-full items-center justify-center gap-1.5 rounded-[20px] bg-primary text-[15px] leading-[22.5px] font-semibold text-text-primary shadow-[0_6px_8px_rgba(255,161,2,0.18)]"
          >
            말로 시작하기
            <img src={arrowRightIcon} alt="" className="size-[17px]" />
          </Link>
          <Link
            to="/home"
            className="mt-3 text-center text-sm leading-[21px] font-medium text-text-link"
          >
            이미 계정이 있어요
          </Link>
          <p className="mt-4 text-center text-[11px] leading-4 text-text-subtle">
            분석 결과는 진단이 아닌, 대화를 돌아보기 위한
            <br />
            참고 정보예요.
          </p>
        </div>
      </div>
    </div>
  );
}
