import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Course, Grade } from '../types/Course';

import GradeDropdown from './GradeDropdown';
import EnhancedRotatingNumberInput from './RotatingNumberInput';

interface CourseFormProps {
  onAddCourse: (course: Course) => void;
  onShowImport: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ 
  onAddCourse, 
  onShowImport 
}) => {
  const [courseName, setCourseName] = useState('');
  const [courseHours, setCourseHours] = useState(2);  const [courseGrade, setCourseGrade] = useState<Grade>('A+');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddCourse({
      name: courseName,
      hours: courseHours,
      grade: courseGrade
    });

    // Reset form
    setCourseName('');
    setCourseHours(2); // Reset to default value
    setCourseGrade('A+');
  };return (
    <div className="top-box">
      <Form onSubmit={handleSubmit}>        <div className="form-row">
          <label className="form-label" htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            className="form-input"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)} 
            placeholder="Optional"
          />
        </div>        <div className="form-row">
          <label className="form-label" htmlFor="courseHours">Credit Hours:</label>          <EnhancedRotatingNumberInput
            value={courseHours}
            onChange={(value: number) => setCourseHours(value)}
            min={0}
            max={3}
            disabled={false}
          />
        </div><div className="form-row">
          <label className="form-label" htmlFor="courseGrade">Grade:</label>
          <div className="form-grade-container">
            <GradeDropdown
              courseId="form-grade"
              courseName="Form Grade"
              onSelectGrade={(_, grade) => setCourseGrade(grade)}
              currentGrade={courseGrade}
              displayMode="input"
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            Add Course
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onShowImport}
          >
            Import Courses
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;
