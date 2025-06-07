import React from 'react';
import { Course, Grade } from '../types/Course';
import { getGradeStyles } from '../utils/gradeUtils';
import GradeDropdown from './GradeDropdown';
import './CourseTableStyles.css'; // Import the fixed spacing styles

interface CourseTableProps {
  courses: Course[];
  onRemoveCourse: (id: string) => void;
  onUpdateGrade: (id: string, grade: Grade) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, onRemoveCourse, onUpdateGrade }) => {
  if (courses.length === 0) {
    return (
      <div className="table-box">
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <p>No courses added yet. Add your first course above or import your courses automatically!</p>
        </div>
      </div>
    );
  }

  return (    <div className="table-box">
      <table className="course-table">
        <thead className="table-header-hidden">
          <tr>
            <th>Course Name</th>
            <th>Credit Hours</th>
            <th>Grade</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="course-name">{course.name}</td>
              <td className="course-hours">{course.hours}</td>              <td>
                <div className="grade-cell">
                  <div className="grade-badge-container">
                    {course.grade !== null ? (
                      <span 
                        className="course-grade-badge" 
                        style={getGradeStyles(course.grade)}
                      >
                        {course.grade}
                      </span>
                    ) : (
                      <span className="course-grade-badge empty-grade">
                        -
                      </span>
                    )}
                  </div>
                  <GradeDropdown
                    courseId={course.id!}
                    courseName={course.name}
                    onSelectGrade={onUpdateGrade}
                    currentGrade={course.grade !== null ? course.grade : null}
                  />
                </div>
              </td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveCourse(course.id!)}
                  aria-label={`Remove ${course.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
                    <path d="M10.122 4.465 8 6.586 5.878 4.465 4.464 5.879 6.586 8l-2.122 2.121 1.414 1.414L8 9.414l2.122 2.121 1.414-1.414L9.414 8l2.122-2.121z"/>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>  );
};

export default CourseTable;
