# GPA Calculator — Technical Documentation

Comprehensive technical reference for developers: architecture, project structure, component breakdown, domain logic, testing, deployment, and operational workflows.

---

## 🏗️ Architecture & Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, standalone server and static export capabilities).
- **UI Library**: [React 19](https://react.dev/) (Client Components, React Portals, Hooks).
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, fully typed domain models and components).
- **3D Graphics & Animations**: [Three.js](https://threejs.org/) with custom GLSL vertex and fragment shaders for the fluid background canvas.
- **Styling**: Vanilla CSS with comprehensive CSS custom properties (design tokens, glassmorphism, responsive breakpoints).
- **Internationalization (i18n)**: Custom `LocaleContext` supporting English (`en`) and Egyptian Arabic (`ar-EG`) with automatic document direction (`dir="rtl"`) and tailored fonts (`Bricolage Grotesque` and `Rubik` via `next/font`).
- **Real-Time Website Monitoring**: Background health checker with Server-Sent Events (SSE) streaming and REST polling for college portal uptime status.
- **Testing**:
  - **Unit & Component Testing**: [Vitest 4](https://vitest.dev/) with `@vitest/coverage-v8` and `@testing-library/react`.
  - **End-to-End Testing**: [Playwright](https://playwright.dev/) running automated smoke tests on Chromium.
- **Analytics**: Privacy-preserving Google Analytics 4 integration with client-side event tracking, score buckets, and interaction timings.
- **Containerization & Deployment**: Multi-stage Docker image, `docker-compose` orchestration for Dokploy and Traefik reverse proxying.

---

## 📁 Project Directory Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml                         # Automated CI pipeline (audit, lint, typecheck, unit, build, e2e)
├── app/
│   ├── api/
│   │   └── fcai-status/
│   │       ├── route.ts                   # REST endpoint returning cached portal online status
│   │       ├── route.test.ts              # Unit tests for status REST endpoint
│   │       ├── stream/
│   │       │   ├── route.ts               # Server-Sent Events (SSE) stream for live status updates
│   │       │   └── route.test.ts          # Unit tests for SSE stream
│   ├── globals.css                        # Global CSS variables, reset, and base styles
│   ├── layout.tsx                         # Root layout, Google Analytics, fonts, metadata
│   └── page.tsx                           # Main page client component (courses, modals, undo bar)
├── e2e/
│   └── smoke/
│       └── home.spec.ts                   # Playwright E2E smoke tests
├── lib/
│   ├── fcai-status.ts                     # Background health checker and SSE client manager
│   ├── fcai-status.test.ts                # Unit tests for status cache and fetch checker
│   └── fcai-urls.ts                       # College portal URLs (https://myu.cu.edu.eg/)
├── public/
│   ├── Courses.json                       # Static copy of FCAI catalog
│   ├── icon.png                           # App icon
│   ├── logo.svg                           # Vector logo
│   └── robots.txt                         # Crawler instructions
├── scripts/
│   ├── build-static.js                    # Script for static export verification
│   └── start-standalone.js                # Standalone Next.js runner for Docker/Dokploy
├── src/
│   ├── analytics/                         # GA4 tracking utilities and bucketing logic
│   │   ├── buckets.ts                     # Duration and score bucketing for privacy
│   │   ├── buckets.test.ts
│   │   ├── gtag.d.ts
│   │   └── index.ts                       # Analytics event dispatchers
│   ├── components/                        # UI and domain components
│   │   ├── ConfirmationModal.tsx          # Reusable confirmation dialog (e.g. Reset All)
│   │   ├── ConfirmationModalStyles.css
│   │   ├── CourseForm.tsx                 # Manual course input form with autocomplete
│   │   ├── CourseTableStyles.css
│   │   ├── CreditHoursDropdown.tsx        # Portal dropdown for credit hour selection
│   │   ├── CreditHoursDropdownStyles.css
│   │   ├── DocumentTitleMeta.tsx          # Dynamic document title synchronized with locale
│   │   ├── EnhancedRotatingNumberInput.tsx # Custom 3D rotating tumbler credit hour picker
│   │   ├── FCAIStatusIndicator.tsx        # Status dot and external link to college portal
│   │   ├── FCAIStatusIndicator.css
│   │   ├── FCAIStatusIndicator.test.tsx
│   │   ├── Footer.tsx                     # Footer with links, copyright, and creator profile
│   │   ├── Footer.css
│   │   ├── GPADisplay.tsx                 # Real-time GPA score and academic tier display
│   │   ├── GPADisplayStyles.css
│   │   ├── GPAStickySummary.tsx           # Floating sticky bar showing GPA and passed credits
│   │   ├── GradeDropdown.tsx              # Portal dropdown for letter grade selection
│   │   ├── GroupedCourseTable.tsx         # Courses grouped by level & term with stats
│   │   ├── GroupedCourseTable.css
│   │   ├── HowToButton.tsx                # Trigger button for tutorial modal
│   │   ├── HowToButton.test.tsx
│   │   ├── HowToModal.tsx                 # Step-by-step device guides (Desktop, Android, iOS)
│   │   ├── HowToModal.css
│   │   ├── ImportModal.tsx                # HTML transcript import dialog
│   │   ├── ImportModal.css
│   │   ├── LanguageSwitcher.tsx           # English / Arabic locale toggle
│   │   ├── MobileCreditHoursOverride.css
│   │   ├── RotatingNumberInput.tsx
│   │   ├── RotatingNumberInput.css
│   │   ├── StatsModal.tsx                 # Detailed statistics breakdown per semester group
│   │   ├── StatsModalStyles.css
│   │   └── ThreeJSBackground.tsx          # Interactive animated canvas with GLSL shaders
│   ├── data/
│   │   └── Courses.json                   # Comprehensive FCAI curriculum course catalog
│   ├── hooks/
│   │   ├── modalStack.ts                  # Modal stacking registry for ESC key and z-indexing
│   │   ├── modalStack.test.ts
│   │   └── useModalBehavior.ts            # Trapped focus, backdrop clicks, and body scroll lock
│   ├── i18n/
│   │   ├── LocaleContext.tsx              # Locale provider, translation hook `useLocale()`
│   │   ├── LocaleContext.test.tsx
│   │   └── translations/
│   │       ├── ar-EG.json                 # Egyptian Arabic translations
│   │       └── en.json                    # English translations
│   ├── types/
│   │   └── Course.ts                      # Core interfaces: Course, Grade, Level, Term
│   └── utils/
│       ├── __fixtures__/
│       │   └── myu-sample.html            # Sanitized MyU transcript HTML fixture
│       │   └── portal-sample.html         # Legacy portal HTML fixture
│       ├── courseParser.ts                # Parser for MyU and legacy college portal HTML
│       ├── courseParser.test.ts           # Unit tests for transcript parser
│       ├── creditHours.ts                 # Credit hour normalization and calculations
│       ├── creditHours.test.ts
│       ├── dropdownManager.ts             # Central registry preventing overlapping dropdowns
│       ├── gpaAssessment.ts               # GPA tier classification logic
│       ├── gradeUtils.ts                  # Letter grade to 4.0 point scale conversions
│       ├── gradeUtils.test.ts
│       ├── storage-keys.ts                # LocalStorage key constants
│       └── storage-keys.test.ts
├── Dockerfile                             # Multi-stage production container build (Alpine)
├── docker-compose.yml                     # Dokploy service definition and Traefik network
├── instrumentation.ts                     # Next.js Node.js runtime initialization hook
├── next.config.js                         # Next.js standalone and static output configuration
├── playwright.config.ts                   # Playwright configuration with dynamic PORT support
├── vitest.config.ts                       # Vitest configuration with v8 coverage provider
├── package.json
└── README.md
```

---

## 🧩 Core Domain Logic & Calculations

### 1. Grading Scale (`src/utils/gradeUtils.ts`)

The application implements the official **Faculty of Computers and Artificial Intelligence (FCAI) — Cairo University** 4.0 credit hour grading system:

| Letter Grade | Grade Points | Percentage Range (Typical) | Tier Assessment |
| :--- | :--- | :--- | :--- |
| **A+** | 4.00 | 95% – 100% | Excellent |
| **A** | 3.70 | 90% – 94% | Excellent |
| **A-** | 3.40 | 85% – 89% | Excellent |
| **B+** | 3.20 | 80% – 84% | Very Good |
| **B** | 3.00 | 75% – 79% | Very Good |
| **B-** | 2.80 | 70% – 74% | Good |
| **C+** | 2.60 | 65% – 69% | Good |
| **C** | 2.40 | 60% – 64% | Acceptable |
| **C-** | 2.20 | 55% – 59% | Acceptable |
| **D+** | 2.00 | 53% – 54% | Poor |
| **D** | 1.50 | 50% – 52% | Poor |
| **D-** | 1.00 | 45% – 49% | Poor |
| **F** | 0.00 | < 45% | Very Poor / Fail |

### 2. GPA Calculation Formula

$$\text{GPA} = \frac{\sum (\text{Course Grade Points} \times \text{Course Credit Hours})}{\sum \text{Graded Credit Hours}}$$

- Courses without an assigned grade (`grade === null`) are considered in-progress and excluded from both total points and total hours.
- Failed courses (`F`, 0.00 points) contribute to total graded hours, lowering the GPA.
- Displayed "Passed Credit Hours" strictly counts graded courses where `grade !== 'F'`.

### 3. Credit Hour Rules (`src/utils/creditHours.ts`)

- Standard valid credit hour options in FCAI: **0**, **2**, and **3** hours (1-hour courses are not part of the standard curriculum and normalize to 2 hours).
- Zero-credit courses (e.g. non-credit humanities like *Social Issues*, *Critical Thinking*, *Entrepreneurship*) do not affect the GPA denominator.

---

## 📥 College Portal Transcript Parser (`src/utils/courseParser.ts`)

The parser extracts courses, grades, semesters, and hours directly from HTML pasted by students.

### Supported Portals:
1. **New Cairo University MyU Portal** ([https://myu.cu.edu.eg/](https://myu.cu.edu.eg/)):
   - **Structure**: Each semester is contained within a `.card` component.
   - **Term Detection**: Extracted from `.card-title` (`الأول` → `First Term`, `الثانى`/`الثاني` → `Second Term`, `الصيفي` → `Summer Term`).
   - **Table Columns**:
     - `td[0]`: Course Code (e.g. `DS251`, `HU117`, `CS214`).
     - `td[1]`: Course Name (e.g. `Fundamentals of Management`).
     - `td[2]`: Credit Hours formatted with European/Arabic decimal comma (e.g. `2,0`, `3,0`, or empty `""` for non-credit courses).
     - `td[3]`: Numerical Mark / Percentage (e.g. `95`, `72`).
     - `td[4]`: Letter Grade (e.g. `A`, `C+`, `B+`, `A-`, `D-`).
   - **Academic Level Inference**: Automatically inferred from the course code prefix digit:
     - `1xx` → `First Level`
     - `2xx` → `Second Level`
     - `3xx` → `Third Level`
     - `4xx` → `Fourth Level`
   - **Standalone Table Support**: If a user selects and pastes only `<table>` or `.ls-table` rows without `.card` wrappers, the parser falls back to row-by-row code matching.
2. **Legacy Portal Fallback**:
   - Detects `table.table.table-striped.col-md-12` 12-column layouts from the deprecated portal, preserving backward compatibility.

### Deduplication & Merge:
`mergeImportedCourses(imported, current)` merges incoming courses into the current list. When a course with the same name already exists, the imported version updates it while preserving any manually entered non-conflicting courses.

---

## 🌐 Website Uptime Monitoring System (`lib/fcai-status.ts`)

The app includes real-time monitoring of the college portal:
- **Monitored URL**: `https://myu.cu.edu.eg/` (configured in `lib/fcai-urls.ts`).
- **Initialization**: `instrumentation.ts` invokes `startBackgroundChecker()` as soon as the Next.js Node.js server starts.
- **Backend Service**:
  - `checkUrlWithFetch`: Sends lightweight `HEAD` requests with `no-store` cache headers.
  - Automatically reschedules periodic checks (every 10 minutes when online, every 5 minutes when offline).
- **Client Synchronization**:
  - **REST**: `GET /api/fcai-status` returns cached snapshot (`{ online: boolean | null }`).
  - **Server-Sent Events (SSE)**: `GET /api/fcai-status/stream` keeps persistent connections open and pushes immediate state changes to all connected clients.
- **UI Indicator** (`src/components/FCAIStatusIndicator.tsx`):
  - Displays a color-coded status dot (green for online, red for offline, pulsing grey for initial checking).
  - Acts as a direct hyperlink to [https://myu.cu.edu.eg/](https://myu.cu.edu.eg/).

---

## 🛠️ Development, Scripts & CI Pipeline

### Prerequisites
- **Node.js**: v20+ (LTS) or v24+
- **Package Manager**: npm v10+

### Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **dev** | `npm run dev` | Start Next.js development server with Turbopack |
| **build** | `npm run build` | Compile optimized production build (standalone server output) |
| **build:static** | `npm run build:static` | Run static export build (`STATIC_EXPORT=true`) |
| **start:standalone** | `npm run start:standalone` | Launch standalone server (used in Docker/Dokploy environments) |
| **lint** | `npm run lint` | Run ESLint across entire codebase (`--max-warnings 0`) |
| **typecheck** | `npm run typecheck` | Run TypeScript compiler type validation (`tsc --noEmit`) |
| **test** | `npm run test` | Run Vitest unit tests |
| **test:coverage** | `npm run test:coverage` | Run Vitest with v8 code coverage reporting |
| **test:e2e** | `npm run test:e2e` | Run Playwright end-to-end smoke tests (Chromium) |
| **audit** | `npm run audit` | Run security vulnerability audit (`npm audit --audit-level=low`) |
| **ci** | `npm run ci` | Run full automated validation pipeline locally |

### Environment Variables
- `PORT`: (Optional, default: `3000`). Used by `scripts/start-standalone.js` and `playwright.config.ts`. If port 3000 is occupied, set e.g. `PORT=3055` to execute E2E tests cleanly.
- `STATIC_EXPORT`: Set to `'true'` during `npm run build:static` to emit a static HTML/JS export into `/out`.
- `NEXT_PUBLIC_BASE_PATH`: Configures a sub-path prefix when deploying behind reverse proxies or subdirectories.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`).

### Continuous Integration (`.github/workflows/ci.yml`)
Every push to `main` and pull request triggers a 6-job matrix running on Ubuntu runners using `actions/setup-node@v7`:
1. `audit`: Validates 0 vulnerabilities via `npm audit --audit-level=low`.
2. `lint`: Ensures zero ESLint warnings and errors.
3. `typecheck`: Verifies strict TypeScript compliance.
4. `unit`: Executes Vitest tests and uploads code coverage artifacts.
5. `build`: Executes Next.js Turbopack production build and caches `.next/cache`.
6. `e2e`: Installs Playwright Chromium and executes smoke tests.

---

## 🚀 Deployment & Containerization

### Docker Multi-Stage Build (`Dockerfile`)
The application utilizes an optimized multi-stage Alpine Linux Docker build:
1. **base**: Uses `node:20-alpine`.
2. **deps**: Installs production & development dependencies via `npm install --legacy-peer-deps`.
3. **builder**: Copies source code, accepts build arguments (`NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`), and executes `npm run build`.
4. **runner**: Creates an unprivileged system user (`nextjs:nodejs`, UID 1001), copies `.next/standalone`, `.next/static`, and `public/`, and starts the server via `node server.js` on port `3000`.

### Dokploy & Traefik Integration (`docker-compose.yml`)
When deployed via Dokploy:
- The container joins the external `dokploy-network`.
- Internal container port `3000` is exposed to Traefik for SSL termination and reverse proxy routing.
- The `start-standalone.js` script handles copying `.next/static` and `public` assets to `.next/standalone` prior to server startup.

---

## 🔒 Privacy & Analytics

- **Local Storage**: All course data, grades, credit hours, group collapse states, and language preferences reside exclusively in the client's browser `localStorage`.
- **Zero Sensitive Data Transmission**: The server never stores, logs, or transmits course names, student IDs, or raw pasted HTML.
- **Analytics Events**: Google Analytics 4 tracks general usage patterns (e.g. import success/failure, language toggle, session duration bucket, and computed overall GPA rounded to two decimals).
