import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function read(path) {
  return readFileSync(join(ROOT, path), 'utf8')
}

function write(path, content) {
  writeFileSync(join(ROOT, path), content)
}

function escapeTemplate(css) {
  return css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

// --- GroupedCourseTable: move CSS out of GroupHeaderStats ---
{
  let gct = read('src/components/GroupedCourseTable.tsx')
  const match = gct.match(
    /function GroupHeaderStats\([\s\S]*?<style jsx global>\{`([\s\S]*?)`\}<\/style>\s*/
  )
  if (!match) throw new Error('GroupedCourseTable style block not found')
  const css = match[1]

  gct = gct.replace(
    /function GroupHeaderStats\(\{ stats, label \}: GroupHeaderStatsProps\) \{\s*const \{ t \} = useLocale\(\);\s*return \(\s*<>\s*<style jsx global>\{`[\s\S]*?`\}<\/style>\s*/,
    `function GroupHeaderStats({ stats, label }: GroupHeaderStatsProps) {
  const { t } = useLocale();

  return (
    `
  )

  gct = gct.replace(
    /  if \(courses\.length === 0\) \{\s*return \(\s*<div className="table-box">([\s\S]*?)<\/div>\s*\);\s*\}\s*return \(\s*<div className="table-box">/,
    `  return (
    <>
      <GroupedCourseTableStyles />
      {courses.length === 0 ? (
      <div className="table-box">$1</div>
      ) : (
    <div className="table-box">`
  )

  gct = gct.replace(
    /    <\/div>\s*\n  \);\s*\n\};\s*\n\nexport default GroupedCourseTable;/,
    `    </div>
      )}
    </>
  );
};

function GroupedCourseTableStyles() {
  return (
    <style jsx global>{\`${escapeTemplate(css)}\`}</style>
  )
}

export default GroupedCourseTable;`
  )

  write('src/components/GroupedCourseTable.tsx', gct)
  console.log('Fixed GroupedCourseTable.tsx')
}

// --- CourseForm ---
{
  let cf = read('src/components/CourseForm.tsx')
  const styleMatch = cf.match(/<style jsx global>\{`([\s\S]*?)`\}<\/style>/)
  if (!styleMatch) throw new Error('CourseForm style block not found')
  const css = styleMatch[1]
  cf = cf.replace(/\s*<style jsx global>\{`[\s\S]*?`\}<\/style>\s*/g, '\n')

  cf = cf.replace(
    /  if \(hasCourses && !isExpanded\) \{\s*return \(\s*<>\s*<div className="top-box top-box-compact">([\s\S]*?)<\/div>\s*\);\s*\}\s*return \(\s*<div className="top-box">/,
    `  return (
    <>
      <CourseFormStyles />
      {hasCourses && !isExpanded ? (
      <div className="top-box top-box-compact">$1</div>
      ) : (
    <div className="top-box">`
  )

  cf = cf.replace(
    /    <\/Form>\s*\n    <\/div>\s*\n  \);\s*\n\};\s*\n\nexport default CourseForm;/,
    `    </Form>
    </div>
      )}
    </>
  );
};

function CourseFormStyles() {
  return <style jsx global>{\`${escapeTemplate(css)}\`}</style>
}

export default CourseForm;`
  )

  write('src/components/CourseForm.tsx', cf)
  console.log('Fixed CourseForm.tsx')
}

// --- HowToButton ---
{
  let htb = read('src/components/HowToButton.tsx')
  const styleMatch = htb.match(/<style jsx global>\{`([\s\S]*?)`\}<\/style>/)
  if (!styleMatch) throw new Error('HowToButton style block not found')
  const css = styleMatch[1]

  htb = htb.replace(
    /function HelpIcon\(\) \{\s*return \(\s*<>\s*<style jsx global>\{`[\s\S]*?`\}<\/style>\s*/,
    'function HelpIcon() {\n  return (\n    '
  )

  htb = htb.replace(
    /export default function HowToButton\(\{ onClick \}: HowToButtonProps\) \{\s*const \{ t \} = useLocale\(\)\s*return \(\s*<div className="header-float-btn how-to-btn"/,
    `function HowToButtonStyles() {
  return <style jsx global>{\`${escapeTemplate(css)}\`}</style>
}

export default function HowToButton({ onClick }: HowToButtonProps) {
  const { t } = useLocale()

  return (
    <>
      <HowToButtonStyles />
    <div className="header-float-btn how-to-btn"`
  )

  htb = htb.replace(
    /    <\/div>\s*\n  \)\s*\n\}\s*$/,
    `    </div>
    </>
  )
}
`
  )

  write('src/components/HowToButton.tsx', htb)
  console.log('Fixed HowToButton.tsx')
}

// --- HowToModal portal close ---
{
  let htm = read('src/components/HowToModal.tsx')
  htm = htm.replace(
    /    <\/div>\s*,\s*\n\s*document\.body\s*\n\s*\)/,
    `    </div>
    </>,
    document.body
  )`
  )
  write('src/components/HowToModal.tsx', htm)
  console.log('Fixed HowToModal.tsx')
}
