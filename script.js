function formsubmit() {
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    course = document.getElementById("course").value;

    if (name == "" || email == "" || phone == "" || course == "") {
        return document.getElementById("error-message").innerText = "Form should not be empty"
    }
}