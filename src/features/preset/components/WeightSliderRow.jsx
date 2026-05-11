function WeightSliderRow({ label, name, value, onChange }) {
  return (
    <div className="grid gap-3 rounded-[var(--radius-soft)] bg-white p-4 md:grid-cols-[8rem_1fr_6rem] md:items-center">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(event) => onChange(name, Number(event.target.value))}
      />
      <input
        aria-label={`${label} percentage`}
        type="number"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(event) => onChange(name, Number(event.target.value))}
        className="rounded-full bg-[var(--color-panel)] px-4 py-3 outline-none"
      />
    </div>
  )
}

export default WeightSliderRow
