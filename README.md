# GPA Calculator for FCAI - Cairo University

A modern, interactive GPA calculator web application designed specifically for Faculty of Computer and Artificial Intelligence (FCAI) students at Cairo University. This tool helps students calculate their GPA based on the university's grading system.

![GPA Calculator Screenshot](https://github.com/zzokm/gpa/raw/main/screenshot.png)


## Features

- **Intuitive Course Management**: Add, edit, and remove courses with ease
- **Grade Selection**: Choose from standard letter grades (A+ to F)
- **Enhanced Credit Hour Selection**: Interactive rotating number input for credit hours (0-3)
- **Real-time GPA Calculation**: Instantly see your GPA update as you modify courses
- **Visual Grade Assessment**: Color-coded grade indicators with descriptive assessments
- **Course Import**: Import your registered courses directly from the university portal
- **Course Grouping**: Imported courses are automatically grouped by term and level
- **Group Statistics**: View detailed stats for each course group (GPA, credits, pass/fail metrics)
- **Collapsible Groups**: Expand/collapse course groups with saved state
- **Local Storage**: Your courses and group states saved in your browser for future visits
- **Modern Glassmorphism UI**: Clean, responsive design with animated interactions and blur effects
- **Dynamic Background**: Subtle animated background using Three.js with custom GLSL shaders
- **Confirmation Dialogs**: Prevent accidental data loss with confirmation modals
- **Mobile Optimization**: Responsive design works on all device sizes with specialized mobile fixes

## Live Demo

You can try the calculator at: [http://zokm.me/gpa/](http://zokm.me/gpa/)

## How to Use

### Adding Courses Manually

1. Enter your course name (optional)
2. Select the number of credit hours (0-3)
3. Choose a grade
4. Click "Add Course"

### Importing Courses from the Portal

1. Click the "Import Courses" button
2. Go to the [FCAI Course Registration Portal](http://newecom.fci.cu.edu.eg/#/courses-per-students)
3. Copy the HTML content of your registered courses page (instructions below)
4. Paste it into the import dialog (one-click paste button available)
5. Click "Import Courses"

The application will automatically:
- Extract course names, credit hours, and grades
- Organize courses by level and term
- Handle duplicate courses intelligently
- Preserve your existing course data

#### How to Copy HTML Content

**Windows/Mac - Chrome:**
- **Method 1:** Install the [Copy HTML extension](https://chromewebstore.google.com/detail/copy-html/indfogjkdbmkihaohndcnkoaheopbhjf)
  1. Right-click on the page area containing your courses
  2. Select "Copy HTML"
  3. The HTML is now in your clipboard

- **Method 2:** Using Developer Tools
  1. Right-click on the page area containing your courses
  2. Select "Inspect" or press `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
  3. In the Elements panel, locate the table element containing your courses
  4. Right-click on the element and select "Copy" → "Copy outerHTML"

**Windows/Mac - Firefox:**
1. Right-click on the page area containing your courses
2. Select "Inspect Element" or press `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. In the Inspector panel, locate the table element containing your courses
4. Right-click on the element and select "Copy" → "Outer HTML"

**iOS - Safari:**
1. Install the [Web Inspector app](https://apps.apple.com/us/app/web-inspector/id1584825745)
2. Navigate to the course registration page
3. Tap the puzzle piece icon to the left of the URL
4. Select "Web Inspector"
5. Tap the pencil icon at the top
6. Tap anywhere in the page content
7. Use "Select All" and "Copy"

**Android:**
For Android users, the easiest method is to use Chrome and request the desktop site:
1. Open Chrome and navigate to the portal
2. Tap the three dots menu → "Desktop site"
3. Follow the Chrome instructions above

#### Pasting in the GPA Calculator

1. Click the "Import Courses" button in the GPA Calculator
2. In the import dialog, click "Paste" button or use `Ctrl+V` (Windows) / `Cmd+V` (Mac)
3. Click "Import Courses"

### Managing Courses

- Change a course's grade by clicking the grade indicator/badge
- Update credit hours by clicking the credit hours value
- Remove a course by clicking the delete button
- View detailed statistics by clicking on group headers
- Expand/collapse course groups by clicking the arrow indicators
- Clear all courses with confirmation dialog (Reset All)
- Your GPA is automatically calculated and updated in real-time with visual assessment indicators (Good, Excellent, etc.)

## Technical Overview

This application is built using modern web technologies:

- **React**: Front-end library for building the user interface
- **TypeScript**: For type-safe code with interfaces and type definitions
- **Vite**: Fast build tool and development server
- **Three.js**: 3D graphics for the dynamic background animation with GLSL shaders
- **React Portals**: For properly positioned dropdowns and modals
- **CSS Variables**: For consistent design system and theming
- **Local Storage API**: For persisting courses and UI state between sessions
- **Responsive Design**: Mobile-first approach with device-specific optimizations
- **Glassmorphism UI**: Modern UI with backdrop filters and transparency effects

## Project Structure

```
src/
├── components/                      # React components
│   ├── ConfirmationModal.tsx        # Reusable confirmation dialog component
│   ├── CourseForm.tsx               # Form for adding courses
│   ├── CreditHoursDropdown.tsx      # Interactive credit hours selector
│   ├── EnhancedRotatingNumberInput.tsx # Animated number input component
│   ├── GPADisplay.tsx               # GPA visualization with assessment
│   ├── GradeDropdown.tsx            # Enhanced grade selection dropdown
│   ├── GroupedCourseTable.tsx       # Hierarchical course table with grouping
│   ├── ImportModal.tsx              # Course import functionality
│   ├── RotatingNumberInput.tsx      # Base component for number selection
│   ├── StatsModal.tsx               # Statistics display for course groups
│   └── ThreeJSBackground.tsx        # Animated background with GLSL shaders
├── types/
│   └── Course.ts                    # TypeScript interfaces and types
├── utils/
│   ├── dropdownManager.ts           # Dropdown coordination utilities
│   ├── gradeUtils.ts                # GPA calculation and grade utilities
│   └── visibilityUtils.ts           # DOM visibility helpers
├── App.tsx                          # Main application component
├── index.css                        # Global styles and design system
├── responsive-fixes.css             # Mobile-specific style adjustments
└── main.tsx                         # Application entry point
```

## Detailed Component Functionality

### App Component (`App.tsx`)

The main component that:
- Manages the application state (courses, modals)
- Handles data persistence using local storage
- Orchestrates the interactions between components
- Provides save notifications for user actions
- Manages clear/delete functionality with confirmations

### Course Management

#### `CourseForm.tsx`

Handles course creation with:
- Input validation for course details
- Enhanced rotating credit hour selection with animations
- Grade selection via styled dropdown
- Course name autogeneration for empty fields

#### `GroupedCourseTable.tsx`

Displays courses in a hierarchical structure with:
- Automatic grouping by level and term
- Collapsible groups with persistent state
- Group statistics with GPA and credit metrics
- Color-coded grade badges
- Inline grade and credit hour editing
- Course removal functionality
- Empty state handling

#### `ImportModal.tsx`

Provides functionality to:
- Import courses in bulk from the university portal
- Parse HTML content to extract course information
- Clipboard paste integration
- Smart duplicate handling
- Validate imported data before adding to the course list
- Show modal with fade animations

#### `ConfirmationModal.tsx`

A reusable confirmation dialog that:
- Prevents accidental data loss with user confirmation
- Supports danger mode for critical actions
- Uses React Portal for proper DOM positioning
- Includes animations and keyboard interactions

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

### Utilities & Helpers

#### `dropdownManager.ts`

Singleton utility that:
- Manages active dropdown state across the application
- Prevents multiple dropdowns from being open simultaneously
- Coordinates dropdown opening and closing
- Handles outside click detection

#### `gradeUtils.ts`

Core grade calculation utilities:
- Converts letter grades to GPA points
- Calculates GPA from course arrays
- Generates color schemes for grade display
- Provides helper functions for grade manipulation

#### `visibilityUtils.ts`

DOM visibility helpers that:
- Track element visibility in viewport
- Handle scroll position calculations
- Support modal positioning and interactions

### UI Enhancements

#### `GradeDropdown.tsx` & `CreditHoursDropdown.tsx`

Sophisticated dropdown components that:
- Use React portals for proper stacking context
- Include color-coded grade options
- Adjust position automatically to stay within viewport
- Prevent table row hover effects during interaction
- Coordinate with the dropdown manager to avoid conflicts

#### `EnhancedRotatingNumberInput.tsx`

An intuitive input component for selecting numeric values:
- Interactive left/right controls
- Smooth sliding animations between values
- Boundary limits with shake animations
- Accessibility features for keyboard navigation
- Mobile optimization with touch-friendly controls

#### `StatsModal.tsx`

Detailed statistics visualization for course groups:
- Summarizes course performance metrics
- Calculates GPA for specific course groups
- Displays credit hour distribution
- Shows passed/failed credit metrics
- Lists all courses in the group with details
- Includes scroll indicators for large lists

#### `GPADisplay.tsx`

Enhanced GPA visualization:
- Color-coded assessment based on GPA value:
  - Excellent (3.5-4.0): Purple
  - Very Good (3.0-3.5): Blue 
  - Good (2.5-3.0): Green
  - Acceptable (2.0-2.5): Gold
  - Poor (1.0-2.0): Orange
  - Very Poor (0-1.0): Red
- Dynamic text that reflects academic standing
- Visual hierarchy with typography scale
- Glassmorphism effect for modern UI
- Responsive layout for all device sizes

#### `ThreeJSBackground.tsx`

Creates an engaging background using Three.js:
- GLSL shaders for smooth color transitions
- Customizable uniforms for visual effects
- Responsive canvas that adjusts to window size
- Optimized performance with render loop management
- Multiple meshes with varying visual properties

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

- **Grading System**: Based on FCAI - Cairo University's 4.0 scale ([Faculty Bylaw PDF](docs/newBylaw_2024.pdf)) (Refer to page 11)
- **Course Structure**: 
  - Total Credit Hours for Bachelor's Degree: 135 hours
  - Course categorization by level and term
  - Support for custom course naming and credit hour allocation
- **Browser Support**: Modern browsers with localStorage and ES6+ support
- **Responsive Design**: Works on devices from mobile phones to desktops with optimized layouts
- **Mobile Optimization**: Special handling for touch interfaces and smaller screens
- **Accessibility**:
  - Keyboard navigation and focus management
  - Reduced motion support via media queries
  - High contrast mode compatibility
  - Sufficient color contrast for text readability
  - Visible focus indicators for keyboard users
  - Semantic HTML structure
- **Performance**:
  - Optimized animations with hardware acceleration
  - React memo and useCallback for rendering optimization
  - Efficient DOM updates with React
  - Lazy loading for modal components
- **Design System**:
  - Consistent CSS variables for theming
  - Responsive spacing and typography scales
  - Glassmorphism effects with backdrop filters
  - Fluid animations with cubic-bezier easing
- **Browser Storage**:
  - Courses data persisted in localStorage
  - UI state preservation between sessions
  - Error handling for storage access

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

Created by Yehia Elzokm for FCAI - Cairo University students
