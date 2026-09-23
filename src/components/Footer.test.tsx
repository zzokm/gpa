import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, afterEach } from 'vitest'
import Footer from './Footer'
import { LocaleProvider } from '../i18n/LocaleContext'

vi.mock('../analytics', () => ({
  track: vi.fn(),
}))

afterEach(() => {
  cleanup()
})

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider>{ui}</LocaleProvider>)
}

describe('Footer', () => {
  it('renders Explore FCAI Courses pill button with redirect link and target _blank', async () => {
    const user = userEvent.setup()
    renderWithLocale(<Footer />)

    const exploreLink = screen.getByRole('link', { name: /explore fcai courses/i })
    expect(exploreLink).toBeInTheDocument()
    expect(exploreLink).toHaveAttribute('href', 'https://fcai.yehia.dev')
    expect(exploreLink).toHaveAttribute('target', '_blank')
    expect(exploreLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(exploreLink).toHaveClass('footer-explore-btn')

    await user.click(exploreLink)
  })

  it('renders creator and star links with valid targets', () => {
    renderWithLocale(<Footer />)

    const creatorLink = screen.getByRole('link', { name: /made by yehia/i })
    expect(creatorLink).toBeInTheDocument()
    expect(creatorLink).toHaveAttribute('href', 'https://github.com/zzokm')
    expect(creatorLink).toHaveAttribute('target', '_blank')

    const starLink = screen.getByRole('link', { name: /star/i })
    expect(starLink).toBeInTheDocument()
    expect(starLink).toHaveAttribute('href', 'https://github.com/zzokm/gpa')
    expect(starLink).toHaveAttribute('target', '_blank')
  })
})
