# 반응형 쇼핑몰 앱(E-Commerce Store)

### 프로젝트 개요
피그마 커뮤니티에 무료 배포되어 있는 반응형 이커머스 웹사이트 디자인 템플릿을 이용하여 제작한 페이지로, 반응형 디자인과 레이아웃에 중점을 둔 인터랙티브 웹페이지입니다.

- 프로젝트 기간: 2025.01.09. - 2025.02.14.
- 참여 인원: 1명 (프론트엔드 1명)

&nbsp;
### 주요 기능
- 회원 : 로그인/회원가입, 프로필 수정, 배송지 등록, 로그아웃
- 상품 : 상품 리스트, 상품 카테고리 및 상품 필터링, 상품 정렬, 상품 상세 페이지
- 장바구니 : 장바구니 추가, 삭제, 개수 변경
- 리뷰 : 리뷰 리스트, 리뷰 작성
- 관리자 : 상품 추가 및 삭제


&nbsp;
### 기술 스택

| 카테고리| 스택 | 사용 목표 |
|:------|:------|:------|
|**Programming Languages**|![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) | 코드 안정성 및 유지보수성 향상을 위함 |
|**Frameworks**|![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)| 컴포넌트 기반 SSR 및 SSG, SEO 최적화 |
|**CSS Framework**|	![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)| 유틸리티 클래스 CSS 프레임워크를 통한 개발 최적화 |
|**Database & Backend**|![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)|별도 API 없이 DB 연동 및 스토리지 기능|
|**State Management**| ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)| 장바구니, 사용자 세션 관리 등을 위함 |
|**Deployment Tools**|	![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) | 프론트 배포,  CI/CD 자동화 |
|**Authentication**| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)| 인증 및 jwt 기반 세션 관리 |

&nbsp;
### 폴더 구조

```bash
📦app
 ┣ 📂(home)
 ┃ ┣ 📂cart
 ┃ ┣ 📂sale
 ┃ ┣ 📂shop
 ┃ ┃ ┣ 📂[product_id]
 ┃ ┣ 📂user
 ┣ 📂admin
 ┣ 📂auth
📦components
 ┣ 📂admin
 ┣ 📂cart
 ┣ 📂navbar
 ┣ 📂product-info
 ┣ 📂product-list
 ┣ 📂user
📦public
 ┣ 📂fonts
 ┣ 📂img
📦store
 ┣ 📜SessionProvider.tsx
 ┣ 📜sessionSlice.ts
 ┗ 📜store.ts

```

&nbsp;
## 프로젝트 화면
### 데스크탑
<img src="https://github.com/user-attachments/assets/249fbf19-e692-40a6-b6f9-5be578b7e7d3" alt="Image 1" />
<img src="https://github.com/user-attachments/assets/622fd447-7841-4853-836d-3c4a25aaaa0a" alt="Image 2" />
<img src="https://github.com/user-attachments/assets/bdc2af37-ad9c-4b84-af01-8ad04b05475b" alt="Image 3" />
<img src="https://github.com/user-attachments/assets/37c3d744-3faf-48e7-b3e2-0a7cc883b7a8" alt="Image 4" />
<img src="https://github.com/user-attachments/assets/82628cb7-e4da-4b88-9095-a862093ff547" alt="Image 5" />
<img src="https://github.com/user-attachments/assets/a36a8d45-2dcd-4a8e-9c4c-4393a78f1b73" alt="Image 6" />
<img src="https://github.com/user-attachments/assets/383601fc-30cf-4331-9b2a-88b90e9fd9fb" alt="Image 7" />
<img src="https://github.com/user-attachments/assets/1ea2be56-191e-4fc7-83b5-351f3df039bb" alt="Image 8" />


&nbsp;
### 모바일
<img src="https://github.com/user-attachments/assets/bc54191b-5a8b-4483-a490-03257cc9c704" width="400" alt="Image 1" />
<img src="https://github.com/user-attachments/assets/3ea5dd42-41bb-4cc5-a2df-bb10d1bcf09c" width="400" alt="Image 2" />
<img src="https://github.com/user-attachments/assets/ec835bf4-72db-422d-804b-b4f44172ef8e" width="400" alt="Image 3" />
<img src="https://github.com/user-attachments/assets/43fa4c51-e956-4421-b44e-b9374022ef3f" width="400" alt="Image 4" />
<img src="https://github.com/user-attachments/assets/8d1dac16-52a1-4688-9e89-97b530638a2f" width="400" alt="Image 5" />
<img src="https://github.com/user-attachments/assets/cdd383a8-53e3-4bcd-a855-842ce08169c3" width="400" alt="Image 6" />
<img src="https://github.com/user-attachments/assets/8d0d89d3-4d51-47d4-8883-d3b817be6d7e" width="400" alt="Image 7" />
<img src="https://github.com/user-attachments/assets/d520a017-c760-43d2-a8f4-17ef4fb22b06" width="400" alt="Image 8" />
<img src="https://github.com/user-attachments/assets/192c54a7-cd0b-4fe8-8c39-8047f47ddd80" width="400" alt="Image 9" />




