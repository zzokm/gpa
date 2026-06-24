import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function read(path) {
  return readFileSync(join(ROOT, path), 'utf8')
}

function linesFrom(content, start, end) {
  return content.split(/\r?\n/).slice(start - 1, end).join('\n')
}

function escapeTemplate(css) {
  return css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

const index = read('.tmp-index.css')

const courseFormCss = [
  linesFrom(index, 397, 588),
  linesFrom(index, 1035, 1111),
  linesFrom(index, 1832, 1886),
  linesFrom(index, 1522, 1566),
  linesFrom(index, 1611, 1621),
  linesFrom(index, 1645, 1654),
].join('\n\n')

const groupedCss = [
  read('.tmp-gct.css'),
  read('.tmp-cts.css'),
  read('.tmp-chd.css'),
  linesFrom(index, 922, 1034),
  linesFrom(index, 1112, 1137),
  linesFrom(index, 1567, 1590),
  linesFrom(index, 1604, 1610),
  linesFrom(index, 1638, 1643),
  linesFrom(index, 1690, 1734),
].join('\n\n')

// Fix CourseForm closing + append styles
let cf = read('src/components/CourseForm.tsx')
cf = cf.replace(
  /    <\/div>\s*\n      <\/>\s*\n  \);\s*\n\};\s*\n\nexport default CourseForm;/,
  `    </div>
      )}
    </>
  );
};

function CourseFormStyles() {
  return <style jsx global>{\`${escapeTemplate(courseFormCss)}\`}</style>
}

export default CourseForm;`
)
writeFileSync(join(ROOT, 'src/components/CourseForm.tsx'), cf)
console.log('Appended CourseFormStyles')

// Fix GroupedCourseTable closing + append styles
let gct = read('src/components/GroupedCourseTable.tsx')
gct = gct.replace(
  /    <\/div>\s*\n    <\/>\s*\n  \);\s*\n\};\s*\n\nexport default GroupedCourseTable;/,
  `    </div>
      )}
    </>
  );
};

function GroupedCourseTableStyles() {
  return <style jsx global>{\`${escapeTemplate(groupedCss)}\`}</style>
}

export default GroupedCourseTable;`
)
writeFileSync(join(ROOT, 'src/components/GroupedCourseTable.tsx'), gct)
console.log('Appended GroupedCourseTableStyles')
