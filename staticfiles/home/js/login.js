document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');
    const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
    
    // Add floating label effect
    inputs.forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
            
            // Check if input has value on page load
            if (input.value) {
                label.classList.add('active');
            }
        }
    });
    
    // Basic form validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            } else {
                removeError(input);
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
    
    // Error handling functions
    function showError(input, message) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            const div = document.createElement('div');
            div.className = 'error-message';
            div.textContent = message;
            input.parentElement.appendChild(div);
        }
        input.classList.add('error');
    }
    
    function removeError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
    }
    
    // Add loading state to button on submit
    form.addEventListener('submit', function(e) {
        if (form.checkValidity()) {
            const button = form.querySelector('.login-btn');
            button.innerHTML = '<span class="spinner"></span> Logging in...';
            button.disabled = true;
        }
    });
});