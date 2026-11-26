
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

            [student.id, student.name, student.email,
             student.mobile, student.course].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            studentTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("GET Error:", error);
        errorMessage.innerText = "Unable to load students";
    }
}

async function formsubmit(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value.trim();

    if (!name || !email || !phone || !course) {
        errorMessage.innerText = "Form should not be empty";
        return;
    }

    const studentData = {
        name: name,
        email: email,
        mobile: phone,
        course: course
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();

        if (!response.ok) {
            errorMessage.innerText =
                typeof result.detail === "string"
                    ? result.detail
                    : "Unable to register student";

            return;
        }

        errorMessage.innerText = "Student registered successfully!";

        document.querySelector("form").reset();

        // Refresh table after successful registration
        await getStudents();

    } catch (error) {
        console.error("POST Error:", error);
        errorMessage.innerText = "Unable to connect to backend";
    }
}

// Load students when page opens
document.addEventListener("DOMContentLoaded", getStudents);