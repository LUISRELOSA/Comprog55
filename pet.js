document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    let requiredInputs = document.querySelectorAll("input[required]");
    
    // Reset borders
    requiredInputs.forEach(input => input.style.border = "1px solid #ccc");

    // Check all required fields
    requiredInputs.forEach(input => {
        if (input.type !== "checkbox" && input.value.trim() === "") {
            input.style.border = "2px solid red";
            isValid = false;
        }
    });

    // Check if pet photo is uploaded
    const photoInput = document.getElementById("pet-photo");
    if (!photoInput.files || photoInput.files.length === 0) {
        photoInput.style.border = "2px solid red";
        alert("Please upload a photo of your pet.");
        isValid = false;
    }

    // Check if terms and conditions are accepted
    const termsCheckbox = document.getElementById("terms-checkbox");
    if (!termsCheckbox.checked) {
        alert("You must accept the Terms and Conditions to proceed.");
        isValid = false;
    }

    // Redirect if valid
    if (isValid) {
        alert("Congratulations! Your pet has been successfully registered.");
        window.location.href = "terms.html"; // Redirect destination
    } else {
        alert("Please correct the highlighted fields.");
    }
});
const modal = document.getElementById("terms-modal");
const openModal = document.getElementById("view-terms");
const closeModal = document.querySelector(".modal .close");

openModal.addEventListener("click", function (e) {
  e.preventDefault();
  modal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});