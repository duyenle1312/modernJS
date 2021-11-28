// DATA
const courses = [
  {
    section: 'COS310',
    title: 'Modern JavaScript',
    instructor: 'Mikov',
    department: 'COS',
    credits: 1,
  },
  {
    section: 'INF240',
    title: 'Website Development',
    instructor: 'Dimitrov',
    department: 'INF',
    credits: 3,
  },
  {
    section: 'INF280',
    title: 'Database Systems',
    instructor: 'Christozov',
    department: 'INF',
    credits: 3,
  },
  {
    section: 'MAT104',
    title: 'Calculus II',
    instructor: 'Dalakov',
    department: 'MAT',
    credits: 3,
  },
  {
    section: 'COS221',
    title: 'Fundamental Data Structures',
    instructor: 'Christozov',
    department: 'COS',
    credits: 3,
  },
  {
    section: 'BUS260',
    title: 'Marketing',
    instructor: 'Petkov',
    department: 'BUS',
    credits: 3,
  },
  {
    section: 'BUS300',
    title: 'Business Ethics',
    instructor: 'Schwartz',
    department: 'BUS',
    credits: 4,
  },
  {
    section: 'BUS220',
    title: 'Financial Accounting',
    instructor: 'Cleary',
    department: 'BUS',
    credits: 3,
  },
  {
    section: 'BUS448',
    title: 'Strategic Management',
    instructor: 'Pantelides',
    department: 'BUS',
    credits: 3,
  },
  {
    section: 'THR130',
    title: 'Beginning Acting',
    instructor: 'Delchev',
    department: 'FAR',
    credits: 3,
  },
  {
    section: 'ENG205',
    title: 'Creative Writing',
    instructor: 'Cohen',
    department: 'ENG',
    credits: 4,
  },
];

const students = [
  {
    name: 'Adam Banff',
    standing: 'Junior',
    courses: ['INF240', 'BUS220', 'ENG205']
  },
  {
    name: 'Betty Cahn',
    standing: 'Senior',
    courses: ['INF280', 'COS221', 'COS310']
  },
  {
    name: 'Chisto Dotev',
    standing: 'Senior',
    courses: ['BUS220', 'BUS448', 'THR130']
  },
  {
    name: 'Dani Emerson',
    standing: 'Sophomore',
    courses: ['ENG205', 'THR130', 'COS310']
  },
  {
    name: 'Emy Fang',
    standing: 'Senior',
    courses: ['BUS300', 'BUS260', 'BUS448']
  },
  {
    name: 'Filip Gomez',
    standing: 'Junior',
    courses: ['COS221', 'COS415', 'INF240']
  },
  {
    name: 'Gergana Harris',
    standing: 'Senior',
    courses: ['BUS448', 'ENG205', 'THR130']
  },
  {
    name: 'Harry Insman',
    standing: 'Senior',
    courses: ['COS310', 'ENG205', 'THR130']
  },
  {
    name: 'Iliana Johnes',
    standing: 'Sophomore',
    courses: ['BUS260', 'BUS300', 'ENG205']
  },
  {
    name: 'Jane Kelly',
    standing: 'Sophomore',
    courses: ['BUS220', 'BUS260', 'THR130']
  }
];

// Question: How many students are there per standing?
function getStudentsPerStanding() { 
  let studentsPerStanding = {"Freshman": 0, "Sophomore": 0, "Junior": 0,"Senior": 0}; 
  for (let student of students) {
      studentsPerStanding[student.standing] += 1;
  }
  return studentsPerStanding;
}

// Question: How many courses are there per department?
function getCoursesPerDepartment() { 
  let coursesPerDepartment = {}; 
  for (let course of courses) {
      if (!coursesPerDepartment[course.department]) {  
        coursesPerDepartment[course.department] = 0; 
      }
      coursesPerDepartment[course.department] += 1;
  }
  return coursesPerDepartment; 
}

// Question: How many students are in each department?
function getStudentsPerDepartment() { 
  let studentsPerDepartment = {}; 
  let studentDeparment = {};
  
  for (let student of students) {
    studentDeparment = {};
    for (let sCourse of student.courses) {
      for (let course of courses) {
        if (sCourse === course.section) {
          if (!studentsPerDepartment[course.department]) {
            studentsPerDepartment[course.department] = 0; // Initialize the data
          }
          if(!studentDeparment[course.department]) { // Avoid duplicate count if a student attends courses from the same department
            studentDeparment[course.department] = 1; 
            studentsPerDepartment[course.department] += 1;
          }            
        }
      }
    }
  }
  return studentsPerDepartment;
}

// Question: How many students does each professor teach to?
function getStudentsPerProfessor() { 
  let studentsPerProfessor = {}; 
  for (let course of courses) {
      if (!studentsPerProfessor[course.instructor]) { 
        studentsPerProfessor[course.instructor] = 0; 
      }    
  }
  for (let student of students){
    for (let sCourse of student.courses){
      for (let course of courses) {
        if (course.section === sCourse ) {
          studentsPerProfessor[course.instructor] += 1;
        }
      }      
    }
  }
  return studentsPerProfessor;
}

// Question: Which course has the most students enrolled in it?
function getMostStudentsCourse(){
  let courseList = getStudentsPerCourse();
  let arr = Object.values(courseList);
  let maxCourse = Math.max(...arr); 
  
  return Object.keys(courseList).find(key => courseList[key] === maxCourse);
}

// Question: Which course has the fewest students enrolled in it?
function getFewestStudentsCourse(){
  let courseList = getStudentsPerCourse();
  let arr = Object.values(courseList);
  let minCourse = Math.min(...arr); 
  
  return Object.keys(courseList).find(key => courseList[key] === minCourse);
}

// Question: Which student has the biggest sum of credits for their enrolled classes?
function getBiggestCreditStudent(){
  let creditPerStudent = {};
  for (let student of students) {
    if (!creditPerStudent[student.name]) {
      creditPerStudent[student.name] = 0;
    } 
    for (let sCourse of student.courses) {
      for (let course of courses) {
        if (course.section === sCourse) {
          creditPerStudent[student.name] += course.credits;
        }
      }
    }
  }
  let arr = Object.values(creditPerStudent);
  let maxCredit = Math.max(...arr);   
  return Object.keys(creditPerStudent).find(key => creditPerStudent[key] === maxCredit);
}

// Question: What is the "major" of each student?
function getMajorOfStudent() {
  let majorOfStudent = {};
  let studentMajor = {};
  
  for (let student of students) {
    studentMajor = {};
    for (let sCourse of student.courses) {
      for (let course of courses) {
        if (course.section === sCourse) {
          if (!studentMajor[course.department]) {
            studentMajor[course.department] = 0;
          }
          studentMajor[course.department] += 1;
        }
      }
    }
    let arr = Object.values(studentMajor);
    let maxValue = Math.max(...arr);   
    let major = Object.keys(studentMajor).find(key => studentMajor[key] === maxValue);
    
    majorOfStudent[student.name] = major; // Append the student with major to the dictionary
  }  
  return majorOfStudent; 
}

// Question: Which students are taking courses in the "ENG" department?
function getStudentInEnglish() {
  let studentInEnglish = [];
  for (let student of students) {
    for (let course of student.courses) {
      if (course.substr(0, 3) === "ENG") {
        studentInEnglish.push(student.name);
      }
    } 
  }
  return studentInEnglish;
}
