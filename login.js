const form = document.getElementById('form');
const fullname_input = document.getElementById('fullname-input'); // Only exists on signup
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input'); // Only exists on signup

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Always stop default until we manually allow it
    let errors = [];

    const isSignup = fullname_input !== null && repeat_password_input !== null;

    if (isSignup) {
        // Signup
        errors = getSignupFormErrors(
            fullname_input.value,
            email_input.value,
            password_input.value,
            repeat_password_input.value
        );

        if (errors.length === 0) {
            saveUser(fullname_input.value, email_input.value, password_input.value);
            alert("Signup successful!");
            // Redirect if needed:
            // window.location.href = 'login.html';
        }
    } else {
        // Login
        errors = getLoginFormErrors(email_input.value, password_input.value);

        if (errors.length === 0) {
            const loginSuccess = checkUserLogin(email_input.value, password_input.value);
            if (!loginSuccess) {
                errors.push('Invalid email or password');
                email_input.parentElement.classList.add('incorrect');
                password_input.parentElement.classList.add('incorrect');
            } else {
                alert("Login successful!");
                // Redirect if needed:
                // window.location.href = 'dashboard.html';
            }
        }
    }

    if (errors.length > 0) {
        // Prevent submit on error (already done above)
        console.log(errors); // You can display them if needed
    }
});

function getSignupFormErrors(fullname, email, password, repeatPassword) {
    let errors = [];

    if (!fullname) {
        errors.push('Fullname is Required');
        fullname_input.parentElement.classList.add('incorrect');
    }
    if (!email) {
        errors.push('Email is Required');
        email_input.parentElement.classList.add('incorrect');
    }
    if (!password) {
        errors.push('Password is Required');
        password_input.parentElement.classList.add('incorrect');
    } else if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
        password_input.parentElement.classList.add('incorrect');
    }
    if (password !== repeatPassword) {
        errors.push('Passwords do not match');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];

    if (!email) {
        errors.push('Email is Required');
        email_input.parentElement.classList.add('incorrect');
    }
    if (!password) {
        errors.push('Password is Required');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function saveUser(fullname, email, password) {
    const user = { fullname, email, password };
    localStorage.setItem('user', JSON.stringify(user));
}

function checkUserLogin(email, password) {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return false;

    return storedUser.email === email && storedUser.password === password;
}

// Clear error styling when typing
const allInputs = [fullname_input, email_input, password_input, repeat_password_input].filter(input => input !== null);
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.parentElement.classList.remove('incorrect');
    });
});