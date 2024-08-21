![image](https://github.com/user-attachments/assets/8b71ddbc-e3d4-4fc5-a95c-b1eafc0dfed1)

---

## 🌈 프로젝트 개요

- **프로젝트명** : TripBuddies (트립버디즈)
- **배포주소** : [https://www.tripbuddies.club/](https://www.tripbuddies.club/)
- **서비스의 한줄 소개** : 여행 친구가 필요하신가요? 트립 버디와 함께라면 국내는 물론, 해외 여행지에서도 나에게 꼭 맞는 여행 친구를 구할 수 있습니다!
- **프로젝트 기간** : 2024.07.16 ~ 2024.08.21
- **팀원** : 5명 

![CleanShot 2024-08-21 at 00 13 54](https://github.com/user-attachments/assets/b322dafa-c9bc-4dd4-908f-6185b9101663)

<table>
<tr>
<th>포지션</th>
<th>역할</th>
<th>이름</th>
<th>GitHub</th>
<th>Blog</th>
</tr>
<tr>
<td>UI/UX 디자이너</td>
<td>디자이너</td>
<td>이정인</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>FE 개발자</td>
<td>팀장</td>
<td>오은</td>
<td><a href="https://github.com/eunohhh">https://github.com/eunohhh</a></td>
<td><a href="https://ifelseif.tistory.com/">https://ifelseif.tistory.com/</a></td>
</tr>
<tr>
<td>FE 개발자</td>
<td>부팀장</td>
<td>김병준</td>
<td><a href="https://github.com/Captain-Kim">https://github.com/Captain-Kim</a></td>
<td><a href="https://infistudy.tistory.com/">https://infistudy.tistory.com/</a></td>
</tr>
<tr>
<td>FE 개발자</td>
<td>팀원</td>
<td>김민지</td>
<td><a href="https://github.com/slsl2">https://github.com/slsl2</a></td>
<td><a href="https://velog.io/@minn__ij/posts">https://velog.io/@minn__ij/posts</a></td>
</tr>
<tr>
<td>FE 개발자</td>
<td>팀원</td>
<td>곽현정</td>
<td><a href="https://github.com/hyunjeongkwak">https://github.com/hyunjeongkwak</a></td>
<td><a href="https://velog.io/@hyunjeong/posts">https://velog.io/@hyunjeong/posts</a></td>
</tr>
<tr>
<td>FE 개발자</td>
<td>팀원</td>
<td>최유상</td>
<td><a href="https://github.com/Kyara0324">https://github.com/Kyara0324</a></td>
<td><a href="https://blog.naver.com/kyara0324">https://blog.naver.com/kyara0324</a></td>
</tr>
</table>

![image](https://github.com/user-attachments/assets/a492b647-fc4b-4aa0-9654-7825dd5c0d2c)

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

---

## 🌈 개발 타임라인

![CleanShot 2024-08-21 at 02 37 52](https://github.com/user-attachments/assets/b5141c21-14f8-47eb-91a4-1346e9d1b16f)

## 🌈 서비스 주요 기능

- 사용자의 최초 가입 시 모바일과 PC 환경 각각의 환경에 알맞는 튜토리얼을 제공하여 사이트 이용의 편의를 돕습니다.
- 사용자가 선호하는 친구 성향, 선호하는 여정(여행) 방식 등을 온보딩에서 입력 받아, 모집 중인 여정을 검색 시 사용자에게 꼭 맞는 여정을 추천해줍니다.
- 같은 여정에 참여한 멤버끼리는 웹 사이트에서 실시간 채팅이 가능합니다.
- 프로필 기반으로 사용자(버디)들의 소셜 네트워킹을 지원하며, 팔로우 기능을 통해 선호하는 버디의 활동 내역을 북마크 할 수 있습니다.
- 단순 여정 모집 뿐만 아니라 여정 사진을 기반으로 스토리를 올리고, 이를 기반으로 버디즈 지수를 올려 랭킹을 올릴 수 있는 재미요소를 경험할 수 있습니다.

### 🌳 사용자의 참여를 유도하는 사이트 구성

<table>
<tr>
<th>메인페이지</th>
<th>게시글 리스트</th>
<tr>
<td><img src="https://github.com/user-attachments/assets/a8fdf122-b9e4-4f27-a288-fabb0699aa7f" height="500"/>
</td>
<td><img src="https://github.com/user-attachments/assets/ecfecb42-7f89-41b4-b7e5-76dfc25ae54c" height="500"/>
</td>
</tr>
</table>

**사용자의 자발적인 참여를 유도하는 요소들이 상호작용 되도록 개발하였습니다.**

- 메인페이지 배너에서는 현재 사용자가 생성, 참여한 여정 중 하나의 일정을 보여주어사용자가 서비스의 핵심 기능을 잊지 않고 이용할 수 있도록 함과 동시에,지금 모집중인 여정의 리스트를 보여주어 사용자의 참여를 유도하였습니다.
- 같은 내용이어도 여러 방식으로 사이트 곳곳에 기능을 배치하여사용자의 서비스 이용 편의성을 높이고자 하였습니다.

### 🌳 사용자가 직접 만들어 가는 서비스

<table>
<tr>
<th>마이페이지</th>
<th>스토리</th>
<th>채팅 목록</th>
<th>채팅</th>
<th>팔로우</th>
<tr>
<td><img src="https://github.com/user-attachments/assets/0ea10138-27cb-4e40-8638-e840a5f25533" height="300"/>
</td>
<td><img src="https://github.com/user-attachments/assets/5c9bd99b-04ea-4ccb-9afa-29f67b5b938d" height="300"/>
</td>
<td><img src="https://github.com/user-attachments/assets/b00119c4-1f39-47fb-82c8-fce48da7f0e7" height="300"/>
</td>
<td><img src="https://github.com/user-attachments/assets/856a514d-b25e-4499-87f5-396e1815335c" height="300"/>
</td>
<td><img src="https://github.com/user-attachments/assets/96ab821c-2b70-47a2-99c6-0d8896df0ec8" height="300"/>
</td>
</tr>
</table>

**소셜 네트워크 기능을 개발하여 사용자가 만들어 가는 서비스를 구축하고자 하였습니다.**

추천 인기 버디즈(랭킹 시스템), 버디 프로필, 버디즈 스토리, 팔로우, 채팅 기능 등 다양한 소셜 네트워크 활동을 지원하여외부 API 의존 없이 사용자가 직접 데이터베이스를 구축해나가는, 지속 가능한 서비스를 구축하였습니다.

### 🌳 사용자 친화적인 가이드

<table>
<tr>
<th>튜토리얼</th>
<th>온보딩 테스트</th>
<th>글쓰기</th>
<tr>
<td><img src="https://github.com/user-attachments/assets/edae11fc-dfcb-4060-9f04-1722a0d30991" height="300"/>
</td>
<td><img src="https://github.com/user-attachments/assets/9ff28502-97ff-40c0-8ec8-9b3b45b00b29" height="300"/>
</td>
<td><img src="https://github.com/user-attachments/assets/efd27ddb-895b-44f2-878e-7ae945c208bb" height="300"/>
</td>
</tr>
</table>

**서비스 곳곳에서 사용자의 이용을 돕는 가이드 구현**

- 서비스 첫 이용시, 회원가입 시, 글쓰기 시 등 다양한 곳에서퍼널 패턴을 적용하여 사이트 곳곳에서 사용자 가이드를제공하여 사용자 편의를 높였습니다.
- 이를 구현하면서 반복되는 페이지는 재사용 가능한 커스텀 훅으로 제작하여팀원 간 중복 코드를 작성하지 않도록 최적화하여 사용자 경험을 높였습니다.

---

## 🌈 서비스 활성화 방안과 기대 효과

![CleanShot 2024-08-21 at 00 15 38](https://github.com/user-attachments/assets/5161f1ee-d488-422c-add1-9ac28816d519)

### 🌳 시장의 수요

2024년 기준, 해외여행객이 247% 증가하는 등 여행에 대한 수요는 지속적으로 증가하고 있습니다.
이에 여행 상품이 급증하고 여행 관련 판매 서비스 또한 증가하고 있지만, 여행 메이트를 구하는 서비스는 OOO어스를 제외하고 많이 알려진 서비스가 없습니다.
또한 OOO어스는 최근에 서비스가 시작되었고, 안전한 매칭을 위한 장치는 부족합니다.

여행 메이트를 구하는 서비스에 대한 니즈 또한 여행 열풍과 함께 증가할 것으로 보이며, 안전한 매칭에 대한 수요는 있으나 공급은 없는 상태로 보입니다.

### 🌳 기술적 실행 가능성

우리에게 주어진 기간은 기획 1주, 개발 4주입니다.
우리가 가진 기술인 Next.js 프레임워크, 백엔드는 supabase로 구성하여 개발 난이도를 낮추고 CRUD, 다중 옵션 검색, 채팅 등의 소셜 기능 등 MVP를 제외한 Rich-Text-Editor 등의 기능은 과감히 제거하여 기간 내 구현하는 것을 목표로 합니다.

### 🌳 서비스의 지속 가능성

우리의 서비스는 외부 API를 사용하지 않고, 사용자가 직접 글쓰기 또는 소셜 기능 등을 통해 데이터를 생산해내고 활성화 시키도록 구현되어 있습니다.
또한 라이브러리도 유지보수 소요를 발생시킬 수 있어 캘린더와 같은 복잡한 UI를 제외하고 모든 부분은 자바스크립트로 직접 구현하였습니다.

### 🌳 시장의 수요 + 기술적 실행 가능성

우리의 핵심 기술 스택은 FE 개발자 5명이 모두 보유 중인 스택으로 개발되었으며, 외부 라이브러리와 API를 최소화하거나 사용하지 않았기에 기술적 러닝 커브가 낮습니다.

### 🌳 기술적 실행 가능성 + 서비스의 지속 가능성

여행 메이트를 모집하는 데 필요한 필수 기능인 인증/인가 기능과 CRUD를 너머, 안전한 매칭을 보장하기 위해 유저 프로필, 스토리, 팔로우, 실시간 채팅, 안전 지수 등 사용자가 직접 판단하여 안전한 매칭을 할 수 있도록 안전성을 보장할 수 있는 기능을 추가 개발하였습니다.

사용자는 여행 메이트를 구하는 소기의 목적이 달성되면 사이트의 이용을 중단할 수 있는데, 여러 소셜 네트워크 기능을 개발하여 사용자의 자발적인 활성화를 기대할 수 있습니다.

### 🌳 시장의 수요 + 서비스의 지속 가능성

실제 서비스에서는 구현하지 않았지만, 최초 기획 시 소셜 기능과 관련한 비즈니스 모델을 기획하였습니다.

이후에도 필요하다면 서비스의 핵심 기능인 여행 메이트 모집에는 영향을 주지 않으면서 결제를 이끌어 낼 수 있는 '상위 노출', '프로필 꾸미기' 등의 유료 아이템을 판매할 수 있으며 게시글 상세 페이지에서 해당 여행지의 추천 숙박 업소 또는 맛집 등의 정보를 업체와의 파트너십을 통해 지속 가능한 비즈니스 모델을 구축할 수 있습니다.

---

## 🌈 프로젝트 아키텍처

![CleanShot 2024-08-20 at 20 42 04](https://github.com/user-attachments/assets/dcb97a71-f228-4dd1-a0a3-cb13d1fbb63f)

---

## 🌈 각종 컨벤션

### 🌳 ERD Diagram

<img height="851" src="https://github.com/user-attachments/assets/13c0da18-905b-453f-be71-efb7181d4054"/>

데이터 베이스는 관계형 데이터베이스를 사용하며, Forein Key를 적극 활용하여 대규모 서비스에서도 데이터를 쉽게 관리할 수 있고 서비스의 확장에도 유연하게 대응할 수 있습니다.

데이터 테이블 명세서는 [이곳](https://github.com/nbc-final-a10/TripBuddy/discussions/13)에서 확인할 수 있습니다.

### 🌳 PR Convention

![PR](https://github.com/user-attachments/assets/c9df7a70-9799-4cdf-a8d2-c53a79268c0d)

팀원 2명 이상의 코드 리뷰를 의무화하고, PR 컨벤션 기본 서식을 정하여 팀 컨벤션에서 벗어나지 않는 일관성 있는 코드를 작성할 수 있도록 장치를 마련하였습니다.

개발이 시작된 7월 15일 이후 약 5주 간 **총 175건**의 PR이 우리 팀의 PR 컨벤션을 준수하여 작성되었습니다.

PR 내역은 [이곳](https://github.com/nbc-final-a10/TripBuddy/pulls?q=is%3Apr+is%3Aclosed)에서 확인할 수 있습니다.

### 🌳 API 명세서

![CleanShot 2024-08-21 at 01 37 55](https://github.com/user-attachments/assets/f49b47f7-ff08-4084-8ac0-7bfeb0c6b25f)

supabase와 통신하는 로직을 API 라우트로 구성하여 일부 컴포넌트에서는 데이터를 pre-fetching하여 초기 렌더링 속도를 높였으며, 여러 테이블을 참조해야 하는 경우 클라이언트에서의 연산 비용을 낮추고 서버와 책임을 분산하였습니다.
또한 API 통신은 서비스의 핵심 비즈니스 로직으로, API 라우트를 구성하여 중앙화하여 팀원 간 코드 재사용을 용이하도록 하였습니다.

API 명세서는 [이곳](https://github.com/nbc-final-a10/TripBuddy/discussions/12)에서 확인할 수 있습니다.

---

## 🌈 협업 도구

### 🌳 GItHub

<table>
<tr>
<th>Projects</th>
<th>Discussion</th>
</tr>
<tr>
<td><img src="https://github.com/user-attachments/assets/490cab76-58f9-41f5-bfc7-70782ec506c8" width="500"/></td>
<td><img src="https://github.com/user-attachments/assets/aca9ca41-b4f7-4959-816e-de6255468f55" width="500"/></td>
</tr>
</table>

GitHub에서 제공하는 서비스를 적극 활용하였으며 Projects를 통해 팀원별 개발 티켓 타임라인을 체크하였고, Discussions를 통해 회의록을 정리하고 유틸을 공유하여 프로젝트의 볼륨이 확대되어도 개발에 혼선이 없이 컨벤션을 지키며 개발을 진행할 수 있었습니다.

### 🌳 Slack

<table>
<tr>
<th>GitHub Bot 연동</th>
<th>적극적인 소통</th>
</tr>
<tr>
<td><img src="https://github.com/user-attachments/assets/b52c7f43-932a-4b4d-9491-3eb0a5db01ad" width="500"/></td>
<td><img src="https://github.com/user-attachments/assets/4bb53198-9b68-45a3-bb74-7f65c1b77da8" width="500"/></td>
</tr>
</table>

Slack 메신저를 통해 GitHub Bot을 연결하여 개발 진행 상황을 실시간으로 점검할 수 있도록 하였고, 팀원 간 소통을 활발히 하였습니다.

### 🌳 Zep

<table>
<tr>
<th>실시간 음성/화상 채팅</th>
</tr>
<tr>
<td><img src="https://github.com/user-attachments/assets/4a77839f-873f-4554-b75f-6a79936d1ca1" width="500"/></td>
</tr>
</table>

가상현실 공간에서 실시간 음성 및 화상 채팅, 화면 공유를 통해 실시간으로 소통하며 짧은 기간 효율적으로 개발을 진행할 수 있었습니다.
특히 일 2회의 회의시간을 정기적으로 가지며 팀원 간 개발 진행 상황을 공유하여 프로젝트의 타임라인에서 지정한 데드라인을 준수할 수 있었습니다.

---

## 🌈 와이어프레임

![CleanShot 2024-08-20 at 21 58 59](https://github.com/user-attachments/assets/cb926343-8cc5-4925-ae06-d84a1bf78a59)
![CleanShot 2024-08-20 at 21 59 04](https://github.com/user-attachments/assets/748558b5-cc09-43bf-8a18-1fafb312fbc8)

위 와이어프레임은 모바일 버전이며 PC버전을 포함한 와이어프레임은 [이곳](https://github.com/nbc-final-a10/TripBuddy/discussions/325)에서 확인할 수 있습니다.

---

## 🌈 서비스 시연

[![Video Label](https://github.com/user-attachments/assets/83ad5ada-e4f3-4cd4-ba07-5d3ffebdd68f)](https://youtu.be/'KT1k_UhXa9I&t')

위 이미지를 클릭하면 유튜브로 이동합니다.

### 🌳 메인페이지

<table>
<tr>
<th>메인페이지</th>
</tr>
<tr>
<td><img src="https://github.com/user-attachments/assets/a9ce3952-dca2-4606-bba6-78b23f28477c" width="300"/></td>
</tr>
</table>

- 사용자가 등록한 여정 모집을 잊지 않도록 홈 배너에서 D-day를 알려주고 있어 사이트의 핵심 기능에 접근이 쉽도록 하였습니다.
- 사용자 지수를 기반으로 한 인기 사용자 리스트를 보여주어 소셜 기능을 강화하고 사용자 스스로 이용률을 높이도록 하였습니다.
- 사용자들이 여행에서의 추억을 사진 기반으로 스토리 형태로 업로드하고, 또 메인 페이지에서 리스트를 보여주어 사용자들의 흥미를 유발하고 살아있는 서비스라는 인상을 심어주도록 하였습니다.
- 현재 모집 중인 여행의 리스트의 일부를 메인 페이지에서 보여주어 사용자의 접근이 쉽도록 하였습니다.

### 🌳 튜토리얼

<table>
<tr>
<th>튜토리얼</th>
<th>뒤로가기</th>
<th>건너뛰기</th>
</tr>
<tr>
<td><img src="https://github.com/user-attachments/assets/92496996-19f2-4ab7-b070-69cc2a401dd7" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/bd0eb62e-a5d6-4e8d-929b-e4b9a0bda4e8" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/d128bfca-d082-4acd-bb9f-3e140e19d64d" width="300"/></td>
</tr>
</table>

- 사이트에 처음 방문하는 사용자를 위해 사용자 친화적인 튜토리얼을 보여주고 있습니다.
- 튜토리얼을 보고 싶지 않은 사용자를 위해 건너뛰기 기능을 구현하였습니다.
- 사용자 테스트 간 수집한 피드백을 반영하여 이전 스텝의 튜토리얼을 볼 수 있도록 뒤로가기 기능을 구현하였습니다.

### 🌳 여행 메이트 모집 게시글

<table>
<tr>
<th>리스트와 상세페이지</th>
<th>게시글 삭제</th>
<th>찜하기</th>
<th>참여 요청하기</th>
</tr>
<tr>
<td><img src="https://github.com/user-attachments/assets/c99a3270-cc25-45ed-a88e-14eb10e5e3ca" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/8d1c372e-829e-477b-9dbf-194290c403f8" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/1a4b8a05-f323-465a-9740-f8d8f322dac0" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/79c1813f-7555-446e-9a71-57681063238d" width="300"/></td>
</tr>
</table>

- 사용자의 취향을 반영하기 위해 여행 메이트 모집 글에서는 다양한 옵션을 입력받고 있으며, 이 많은 내용을 깔끔한 카드 UI 형태로 보여주어 사용자 경험을 높였습니다.
- 보다 안전한 사용을 위해 참여를 희망하는 사용자는 파티의 리더에게 참여 요청을 보내고 리더에게는 알림이 뜨도록 하였습니다. 리더는 신청자의 프로필을 확인한 후 수락 여부를 결정할 수 있습니다.
- 여러 파티의 내용을 충분히 검토한 후 참여 여부를 결정하는 신중한 사용자의 편의를 고려하여 나중에 다시 볼 파티에 쉽게 접근할 수 있도록 찜하기 기능을 구현하였습니다.

### 🌳 글쓰기

<table>
<tr>
<th>글쓰기 (Funnel Pattern)</th>
<th>AI 이미지 생성</th>
<th>유효성 검사</th>
</tr>
<tr>
<td><img src="https://github.com/user-attachments/assets/dea3288a-ffee-446c-849d-6843c498bcc0" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/04b65ffd-581a-4c62-984d-bd20d638e8df" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/933fe401-56cb-47c1-9784-082c72fc628b" width="300"/></td>
</tr>
</table>

- 사용자의 취향에 딱 맞는 메이트를 모집할 수 있도록 다양한 옵션을 글쓰기에서 입력하도록 하였습니다.
- 다만 페이지가 많아 피로도가 높아질 수 있어 관심사 별로 컴포넌트를 나누어 인디케이터와 함께 보여주는 Funnel Design 기법을 사용하였고, 사용자는 스텝 별로 보여주는 가이드를 따라가다 보면 자연스럽게 모든 옵션을 입력하게 되도록 구현하여 사용자 경험을 높였습니다.
- 사용자에게 받는 옵션들 중 이미지는 준비되지 않을 수 있다고 판단하여 유효성 검사를 진행하지 않고, 게시글의 품질을 높이기 위해 이미지를 선택하지 않은 경우 Open AI의 API를 사용하여 선택한 지역에 맞는 이미지를 자동 생성합니다.
- 안전한 서비스 이용을 위해 모든 옵션은 필수로 입력하도록 하였고, 모든 필드에서 유효성 검사를 진행하며 통과하지 못할 경우 alert으로 사용자에게 안내합니다.

### 🌳 회원가입

<table>
<tr>
<th>이메일 회원가입/로그인</th>
<th>소셜로그인</th>
<th>온보딩 테스트</th>
</tr>
<tr>
<td><img src="https://github.com/user-attachments/assets/689f2465-a64b-4470-8e30-22dc119a16fe" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/6dfd5e2a-3389-4df3-a718-bc01991fea2e" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/fc04e104-33c7-498f-9ab3-b5b5c0c30461" width="300"/></td>
</tr>
</table>

- Supabase auth를 활용하여 이메일 가입이 가능합니다.
- 안전한 회원가입을 위해 입력 필드에서 유효성 검사를 진행하며 검사에 통과하지 못했을 경우 사용자에게 그 내용을 알려줍니다.
- Supabase의 Provider로 제공되는 카카오 소셜 로그인도 지원하며, 지원하지 않는 Naver 소셜 로그인도 자체 구현하여 회원가입 절차를 최소화하였습니다.
- 회원가입 이후 사용자의 취향을 반영하기 위한 서비스 이용이 가능하도록 온보딩 테스트를 진행합니다. 이 단계는 건너뛸 수 있으며, 건너 뛴 경우 `user_1234567`과 같이 임의의 닉네임이 부여되며 마이페이지에서는 수정을 권고하는 문구가 출력됩니다.

---

## 🌈 사용자 테스트 결과와 분석

<table>
<tr>
<th>만족했던 부분</th>
<th>만족하지 못했던 부분</th>
</tr>
<tr>
<td><img src="https://github.com/user-attachments/assets/a39b3db0-888f-41cb-aac8-1b70c4ed2479" width="300"/></td>
<td><img src="https://github.com/user-attachments/assets/04983c0c-244d-4080-9564-9462b55ef7d8" width="300"/></td>
</tr>
</table>

사용자 테스트는 구글 폼을 통해 약 4일 간 진행하였고, 서비스에서 보완할 점과 강점을 확실히 분석할 수 있었습니다.
**80**%의 사용자가 사이트 이용에 만족한다고 답변하였으며, **20**%의 불만족 답변은 미구현 사항과 버그에 관한 피드백이 대부분이었으며, **115건**에 달하는 사용자 피드백을 수집할 수 있었고 상당수 개선하여 재조사 시 사용자 만족도의 상승이 기대됩니다.

사용자 테스트의 분석 결과는 [이곳](https://github.com/nbc-final-a10/TripBuddy/discussions/243)에서 확인할 수 있습니다.

---

## 🌈  팀원 별 트러블 슈팅과 해결 과정

---

## 🌈 팀원 별 프로젝트 평가

