document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        loginBtn: document.getElementById('login-btn'),
        aboutBtn: document.getElementById('about-btn'),
        cartBtn: document.getElementById('cart-btn'),
        trackBtn: document.getElementById('track-btn'),
        loginModal: document.getElementById('login-modal'),
        aboutModal: document.getElementById('about-modal'),
        purchaseModal: document.getElementById('purchase-modal'),
        ordersModal: document.getElementById('orders-modal'),
        closeBtns: document.querySelectorAll('.close-btn'),
        addToCartBtn: document.querySelector('.add-to-cart'),
        buyNowBtn: document.querySelector('.buy-now'),
        cartCount: document.querySelector('.cart-count'),
        modals: document.querySelectorAll('.modal'),
        purchaseForm: document.getElementById('purchase-form'),
        orderList: document.getElementById('order-list'),
        emptyOrders: document.getElementById('empty-orders')
    };

    // State management
    const state = {
        cartItems: 0,
        isAnimating: false
    };

    // Initialize the application
    function init() {
        initCart();
        initEventListeners();
        displayOrders();
    }

    // Initialize event listeners
    function initEventListeners() {
        // Modal triggers
        elements.loginBtn.addEventListener('click', handleModalOpen);
        elements.aboutBtn.addEventListener('click', handleModalOpen);
        elements.cartBtn.addEventListener('click', showCartAlert);
        elements.trackBtn.addEventListener('click', showOrdersModal);
        
        // Modal close handlers
        elements.closeBtns.forEach(btn => {
            btn.addEventListener('click', handleModalClose);
        });
        
        // Outside click to close modal
        elements.modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    handleModalClose.call(modal);
                }
            });
        });
        
        // Product actions
        elements.addToCartBtn.addEventListener('click', handleAddToCart);
        elements.buyNowBtn.addEventListener('click', showPurchaseModal);
        
        // Form submission
        elements.purchaseForm.addEventListener('submit', handlePurchaseSubmit);
        
        // Parallax effect
        document.addEventListener('mousemove', handleParallax);
    }

    // Initialize cart from storage
    function initCart() {
        const savedItems = localStorage.getItem('cartItems');
        if (savedItems) {
            state.cartItems = parseInt(savedItems);
            elements.cartCount.textContent = state.cartItems;
        }
    }

    // Modal handlers
    function handleModalOpen(e) {
        e.preventDefault();
        const modalId = `${this.id.split('-')[0]}-modal`;
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function handleModalClose() {
        const modal = this.closest('.modal') || this;
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showPurchaseModal(e) {
        e.preventDefault();
        elements.purchaseModal.style.display = 'flex';
    }

    function showOrdersModal(e) {
        e.preventDefault();
        elements.ordersModal.style.display = 'flex';
    }

    // Cart functionality
    function handleAddToCart() {
        if (state.isAnimating) return;
        
        state.cartItems++;
        elements.cartCount.textContent = state.cartItems;
        
        // Visual feedback
        this.textContent = 'Added!';
        this.classList.add('added-to-cart');
        state.isAnimating = true;
        
        // Reset button after animation
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.classList.remove('added-to-cart');
            state.isAnimating = false;
        }, 1000);
        
        // Save to localStorage
        localStorage.setItem('cartItems', state.cartItems);
    }

    function showCartAlert(e) {
        e.preventDefault();
        const message = state.cartItems === 0 
            ? 'Your cart is empty. Add some stellar products!' 
            : `You have ${state.cartItems} item${state.cartItems !== 1 ? 's' : ''} in your cart.`;
        showNotification(message);
    }

    // Purchase flow
    function handlePurchaseSubmit(e) {
        e.preventDefault();
        
        if (state.isAnimating) return;
        state.isAnimating = true;
        
        // Get form values
        const order = {
            id: Date.now(),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            product: 'Voyager Spacecraft',
            price: 1299999,
            date: new Date().toLocaleDateString(),
            status: 'Processing'
        };
        
        // Save order
        saveOrder(order);
        
        // Show confirmation
        showNotification(
            `Order #${order.id} confirmed!\n` +
            'Your Voyager spacecraft will be prepared for launch.\n' +
            'A confirmation has been sent to your email.'
        );
        
        // Close modal and reset form
        elements.purchaseModal.style.display = 'none';
        elements.purchaseForm.reset();
        state.isAnimating = false;
        
        // Update orders display
        displayOrders();
    }

    // Order management
    function saveOrder(order) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.unshift(order);
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    function displayOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        if (orders.length === 0) {
            elements.emptyOrders.style.display = 'block';
            elements.orderList.style.display = 'none';
            return;
        }
        
        elements.emptyOrders.style.display = 'none';
        elements.orderList.style.display = 'block';
        elements.orderList.innerHTML = '';
        
        orders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-details';
            orderElement.innerHTML = `
                <h3>Order #${order.id}</h3>
                <div class="order-item">
                    <span>Product:</span>
                    <span>${order.product}</span>
                </div>
                <div class="order-item">
                    <span>Date:</span>
                    <span>${order.date}</span>
                </div>
                <div class="order-item">
                    <span>Status:</span>
                    <span style="color: ${order.status === 'Processing' ? 'var(--primary)' : '#4CAF50'}">
                        ${order.status}
                    </span>
                </div>
                <div class="order-item">
                    <span>Total:</span>
                    <span>$${order.price.toLocaleString()}</span>
                </div>
            `;
            elements.orderList.appendChild(orderElement);
        });
    }

    // Parallax effect
    function handleParallax(e) {
        const stars = document.querySelector('.stars');
        const twinkling = document.querySelector('.twinkling');
        
        if (!stars || !twinkling) return;
        
        const moveX = (e.clientX / window.innerWidth - 0.5) * 30;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 30;
        
        stars.style.transform = `translate(${moveX}px, ${moveY}px)`;
        twinkling.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
    }

    // Helper function for notifications
    function showNotification(message) {
        alert(message);
    }

    // Start the application
    init();
});
