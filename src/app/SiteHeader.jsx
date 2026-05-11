import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/preset', label: 'Preset' },
]

function SiteHeader() {
  return (
    <header className="site-shell py-8">
      <div className="flex items-center justify-between gap-6">
        <NavLink to="/" className="text-2xl font-semibold tracking-tight">
          SILAP
        </NavLink>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-6 text-sm font-medium"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? 'text-[var(--color-main-purple)]'
                  : 'text-[var(--color-ink)]'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
