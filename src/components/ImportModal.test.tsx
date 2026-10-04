import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ImportModal from './ImportModal'
import { LocaleProvider } from '../i18n/LocaleContext'

describe('ImportModal', () => {
  afterEach(() => {
    cleanup()
  })

  it('does not render when show is false', () => {
    render(
      <LocaleProvider>
        <ImportModal
          show={false}
          onHide={vi.fn()}
          onImport={vi.fn()}
          currentCourses={[]}
        />
      </LocaleProvider>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders modal dialog and textarea when show is true', () => {
    render(
      <LocaleProvider>
        <ImportModal
          show={true}
          onHide={vi.fn()}
          onImport={vi.fn()}
          currentCourses={[]}
        />
      </LocaleProvider>
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/paste html content here/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /import courses/i })).toBeInTheDocument()
  })

  it('displays error if submitted with empty text', () => {
    render(
      <LocaleProvider>
        <ImportModal
          show={true}
          onHide={vi.fn()}
          onImport={vi.fn()}
          currentCourses={[]}
        />
      </LocaleProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: /import courses/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/please paste the html code/i)
  })

  it('displays error if submitted with HTML that contains no valid courses', () => {
    render(
      <LocaleProvider>
        <ImportModal
          show={true}
          onHide={vi.fn()}
          onImport={vi.fn()}
          currentCourses={[]}
        />
      </LocaleProvider>
    )

    const textarea = screen.getByPlaceholderText(/paste html content here/i)
    fireEvent.change(textarea, { target: { value: '<div><p>Random invalid text</p></div>' } })
    fireEvent.click(screen.getByRole('button', { name: /import courses/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/no valid courses found/i)
  })

  it('calls onImport with parsed courses when valid new site HTML is submitted', () => {
    const onImportMock = vi.fn()
    const sampleHtml = `
      <div class="card">
        <div class="card-header">
          <h5 class="card-title"><span>Spring</span>&nbsp;<span>2025-2026</span></h5>
        </div>
        <table class="table">
          <thead>
            <tr><th>Code</th><th>Course</th><th>Credit Hours</th><th>Degree</th><th>Grade</th></tr>
          </thead>
          <tbody>
            <tr><td>CS214</td><td><span>Data Structures</span></td><td>3.0</td><td>85</td><td>A</td></tr>
          </tbody>
        </table>
      </div>
    `

    render(
      <LocaleProvider>
        <ImportModal
          show={true}
          onHide={vi.fn()}
          onImport={onImportMock}
          currentCourses={[]}
        />
      </LocaleProvider>
    )

    const textarea = screen.getByPlaceholderText(/paste html content here/i)
    fireEvent.change(textarea, { target: { value: sampleHtml } })
    fireEvent.click(screen.getByRole('button', { name: /import courses/i }))

    expect(onImportMock).toHaveBeenCalledTimes(1)
    const importedCourses = onImportMock.mock.calls[0][0]
    expect(importedCourses).toHaveLength(1)
    expect(importedCourses[0]).toMatchObject({
      name: 'Data Structures',
      hours: 3,
      grade: 'A',
      level: 'Second Level',
      term: 'Second Term',
      isImported: true,
    })
  })

  it('calls onHide when close button is clicked', () => {
    const onHideMock = vi.fn()
    render(
      <LocaleProvider>
        <ImportModal
          show={true}
          onHide={onHideMock}
          onImport={vi.fn()}
          currentCourses={[]}
        />
      </LocaleProvider>
    )

    const closeBtn = screen.getByLabelText(/close/i)
    fireEvent.click(closeBtn)
    expect(onHideMock).toHaveBeenCalledTimes(1)
  })
})
