function HeroSearch() {
  return (
    <form className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
      <label className="field-shell flex-1">
        <span className="sr-only">Cari nama laptop</span>
        <input
          type="text"
          name="query"
          placeholder="Cari nama laptop"
          className="w-full bg-transparent text-base outline-none placeholder:text-[var(--color-muted)]"
        />
      </label>
      <button type="submit" className="solid-button min-w-48">
        Cari Sekarang
      </button>
    </form>
  )
}

export default HeroSearch
