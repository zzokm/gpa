import { expect, test } from '@playwright/test'
import fs from 'fs'
import path from 'path'

test.describe('new site import smoke test', () => {
  const fixturePath = path.resolve(__dirname, '../../src/utils/__fixtures__/newsite-sample.html')
  const fixtureHtml = fs.readFileSync(fixturePath, 'utf8')

  test('imports courses from mocked new site HTML clone and updates GPA calculation and UI', async ({ page }) => {
    await page.goto('/')

    // Initial state check: 0.00 GPA
    const gpaValue = page.locator('.gpa-sticky-summary .gpa-sticky-value').first()
    await expect(gpaValue).toHaveText('0.00')

    // Open import modal
    await page.locator('button.btn-secondary', { hasText: /import courses/i }).click()
    const importModal = page.locator('.import-modal')
    await expect(importModal).toBeVisible()

    // Paste mocked new site HTML clone into textarea
    const textarea = importModal.locator('.import-textarea')
    await textarea.fill(fixtureHtml)

    // Submit import
    await importModal.locator('.btn-primary', { hasText: /import courses/i }).click()

    // Modal should close upon successful import
    await expect(importModal).toBeHidden()

    // Verify latest semester courses are rendered in the active open group
    await expect(page.getByText('Data Structures')).toBeVisible()
    await expect(page.getByText('Database Systems')).toBeVisible()

    // Verify calculated cumulative GPA is updated and matches expected weighted GPA (3.39)
    await expect(gpaValue).toHaveText('3.39')

    // Verify semester group headers and statistics are rendered
    await expect(page.getByRole('button', { name: /First Level/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Second Level/i })).toBeVisible()

    // Expand an earlier term to verify accordion toggling and inner courses
    const firstLevelHeader = page.getByRole('button', { name: /First Level/i })
    await expect(firstLevelHeader).toBeVisible()
    
    // Click First Term under First Level to expand it
    const firstTermButton = page.getByRole('button', { name: /First Term/i }).first()
    await firstTermButton.click()
    await expect(page.getByText('Introduction to Computer Science')).toBeVisible()

    // Verify language switcher maintains imported course groupings
    const langBtn = page.locator('.language-switcher button')
    await langBtn.click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    await expect(page.getByText('Data Structures')).toBeVisible()

    // Switch back to English
    await langBtn.click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    // Test reset functionality
    await page.locator('.reset-button').click()
    const confirmModal = page.locator('.confirmation-modal')
    await expect(confirmModal).toBeVisible()
    await confirmModal.locator('.btn-danger').click()
    await expect(confirmModal).toBeHidden()

    // Table should return to empty state and GPA to 0.00
    await expect(gpaValue).toHaveText('0.00')
    await expect(page.locator('.empty-state')).toBeVisible()
  })
})
