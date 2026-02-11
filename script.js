document.addEventListener("DOMContentLoaded", function () {
    // Function to show a specific page
    function showPage(pageId) {
        document.querySelectorAll(".page").forEach(page => {
            page.style.display = "none";
        });
        document.getElementById(pageId).style.display = "block";
    }

    // Show home page by default
    showPage("home");
    window.showPage = showPage;

    // Function to register a user (store in localStorage)
    function registerUser(role, username, password) {
        let users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username]) {
            return false; // Username already exists
        }
        users[username] = { role, password };
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    }

    // If no users exist, create a default admin/user
    if (!localStorage.getItem("users")) {
        registerUser("admin", "admin", "admin123");
        registerUser("user", "user", "user123");
    }

    // Validation Function
    function validateCredentials(username, password) {
        let usernameRegex = /^[a-zA-Z0-9]{5,}$/; // No special characters, min length 5

        if (!usernameRegex.test(username)) {
            return "Username must be at least 5 characters and contain only letters and numbers.";
        }
        if (password.length < 5) {
            return "Password must be at least 5 characters long.";
        }
        return ""; // No errors
    }

    // Handle Registration
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const role = document.getElementById("registerRole").value.trim().toLowerCase();
            const username = document.getElementById("registerUsername").value.trim();
            const password = document.getElementById("registerPassword").value.trim();
            const registerMessage = document.getElementById("registerMessage");

            let validationError = validateCredentials(username, password);
            if (validationError) {
                registerMessage.textContent = validationError;
                registerMessage.style.color = "red";
                return;
            }

            if (registerUser(role, username, password)) {
                registerMessage.textContent = "Registration successful! You can now log in.";
                registerMessage.style.color = "green";
            } else {
                registerMessage.textContent = "Username already taken. Choose another.";
                registerMessage.style.color = "red";
            }
        });
    }

    // Handle Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const role = document.getElementById("role").value.trim().toLowerCase();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorMessage = document.getElementById("errorMessage");

            let validationError = validateCredentials(username, password);
            if (validationError) {
                errorMessage.textContent = validationError;
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[username] && users[username].password === password && users[username].role === role) {
                alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Login Successful!`);
                errorMessage.textContent = "";

                if (role === "admin") {
                    window.location.href = "admin.html"; // Redirect to admin panel
                } else {
                    window.location.href = "index1.html"; // Redirect to user dashboard
                }
            } else {
                errorMessage.textContent = "Invalid Credentials! Please try again.";
            }
        });
    }

    // Forgot Password Functionality
    const forgotPassword = document.getElementById("forgotPassword");
    if (forgotPassword) {
        forgotPassword.addEventListener("click", function () {
            let username = prompt("Enter your registered username:");
            let users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[username]) {
                let newPassword = prompt("Enter your new password (min 5 chars):");
                if (newPassword.length < 5) {
                    alert("Password must be at least 5 characters long.");
                    return;
                }
                users[username].password = newPassword;
                localStorage.setItem("users", JSON.stringify(users));
                alert("Password updated successfully!");
            } else {
                alert("Username not found!");
            }
        });
    }
});
