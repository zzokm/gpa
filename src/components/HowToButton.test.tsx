import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import HowToButton from './HowToButton'
import { LocaleProvider } from '../i18n/LocaleContext'

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider>{ui}</LocaleProvider>)
}

describe('HowToButton', () => {
  it('renders label and handles click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    renderWithLocale(<HowToButton onClick={onClick} />)

    const button = screen.getByRole('button', { name: /how to import courses/i })
    expect(button).toBeInTheDocument()
    await user.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })
})
