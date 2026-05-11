# SILAP Feature Architecture Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the current SILAP frontend in `fe-spk` from mixed `components / data / pages / lib` buckets into a hybrid `app + features + shared` structure without changing visible behavior.

**Architecture:** Keep bootstrap and global shell concerns in `src/app`, move domain code into `src/features/home` and `src/features/preset`, and move global CSS entrypoints into `src/shared/styles`. This is a move-and-rewire refactor only; route paths, UI behavior, and dummy-data logic stay the same.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4, react-router-dom, Vitest, Testing Library, ESLint

---

## File Structure

### Existing files to modify

- `fe-spk/src/App.jsx`
- `fe-spk/src/main.jsx`

### Existing files to move

- `fe-spk/src/index.css`
- `fe-spk/src/App.css`
- `fe-spk/src/pages/HomePage.jsx`
- `fe-spk/src/pages/PresetPage.jsx`
- `fe-spk/src/pages/__tests__/HomePage.test.jsx`
- `fe-spk/src/pages/__tests__/PresetPage.test.jsx`
- `fe-spk/src/components/home/HeroSearch.jsx`
- `fe-spk/src/components/home/PresetGrid.jsx`
- `fe-spk/src/components/home/CategoryShowcase.jsx`
- `fe-spk/src/components/preset/PresetSelector.jsx`
- `fe-spk/src/components/preset/WeightSliderRow.jsx`
- `fe-spk/src/components/preset/RankingPanel.jsx`
- `fe-spk/src/data/presets.js`
- `fe-spk/src/data/topLaptops.js`
- `fe-spk/src/data/rankedLaptops.js`
- `fe-spk/src/lib/weighting.js`
- `fe-spk/src/lib/__tests__/weighting.test.js`

### Files to create

- `fe-spk/src/app/routes.jsx`
- `fe-spk/src/features/home/pages/HomePage.jsx`
- `fe-spk/src/features/home/components/HeroSearch.jsx`
- `fe-spk/src/features/home/components/PresetGrid.jsx`
- `fe-spk/src/features/home/components/CategoryShowcase.jsx`
- `fe-spk/src/features/home/data/presets.js`
- `fe-spk/src/features/home/data/topLaptops.js`
- `fe-spk/src/features/home/__tests__/HomePage.test.jsx`
- `fe-spk/src/features/preset/pages/PresetPage.jsx`
- `fe-spk/src/features/preset/components/PresetSelector.jsx`
- `fe-spk/src/features/preset/components/WeightSliderRow.jsx`
- `fe-spk/src/features/preset/components/RankingPanel.jsx`
- `fe-spk/src/features/preset/data/rankedLaptops.js`
- `fe-spk/src/features/preset/lib/weighting.js`
- `fe-spk/src/features/preset/__tests__/PresetPage.test.jsx`
- `fe-spk/src/features/preset/__tests__/weighting.test.js`
- `fe-spk/src/shared/styles/index.css`
- `fe-spk/src/shared/styles/App.css`

### Responsibility map

- `src/app/*`: shell, navigation, route table
- `src/features/home/*`: Home-specific UI, data, and tests
- `src/features/preset/*`: Preset-specific UI, data, local helper logic, and tests
- `src/shared/styles/*`: global CSS entrypoints
- `src/test/setup.js`: Vitest shared setup

## Task 1: Move Global App and Shared Style Entrypoints

**Files:**
- Create: `fe-spk/src/app/routes.jsx`
- Modify: `fe-spk/src/App.jsx`
- Modify: `fe-spk/src/main.jsx`
- Create: `fe-spk/src/shared/styles/index.css`
- Create: `fe-spk/src/shared/styles/App.css`
- Delete after move: `fe-spk/src/index.css`
- Delete after move: `fe-spk/src/App.css`

- [ ] **Step 1: Write the failing shell test for route imports**

