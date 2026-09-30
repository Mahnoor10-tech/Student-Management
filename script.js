const students = [];

const studentName = document.getElementById("studentName");
const studentAge = document.getElementById("studentAge");
const studentCourse = document.getElementById("studentCourse");
const studentMarks = document.getElementById("studentMarks");

const addStudentButton = document.getElementById("addStudentButton");

const totalStudents = document.getElementById("totalStudents");
const passedStudents = document.getElementById("passedStudents");
const topStudent = document.getElementById("topStudent");

const studentTableBody = document.getElementById("studentTableBody");
const errorMessage = document.getElementById("errorMessage");

function createStudent(name, age, course, marks) {

    const student = {
        name: name,
        age: age,
        course: course,
        marks: marks,

        getResult: function () {
            if (this.marks >= 50) {
                return "Pass";
            } else {
                return "Fail";
            }
        }
    };

    return student;
}

addStudentButton.addEventListener("click", function () {

    const name = studentName.value.trim();
    const age = Number(studentAge.value);
    const course = studentCourse.value.trim();
    const marks = Number(studentMarks.value);

    errorMessage.textContent = "";

    if (name === "") {
        errorMessage.textContent = "Please enter student name.";
        return;
    }

    if (studentAge.value === "" || age <= 0) {
        errorMessage.textContent = "Please enter valid age.";
        return;
    }

    if (course === "") {
        errorMessage.textContent = "Please enter course.";
        return;
    }

    if (studentMarks.value === "") {
        errorMessage.textContent = "Please enter marks.";
        return;
    }

    if (marks < 0 || marks > 100) {
        errorMessage.textContent = "Marks must be between 0 and 100.";
        return;
    }

    const student = createStudent(name, age, course, marks);

    students.push(student);

    displayStudents();
    updateStatistics();

    studentName.value = "";
    studentAge.value = "";
    studentCourse.value = "";
    studentMarks.value = "";
});

function displayStudents() {

    studentTableBody.innerHTML = "";

    students.forEach(function (student, index) {

        const row = document.createElement("tr");

        const result = student.getResult();

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td class="${result === "Pass" ? "pass" : "fail"}">
                ${result}
            </td>
            <td>
                <button class="delete-button" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}

function updateStatistics() {

    totalStudents.textContent = students.length;

    const passed = students.filter(function (student) {
        return student.marks >= 50;
    });

    passedStudents.textContent = passed.length;

    if (students.length === 0) {
        topStudent.textContent = "None";
        return;
    }

    let top = students[0];

    students.forEach(function (student) {

        if (student.marks > top.marks) {
            top = student;
        }

    });

    topStudent.textContent = top.name + " (" + top.marks + ")";
}

function deleteStudent(index) {

    students.splice(index, 1);

    displayStudents();
    updateStatistics();
}