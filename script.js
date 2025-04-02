// Form Submission
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target.elements[0].value,
        email: e.target.elements[1].value,
        phone: e.target.elements[2].value
    };

    // Save to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(formData));

    // Send email via FormSubmit
    try {
        await fetch('https://formsubmit.co/ajax/ayush99know@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ...formData, 
                product: "Premium Product (₹5000)",
                _subject: "New Order Received!"
            })
        });
        window.location.href = 'order-success.html';
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Auto-fill last order
window.addEventListener('load', () => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
        const { name, email, phone } = JSON.parse(lastOrder);
        const form = document.getElementById('orderForm');
        form.elements[0].value = name;
        form.elements[1].value = email;
        form.elements[2].value = phone;
    }
});
