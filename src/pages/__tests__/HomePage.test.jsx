import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../HomePage'

describe('HomePage', () => {
  it('renders the hero heading, search field, and main CTA', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Temukan Laptopmu' }),
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Cari nama laptop')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Cari Sekarang' }),
    ).toBeInTheDocument()
  })

  it('shows the four approved preset categories', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Gaming', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Konten Kreator', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Produktivitas', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Dana Pelajar', level: 2 }),
    ).toBeInTheDocument()
  })

  it('shows the top laptop by category section content', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Legion Slim 5')).toBeInTheDocument()
    expect(screen.getByText('ASUS ProArt P16')).toBeInTheDocument()
  })
})
