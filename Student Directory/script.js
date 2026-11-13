
// 1. Student array (single source of truth)

let students = [
    { name: "Hope", score: 85 },
    { name: "David", score: 90 },
    { name: "Sarah", score: 75 }
];



const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentScore = document.getElementById("studentScore");

const nameError = document.getElementById("nameError");
const scoreError = document.getElementById("scoreError");

const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");
const studentCount = document.getElementById("studentCount");


function validateName() {

    const name = studentName.value.trim();

    if (name.length < 2) {
        nameError.textContent =
            "Please enter a name with at least 2 characters.";
        return false;
    }

    nameError.textContent = "";
    return true;
}



function validateScore() {

    const scoreValue = studentScore.value.trim();
    const score = Number(scoreValue);

    if (scoreValue === "") {
        scoreError.textContent =
            "Please enter the student's score.";
        return false;
    }

    if (!Number.isFinite(score) || score < 0 || score > 100) {
        scoreError.textContent =
            "Score must be a number between 0 and 100.";
        return false;
    }

    scoreError.textContent = "";
    return true;
}



studentName.addEventListener("input", validateName);
studentScore.addEventListener("input", validateScore);



function displayStudents(studentArray) {

    studentList.innerHTML = "";

    studentCount.textContent =
        `Showing ${studentArray.length} student(s)`;

    if (studentArray.length === 0) {
        studentList.innerHTML = "<p>No students found.</p>";
        return;
    }

    studentArray.forEach(student => {

        const card = document.createElement("div");

        card.className = "student-card";

        card.innerHTML = `
            <h3>${escapeHTML(student.name)}</h3>
            <p>Score: ${student.score}</p>
        `;

        studentList.appendChild(card);

    });
}


function escapeHTML(value) {
    return value.replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}



studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const validName = validateName();
    const validScore = validateScore();

    if (!validName || !validScore) {
        return;
    }

    const newStudent = {
        name: studentName.value.trim(),
        score: Number(studentScore.value)
    };

    students.push(newStudent);

    studentForm.reset();

    nameError.textContent = "";
    scoreError.textContent = "";

    displayStudents(students);

});



searchInput.addEventListener("input", function() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm)
    );

    displayStudents(filteredStudents);

});




async function fetchAnnouncement() {

    const status = document.getElementById("announcementStatus");
    const announcement = document.getElementById("announcement");

    try {

        status.textContent = "Loading announcement...";
        status.className = "loading";

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        
        if (!response.ok) {
            throw new Error("Unable to retrieve announcement.");
        }

        const data = await response.json();

        status.textContent = "Announcement loaded successfully!";
        status.className = "success";

        announcement.innerHTML = `
            <h3>${escapeHTML(data.title)}</h3>
            <p>${escapeHTML(data.body)}</p>
        `;

    } catch (error) {

        status.textContent =
            "Sorry! We couldn't load the announcement. Please try again later.";

        status.className = "failure";

        announcement.innerHTML = "";

        console.error(error);

    }

}



displayStudents(students);

fetchAnnouncement();