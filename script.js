
const API_URL = "http://127.0.0.1:8000/students/";

const errorMessage = document.getElementById("error-message");
const studentTableBody = document.getElementById("student-table-body");

async function getStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        const students = await response.json();

        studentTableBody.innerHTML = "";

        students.forEach(student => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.mobile}</td>
                <td>${student.course}</td>
                <td>
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            `;

            studentTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("GET Error:", error);
        errorMessage.innerText = "Unable to load students";
    }
}

async function formsubmit(event) {
    event.preventDefault();

    const id = document.getElementById("student-id").value;

    const studentData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        mobile: document.getElementById("phone").value.trim(),
        course: document.getElementById("course").value.trim()
    };

    if (!studentData.name || !studentData.email ||
        !studentData.mobile || !studentData.course) {
        errorMessage.innerText = "All fields are required";
        return;
    }

    const url = id ? `${API_URL}${id}` : API_URL;
    const method = id ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) {
            throw new Error("Request failed");
        }

        alert(id ? "Student updated successfully!" : "Student registered successfully!");

        document.querySelector("form").reset();
        document.getElementById("student-id").value = "";

        await getStudents();

    } catch (error) {
        console.error(error);
        errorMessage.innerText = "Unable to save student";
    }
}

async function deleteStudent(id) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete student");
        }

        alert("Student deleted successfully!");

        await getStudents();

    } catch (error) {
        console.error(error);
        alert("Failed to delete student");
    }
}

async function editStudent(id) {
    try {
        const response = await fetch(`${API_URL}${id}`);

        if (!response.ok) {
            throw new Error("Student not found");
        }

        const student = await response.json();

        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("phone").value = student.mobile;
        document.getElementById("course").value = student.course;

        // Store the student ID for updating
        document.getElementById("student-id").value = student.id;

    } catch (error) {
        console.error(error);
        alert("Unable to load student details");
    }
}

// Load students when page opens
document.addEventListener("DOMContentLoaded", getStudents);