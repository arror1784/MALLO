import { useState } from "react";
import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import appleIcon from "@/assets/icons/apple.svg";
import { CheckRow } from "@/components/CheckRow";

/** Figma node 1:86 "회원가입" */
export function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const canSubmit =
    email.includes("@") &&
    password.length >= 8 &&
    passwordConfirm === password &&
    agreeTerms &&
    agreePrivacy;

  return (
    <div className="flex h-full w-full flex-col bg-bg px-6 pt-8" data-node-id="1:86">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="-ml-2 flex size-10 items-center justify-center rounded-full"
      >
        <img src={backIcon} alt="" className="size-[21px]" />
      </button>

      <div className="pt-8">
        <h1 className="text-[25px] font-bold tracking-[-0.75px] text-text-primary">
          만나서 반가워요
        </h1>
        <p className="mt-2 text-[15px] text-text-body">
          하늘이와의 대화, 말로가 함께 볼게요.
        </p>
      </div>

      <form
        className="flex flex-1 flex-col pt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) navigate("/consent");
        }}
      >
        <label className="block">
          <span className="text-[13px] font-semibold text-text-primary">이메일</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="mt-[10px] h-[50px] w-full rounded-[20px] border-[0.5px] border-border-input bg-bg px-4 text-[14px] text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <label className="mt-3 block">
          <span className="text-[13px] font-semibold text-text-primary">비밀번호</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8자 이상 입력해주세요"
            className="mt-[10px] h-[50px] w-full rounded-[20px] border-[0.5px] border-border-input bg-bg px-4 text-[14px] text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <label className="mt-3 block">
          <span className="text-[13px] font-semibold text-text-primary">비밀번호 확인</span>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 한 번 더 입력해주세요"
            className="mt-[10px] h-[50px] w-full rounded-[20px] border-[0.5px] border-border-input bg-bg px-4 text-[14px] text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <div className="flex items-center gap-3 py-5">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-text-subtle">또는</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-[20px] border-[0.5px] border-border-input text-[13px] font-semibold text-text-primary"
          >
            <span className="text-[13px] font-bold text-brand-google">G</span>
            Google
          </button>
          <button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-[20px] border-[0.5px] border-border-input text-[13px] font-semibold text-text-primary"
          >
            <img src={appleIcon} alt="" className="size-4" />
            Apple
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-1 border-y-[0.5px] border-border py-3">
          <CheckRow
            checked={agreeTerms}
            onChange={setAgreeTerms}
            label="서비스 이용약관"
            required
          />
          <CheckRow
            checked={agreePrivacy}
            onChange={setAgreePrivacy}
            label="개인정보 처리방침"
            required
          />
        </div>

        <div className="flex flex-1 flex-col justify-end pb-8">
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex h-[52px] w-full items-center justify-center rounded-[20px] bg-primary text-[15px] font-semibold text-text-primary shadow-[0_6px_8px_rgba(255,161,2,0.18)] disabled:opacity-45"
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}
