import { topLaptopsByCategory } from '../../data/topLaptops'

function CategoryShowcase() {
  return (
    <section className="page-section pt-0">
      <div className="section-shell">
        <div className="grid gap-3">
          {topLaptopsByCategory.map((entry) => (
            <article
              key={entry.category}
              className="rounded-[var(--radius-soft)] bg-white px-6 py-5"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg font-semibold">{entry.category}</h3>
                <p className="text-base">{entry.laptop}</p>
              </div>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{entry.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcase
