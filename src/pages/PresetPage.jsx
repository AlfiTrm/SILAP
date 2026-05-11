import { useState } from 'react'
import PresetSelector from '../components/preset/PresetSelector'
import RankingPanel from '../components/preset/RankingPanel'
import WeightSliderRow from '../components/preset/WeightSliderRow'
import { rankedLaptops } from '../data/rankedLaptops'
import {
  getTotalWeight,
  isWeightTotalValid,
  presetWeights,
} from '../lib/weighting'

const presetNames = ['Gaming', 'Konten Kreator', 'Produktivitas', 'Dana Pelajar']
const criteria = [
  ['harga', 'Harga'],
  ['cpu', 'CPU'],
  ['gpu', 'GPU'],
  ['ram', 'RAM'],
  ['storage', 'Storage'],
  ['display', 'Display'],
  ['battery', 'Battery'],
  ['weight', 'Weight'],
]

function PresetPage() {
  const [activePreset, setActivePreset] = useState('Gaming')
  const [weights, setWeights] = useState({ ...presetWeights.Gaming })

  const total = getTotalWeight(weights)
  const valid = isWeightTotalValid(weights)

  function handlePresetSelect(name) {
    setActivePreset(name)
    setWeights({ ...presetWeights[name] })
  }

  function handleWeightChange(name, value) {
    setWeights((current) => ({
      ...current,
      [name]: Number.isNaN(value) ? 0 : value,
    }))
  }

  return (
    <section className="page-section pt-8 md:pt-12">
      <div className="section-shell grid gap-8">
        <header className="grid gap-3">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Preset Laptop
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            Pilih preset lalu atur pembobotan delapan kriteria sampai totalnya
            tepat 100%.
          </p>
        </header>

        <PresetSelector
          presets={presetNames}
          activePreset={activePreset}
          onSelect={handlePresetSelect}
        />

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="grid gap-4">
            {criteria.map(([name, label]) => (
              <WeightSliderRow
                key={name}
                name={name}
                label={label}
                value={weights[name]}
                onChange={handleWeightChange}
              />
            ))}
            <div className="flex flex-col gap-4 rounded-[var(--radius-soft)] bg-[var(--color-panel)] p-5 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-[var(--color-muted)]">
                Total bobot: {total}%
              </p>
              <button
                type="button"
                className="solid-button"
                disabled={!valid}
                aria-disabled={!valid}
              >
                Lihat Rekomendasi
              </button>
            </div>
          </section>

          <RankingPanel items={rankedLaptops} />
        </div>
      </div>
    </section>
  )
}

export default PresetPage
