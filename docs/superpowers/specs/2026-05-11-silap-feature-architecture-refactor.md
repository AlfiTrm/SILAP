# SILAP Feature-Based Architecture Refactor Spec

Date: 2026-05-11
Project: SILAP frontend (`fe-spk`)
Scope: Refactor the current React frontend from mixed page/component/data folders into a hybrid `app + features + shared` structure.

## 1. Goal

Reorganize the SILAP frontend so that domain code for `Home` and `Preset` lives inside feature folders, while bootstrap and shell code remain at the app level.

The refactor should improve maintainability without changing user-facing behavior.

## 2. Chosen Architecture

Chosen direction: `Hybrid app + features`

Meaning:

- `app/` keeps global app concerns
- `features/home` owns all Home-specific code
- `features/preset` owns all Preset-specific code
- `shared/` holds cross-feature reusable assets when needed

## 3. Target Folder Structure

```txt
src/
  app/
    AppShell.jsx
    SiteHeader.jsx
    routes.jsx

  features/
    home/
      components/
        HeroSearch.jsx
        PresetGrid.jsx
        CategoryShowcase.jsx
      data/
        presets.js
        topLaptops.js
      pages/
        HomePage.jsx
      __tests__/
        HomePage.test.jsx

    preset/
      components/
        PresetSelector.jsx
        WeightSliderRow.jsx
        RankingPanel.jsx
      data/
        rankedLaptops.js
      lib/
        weighting.js
      pages/
        PresetPage.jsx
      __tests__/
        PresetPage.test.jsx
        weighting.test.js

  shared/
    styles/
      App.css
      index.css

  test/
    setup.js

  App.jsx
  main.jsx
```

## 4. Boundaries

- `App.jsx` and `app/*` may import from `features/*`
- `features/home` must not depend on `features/preset`
- `features/preset` must not depend on `features/home`
- Feature-local dummy data stays inside its feature
- Feature-local tests stay close to their feature
- Global CSS entry moves under `shared/styles`

## 5. Files to Move

### Into `app/`

- `src/app/AppShell.jsx`
- `src/app/SiteHeader.jsx`
- add `src/app/routes.jsx`

### Into `features/home/`

- `src/components/home/HeroSearch.jsx`
- `src/components/home/PresetGrid.jsx`
- `src/components/home/CategoryShowcase.jsx`
- `src/data/presets.js`
- `src/data/topLaptops.js`
- `src/pages/HomePage.jsx`
- `src/pages/__tests__/HomePage.test.jsx`

### Into `features/preset/`

- `src/components/preset/PresetSelector.jsx`
- `src/components/preset/WeightSliderRow.jsx`
- `src/components/preset/RankingPanel.jsx`
- `src/data/rankedLaptops.js`
- `src/lib/weighting.js`
- `src/lib/__tests__/weighting.test.js`
- `src/pages/PresetPage.jsx`
- `src/pages/__tests__/PresetPage.test.jsx`

### Into `shared/`

- `src/index.css` -> `src/shared/styles/index.css`
- `src/App.css` -> `src/shared/styles/App.css`

## 6. Behavior Constraints

- No visual redesign in this refactor
- No routing changes visible to users
- No changes to preset weighting behavior
- No changes to test expectations other than import path updates

## 7. Implementation Notes

- Prefer move-only changes where possible
- Update imports after file moves
- Keep route paths unchanged: `/` and `/preset`
- Keep test setup path stable from Vite/Vitest perspective
- Remove old empty folders after migration

## 8. Verification

The refactor is only complete if all three checks still pass after moves:

- `npm test`
- `npm run lint`
- `npm run build`

## 9. Success Criteria

- Current UI still renders the same pages and interactions
- Codebase is grouped by feature instead of mixed technical buckets
- Home and Preset each own their components, data, tests, and local helpers
- App-level concerns remain isolated in `app/`
