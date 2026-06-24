/**
 * Extract styled-jsx global blocks into static CSS files (fixes FOUC).
 * Run: node scripts/extract-styled-jsx-to-css.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname, basename, relative } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const STYLE_RE = /<style jsx global>\{`([\s\S]*?)`\}<\/style>/g

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      if (name === 'node_modules' || name === '.next') continue
      walk(path, files)
    } else if (/\.(tsx|jsx)$/.test(name)) {
      files.push(path)
    }
  }
  return files
}

function cssImportPath(fromFile, cssFile) {
  const fromDir = dirname(fromFile)
  let rel = relative(fromDir, cssFile).replace(/\\/g, '/')
  if (!rel.startsWith('.')) rel = `./${rel}`
  return rel
}

function ensureCssImport(content, importPath) {
  const stmt = `import '${importPath}'\n`
  if (content.includes(stmt.trim())) return content
  const useClient = content.match(/^'use client'\s*\n/)
  if (useClient) {
    return content.replace(/^('use client'\s*\n)/, `$1${stmt}`)
  }
  return stmt + content
}

function processFile(filePath, { outCssPath } = {}) {
  let content = readFileSync(filePath, 'utf8')
  const blocks = [...content.matchAll(STYLE_RE)]
  if (blocks.length === 0) return false

  const css = blocks.map((m) => m[1]).join('\n\n')
  const cssPath =
    outCssPath ??
    join(dirname(filePath), `${basename(filePath).replace(/\.(tsx|jsx)$/, '')}.css`)

  writeFileSync(cssPath, css.trimStart() + '\n')

  content = content.replace(STYLE_RE, '')
  content = content.replace(
    /\nfunction \w+Styles\(\) \{\s*return \(\s*\);\s*\}\s*/g,
    '\n',
  )
  content = content.replace(/<>\s*<\/>\s*/g, '')
  content = content.replace(/<(\w+Styles)\s*\/?>/g, '')
  content = content.replace(/<(\w+Styles)><\/\1>/g, '')
  content = content.replace(/\n{3,}/g, '\n\n')

  const importPath = cssImportPath(filePath, cssPath)
  content = ensureCssImport(content, importPath)

  writeFileSync(filePath, content)
  console.log(`${relative(ROOT, filePath)} → ${relative(ROOT, cssPath)}`)
  return true
}

// GlobalStyles → app/globals.css
const globalTsx = join(ROOT, 'src/components/GlobalStyles.tsx')
let globalContent = readFileSync(globalTsx, 'utf8')
const globalBlocks = [...globalContent.matchAll(STYLE_RE)]
if (globalBlocks.length > 0) {
  const css = globalBlocks.map((m) => m[1]).join('\n\n')
  writeFileSync(join(ROOT, 'app/globals.css'), css.trimStart() + '\n')
  console.log('src/components/GlobalStyles.tsx → app/globals.css')
}

// page.tsx → app/home.css
const pageTsx = join(ROOT, 'app/page.tsx')
processFile(pageTsx, { outCssPath: join(ROOT, 'app/home.css') })

// All component TSX files
for (const file of walk(join(ROOT, 'src'))) {
  if (file.endsWith('GlobalStyles.tsx')) continue
  processFile(file)
}

// Remove GlobalStyles component file content — layout will import globals.css
writeFileSync(
  globalTsx,
  `/** @deprecated Styles moved to app/globals.css — import there from layout.tsx */\nexport {}\n`,
)

console.log('Done.')
