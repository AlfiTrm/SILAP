function RankingPanel({ items }) {
  return (
    <section className="grid gap-3">
      {items.map((item) => (
        <article key={item.name} className="rounded-[var(--radius-soft)] bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{item.note}</p>
            </div>
            <p className="text-2xl font-semibold text-[var(--color-main-purple)]">
              Skor {item.score}
            </p>
          </div>
          <dl className="mt-5 grid gap-2 text-sm md:grid-cols-2">
            <div>
              <dt className="text-[var(--color-muted)]">Harga</dt>
              <dd>{item.price}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">CPU</dt>
              <dd>{item.cpu}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">GPU</dt>
              <dd>{item.gpu}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">RAM</dt>
              <dd>{item.ram}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">Storage</dt>
              <dd>{item.storage}</dd>
            </div>
          </dl>
        </article>
      ))}
    </section>
  )
}

export default RankingPanel
