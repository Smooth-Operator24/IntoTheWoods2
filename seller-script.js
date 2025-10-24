document.addEventListener("DOMContentLoaded", function() {
    let currentStep = 1;
    const formSteps = document.querySelectorAll(".form-step");
    const progressBarFill = document.getElementById("progress-bar-fill");
    const stepLabel = document.getElementById("step-label");
    const stepCounter = document.getElementById("step-counter");
    const sellerForm = document.getElementById("seller-form");
    const productItemsContainer = document.getElementById("product-items-container");
    const addProductBtn = document.querySelector(".add-product-btn");
    const productErrorMessage = document.getElementById("product-error-message");

    const stepLabels = [
        "Personal Details",
        "Account Security",
        "Business Information",
        "Add Products"
    ];

    function updateFormVisibility() {
        formSteps.forEach(step => {
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
        updateProgressBar();
    }

    function updateProgressBar() {
        const progressPercentage = ((currentStep - 1) / (formSteps.length - 1)) * 100;
        progressBarFill.style.width = `${progressPercentage}%`;
        stepLabel.textContent = stepLabels[currentStep - 1];
        stepCounter.textContent = `Step ${currentStep} of ${formSteps.length}`;

        // Special handling for Step 4 product validation error
        if (currentStep === 4 && productItemsContainer.children.length === 0) {
            productErrorMessage.classList.add('active');
        } else {
            productErrorMessage.classList.remove('active');
        }
    }

    function validateStep(stepNumber) {
        const currentFormStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        let isValid = true;
        const requiredInputs = currentFormStep.querySelectorAll("[required]");

        requiredInputs.forEach(input => {
            // Reset custom validity
            input.setCustomValidity("");

            if (!input.value.trim()) {
                isValid = false;
                input.setCustomValidity("This field is required."); // Set HTML5 validity
                input.reportValidity(); // Show native browser validation message
                return;
            }

            // Specific validation for OTPs (if needed, simplified here)
            if (input.id === "emailOTP" || input.id === "mobileOTP") {
                if (!/^\d{6}$/.test(input.value)) {
                    isValid = false;
                    input.setCustomValidity("Please enter a 6-digit OTP.");
                    input.reportValidity();
                    return;
                }
            }

            // Specific validation for Emirates ID
            if (input.id === "emiratesIDNumber") {
                if (!/^[0-9]{3}-[0-9]{4}-[0-9]{7}-[0-9]{1}$/.test(input.value)) {
                    isValid = false;
                    input.setCustomValidity("Please enter a valid Emirates ID format (e.g., 784-XXXX-XXXXXXX-X).");
                    input.reportValidity();
                    return;
                }
            }

            // Specific validation for IBAN
            if (input.id === "iban") {
                if (!/^AE[0-9]{23}$/.test(input.value)) {
                    isValid = false;
                    input.setCustomValidity("Please enter a valid 25-character UAE IBAN (starts with AE).");
                    input.reportValidity();
                    return;
                }
            }
        });

        // Step 2: Password confirmation
        if (stepNumber === 2) {
            const createPassword = document.getElementById("createPassword");
            const confirmPassword = document.getElementById("confirmPassword");
            if (createPassword.value !== confirmPassword.value) {
                isValid = false;
                confirmPassword.setCustomValidity("Passwords do not match.");
                confirmPassword.reportValidity();
            } else {
                confirmPassword.setCustomValidity(""); // Clear if they match
            }
        }

        // Step 4: At least one product must be added
        if (stepNumber === 4) {
            if (productItemsContainer.children.length === 0) {
                isValid = false;
                productErrorMessage.classList.add('active');
                productErrorMessage.textContent = "Please add at least one product to proceed.";
            } else {
                productErrorMessage.classList.remove('active');
            }
        }


        return isValid;
    }

    // --- Navigation Buttons ---
    document.querySelectorAll(".next-btn").forEach(button => {
        button.addEventListener("click", () => {
            if (validateStep(currentStep)) {
                if (currentStep < formSteps.length) {
                    currentStep++;
                    updateFormVisibility();
                }
            }
        });
    });

    document.querySelectorAll(".prev-btn").forEach(button => {
        button.addEventListener("click", () => {
            if (currentStep > 1) {
                currentStep--;
                updateFormVisibility();
            }
        });
    });

    // --- File Input Customization ---
    document.querySelectorAll('input[type="file"]').forEach(inputElement => {
        inputElement.addEventListener('change', function() {
            const fileNameSpan = this.nextElementSibling.querySelector('.file-name');
            if (this.files.length > 0) {
                fileNameSpan.textContent = this.files[0].name;
            } else {
                fileNameSpan.textContent = 'No file chosen';
            }
        });
    });

    // --- Dynamic Product Adding (Step 4) ---
    let productCount = 0;
    addProductBtn.addEventListener("click", () => {
        productCount++;
        const productItemDiv = document.createElement("div");
        productItemDiv.classList.add("product-item");
        productItemDiv.innerHTML = `
            <h4>Product ${productCount} Details</h4>
            <div class="form-group">
                <label for="productName${productCount}">Product Name</label>
                <input type="text" id="productName${productCount}" name="productName${productCount}" required>
            </div>
            <div class="form-group">
                <label for="productDescription${productCount}">Description</label>
                <textarea id="productDescription${productCount}" name="productDescription${productCount}" rows="2" required></textarea>
            </div>
            <div class="form-group">
                <label for="productPrice${productCount}">Price (AED)</label>
                <input type="number" id="productPrice${productCount}" name="productPrice${productCount}" step="0.01" min="0" required>
            </div>
            <div class="form-group file-upload-group">
                <label for="productImage${productCount}">Product Image</label>
                <input type="file" id="productImage${productCount}" name="productImage${productCount}" accept="image/*" required>
                <label for="productImage${productCount}" class="custom-file-upload">Choose File <span class="file-name">No file chosen</span></label>
            </div>
            <button type="button" class="delete-product-btn" data-product-id="${productCount}"><i class="fas fa-times-circle"></i></button>
        `;
        productItemsContainer.appendChild(productItemDiv);

        // Re-attach file input change listener for newly added product image input
        const newFileInput = productItemDiv.querySelector(`input[type="file"]`);
        if (newFileInput) {
            newFileInput.addEventListener('change', function() {
                const newFileNameSpan = this.nextElementSibling.querySelector('.file-name');
                if (this.files.length > 0) {
                    newFileNameSpan.textContent = this.files[0].name;
                } else {
                    newFileNameSpan.textContent = 'No file chosen';
                }
            });
        }
        updateProgressBar(); // To re-check product count validation
    });

    // --- Delete Product Item ---
    productItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-product-btn") || event.target.closest(".delete-product-btn")) {
            const button = event.target.closest(".delete-product-btn");
            button.parentElement.remove(); // Remove the product-item div
            // Optional: Re-number products if desired, or just let productCount be a unique ID
            updateProgressBar(); // To re-check product count validation
        }
    });

    // --- Form Submission (Final Step) ---
    sellerForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent actual form submission
        if (validateStep(formSteps.length)) { // Validate the last step
            alert("Application Submitted! (This is a demo. In a real app, data would be sent to a server.)");
            // Here you would typically send form data to a server using fetch() or XMLHttpRequest
            // e.g., const formData = new FormData(sellerForm);
            // fetch('/api/submit-seller-application', { method: 'POST', body: formData });
        }
    });

    // Initial setup
    updateFormVisibility();
});