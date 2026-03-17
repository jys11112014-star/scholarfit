# ScholarFit — AI Journal Recommender

Developed by **Jiyoun Song, PhD, APRN, Assistant Professor**  
University of Pennsylvania School of Nursing

---

## 🚀 Vercel 배포 방법 (5분)

### 1단계: GitHub에 올리기
1. [github.com](https://github.com) 에서 새 repository 만들기 (이름: `scholarfit`)
2. 이 폴더 안의 파일들을 모두 올리기

### 2단계: Vercel 연결
1. [vercel.com](https://vercel.com) 에서 GitHub 계정으로 로그인
2. "New Project" → GitHub repository 선택
3. Framework: **Vite** 선택
4. Deploy 클릭 (환경변수 없어도 됨!)

### 완료!
생성된 URL (예: `scholarfit.vercel.app`)을 친구들에게 공유!

---

## 💰 비용 구조 — 각자 부담!
- 사이트 열면 **본인 Anthropic API 키 입력창** 나옴
- [console.anthropic.com](https://console.anthropic.com) 가입하면 **$5 무료 크레딧** (약 500회 분석)
- 각자 키로 각자 계정에서 차감 → **선생님 비용 $0**
- 키는 브라우저 세션에만 저장, 서버에 저장 안 됨

---

## 📁 파일 구조
```
scholarfit/
├── api/
│   ├── analyze.js      ← 저널 추천 프록시 (CORS 우회용)
│   └── waiver.js       ← Waiver 체크 프록시
├── src/
│   ├── App.jsx         ← 메인 앱
│   └── main.jsx        ← 진입점
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```
