import { useNavigate } from "react-router";
import { TabScreenLayout } from "@/components/TabScreenLayout";
import chevronDownIcon from "@/assets/icons/chevron-down.svg";
import micDarkIcon from "@/assets/icons/mic-dark.svg";
import arrowRightWhiteIcon from "@/assets/icons/arrow-right-white.svg";
import chevronRightIcon from "@/assets/icons/chevron-right.svg";
import sparkleIcon from "@/assets/icons/sparkle.svg";
import infoIcon from "@/assets/icons/info.svg";
import { currentChild } from "@/data/child";
import { latestReportSummary } from "@/data/reportSummary";
import { recentRecordings } from "@/data/recordings";

/** Figma node 1:257 "메인화면" / HomeScreen */
export function Home() {
  const navigate = useNavigate();

  return (
    <TabScreenLayout>
      <div className="px-5 pb-8 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl leading-[30px] font-bold tracking-[-0.5px] text-text-primary">안녕하세요 👋</p>
            <p className="mt-0.5 text-[13px] leading-[19.5px] text-text-subtle">
              오늘도 {currentChild.name}이와 좋은 대화 나눠볼까요?
            </p>
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1 rounded-full border-[0.5px] border-border bg-surface px-3 py-2"
          >
            <span className="text-xs leading-[18px] font-semibold text-text-primary">
              {currentChild.name} · {currentChild.ageMonths}개월
            </span>
            <img src={chevronDownIcon} alt="" className="size-[14px]" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/record/prepare")}
          className="relative mt-5 block w-full overflow-hidden rounded-2xl p-5 text-left shadow-[0_9px_22px_rgba(255,161,2,0.22)]"
          style={{
            backgroundImage:
              "linear-gradient(146deg, var(--color-primary), var(--color-primary-light))",
          }}
        >
          <div
            className="absolute -top-6 right-[-16px] size-28 rounded-full border-[17px] border-white/20"
            aria-hidden
          />
          <div className="flex size-10 items-center justify-center rounded-[20px] bg-surface-dark">
            <img src={micDarkIcon} alt="" className="size-5" />
          </div>
          <p className="mt-4 text-[21px] font-bold leading-[1.28] text-text-primary">
            오늘의 대화,
            <br />
            들려주세요
          </p>
          <p className="mt-1 text-[13px] leading-[19.5px] text-[#654000]">10분이면 충분해요</p>
          <div className="mt-4 flex h-11 items-center justify-center gap-1 rounded-[20px] bg-surface-dark">
            <span className="text-sm leading-[21px] font-semibold text-text-inverse">녹음 시작하기</span>
            <img src={arrowRightWhiteIcon} alt="" className="size-4" />
          </div>
        </button>

        <section className="mt-4 rounded-2xl border-[0.5px] border-border bg-surface p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-semibold text-text-primary">최신 리포트</p>
              <p className="mt-1 text-xs leading-[18px] text-text-subtle">
                {latestReportSummary.dateLabel} · 분석 완료 ·{" "}
                <span className="text-report-good">{latestReportSummary.confidenceLabel}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/report")}
              className="flex items-center text-[13px] leading-[19.5px] font-semibold text-text-link"
            >
              보기
              <img src={chevronRightIcon} alt="" className="size-[15px]" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-3 rounded-[20px] bg-surface-cream py-[10px]">
            {latestReportSummary.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center ${i < 2 ? "border-r border-border" : ""}`}
              >
                <p
                  className={`text-[15px] leading-[22.5px] font-bold ${
                    i === 2 ? "text-text-link" : "text-text-primary"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[10px] leading-[15px] text-text-subtle">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-2xl bg-tip-card-bg p-4">
          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
              <img src={sparkleIcon} alt="" className="size-[17px]" />
            </div>
            <div>
              <p className="text-[15px] leading-[22.5px] font-semibold text-text-primary">오늘의 한마디</p>
              <p className="mt-1 text-[13px] leading-5 text-tip-card-text">
                {latestReportSummary.todayTip}
              </p>
              <button
                type="button"
                onClick={() => navigate("/coaching")}
                className="mt-2 text-xs leading-[18px] font-semibold text-text-link"
              >
                미션 보기 →
              </button>
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-2xl border-[0.5px] border-border bg-surface px-4 py-3">
          <p className="text-sm leading-[21px] font-semibold text-text-primary">최근 녹음</p>
          <ul>
            {recentRecordings.map((rec) => (
              <li
                key={rec.id}
                className="flex items-center justify-between border-t-[0.5px] border-border py-[10px] first:border-t-0"
              >
                <span className="text-[13px] leading-[19.5px] text-text-primary">{rec.label}</span>
                <span
                  className={`rounded-full px-2 py-1 text-[11px] leading-[16.5px] font-semibold ${
                    rec.status === "analyzing"
                      ? "bg-surface-cream text-text-link"
                      : "bg-status-done-bg text-report-good"
                  }`}
                >
                  {rec.status === "analyzing" ? "분석 중" : "완료"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-3 flex items-center gap-3 rounded-[20px] bg-surface-cream px-4 py-3">
          <img src={infoIcon} alt="" className="size-4" />
          <p className="flex-1 text-xs leading-[18px] text-tip-card-text">
            오늘 분석 1회 남았어요 · 내일 0시에 다시 채워져요
          </p>
          <button type="button" className="text-xs leading-[18px] font-semibold text-text-link">
            더 자유롭게
          </button>
        </div>
      </div>
    </TabScreenLayout>
  );
}
