document.addEventListener('DOMContentLoaded', function() {
    // Navigation hover effect
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.querySelector('i').style.transform = 'rotate(15deg) scale(1.2)';
        });
        link.addEventListener('mouseleave', () => {
            link.querySelector('i').style.transform = 'rotate(0) scale(1)';
        });
    });

    // Product image hover effect
    const productImage = document.querySelector('.product-image img');
    productImage.addEventListener('mouseenter', () => {
        productImage.style.transform = 'scale(1.05)';
    });
    productImage.addEventListener('mouseleave', () => {
        productImage.style.transform = 'scale(1)';
    });

    // Button click effects
    const buyNowBtn = document.querySelector('.buy-now');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const notification = document.querySelector('.notification');

    buyNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Voyager purchased! Preparing for launch...', 'fas fa-rocket');
        
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        buyNowBtn.appendChild(ripple);
        
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });

    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Voyager added to your cart!', 'fas fa-shopping-cart');
        
        // Cart icon animation
        const cartIcon = addToCartBtn.querySelector('i');
        cartIcon.style.transform = 'scale(1.5)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    });

    function showNotification(message, iconClass) {
        notification.innerHTML = `<i class="${iconClass}"></i> ${message}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Create additional stars for background
    createStars();
    
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        const count = 100;
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random positioning
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 3;
            
            // Random animation duration
            const duration = 2 + Math.random() * 3;
            const delay = Math.random() * 5;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
            
            starsContainer.appendChild(star);
        }
    }

    // Add CSS for dynamically created stars
    const style = document.createElement('style');
    style.textContent = `
        .star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            animation: twinkle ${2 + Math.random() * 3}s ease-in-out infinite;
            opacity: ${0.3 + Math.random() * 0.7};
        }
    `;
    document.head.appendChild(style);

    // Mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelector('.small').style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        document.querySelector('.medium').style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        document.querySelector('.large').style.transform = `translate(${x * 40}px, ${y * 40}px)`;
    });
});
