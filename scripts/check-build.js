// Verifies static export output contains expected entry HTML and Next assets.
const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '..', 'out')

if (!fs.existsSync(outDir)) {
  console.error('ERROR: out directory does not exist. Run npm run build:static first.')
  process.exit(1)
}

const indexHtml = path.join(outDir, 'index.html')
if (!fs.existsSync(indexHtml)) {
  console.error('ERROR: out/index.html not found')
  process.exit(1)
}

const html = fs.readFileSync(indexHtml, 'utf-8')
if (!html.includes('_next')) {
  console.error('ERROR: index.html is missing Next.js asset references')
  process.exit(1)
}

const nextStaticDir = path.join(outDir, '_next', 'static')
if (!fs.existsSync(nextStaticDir)) {
  console.error('ERROR: out/_next/static not found')
  process.exit(1)
}

console.log('Static build check passed')
