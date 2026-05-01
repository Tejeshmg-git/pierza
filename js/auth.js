document.addEventListener('DOMContentLoaded', () => {
    // Password Visibility Toggle
    const passToggles = document.querySelectorAll('.pass-toggle');
    passToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        });
    });

    // Form Validation (Signup Page)
    const signupForm = document.querySelector('.auth-form');
    if (signupForm && document.getElementById('confirm-password')) {
        signupForm.addEventListener('submit', (e) => {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Passwords do not match. Please try again.');
            }
        });
    }

    // Finalize Lucide
    lucide.createIcons();
});
