document.addEventListener("DOMContentLoaded", function () {
  const togglePasswordIcons = document.querySelectorAll(".toggle-password");

  togglePasswordIcons.forEach(icon => {
      icon.addEventListener("click", function () {
          const passwordInput = this.previousElementSibling;

          if (passwordInput.type === "password") {
              passwordInput.type = "text";
              this.src = "eye-open.png"; // змінюємо іконку на відкрите око
          } else {
              passwordInput.type = "password";
              this.src = "eye-closed.png"; // змінюємо іконку на закрите око
          }
      });
  });

  const formInputs = document.querySelectorAll("input");
  let formData = {};

  formInputs.forEach(input => {
      input.addEventListener("input", function () {
          formData[this.type] = this.value;
      });
  });

  const submitButtons = document.querySelectorAll(".black-button");

  submitButtons.forEach(button => {
      button.addEventListener("click", function (e) {
          e.preventDefault();
          console.log(formData);
      });
  });
});
