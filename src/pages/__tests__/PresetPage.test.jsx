import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PresetPage from '../PresetPage'

describe('PresetPage', () => {
  it('renders all approved preset categories and criteria labels', () => {
    render(<PresetPage />)

    expect(screen.getByText('Gaming')).toBeInTheDocument()
    expect(screen.getByText('Konten Kreator')).toBeInTheDocument()
    expect(screen.getByText('Produktivitas')).toBeInTheDocument()
    expect(screen.getByText('Dana Pelajar')).toBeInTheDocument()

    expect(screen.getByLabelText('Harga')).toBeInTheDocument()
    expect(screen.getByLabelText('CPU')).toBeInTheDocument()
    expect(screen.getByLabelText('GPU')).toBeInTheDocument()
    expect(screen.getByLabelText('RAM')).toBeInTheDocument()
    expect(screen.getByLabelText('Storage')).toBeInTheDocument()
    expect(screen.getByLabelText('Display')).toBeInTheDocument()
    expect(screen.getByLabelText('Battery')).toBeInTheDocument()
    expect(screen.getByLabelText('Weight')).toBeInTheDocument()
  })

  it('disables the recommendation button when total weight is invalid', async () => {
    const user = userEvent.setup()
    render(<PresetPage />)

    const inputs = screen.getAllByRole('spinbutton')
    await user.clear(inputs[0])
    await user.type(inputs[0], '9')

    expect(
      screen.getByRole('button', { name: 'Lihat Rekomendasi' }),
    ).toBeDisabled()
  })

  it('shows the current total weight summary', () => {
    render(<PresetPage />)

    expect(screen.getByText('Total bobot: 100%')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Lihat Rekomendasi' }),
    ).toBeEnabled()
  })
})
