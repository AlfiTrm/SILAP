import { Route, Routes } from 'react-router-dom'
import AppShell from './AppShell'
import HomePage from '../pages/HomePage'
import PresetPage from '../pages/PresetPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/preset" element={<PresetPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
