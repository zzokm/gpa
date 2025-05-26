# GPA Calculator for FCAI - Cairo University

A modern, interactive GPA calculator web application designed specifically for Faculty of Computer and Artificial Intelligence (FCAI) students at Cairo University. This tool helps students calculate their GPA based on the university's grading system.

![GPA Calculator Screenshot](https://github.com/zzokm/gpa/raw/main/screenshot.png)

## Features

- **Intuitive Course Management**: Add, edit, and remove courses with ease
- **Grade Selection**: Choose from standard letter grades (A+ to F)
- **Credit Hour Selection**: Specify credit hours for each course (1-3)
- **Real-time GPA Calculation**: Instantly see your GPA update as you modify courses
- **Course Import**: Import your registered courses directly from the university portal
- **Local Storage**: Your courses are saved in your browser for future visits
- **Modern UI**: Clean, responsive design with animated interactions
- **Dynamic Background**: Subtle animated background using Three.js

## Live Demo

You can try the calculator at: [https://zzokm.github.io/gpa/](https://zzokm.github.io/gpa/)

## How to Use

### Adding Courses Manually

1. Enter your course name (optional)
2. Select the number of credit hours (1-3)
3. Choose a grade (default is A+)
4. Click "Add Course"

### Importing Courses from the Portal

1. Click the "Import Courses" button
2. Go to the [FCAI Course Registration Portal](http://newecom.fci.cu.edu.eg/#/courses-per-students)
3. Copy the HTML content of your registered courses page
4. Paste it into the import dialog
5. Click "Import Courses"

### Managing Courses

- Change a course's grade by clicking the grade indicator
- Remove a course by clicking the X button
- Your GPA is automatically calculated based on your courses

## Technical Overview

This application is built using modern web technologies:

- **React**: Front-end library for building the user interface
- **TypeScript**: For type-safe code
- **Vite**: Build tool and development server
- **Three.js**: 3D graphics for the background animation
- **Local Storage API**: For persisting data between sessions

## Project Structure

```
src/
├── components/           # React components
│   ├── CourseForm.tsx    # Form for adding courses
│   ├── CourseTable.tsx   # Display of added courses
│   ├── GPADisplay.tsx    # GPA visualization
│   ├── GradeDropdown.tsx # Grade selection dropdown
│   ├── ImportModal.tsx   # Course import functionality
│   └── ThreeJSBackground.tsx # Animated background
├── types/
│   └── Course.ts         # TypeScript interfaces and types
├── utils/
│   └── gradeUtils.ts     # GPA calculation and grade utilities
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## Detailed Component Functionality

### App Component (`App.tsx`)

The main component that:
- Manages the application state (courses, modals)
- Handles data persistence using local storage
- Orchestrates the interactions between components

### Course Management

#### `CourseForm.tsx`

Handles course creation with:
- Input validation for course details
- Animated credit hour selection
- Grade selection via dropdown

#### `CourseTable.tsx`

Displays added courses with:
- Color-coded grade badges
- Inline grade editing
- Course removal functionality

#### `ImportModal.tsx`

Provides functionality to:
- Import courses in bulk from the university portal
- Parse HTML content to extract course information
- Validate imported data before adding to the course list

### GPA Calculation (`gradeUtils.ts`)

The core calculations include:

```typescript
// Convert letter grade to GPA points
export function letterToPoints(letter: Grade | null): number {
  if (letter === null) return 0; 
  
  switch (letter) {
    case 'A+': return 4.0;
    case 'A':  return 3.7;
    case 'A-': return 3.4;
    case 'B+': return 3.2;
    case 'B':  return 3.0;
    case 'B-': return 2.8;
    case 'C+': return 2.6;
    case 'C':  return 2.4;
    case 'C-': return 2.2;
    case 'D+': return 2.0;
    case 'D':  return 1.5;
    case 'D-': return 1.0;
    case 'F':  return 0.0;
    default:   return 0.0;
  }
}

// Calculate GPA from courses
export function calculateGPA(courses: Course[]): number {
  if (courses.length === 0) return 0;

  // Only include courses that have grades
  const coursesWithGrades = courses.filter(course => course.grade !== null);
  if (coursesWithGrades.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  coursesWithGrades.forEach(course => {
    const points = letterToPoints(course.grade);
    totalPoints += points * course.hours;
    totalCredits += course.hours;
  });

  return totalCredits > 0 ? (totalPoints / totalCredits) : 0;
}
```

### UI Enhancements

#### `GradeDropdown.tsx`

A sophisticated dropdown component that:
- Uses React portals for proper stacking context
- Includes color-coded grade options
- Adjusts position automatically to stay within viewport
- Prevents table row hover effects during interaction

#### `ThreeJSBackground.tsx`

Creates an engaging background using Three.js:
- GLSL shaders for smooth color transitions
- Responsive canvas that adjusts to window size
- Optimized performance with minimal rendering

## Development

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/zzokm/gpa.git
cd gpa
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

### Deployment

This project is hosted on GitHub Pages. To deploy updates:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy the application.

## Technical Specifications

- **Grading System**: Based on FCAI - Cairo University's 4.0 scale
- **Browser Support**: Modern browsers with localStorage and ES6+ support
- **Responsive Design**: Works on devices from mobile phones to desktops
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized animations and rendering for smooth experience

## Contributions

Contributions are welcome! If you'd like to improve this calculator, please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is released under the MIT License - see the LICENSE file for details.

---

Created by [Your Name] for FCAI - Cairo University students
