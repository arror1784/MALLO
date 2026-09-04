import { useNavigate } from "react-router";
import { TabScreenLayout } from "@/components/TabScreenLayout";
import chevronRightIcon from "@/assets/icons/chevron-right2.svg";
import plusIcon from "@/assets/icons/plus.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import { currentChild } from "@/data/child";

/** Figma node 1:1370 "SettingsHome" — 설정 탭 루트 */
export function Settings() {
  const navigate = useNavigate();

  return (
    <TabScreenLayout>
      <div className="px-5 pb-8 pt-8">
        <h1 className="text-[23px] font-bold text-text-primary">설정</h1>

        <h2 className="mt-6 text-[13px] font-semibold text-text-subtle">자녀 프로필 관리</h2>
        <div className="mt-2 rounded-2xl border-[0.5px] border-border bg-surface p-4">
          <div className="flex items-center">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-avatar-bg text-lg">
              {currentChild.avatarEmoji}
            </div>
            <div className="flex-1 pl-3">
              <p className="text-sm font-semibold text-text-primary">{currentChild.name}</p>
              <p className="text-xs text-text-subtle">{currentChild.ageMonths}개월</p>
            </div>
            <img src={chevronRightIcon} alt="" className="size-[17px]" />
          </div>
          <button type="button" className="mt-3 flex items-center gap-1 text-xs font-semibold text-text-link">
            <img src={plusIcon} alt="" className="size-[14px]" />
            자녀 추가하기
          </button>
        </div>

        <h2 className="mt-6 text-[13px] font-semibold text-text-subtle">구독</h2>
        <div className="mt-2 rounded-2xl bg-surface-dark p-5">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-text-inverse">무료 플랜</p>
            <span className="text-[11px] text-primary">더 자유롭게</span>
          </div>
          <p className="mt-2 text-xs text-white/65">하루 5분 분석을 이용하고 있어요.</p>
          <div className="mt-3 border-t border-white/15 pt-3">
            <p className="text-xs text-white/75">프리미엄 · 월 29,900원</p>
            <p className="text-xs text-white/50">무제한 · 상세 리포트 · 성장 추적</p>
          </div>
          <button
            type="button"
            className="mt-4 flex h-10 w-full items-center justify-center rounded-2xl bg-primary text-[13px] font-semibold text-text-primary"
          >
            첫 달 무료로 시작
          </button>
        </div>

        <h2 className="mt-6 text-[13px] font-semibold text-text-subtle">개인정보</h2>
        <div className="mt-2 overflow-hidden rounded-2xl border-[0.5px] border-border bg-surface">
          <button type="button" className="flex w-full items-center justify-between p-4">
            <span className="text-sm text-text-primary">동의 관리</span>
            <img src={chevronRightIcon} alt="" className="size-[17px]" />
          </button>
          <button
            type="button"
            onClick={() => navigate("/settings/delete")}
            className="flex w-full items-center justify-between border-t-[0.5px] border-[#f6efe5] p-4"
          >
            <span className="text-sm text-text-primary">데이터 삭제 요청</span>
            <img src={chevronRightIcon} alt="" className="size-[17px]" />
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-full items-center justify-between border-t-[0.5px] border-[#f6efe5] p-4"
          >
            <span className="text-sm text-text-primary">로그아웃</span>
            <img src={logoutIcon} alt="" className="size-[17px]" />
          </button>
        </div>
      </div>
    </TabScreenLayout>
  );
}
