import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const index = readFileSync(join(ROOT, '.tmp-index.css'), 'utf8')

function linesFrom(content, start, end) {
  return content.split(/\r?\n/).slice(start - 1, end).join('\n')
}

function escapeTemplate(css) {
  return css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

const courseFormCss = [
  linesFrom(index, 397, 588),
  linesFrom(index, 1035, 1111),
  linesFrom(index, 1832, 1886),
  linesFrom(index, 1522, 1566),
  linesFrom(index, 1611, 1621),
  linesFrom(index, 1645, 1654),
].join('\n\n')

const path = join(ROOT, 'src/components/CourseForm.tsx')
let cf = readFileSync(path, 'utf8')
const marker = 'function CourseFormStyles()'
const idx = cf.indexOf(marker)
if (idx === -1) throw new Error('CourseFormStyles marker not found')
const head = cf.slice(0, idx)
cf = head + `function CourseFormStyles() {
  return <style jsx global>{\`${escapeTemplate(courseFormCss)}\`}</style>
  )
}

export default CourseForm;
`
writeFileSync(path, cf)
console.log('Completed CourseFormStyles')
