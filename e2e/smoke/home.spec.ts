import { expect, test } from '@playwright/test'

test.describe('smoke', () => {
  test('home page loads with title and FCAI indicator', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'GPA Calculator' })).toBeVisible()
    await expect(page.locator('.fcai-status-indicator')).toBeVisible()
  })

  test('how-to modal opens and closes', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /how to import courses/i }).click()
    await expect(page.getByRole('heading', { name: /how to copy html/i })).toBeVisible()
    await page.getByRole('button', { name: /close/i }).click()
    await expect(page.getByRole('heading', { name: /how to copy html/i })).toBeHidden()
  })

  test('import modal opens', async ({ page }) => {
    await page.goto('/')
    await page.locator('button.btn-secondary', { hasText: 'Import Courses' }).click()
    await expect(page.getByRole('heading', { name: /import registered courses/i })).toBeVisible()
    await expect(page.locator('.import-modal .btn-primary')).toBeVisible()
  })

  test('can add a course manually', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Enter course name').fill('CS101')
    await page.getByRole('button', { name: /^add course$/i }).click()
    await expect(page.getByText('CS101')).toBeVisible()
  })

  test('gpa display shows zero initially', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.gpa-display .gpa-value')).toHaveText('0.00')
  })

  test('fcai status API responds', async ({ request }) => {
    const res = await request.get('/api/fcai-status')
    expect(res.ok()).toBeTruthy()
    const body = await res.json()
    expect(body).toHaveProperty('online')
    expect(typeof body.online).toBe('boolean')
  })

  test('language switcher toggles document language', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /switch language/i }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  })
})
