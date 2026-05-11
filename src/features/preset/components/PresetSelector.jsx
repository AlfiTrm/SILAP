function PresetSelector({ presets, activePreset, onSelect }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {presets.map((preset) => {
        const active = preset === activePreset

        return (
          <button
            key={preset}
            type="button"
            onClick={() => onSelect(preset)}
            className={
              active
                ? 'rounded-[var(--radius-soft)] bg-[var(--color-main-blue)] px-5 py-5 text-left text-white'
                : 'rounded-[var(--radius-soft)] bg-[var(--color-panel)] px-5 py-5 text-left text-[var(--color-ink)]'
            }
          >
            <span className="text-lg font-semibold">{preset}</span>
          </button>
        )
      })}
    </div>
  )
}

export default PresetSelector
