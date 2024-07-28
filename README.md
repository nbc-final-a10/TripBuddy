![김병준_최종프로젝트_커밍순_240721-001 (1)](https://github.com/user-attachments/assets/0e61a1c0-6ef7-43fc-b9d7-14de101e7dd2)

## 🌈 프로젝트 개요

- **프로젝트명** :Trip Buddy
- **서비스의 한줄 소개** : 여행 친구가 필요하신가요? 트립 버디와 함께라면 국내는 물론, 해외 여행지에서도 나에게 꼭 맞는 여행 친구를 구할 수 있습니다!
- **프로젝트 기간** : 2024.07.16 ~ 2024.08.21
- **프로젝트 인원** : 5명 (프론트엔드 엔지니어 4명, UI/UX 디자이너 1명)
- **프로젝트 주요 기술**
  - **언어 및 프레임워크**
    - **TypeScript** : 정적 타입을 추가하여 코드 품질과 유지보수성 향상
    - **Next.js** : SEO 최적화 등을 위해, 서버 사이드 렌더링을 적극 활용하기 위한 목적의 프레임워크
  - **데이터베이스 및 서버**
    - **BE** : Supabase (SQL, Storage, Auth, Realtime, Broadcast)
    - **FE** : Vercel
  - **상태 관리**
    - **Zustand** : 간단하고 직관적인 전역 상태 관리
    - **TanStack Query** : 서버 상태 관리
  - **스타일링**
    - **TailwindCSS** : 스타일링을 빠르게 도와주며 팀원 간 일관성 있는 스타일링을 보장
    - **NextUI** : 복잡한 UI를 구현하기 위해 사용(달력)
  - **개발 도구 및 라이브러리**
    - **yarn** : 패키지 매니저
    - **ESLint** : 코드 린팅 도구
    - **Prettier** : 코드 포매터
    - **Next-PWA** : PWA 지원
  - **리치 텍스트 에디터**
    - **Slate.js** : 리치 텍스트 에디터
  - **협업 도구**
    - **Figma** : 디자인 협업 도구
  - **버전 및 문서 관리**
    - **Git** : 버전 관리 도구
    - **GitHub** : 코드 저장소
    - **Slack** : 협업 도구
  - **이미지 최적화**
    - **WebP** : 이미지 포맷

## 🌈 서비스 주요 기능

- 사용자의 최초 가입 시 모바일과 PC 환경 각각의 환경에 알맞는 튜토리얼을 제공하여 사이트 이용의 편의를 돕습니다.
- 사용자가 선호하는 친구 성향, 선호하는 여정(여행) 방식 등을 온보딩에서 입력 받아, 모집 중인 여정을 검색 시 사용자에게 꼭 맞는 여정을 추천해줍니다.
- 같은 여정에 참여한 멤버끼리는 웹 사이트에서 실시간 채팅이 가능합니다.
- 프로필 기반으로 사용자(버디)들의 소셜 네트워킹을 지원하며, 팔로우 기능을 통해 선호하는 버디의 활동 내역을 북마크 할 수 있습니다.
- 단순 여정 모집 뿐만 아니라 여정 사진을 기반으로 스토리를 올리고, 이를 기반으로 DM을 주고 받을 수 있는 소셜 네트워킹을 지원합니다.

## 🌈 프로젝트 아키텍처

```
⭐️
├─ .eslintrc.js
├─ .gitignore
├─ .vscode
│  ├─ extensions.json
│  └─ settings.json
├─ README.md
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ manifest.json
│  ├─ next.svg
│  ├─ sw.js 🍀 build 시 인코딩 되면 디스커션 스니펫에서 복붙해서 복구!
│  ├─ test_icon.png
│  └─ vercel.svg
├─ src
│  ├─ api-services
│  │  └─ temp.ts
│  ├─ app
│  │  ├─ (providers)
│  │  │  ├─ (authenticated) 🍀 인증된 사용자만 접근 가능한 라우트
│  │  │  │  └─ layout.tsx
│  │  │  ├─ (conditional) 🍀 인가/비인가 회원 둘 다 조건부로 보여주는 라우트
│  │  │  │  └─ layout.tsx
│  │  │  ├─ (public) 🍀 비인가 회원에게도 보여주는 라우트
│  │  │  │  └─ page.tsx
│  │  │  └─ layout.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  └─ layout.tsx
│  ├─ components
│  │  ├─ atoms ⭐️ 원자 : 더 이상 분해할 수 없는 컴포넌트
│  │  │  └─ temporary.ts
│  │  ├─ molecules ⭐️ 분자 : 두 가지 이상의 컴포넌트가 결합된 컴포넌트
│  │  │  ├─ Footer.tsx
│  │  │  └─ Header.tsx
│  │  └─ organisms ⭐️ 유기체 : 두 가지 이상의 molecules(분자)가 결합된 컴포넌트
│  │     └─ pwa
│  │        └─ InstallPromptHandler.tsx
│  ├─ constants 🍀 상수 / 쿼리키 모아 놓는 곳
│  │  ├─ common.constants.ts ⭐️ 일반 상수 모아 놓는 곳
│  │  └─ query.constants.ts ⭐️ 쿼리 키 모아놓는 곳
│  ├─ contexts
│  │  └─ temp.ts
│  ├─ data
│  │  └─ location.ts
│  ├─ hooks 🍀 react에서만 사용할 수 있는 hook / client component에서만 사용 가능
│  │  └─ useCheckPwa.ts
│  ├─ middleware.ts
│  ├─ providers
│  │  └─ QueryProvider.tsx
│  ├─ types 🍀 타입 모아 놓는 곳
│  │  └─ supabase.ts
│  └─ utils 🍀 일반 유틸 함수
│     ├─ pwa
│     │  └─ isPWA.ts
│     └─ supabase
│        ├─ client.ts
│        ├─ middleware.ts
│        └─ server.ts
│     └─ regexs.ts
├─ supabase
│  ├─ .gitignore
│  ├─ config.toml
│  └─ seed.sql
├─ tailwind.config.ts
├─ tsconfig.json
└─ yarn.lock
```

**1. 모듈 패턴 (Module Pattern)**

- 프로젝트의 각 기능을 독립적인 모듈로 나누어 관리합니다.
- components, constants, contexts, hooks, utils 등의 폴더 구조가 이를 반영합니다.
- 정규식 패턴과 일반 상수도 하나의 파일에 모두 모아서 재사용성을 높이도록 합니다.
- 이로 인해 코드의 재사용성과 유지보수성이 향상됩니다.

**2. 컨테이너-프레젠테이션 패턴 (Container-Presentation Pattern)**

- components 폴더 내부의 구조가 이를 반영합니다.
- atoms, molecules, organisms은 주로 프레젠테이션 컴포넌트(단순히 UI를 그리는 역할)로 구성되어 있고, providers나 contexts 폴더에 있는 파일들은 주로 컨테이너 컴포넌트(상태 관리 및 비즈니스 로직 담당)로 구성됩니다.

**3. 훅 패턴 (Hook Pattern)**

- hooks 폴더에 있는 커스텀 훅(useFunnelNextStep.ts 등)은 제작하여 state와 컴포넌트를 반환하여 다양한 페이지에서 재사용 할 수 있도록 합니다.
- 이는 React의 기능을 확장하고 코드 중복을 줄이는데 도움이 됩니다.

**4. 싱글톤 패턴 (Singleton Pattern)**

- providers 폴더의 QueryProvider.tsx와 같은 파일은 애플리케이션 내에서 단일 인스턴스만 생성되어 사용되며, 전역 상태를 관리합니다.
- supabase의 client 인스턴스 또한 싱글톤 패턴을 사용하여 애플리케이션 내에서 단일 인스턴스로만 생성되어 메모리를 효율적으로 사용합니다.

**5. 프록시 패턴 (Proxy Pattern)**

- middleware.ts 파일들은 요청이 실제 서버에 도달하기 전에 이를 가로채어 추가적인 로직을 수행합니다.
- 이는 프록시 패턴의 일종으로, 주로 로깅, 인증 등의 기능을 구현하는데 사용됩니다.

**6. 팩토리 패턴 (Factory Pattern)**

- utils 폴더 내부의 파일들에서 특정 객체를 생성하는 로직을 별도의 함수로 분리하여, 객체 생성과 관련된 코드를 단순화하고 유지보수성을 높입니다.

**7. 아토믹 패턴 (Atomic Pattern)**

- Atoms, Molecules, Organisms 패턴을 사용하여 특정 컴포넌트를 유지보수 할 때 다른 컴포넌트에 미치는 영향을 최소화합니다.
- 단일 책임 원칙에 따라 작은 단위로 나누어진 컴포넌트는 독립적으로 동작하여, 팀원 간의 컴포넌트 중복, 충돌 등의 문제를 최소화 할 수 있습니다.
- 우리는 우리의 최종 프로젝트 볼륨 증가를 예측하고, 유지보수성과 디버깅 효율성을 높였습니다.

**8. 퍼널 패턴 (Funnel Pattern)**

- 이는 우리 프로젝트에서 튜토리얼, 온보딩, 글쓰기 페이지에서 사용하는 디자인 패턴입니다.
- 사용자에게 맞춤형 정보를 제공하기 위해 입력이 요구되는 추가 정보가 많아지는 형태에서 쏟아지는 페이지를 시퀀스의 이동으로 마치 한 페이지에서 모든 정보를 입력하는 것처럼 사용자 경험을 제공합니다.

## 🌈 각종 컨벤션

API 명세서, 데이터 베이스 테이블 명세서, 커밋 컨벤션, PR 컨벤션

https://github.com/nbc-final-a10/TripBuddy/discussions/categories/%EC%BB%A8%EB%B2%A4%EC%85%98

## 🌈 회의록

https://github.com/nbc-final-a10/TripBuddy/discussions/categories/%ED%9A%8C%EC%9D%98%EB%A1%9D

## 🌈 와이어 프레임

- 2024-07-23 10:05 기준 (지속 업데이트 중)
- 튜토리얼, 온보딩, 스토리 와이어프레임 디자이너 작업 중

### 모바일

#### 홈
<table>
    <tr>
        <th>메인페이지 (김민지)</th>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/58e93cfa-8258-4df8-a678-d99940f12268" width="150" height="150" /></td>
    </tr>
</table>

#### 검색
<table>
    <tr>
        <th>검색 1 (곽현정)</th>
        <th>검색 2 (곽현정)</th>
        <th>검색 3 (곽현정)</th>
        <th>검색 4 (곽현정)</th>
        <th>검색 5 (곽현정)</th>
        <th>검색 6 (곽현정)</th>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/d0de3251-ee33-4558-875c-64d19f71c592" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/d2c32ccc-c0a2-495e-a746-1f9882fb079c" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/6a1ff2a6-523d-4980-be80-7f5f6d7e7743" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/f1d39949-5f04-496c-be46-76f5029c541a" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/4b9e38b5-d196-4ada-9fff-06ef21686ee5" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/4880a0d4-98ca-4f9d-ad18-72f8214ce9d9" width="150" height="150" /></td>
    </tr>
</table>

#### 모집 중 여정 전체보기 리스트
<table>
    <tr>
        <th>모집 중 여정 (김병준)</th>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/fc1c938a-2723-48d4-b468-95ac4209ed57" width="150" height="150" /></td>
    </tr>
</table>

#### 여정 상세보기
<table>
    <tr>
        <th>여정 상세 (오은)</th>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/2420ebc3-3fa6-4b94-a493-7ac17794583a" width="150" height="150" /></td>
    </tr>
</table>

#### 여정 작성/수정하기
<table>
    <tr>
        <th>여정 CU 1 (김병준)</th>
        <th>여정 CU 2 (김병준)</th>
        <th>여정 CU 3 (김병준)</th>
        <th>여정 CU 4 (김병준)</th>
        <th>여정 CU 5 (김병준)</th>
        <th>여정 CU 6 (김병준)</th>
        <th>여정 CU 7 (김병준)</th>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/64320e8d-8ae1-4040-ab43-e234c10f33b1" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/998a8ba5-c85b-472d-b1b6-8a7f49eb7d89" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/c0c798c3-5605-4b47-8c8a-da6768a9cd7d" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/4f605b26-f7d4-4360-b2d6-c53c84f0b0c7" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/be0c7059-1357-4b9e-942f-2b7627337888" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/494f244b-8eb9-4434-9c5e-ef2d44f7df5e" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/aceb7faf-3a82-43f4-933c-a246551282f8" width="150" height="150" /></td>
    </tr>
</table>

#### 채팅
<table>
    <tr>
        <th>채팅 1 (김민지)</th>
        <th>채팅 2 (김민지)</th>
        <th>채팅 3 (김민지)</th>
        <th>채팅 4 (김민지)</th>
        <th>채팅 5 (김민지)</th>
        <th>채팅 6 (김민지)</th>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/f7742a96-7b9f-4d21-8b6a-b8f9177b9731" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/a709a4e3-6cbf-4977-b7a7-7168503545a1" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/b763e0ff-8c1b-4bbe-982f-2cfb9d33099a" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/b4d5521e-2f04-4c95-b0ad-35bb2f2d51ec" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/4f8fc32c-51d3-4abd-adc1-1ef438d71ee1" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/9af06924-7c85-49b8-bad6-0124ac554fac" width="150" height="150" /></td>
    </tr>
</table>

#### 버디 프로필
<table>
    <tr>
        <th>마이페이지 1 (김병준)</th>
        <th>마이페이지 2 (김병준)</th>
        <th>마이페이지 3 (김병준)</th>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/fe254a42-a3aa-4d0a-aa71-6ecf8afce8f8" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/4b78f18a-f4aa-4876-8294-c0866135edc5" width="150" height="150" /></td>
        <td><img src="https://github.com/user-attachments/assets/170b36ad-f63a-4693-9566-bd1a700edfc1" width="150" height="150" /></td>
    </tr>
</table>