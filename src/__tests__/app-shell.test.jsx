import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('App shell routing', () => {
  it('renders the SILAP brand and the two main navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('SILAP')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Preset' })).toBeInTheDocument()
  })

  it('navigates from Home to Preset using the main navigation', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: 'Preset' }))

    expect(
      screen.getByRole('heading', { name: 'Preset Laptop' }),
    ).toBeInTheDocument()
  })
})
