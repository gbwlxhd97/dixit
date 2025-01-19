## 🛠 요구사항 구현 목록


## 📦 프로젝트 구조
```
📦src
 ┣ 📂assets - (이미지, 아이콘 등)
 ┣ 📂components - (컴포넌트)
 ┃ ┗ 📂ui - (최소 단위 공통 컴포넌트)
 ┣ 📂constants - (상수)
 ┣ 📂hooks - (커스텀 훅)
 ┣ 📂interfaces - (타입)
 ┣ 📂lib - (라이브러리)
 ┣ 📂stores - (상태 관리)
 ```

## 📒 기술스택

### Core

- **vite^6.0.5, React^18 , TypeScript^5**

### Packages Manager

- **npm^10.2.4**

### Styles

- **tailwindcss**
  tailwindcss를 사용하여 스타일링 하였습니다.

### State Management

- **zustand^5.0.3**
  zustand를 사용하여 상태관리를 하였습니다.

### 📘 TypeScript 사용

- **정적 타입 언어**의 장점을 활용하여 **타입을 엄격히 체크**하고, `any` 타입을 지양했습니다.  
  이를 통해 **오류를 줄이고**, **코드 가독성**을 높였습니다.
- 의미 없는 변수 사용을 줄이기 위해 **특정 값은 상수 처리**하여 관리했습니다.


### Lint
  esLint와 prettier를 사용하여 코드 스타일을 통일하고 코드 품질을 개선하였습니다.
---


## ✅ 해결한 방법 및 결과 도출 

개발을 진행하며 익숙하고 지향하는 방식으로 **프로젝트 구조**와 **컴포넌트 설계**를 진행했습니다.  
또한, 실제 Dixit 게임룰을 참고하여 점수 계산 로직과 UI/UX를 구현하였습니다.

## 👍 신경 쓴 부분

### 🚀 1. Funnel 패턴 적용

  - 페이지를 이동하는 과정을 router를 사용하지 않고 Funnel 형태로 하나의 페이지에서 전환하는 view를 보여줍니다.
  - 선택한 이유로서는 우선 모바일 웹 환경을 고려하기 때문에 모바일 웹사이트가 마치 어플처럼 동작하는 효과를 보여주기 위해
  Funnel형태를 적용하였으며 또한 페이지 이동 시 페이지 이동 애니메이션을 추가하여 사용자 경험을 향상시켰습니다.
  - 장점으로 응집도 향상, UI의 흐름 파악이 쉽고 현재로서는 API를 연동하고 있지 않지만 API를 연동하게 된다면 어떤 Funnel에서 데이터가 흐르고 있고 데이터 추적하기 용이합니다.
---

### 🛠 2. 코드 구조화

**컴포넌트 분리**  
  - Shadcn UI를 이용함으로써 작은 단위의 컴포넌트를 분리하여 컴파운트 패턴을 이용하여 재사용성을 증가시켰으며, 유지보수성과 확장성을 높였습니다.
  - 컴포넌트를 비즈니스 로직과 랜더링 로직으로 분리하여 컴포넌트의 역할과 책임을 명확히 하도록 구성했습니다.
---

### 3. **사용자 경험**
   - 플레이어 이름 설정 할 때 useRef를 이용하여 랜더링 시 포커스를 주는 방식으로 사용자 경험을 향상시켰습니다.
   - 마지막 페이지 도달 시 안내 메시지

---

### 4. 3. **성능 최적화**
   - useCallback useMemo를 이용하여 불필요한 리렌더링을 줄였습니다.

 ## 📥 설치

사전에 **npm 및 node**가 설치되어 있어야 합니다.

```bash
npm install
```

## 🚀 스크립트

개발 환경 실행

```bash
npm run dev
```

빌드

```bash
npm run build
```

빌드 후 실행

```bash
npm run preview
```
