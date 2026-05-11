import CategoryShowcase from '../components/CategoryShowcase'
import HeroSearch from '../components/HeroSearch'
import PresetGrid from '../components/PresetGrid'

function HomePage() {
  return (
    <>
      <section className="page-section pt-8 md:pt-14">
        <div className="section-shell">
          <div className="rounded-[2rem] bg-white px-6 py-14 md:px-10 md:py-20">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              Temukan Laptopmu
            </h1>
            <HeroSearch />
          </div>
        </div>
      </section>

      <PresetGrid />
      <CategoryShowcase />
    </>
  )
}

export default HomePage
