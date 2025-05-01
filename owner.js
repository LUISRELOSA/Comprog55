let captchaSum = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaSum = num1 + num2;
    document.getElementById('captcha-question').textContent = `${num1} + ${num2} = ?`;
}

document.addEventListener("DOMContentLoaded", function() {
    generateCaptcha();

    document.querySelector("form").addEventListener("submit", function(e) {
        e.preventDefault();
        let isValid = true;
        let inputs = document.querySelectorAll("input[required]");
        
        // Clear previous red borders
        inputs.forEach(input => input.style.border = "1px solid #ccc");

        // Validate required fields
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.style.border = "2px solid red";
                isValid = false;
            }
        });

        const birthInput = document.querySelector('input[type="date"]');
        const birthDate = new Date(birthInput.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            age < 18 ||
            (age === 18 && monthDiff < 0) ||
            (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
        birthInput.style.border = "2px solid red";
        alert("You must be at least 18 years old to submit the form.");
        isValid = false;
        }

        // Email format check
        const emailInput = document.querySelector('input[placeholder="Enter Email Address"]');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailInput.style.border = "2px solid red";
            isValid = false;
        }

        // PH number check
        const phoneInput = document.querySelector('input[placeholder="Enter Phone Number"]');
        const phonePattern = /^(09|\+639)\d{9}$/;
        if (!phonePattern.test(phoneInput.value.trim())) {
            phoneInput.style.border = "2px solid red";
            isValid = false;
        }

        // Captcha validation
        const captchaInput = document.getElementById('captcha-answer');
        if (parseInt(captchaInput.value.trim()) !== captchaSum) {
            captchaInput.style.border = "2px solid red";
            alert("Incorrect CAPTCHA answer. Please try again.");
            generateCaptcha(); // refresh captcha
            isValid = false;
        }

        if (isValid) {
            // Redirect if everything is valid
            window.location.href = "pet.html"; // Change to your actual target page
        } else {
            alert("Please correct the highlighted fields.");
        }
    });
});