Update `fe-spk/src/__tests__/app-shell.test.jsx` imports only after the route table exists. First, capture the expected post-refactor shell test:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('App shell routing', () => {
  it('renders the SILAP brand and the two main navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('SILAP')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Preset' })).toBeInTheDocument()
  })

  it('navigates from Home to Preset using the main navigation', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: 'Preset' }))

    expect(
      screen.getByRole('heading', { name: 'Preset Laptop' }),
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the shell test to lock the current baseline**

Run:

```bash
cd fe-spk
npm test -- src/__tests__/app-shell.test.jsx
```

Expected: PASS before file moves.

- [ ] **Step 3: Create the route table and move the CSS entrypoints**

Create `fe-spk/src/app/routes.jsx`:

```jsx
import { Route, Routes } from 'react-router-dom'
import AppShell from './AppShell'
import HomePage from '../features/home/pages/HomePage'
import PresetPage from '../features/preset/pages/PresetPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/preset" element={<PresetPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
```

Replace `fe-spk/src/App.jsx` with:

```jsx
import AppRoutes from './app/routes'

function App() {
  return <AppRoutes />
}

export default App
```

Replace `fe-spk/src/main.jsx` with:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './shared/styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

Copy `fe-spk/src/index.css` into `fe-spk/src/shared/styles/index.css`.

Copy `fe-spk/src/App.css` into `fe-spk/src/shared/styles/App.css`.

Delete the old `fe-spk/src/index.css` and `fe-spk/src/App.css` after the copies exist.

- [ ] **Step 4: Run the shell test again**

Run:

```bash
cd fe-spk
npm test -- src/__tests__/app-shell.test.jsx
```

Expected: FAIL because the route file now points at future feature locations that do not exist yet.

- [ ] **Step 5: Commit the app/shared scaffold**

```bash
git add fe-spk/src/App.jsx fe-spk/src/main.jsx fe-spk/src/app/routes.jsx fe-spk/src/shared/styles/index.css fe-spk/src/shared/styles/App.css
git rm fe-spk/src/index.css fe-spk/src/App.css
git commit -m "refactor: add SILAP app routes and shared style entrypoints"
```

## Task 2: Move Home Into `features/home`

**Files:**
- Create: `fe-spk/src/features/home/pages/HomePage.jsx`
- Create: `fe-spk/src/features/home/components/HeroSearch.jsx`
- Create: `fe-spk/src/features/home/components/PresetGrid.jsx`
- Create: `fe-spk/src/features/home/components/CategoryShowcase.jsx`
- Create: `fe-spk/src/features/home/data/presets.js`
- Create: `fe-spk/src/features/home/data/topLaptops.js`
- Create: `fe-spk/src/features/home/__tests__/HomePage.test.jsx`
- Delete after move: `fe-spk/src/pages/HomePage.jsx`
- Delete after move: `fe-spk/src/pages/__tests__/HomePage.test.jsx`
- Delete after move: `fe-spk/src/components/home/*`
- Delete after move: `fe-spk/src/data/presets.js`
- Delete after move: `fe-spk/src/data/topLaptops.js`

- [ ] **Step 1: Move the Home page test to the feature folder**

Create `fe-spk/src/features/home/__tests__/HomePage.test.jsx` with the current test content:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

describe('HomePage', () => {
  it('renders the hero heading, search field, and main CTA', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Temukan Laptopmu' }),
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Cari nama laptop')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Cari Sekarang' }),
    ).toBeInTheDocument()
  })

  it('shows the four approved preset categories', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Gaming', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Konten Kreator', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Produktivitas', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Dana Pelajar', level: 2 }),
    ).toBeInTheDocument()
  })

  it('shows the top laptop by category section content', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Legion Slim 5')).toBeInTheDocument()
    expect(screen.getByText('ASUS ProArt P16')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the Home feature test to verify the old import still works before moving files**

Run:

```bash
cd fe-spk
npm test -- src/features/home/__tests__/HomePage.test.jsx
```

Expected: FAIL because `../pages/HomePage` does not exist yet inside the feature folder.

- [ ] **Step 3: Move Home page, components, and data into the feature**

Create `fe-spk/src/features/home/pages/HomePage.jsx` with the current `HomePage` content, but update imports to:

```jsx
import CategoryShowcase from '../components/CategoryShowcase'
import HeroSearch from '../components/HeroSearch'
import PresetGrid from '../components/PresetGrid'
```

Create `fe-spk/src/features/home/components/HeroSearch.jsx` with the current `HeroSearch` content.

Create `fe-spk/src/features/home/components/PresetGrid.jsx` with the current `PresetGrid` content, but update its data import to:

```jsx
import { homePresets } from '../data/presets'
```

Create `fe-spk/src/features/home/components/CategoryShowcase.jsx` with the current `CategoryShowcase` content, but update its data import to:

```jsx
import { topLaptopsByCategory } from '../data/topLaptops'
```

Create `fe-spk/src/features/home/data/presets.js` with the current `homePresets` export.

Create `fe-spk/src/features/home/data/topLaptops.js` with the current `topLaptopsByCategory` export.

Delete the old files:

- `fe-spk/src/pages/HomePage.jsx`
- `fe-spk/src/pages/__tests__/HomePage.test.jsx`
- `fe-spk/src/components/home/HeroSearch.jsx`
- `fe-spk/src/components/home/PresetGrid.jsx`
- `fe-spk/src/components/home/CategoryShowcase.jsx`
- `fe-spk/src/data/presets.js`
- `fe-spk/src/data/topLaptops.js`

- [ ] **Step 4: Run the Home feature test and shell test**

Run:

```bash
cd fe-spk
npm test -- src/features/home/__tests__/HomePage.test.jsx src/__tests__/app-shell.test.jsx
```

Expected: Home test PASS, shell test still FAIL because Preset has not been moved yet.

- [ ] **Step 5: Commit the Home feature move**

```bash
git add fe-spk/src/features/home fe-spk/src/app/routes.jsx
git rm fe-spk/src/pages/HomePage.jsx fe-spk/src/pages/__tests__/HomePage.test.jsx fe-spk/src/components/home/HeroSearch.jsx fe-spk/src/components/home/PresetGrid.jsx fe-spk/src/components/home/CategoryShowcase.jsx fe-spk/src/data/presets.js fe-spk/src/data/topLaptops.js
git commit -m "refactor: move SILAP home into feature module"
```

## Task 3: Move Preset Into `features/preset`

**Files:**
- Create: `fe-spk/src/features/preset/pages/PresetPage.jsx`
- Create: `fe-spk/src/features/preset/components/PresetSelector.jsx`
- Create: `fe-spk/src/features/preset/components/WeightSliderRow.jsx`
- Create: `fe-spk/src/features/preset/components/RankingPanel.jsx`
- Create: `fe-spk/src/features/preset/data/rankedLaptops.js`
- Create: `fe-spk/src/features/preset/lib/weighting.js`
- Create: `fe-spk/src/features/preset/__tests__/PresetPage.test.jsx`
- Create: `fe-spk/src/features/preset/__tests__/weighting.test.js`
- Delete after move: `fe-spk/src/pages/PresetPage.jsx`
- Delete after move: `fe-spk/src/pages/__tests__/PresetPage.test.jsx`
- Delete after move: `fe-spk/src/components/preset/*`
- Delete after move: `fe-spk/src/data/rankedLaptops.js`
- Delete after move: `fe-spk/src/lib/weighting.js`
- Delete after move: `fe-spk/src/lib/__tests__/weighting.test.js`

- [ ] **Step 1: Move the Preset and weighting tests into the feature folder**

Create `fe-spk/src/features/preset/__tests__/PresetPage.test.jsx` with the current `PresetPage` test content, but import from:

```jsx
import PresetPage from '../pages/PresetPage'
```

Create `fe-spk/src/features/preset/__tests__/weighting.test.js` with the current weighting helper test content, but import from:

```js
import { getTotalWeight, isWeightTotalValid } from '../lib/weighting'
```

- [ ] **Step 2: Run the Preset feature tests to verify the future import paths fail first**

Run:

```bash
cd fe-spk
npm test -- src/features/preset/__tests__/weighting.test.js src/features/preset/__tests__/PresetPage.test.jsx
```

Expected: FAIL because the future feature files do not exist yet.

- [ ] **Step 3: Move Preset page, components, data, and helper into the feature**

Create `fe-spk/src/features/preset/lib/weighting.js` with the current `presetWeights`, `getTotalWeight`, and `isWeightTotalValid` exports.

Create `fe-spk/src/features/preset/data/rankedLaptops.js` with the current `rankedLaptops` export.

Create `fe-spk/src/features/preset/components/PresetSelector.jsx`, `WeightSliderRow.jsx`, and `RankingPanel.jsx` with the current component contents unchanged.

Create `fe-spk/src/features/preset/pages/PresetPage.jsx` with the current `PresetPage` content, but update imports to:

```jsx
import PresetSelector from '../components/PresetSelector'
import RankingPanel from '../components/RankingPanel'
import WeightSliderRow from '../components/WeightSliderRow'
import { rankedLaptops } from '../data/rankedLaptops'
import {
  getTotalWeight,
  isWeightTotalValid,
  presetWeights,
} from '../lib/weighting'
```

Delete the old files:

- `fe-spk/src/pages/PresetPage.jsx`
- `fe-spk/src/pages/__tests__/PresetPage.test.jsx`
- `fe-spk/src/components/preset/PresetSelector.jsx`
- `fe-spk/src/components/preset/WeightSliderRow.jsx`
- `fe-spk/src/components/preset/RankingPanel.jsx`
- `fe-spk/src/data/rankedLaptops.js`
- `fe-spk/src/lib/weighting.js`
- `fe-spk/src/lib/__tests__/weighting.test.js`

- [ ] **Step 4: Run the full test suite**

Run:

```bash
cd fe-spk
npm test
```

Expected: PASS

- [ ] **Step 5: Commit the Preset feature move**

```bash
git add fe-spk/src/features/preset fe-spk/src/app/routes.jsx
git rm fe-spk/src/pages/PresetPage.jsx fe-spk/src/pages/__tests__/PresetPage.test.jsx fe-spk/src/components/preset/PresetSelector.jsx fe-spk/src/components/preset/WeightSliderRow.jsx fe-spk/src/components/preset/RankingPanel.jsx fe-spk/src/data/rankedLaptops.js fe-spk/src/lib/weighting.js fe-spk/src/lib/__tests__/weighting.test.js
git commit -m "refactor: move SILAP preset into feature module"
```

## Task 4: Clean Up Empty Folders and Verify Final Structure

**Files:**
- Modify: `fe-spk/src/__tests__/app-shell.test.jsx` only if import path needs adjustment
- Delete if empty: `fe-spk/src/components/home`
- Delete if empty: `fe-spk/src/components/preset`
- Delete if empty: `fe-spk/src/components`
- Delete if empty: `fe-spk/src/data`
- Delete if empty: `fe-spk/src/lib/__tests__`
- Delete if empty: `fe-spk/src/lib`
- Delete if empty: `fe-spk/src/pages/__tests__`
- Delete if empty: `fe-spk/src/pages`

- [ ] **Step 1: Remove empty technical-bucket folders**

Run:

```bash
cd fe-spk
rmdir src\components\home
rmdir src\components\preset
rmdir src\components
rmdir src\data
rmdir src\lib\__tests__
rmdir src\lib
rmdir src\pages\__tests__
rmdir src\pages
```

Expected: each command succeeds only if the folder is empty after the moves.

- [ ] **Step 2: Verify the final source tree**

Run:

```bash
cd fe-spk
rg --files src
```

Expected: `Home` and `Preset` code now live under `src/features/*`, route table lives under `src/app/routes.jsx`, and CSS entrypoints live under `src/shared/styles`.

- [ ] **Step 3: Run lint and build**

Run:

```bash
cd fe-spk
npm run lint
npm run build
```

Expected: both commands PASS.

- [ ] **Step 4: Commit the cleanup**

```bash
git add fe-spk/src/app/routes.jsx fe-spk/src/shared/styles
git commit -m "refactor: finalize SILAP feature-based frontend structure"
```

## Spec Coverage Check

- `app + features + shared` structure is implemented across Tasks 1-4.
- `Home` and `Preset` feature ownership is implemented in Tasks 2 and 3.
- `shared/styles` move is implemented in Task 1.
- Route paths stay `/` and `/preset` through Task 1.
- No visible redesign is preserved by move-only content reuse in Tasks 2 and 3.
- Full verification is covered by `npm test`, `npm run lint`, and `npm run build` in Tasks 3 and 4.

## Placeholder Scan

- No `TODO`, `TBD`, or deferred instructions remain.
- Every file move target is named explicitly.
- Every verification step includes the exact command to run.

## Type and Interface Consistency Check

- `HomePage` import target becomes `src/features/home/pages/HomePage.jsx` everywhere.
- `PresetPage` import target becomes `src/features/preset/pages/PresetPage.jsx` everywhere.
- `homePresets` and `topLaptopsByCategory` remain feature-local to `home`.
- `presetWeights`, `getTotalWeight`, and `isWeightTotalValid` remain feature-local to `preset`.
