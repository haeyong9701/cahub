<h1 align="center">

![cahubfavicon](https://github.com/user-attachments/assets/3a1dd842-5987-44ff-a0ed-dbcf30d06b0c)
<br>
크아허브
</h1>

<h3 align="center">
  크레이지 아케이드 유저의 정보를 조회할 수 있는 웹 서비스
</h3>

<p align="center">
	<strong>
		<a href="https://cahub.xyz">Website</a>
	</strong>
</p>

<p align="center">
	<img src=https://github.com/user-attachments/assets/4672fa77-a624-4058-8b09-cc810753ceeb width="600">
</p>


## Overview
- **유저 검색**. 닉네임으로 유저 정보 조회. 유저 레벨, 경험치, 접속 상태, 캐릭터 장착 아이템 등
- **반응형 디자인**. 모바일부터 데스크탑까지 최적화

## Tech Stack
- **FE**. Next.js 15 (App Router), React, TypeScript
- **Styling**. SCSS
- **Image Optimization**. Cloudflare R2, Next.js Image
- **Analytics**. Google Analytics, Nexon Analytics, Vercel
- **Error Monitoring**. Sentry
- **Deploy**. Vercel

## Architecture
![diagram](https://github.com/user-attachments/assets/e6711fa3-bcd3-49a0-8d4f-c267d1cf835f)

## Project Structure

```text
src
├── app                     # 앱 라우터 기반 페이지
│   ├── (main)              # 메인 페이지
│   ├── search              # 검색 페이지
│   ├── error.tsx           # 전역 에러 처리
│   └── layout.tsx          # 루트 레이아웃
├── components              # 재사용 가능 컴포넌트
│   ├── Navbar              
│   ├── Footer              
│   └── ...
├── services                # 외부 API
├── styles                  # 전역 스타일
├── types                   # TypeScript 타입
└── utils                   # 유틸리티 함수
```

## Key Components & Features

### 서버 컴포넌트

서버 컴포넌트를 활용하여 성능을 최적화하고 있습니다.
인터랙티브한 기능이 필요한 경우에만 클라이언트 컴포넌트를 사용하고 있습니다.

- **데이터 페칭**: 서버에서 직접 데이터를 가져와 클라이언트로 전송량 최소화
- **SEO 최적화**: 메타데이터를 서버에서 동적으로 생성
- **초기 로딩 성능**: 서버에서 렌더링하여 초기 로딩 시간 단축

### 이미지 최적화

- **Next.js Image**: 이미지 최적화 및 지연 로딩
- **Cloudflare Workers**: 이미지 전송 가속화 및 캐싱

### 에러 처리 및 모니터링

- **Sentry**: 프로덕션 환경에서의 에러 추적 및 분석
- **로딩 상태 처리**: 사용자 친화적인 로딩 UI

