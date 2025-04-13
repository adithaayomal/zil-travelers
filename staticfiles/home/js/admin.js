document.addEventListener('DOMContentLoaded', function() {
    const logoutForm = document.querySelector('form[action*="logout"]');
    
    if (logoutForm) {
        logoutForm.addEventListener('submit', function(e) {
            if (!confirm('Are you sure you want to logout?')) {
                e.preventDefault();
            }
        });
    }
});