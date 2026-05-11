import { Outlet } from 'react-router-dom'
import SiteHeader from './SiteHeader'

function AppShell() {
  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AppShell
