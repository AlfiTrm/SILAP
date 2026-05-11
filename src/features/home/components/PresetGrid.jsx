import { homePresets } from '../data/presets'

function PresetGrid() {
  return (
    <section className="page-section">
      <div className="section-shell">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homePresets.map((preset) => (
            <article
              key={preset.name}
              tabIndex={0}
              className="group rounded-[var(--radius-soft)] bg-[var(--color-panel)] p-6 transition-colors duration-150 hover:bg-[var(--color-main-purple)] hover:text-white focus:bg-[var(--color-main-purple)] focus:text-white"
            >
              <h2 className="text-2xl font-semibold tracking-tight">{preset.name}</h2>
              <p className="mt-8 text-sm leading-6 text-current/80">
                {preset.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PresetGrid
