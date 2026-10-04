import { defineConfig, devices } from '@playwright/test'

const PORT = process.env.PORT || '3000'
const baseURL = process.env.PLAYWRIGHT_BASE_URL || (process.env.CI ? `http://127.0.0.1:${PORT}` : `http://localhost:${PORT}`)

export default defineConfig({
  testDir: './e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npm run start:standalone',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
})
