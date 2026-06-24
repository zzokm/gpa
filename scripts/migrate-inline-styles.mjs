/**
 * One-time migration: inline component CSS into TSX via styled-jsx global blocks.
 * Run: node scripts/migrate-inline-styles.mjs
 */
import { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function read(path) {
  return readFileSync(join(ROOT, path), 'utf8')
}

function escapeTemplate(css) {
  return css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function stripCssImports(content) {
  return content.replace(/^import\s+['"][^'"]+\.css['"];?\s*\r?\n?/gm, '')
}

function removeExistingStyleBlocks(content) {
  return content.replace(/\s*<style jsx(?:\s+global)?>\{`[\s\S]*?`\}<\/style>\s*/g, '\n')
}

function injectStyles(tsxPath, css, { wrapReturn = 'auto' } = {}) {
  const fullPath = join(ROOT, tsxPath)
  let content = stripCssImports(removeExistingStyleBlocks(read(tsxPath)))
  const styleBlock = `<style jsx global>{\`${escapeTemplate(css.trim())}\`}</style>`

  if (content.includes('createPortal(')) {
    content = content.replace(
      /return (?:ReactDOM\.)?createPortal\(\s*\r?\n(\s*)(<\w)/,
      `return createPortal(\n$1<>\n$1  ${styleBlock}\n$1$2`
    )
    content = content.replace(
      /(\s*)<\/div>\s*\r?\n(\s*)<\/div>,\s*\r?\n(\s*)document\.body(\s*\r?\n\s*\);)/,
      `$1</div>\n$2</div>\n$2</>,\n$3document.body$4`
    )
    writeFileSync(fullPath, content)
    console.log(`  injected portal styles → ${tsxPath}`)
    return
  }

  if (/return\s*\(\s*\r?\n?\s*<>/.test(content)) {
    content = content.replace(/(return\s*\(\s*\r?\n?\s*<>)/, `$1\n      ${styleBlock}\n`)
  } else if (wrapReturn === 'fragment') {
    content = content.replace(
      /return\s*\(\s*\r?\n(\s*)(<\w)/,
      `return (\n$1<>\n$1  ${styleBlock}\n$1$2`
    )
    content = content.replace(
      /(\r?\n)(\s*)(<\/\w+>)\s*\r?\n(\s*)\)\s*;?\s*$/,
      `$1$2$3$1$2</>$1$4);`
    )
  } else {
    throw new Error(`Could not inject styles into ${tsxPath}`)
  }

  writeFileSync(fullPath, content)
  console.log(`  injected styles → ${tsxPath}`)
}

function concatCss(...paths) {
  return paths
    .filter((p) => existsSync(join(ROOT, p)))
    .map((p) => read(p))
    .join('\n\n')
}

function deleteCss(...paths) {
  for (const p of paths) {
    const full = join(ROOT, p)
    if (existsSync(full)) {
      unlinkSync(full)
      console.log(`  deleted ${p}`)
    }
  }
}

/** Extract line range (1-based inclusive) from a file */
function linesFrom(file, start, end) {
  const all = read(file).split(/\r?\n/)
  return all.slice(start - 1, end).join('\n')
}

// --- Global tokens, reset, shared buttons (defined once) ---
// Merge font overrides from globals.css (single global block)
const globalCss = [
  read('app/globals.css'),
  linesFrom('src/index.css', 1, 150),
  linesFrom('src/index.css', 837, 920),
  linesFrom('src/index.css', 1661, 1688),
  linesFrom('src/index.css', 1784, 1810),
  linesFrom('src/index.css', 1811, 1830),
  read('src/responsive-fixes.css'),
].join('\n\n')

writeFileSync(
  join(ROOT, 'src/components/GlobalStyles.tsx'),
  `'use client'

export default function GlobalStyles() {
  return (
    <style jsx global>{\`${escapeTemplate(globalCss)}\`}</style>
  )
}
`
)
if (!existsSync(join(ROOT, 'src/components/GlobalStyles.tsx'))) {
  console.log('Created src/components/GlobalStyles.tsx')
} else {
  console.log('Updated src/components/GlobalStyles.tsx')
}

// --- Page shell ---
const pageCss = [
  linesFrom('src/index.css', 154, 395),
  '.app-course-workspace {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-md);\n}',
  // Responsive chunks that only touch page classes
  linesFrom('src/index.css', 1507, 1520),
  linesFrom('src/index.css', 1591, 1594),
].join('\n\n')

if (!read('app/page.tsx').includes('<style jsx global>')) {
  injectStyles('app/page.tsx', pageCss, { wrapReturn: 'fragment' })
}

// --- Per-component bundles ---
const bundles = [
  {
    tsx: 'src/components/FCAIStatusIndicator.tsx',
    css: ['src/components/FCAIStatusIndicator.css'],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/HowToButton.tsx',
    css: ['src/components/HeaderFloatBtn.css'],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/LanguageSwitcher.tsx',
    css: [],
    wrapReturn: 'fragment',
    skip: true, // styles live in HowToButton.tsx (header-float-btn shared once)
  },
  {
    tsx: 'src/components/GPAStickySummary.tsx',
    css: ['src/components/GPAStickySummary.css'],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/GPADisplay.tsx',
    css: ['src/components/GPADisplayStyles.css', linesFrom('src/index.css', 1138, 1187)],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/Footer.tsx',
    css: ['src/components/Footer.css'],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/CourseForm.tsx',
    css: [
      linesFrom('src/index.css', 397, 456),
      linesFrom('src/index.css', 457, 588),
      linesFrom('src/index.css', 1035, 1111),
      linesFrom('src/index.css', 1832, 1886),
      linesFrom('src/index.css', 1522, 1566),
      linesFrom('src/index.css', 1611, 1621),
      linesFrom('src/index.css', 1645, 1654),
    ],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/RotatingNumberInput.tsx',
    css: [
      'src/components/RotatingNumberInput.css',
      'src/components/MobileCreditHoursOverride.css',
      linesFrom('src/index.css', 702, 835),
      linesFrom('src/index.css', 1758, 1782),
    ],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/GradeDropdown.tsx',
    css: [
      linesFrom('src/index.css', 1289, 1505),
      linesFrom('src/index.css', 1736, 1756),
    ],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/GroupedCourseTable.tsx',
    css: [
      'src/components/GroupedCourseTable.css',
      'src/components/CourseTableStyles.css',
      'src/components/CreditHoursDropdownStyles.css',
      linesFrom('src/index.css', 922, 1034),
      linesFrom('src/index.css', 1112, 1137),
      linesFrom('src/index.css', 1567, 1590),
      linesFrom('src/index.css', 1604, 1610),
      linesFrom('src/index.css', 1638, 1643),
      linesFrom('src/index.css', 1690, 1734),
    ],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/ImportModal.tsx',
    css: [
      linesFrom('src/index.css', 557, 588),
      linesFrom('src/index.css', 1207, 1288),
      linesFrom('src/index.css', 1888, 2032),
      linesFrom('src/index.css', 1573, 1588),
      linesFrom('src/index.css', 1596, 1602),
    ],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/HowToModal.tsx',
    css: [linesFrom('src/index.css', 2033, 2171)],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/ConfirmationModal.tsx',
    css: ['src/components/ConfirmationModalStyles.css'],
    wrapReturn: 'fragment',
  },
  {
    tsx: 'src/components/StatsModal.tsx',
    css: ['src/components/StatsModalStyles.css'],
    wrapReturn: 'fragment',
  },
]

// Skip already-migrated components when re-running
const SKIP_IF_STYLED = new Set([
  'app/page.tsx',
  'src/components/FCAIStatusIndicator.tsx',
  'src/components/HowToButton.tsx',
  'src/components/GPAStickySummary.tsx',
  'src/components/GPADisplay.tsx',
  'src/components/Footer.tsx',
  'src/components/CourseForm.tsx',
  'src/components/RotatingNumberInput.tsx',
  'src/components/GradeDropdown.tsx',
  'src/components/GroupedCourseTable.tsx',
])

for (const bundle of bundles) {
  if (bundle.skip || SKIP_IF_STYLED.has(bundle.tsx)) continue
  const cssParts = bundle.css.map((part) =>
    typeof part === 'string' && part.includes('\n') ? part : part.includes('/') ? read(part) : part
  )
  injectStyles(bundle.tsx, cssParts.join('\n\n'), { wrapReturn: bundle.wrapReturn ?? 'fragment' })
}

// EnhancedRotatingNumberInput reuses RotatingNumberInput styles — strip its css imports only
const erPath = 'src/components/EnhancedRotatingNumberInput.tsx'
let er = stripCssImports(read(erPath))
writeFileSync(join(ROOT, erPath), er)
console.log('  stripped css imports → EnhancedRotatingNumberInput.tsx')

// CreditHoursDropdown — no css import; may use table styles from GroupedCourseTable (global classes)

// Update layout
let layout = read('app/layout.tsx')
layout = layout.replace(/\s*import '\.\.\/src\/index\.css'\s*\n/, '\n')
layout = layout.replace(/\s*import '\.\.\/src\/responsive-fixes\.css'\s*\n/, '\n')
layout = layout.replace(
  "import './globals.css'",
  "import './globals.css'\nimport GlobalStyles from '../src/components/GlobalStyles'"
)
layout = layout.replace('<body>{children}</body>', '<body>\n        <GlobalStyles />\n        {children}\n      </body>')
layout = layout.replace(
  '// CSS loading order: Bootstrap → globals (font) → index (tokens + base styles) → responsive-fixes (overrides)',
  '// CSS: Bootstrap → globals (font) → GlobalStyles (tokens + shared primitives, inlined in TSX)'
)
writeFileSync(join(ROOT, 'app/layout.tsx'), layout)
console.log('Updated app/layout.tsx')

// Merge globals.css font rules into GlobalStyles? Keep globals.css minimal for font !important
// Remove duplicate app-title gradient text per impeccable bans? User didn't ask — keep behavior

// Delete all migrated css files
const cssToDelete = [
  'src/index.css',
  'src/responsive-fixes.css',
  'src/components/FCAIStatusIndicator.css',
  'src/components/HeaderFloatBtn.css',
  'src/components/GPAStickySummary.css',
  'src/components/GPADisplayStyles.css',
  'src/components/Footer.css',
  'src/components/GroupedCourseTable.css',
  'src/components/CourseTableStyles.css',
  'src/components/CreditHoursDropdownStyles.css',
  'src/components/RotatingNumberInput.css',
  'src/components/MobileCreditHoursOverride.css',
  'src/components/ConfirmationModalStyles.css',
  'src/components/StatsModalStyles.css',
]
deleteCss(...cssToDelete)

// Strip LanguageSwitcher css import
let ls = stripCssImports(read('src/components/LanguageSwitcher.tsx'))
writeFileSync(join(ROOT, 'src/components/LanguageSwitcher.tsx'), ls)

console.log('\nDone. Run npm run build to verify.')
