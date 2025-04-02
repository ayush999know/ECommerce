document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form data
    const name = this.elements[0].value;
    const email = this.elements[1].value;
    const phone = this.elements[2].value;
    
    // Send email using FormSubmit.co (free service)
    fetch('https://formsubmit.co/ajax/ayush99know@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            product: "Premium Product (₹5000)"
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Order received! We\'ll contact you shortly.');
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting order. Please try again.');
    });
});
