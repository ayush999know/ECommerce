document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('loginPassword');
    
    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            passwordToggle.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (!email || !password) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email format
        if (!validateEmail(email)) {
            showAlert('Please enter a valid professional email', 'error');
            return;
        }
        
        // Simulate login process
        simulateLogin(email, password);
    });
    
    // Google login
    document.getElementById('googleLogin').addEventListener('click', function() {
        showAlert('Redirecting to Google authentication...', 'info');
        // Implement actual Google auth here
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Show alert message
    function showAlert(message, type) {
        const alertBox = document.createElement('div');
        alertBox.className = `alert-box ${type}`;
        alertBox.textContent = message;
        
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => {
                alertBox.remove();
            }, 500);
        }, 3000);
    }
    
    // Simulate login process
    function simulateLogin(email, password) {
        const loginBtn = loginForm.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        
        // Show loading state
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        
        // Simulate API call
        setTimeout(() => {
            // For demo purposes - in real app, this would be an actual API call
            if (email.includes('novardent') && password.length >= 8) {
                showAlert('Login successful! Redirecting to dashboard...', 'success');
                // window.location.href = 'dashboard.html'; // Uncomment for actual redirect
            } else {
                showAlert('Invalid credentials. Please try again.', 'error');
            }
            
            // Reset button
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalText;
        }, 1500);
    }
});
