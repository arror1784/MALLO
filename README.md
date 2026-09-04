# MALLO

부모-자녀 대화를 녹음·분석해 맞춤 코칭을 제공하는 학부모 대상 에듀테크
서비스. 서비스 기획은 `MALLO_사업계획서.md` 참고.

## 이 레포

1단계: Figma 디자인을 iOS 393×852 단일 뷰포트 웹 프로토타입으로 옮겨
화면·플로우를 확인하는 작업. 작업 방식은 `MALLO-화면작업-브리핑.md`,
저장소 운영 규칙은 `CLAUDE.md` 참고.

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run shoot       # 전체 화면 스크린샷 캡처 (dev 서버 실행 중이어야 함)
npm run pixel-diff  # Figma 원본 vs 구현 픽셀 대조 (shoot 먼저 실행)
npm run test:e2e    # Playwright 시나리오 검증
```

`npm run pixel-diff`는 `pixel-diff/reference/`(Figma 원본, 커밋됨)와
`screenshots/`(방금 캡처한 구현 화면)를 화면별로 좌(원본)/중(구현)/우(차이)
3분할 이미지로 합성해 `pixel-diff/output/`에 저장하고, 화면별 불일치율을
`pixel-diff/REPORT.md`·`report.json`으로 남긴다. 화면이 늘어나면
`src/routes/screens.ts`에만 추가하면 캡처·픽셀 대조 스크립트 둘 다
자동으로 따라간다.
