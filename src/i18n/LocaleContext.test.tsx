import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { LocaleProvider, useLocale } from './LocaleContext'

function LocaleProbe() {
  const { locale, setLocale, t, translateLevelOrTerm } = useLocale()
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="greeting">{t('app.title')}</span>
      <span data-testid="level">{translateLevelOrTerm('First Level')}</span>
      <button type="button" onClick={() => setLocale('ar-EG')}>
        Switch
      </button>
    </div>
  )
}

describe('LocaleContext', () => {
  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('translates keys and level names', () => {
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>
    )

    expect(screen.getByTestId('greeting')).toHaveTextContent('GPA Calculator')
    expect(screen.getByTestId('level')).toHaveTextContent('First Level')
  })

  it('persists locale changes', async () => {
    const user = userEvent.setup()

    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Switch' }))
    expect(screen.getByTestId('locale')).toHaveTextContent('ar-EG')
    expect(localStorage.getItem('gpa-persist-v1-locale')).toBe('ar-EG')
  })
})
