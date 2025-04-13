document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('destinationForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Image preview functionality
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const errorMessage = this.parentElement.querySelector('.error-message');
        
        if (file && file.size > MAX_FILE_SIZE) {
            errorMessage.textContent = 'File size must be less than 5MB';
            imageInput.value = '';
            return;
        }
        
        if (file && !file.type.startsWith('image/')) {
            errorMessage.textContent = 'Please upload an image file';
            imageInput.value = '';
            return;
        }
        
        errorMessage.textContent = '';

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // Add remove image functionality
    const removeImageBtn = document.querySelector('.remove-image');
    removeImageBtn.addEventListener('click', () => {
        imageInput.value = '';
        imagePreview.style.display = 'none';
        previewImg.src = '#';
    });

    // Prevent form submission on drag and drop
    const fileInputWrapper = document.querySelector('.file-input-wrapper');
    fileInputWrapper.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileInputWrapper.classList.add('dragover');
    });

    fileInputWrapper.addEventListener('dragleave', () => {
        fileInputWrapper.classList.remove('dragover');
    });

    fileInputWrapper.addEventListener('drop', (e) => {
        e.preventDefault();
        fileInputWrapper.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            imageInput.files = e.dataTransfer.files;
            const event = new Event('change');
            imageInput.dispatchEvent(event);
        }
    });

    // Form validation
    const validateInput = (input) => {
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (input.validity.valueMissing) {
            errorMessage.textContent = 'This field is required';
            return false;
        } else if (input.validity.typeMismatch) {
            errorMessage.textContent = 'Please enter a valid value';
            return false;
        } else if (input.type === 'number' && input.validity.rangeUnderflow) {
            errorMessage.textContent = 'Price cannot be negative';
            return false;
        } else {
            errorMessage.textContent = '';
            return true;
        }
    };

    // Add validation to all form inputs
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => validateInput(input));
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': formData.get('csrfmiddlewaretoken')
                }
            });

            if (response.ok) {
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                form.reset();
                imagePreview.style.display = 'none';
                
                // Redirect to admin dashboard after 2 seconds
                setTimeout(() => {
                    window.location.href = document.querySelector('.cancel-btn').href;
                }, 2000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form. Please try again.');
        } finally {
            // Reset button state
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    // Add file size validation
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
});