document.addEventListener('DOMContentLoaded', function() {
    // Create animated stars
    function createStars() {
        const stars = document.querySelector('.stars');
        const count = 100;
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random properties
            const size = Math.random() * 3;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 2 + Math.random() * 3;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            
            stars.appendChild(star);
        }
    }
    
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send data to your server
        console.log('Login attempt with:', { email, password });
        
        // Simulate successful login
        setTimeout(() => {
            alert('Login successful! Redirecting...');
            window.location.href = 'dashboard.html'; // Change to your actual dashboard page
        }, 1000);
    });
    
    // Social login buttons
    document.querySelector('.btn-social.google').addEventListener('click', function() {
        alert('Redirecting to Google login...');
        // window.location.href = 'your-google-auth-endpoint';
    });
    
    document.querySelector('.btn-social.apple').addEventListener('click', function() {
        alert('Redirecting to Apple login...');
        // window.location.href = 'your-apple-auth-endpoint';
    });
    
    document.querySelector('.btn-social.twitter').addEventListener('click', function() {
        alert('Redirecting to Twitter login...');
        // window.location.href = 'your-twitter-auth-endpoint';
    });
    
    // Initialize
    createStars();
});
