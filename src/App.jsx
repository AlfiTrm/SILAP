import { Route, Routes } from 'react-router-dom'
import AppShell from './app/AppShell'
import HomePage from './pages/HomePage'
import PresetPage from './pages/PresetPage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/preset" element={<PresetPage />} />
      </Route>
    </Routes>
  )
}

export default App
