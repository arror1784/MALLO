# src/api

도메인별 HTTP 클라이언트 모듈이 들어갈 자리. 화면 컴포넌트는 여기 모듈만
거쳐서 통신하고, axios 인스턴스(인터셉터가 토큰 첨부·401 처리 전담)를
직접 import하지 않는다.

1단계(오늘)는 더미 데이터만 쓰므로 비어 있다. 2단계에서 실제 연동 시
`report.ts`, `record.ts`, `auth.ts`, `child.ts`, `settings.ts` 등으로 채운다.
