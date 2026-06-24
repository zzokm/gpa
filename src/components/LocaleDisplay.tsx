import type { ReactNode } from 'react'

type ClassNameProps = {
  className?: string
}

/** Western digits (0–9) in Arabic UI — avoids Eastern Arabic numerals. */
export function WesternDigits({ children, className }: { children: ReactNode } & ClassNameProps) {
  const cls = className ? `western-digits ${className}` : 'western-digits'
  return (
    <span className={cls} lang="en" dir="ltr">
      {children}
    </span>
  )
}

/** Letter grades (A+, C−) in Western order — avoids RTL flipping to +A. */
export function GradeLabel({ grade, className }: { grade: string } & ClassNameProps) {
  const cls = className ? `grade-ltr ${className}` : 'grade-ltr'
  return (
    <span className={cls} lang="en" dir="ltr">
      {grade}
    </span>
  )
}
