document.addEventListener("DOMContentLoaded", function () {

    const togglePasswordIcons = document.querySelectorAll(".toggle-password");

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const passwordInput = this.previousElementSibling;
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                this.src = "eye-open.png"; 
            } else {
                passwordInput.type = "password";
                this.src = "eye-closed.png"; 
            }
        });
    });

    const formInputs = document.querySelectorAll("input");
    let formData = {};

    formInputs.forEach(input => {
        input.addEventListener("input", function () {
            formData[this.id] = this.value; 
        });
    });

    const submitButtons = document.querySelectorAll(".black-button");

    submitButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault(); 

            const form = button.closest('form');
            const isSignIn = form.id === "signin-form";
            const emailKey = isSignIn ? "signin-email" : "signup-email";
            const passwordKey = isSignIn ? "signin-password" : "signup-password";

            if (formData[emailKey] && formData[passwordKey]) {
                console.log(isSignIn ? "Sign In:" : "Sign Up:", {
                    email: formData[emailKey],
                    password: formData[passwordKey]
                });
                window.location.href = "Game.html"; 
            } else {
                alert("Введіть email та пароль!");
            }
        });
    });
});