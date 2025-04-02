// Form Submission
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    try {
        await fetch('https://formsubmit.co/ajax/ayush99know@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ...formData, 
                product: "Novardent Pro 5000 (₹5000)",
                _subject: "New Order for Novardent Pro 5000"
            })
        });
        window.location.href = 'order-success.html';
    } catch (error) {
        alert('Error submitting order. Please try again.');
    }
});

// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
