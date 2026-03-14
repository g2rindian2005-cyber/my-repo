// Sample student data
let students = [
    { id: 1, name: "Raj Kumar", email: "raj@example.com", roll: 101, grade: "A" },
    { id: 2, name: "Priya Singh", email: "priya@example.com", roll: 102, grade: "A" },
    { id: 3, name: "Amit Patel", email: "amit@example.com", roll: 103, grade: "B" },
    { id: 4, name: "Neha Sharma", email: "neha@example.com", roll: 104, grade: "A" },
    { id: 5, name: "Vikram Gupta", email: "vikram@example.com", roll: 105, grade: "C" }
];

let nextId = 6;

// DOM elements
const studentForm = document.getElementById('studentForm');
const studentsList = document.getElementById('studentsList');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    displayStudents();
    studentForm.addEventListener('submit', addStudent);
});

// Display all students
function displayStudents() {
    studentsList.innerHTML = '';

    if (students.length === 0) {
        studentsList.innerHTML = '<div class="empty-state"><p>No students added yet. Add one to get started!</p></div>';
    } else {
        students.forEach((student, index) => {
            const studentCard = createStudentCard(student);
            studentCard.style.animationDelay = `${index * 0.1}s`;
            studentsList.appendChild(studentCard);
        });
    }

    // Update stats
    document.getElementById('totalStudents').textContent = students.length;
}

// Create student card
function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
        <h3>${student.name}</h3>
        <div class="student-info">
            <strong>Email:</strong> ${student.email}
        </div>
        <div class="student-info">
            <strong>Roll No:</strong> ${student.roll}
        </div>
        <span class="grade-badge">Grade ${student.grade}</span>
        <div class="card-actions">
            <button class="btn-small btn-edit" onclick="editStudent(${student.id})">Edit</button>
            <button class="btn-small btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
        </div>
    `;
    return card;
}

// Add new student
function addStudent(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const roll = document.getElementById('roll').value;
    const grade = document.getElementById('grade').value;

    if (!name || !email || !roll || !grade) {
        alert('Please fill all fields');
        return;
    }

    const newStudent = {
        id: nextId++,
        name,
        email,
        roll: parseInt(roll),
        grade
    };

    students.push(newStudent);
    studentForm.reset();
    displayStudents();
    showNotification('✓ Student added successfully!');
}

// Delete student
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        displayStudents();
        showNotification('✓ Student deleted!');
    }
}

// Edit student
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        // Pre-fill form with student data
        document.getElementById('name').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('roll').value = student.roll;
        document.getElementById('grade').value = student.grade;

        // Remove old student and scroll to form
        students = students.filter(s => s.id !== id);
        displayStudents();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showNotification('ℹ Edit the student details and click Add Student to update');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        z-index: 9999;
        animation: slideInRight 0.5s ease forwards, slideOutRight 0.5s ease 2.5s forwards;
        font-weight: 600;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
