/**
 * ToolMaster E-Commerce Store
 * Frontend-only implementation with localStorage cart management
 * 
 * Features:
 * - Product catalog with filtering and search
 * - Shopping cart with localStorage persistence
 * - Checkout form with validation
 * - Responsive design with smooth animations
 */

// ============================================
// PRODUCT DATA
// ============================================

const products = [
    // Hand Tools
    {
        id: 1,
        name: 'Claw Hammer',
        category: 'Hand Tools',
        price: 24.99,
        description: 'Professional 16oz claw hammer with ergonomic grip',
        emoji: '🔨'
    },
    {
        id: 2,
        name: 'Adjustable Wrench Set',
        category: 'Hand Tools',
        price: 34.99,
        description: 'Set of 3 adjustable wrenches (8", 10", 12")',
        emoji: '🔧'
    },
    {
        id: 3,
        name: 'Screwdriver Set',
        category: 'Hand Tools',
        price: 19.99,
        description: '12-piece screwdriver set with magnetic tips',
        emoji: '🪛'
    },
    {
        id: 4,
        name: 'Tape Measure',
        category: 'Hand Tools',
        price: 14.99,
        description: '25ft stainless steel tape measure',
        emoji: '📏'
    },
    {
        id: 5,
        name: 'Combination Pliers',
        category: 'Hand Tools',
        price: 12.99,
        description: '8" slip-joint combination pliers',
        emoji: '🔩'
    },
    {
        id: 6,
        name: 'Socket Wrench Set',
        category: 'Hand Tools',
        price: 49.99,
        description: '40-piece socket wrench set with carrying case',
        emoji: '🔧'
    },

    // Power Tools
    {
        id: 7,
        name: 'Cordless Drill',
        category: 'Power Tools',
        price: 89.99,
        description: '20V cordless drill/driver with 2 batteries',
        emoji: '🔌'
    },
    {
        id: 8,
        name: 'Circular Saw',
        category: 'Power Tools',
        price: 79.99,
        description: '7.25" circular saw with laser guide',
        emoji: '🪚'
    },
    {
        id: 9,
        name: 'Orbital Sander',
        category: 'Power Tools',
        price: 69.99,
        description: '5" random orbital sander with dust collection',
        emoji: '✨'
    },
    {
        id: 10,
        name: 'Jigsaw',
        category: 'Power Tools',
        price: 59.99,
        description: 'Variable speed jigsaw for precise cuts',
        emoji: '🔨'
    },
    {
        id: 11,
        name: 'Impact Driver',
        category: 'Power Tools',
        price: 99.99,
        description: '20V brushless impact driver with LED work light',
        emoji: '⚡'
    },
    {
        id: 12,
        name: 'Angle Grinder',
        category: 'Power Tools',
        price: 74.99,
        description: '4.5" angle grinder with safety guard',
        emoji: '🔥'
    },

    // Accessories
    {
        id: 13,
        name: 'Drill Bit Set',
        category: 'Accessories',
        price: 22.99,
        description: '100-piece drill bit set with storage case',
        emoji: '📦'
    },
    {
        id: 14,
        name: 'Saw Blade Assortment',
        category: 'Accessories',
        price: 29.99,
        description: 'Set of 5 assorted saw blades',
        emoji: '🗡️'
    },
    {
        id: 15,
        name: 'Safety Glasses',
        category: 'Accessories',
        price: 9.99,
        description: 'ANSI Z87.1 certified safety glasses',
        emoji: '👓'
    },
    {
        id: 16,
        name: 'Work Gloves',
        category: 'Accessories',
        price: 14.99,
        description: 'Leather work gloves (pack of 3)',
        emoji: '🧤'
    },
    {
        id: 17,
        name: 'Tool Belt',
        category: 'Accessories',
        price: 34.99,
        description: 'Heavy-duty canvas tool belt with 16 pockets',
        emoji: '👜'
    },
    {
        id: 18,
        name: 'Dust Mask Pack',
        category: 'Accessories',
        price: 12.99,
        description: 'Pack of 20 N95 dust masks',
        emoji: '😷'
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================

let cart = [];
let currentPage = 'home';
let filteredProducts = [...products];
let currentFilters = {
    search: '',
    categories: [],
    minPrice: 0,
    maxPrice: Infinity
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    renderFeaturedProducts();
    setupEventListeners();
    updateCartCount();
});

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const page = e.target.dataset.page;
            navigateTo(page);
        });
    });

    // Products page filters
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        applyFilters();
    });

    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            currentFilters.categories = Array.from(
                document.querySelectorAll('.category-filter:checked')
            ).map(cb => cb.value);
            applyFilters();
        });
    });

    document.getElementById('minPrice')?.addEventListener('input', (e) => {
        currentFilters.minPrice = parseFloat(e.target.value) || 0;
        applyFilters();
    });

    document.getElementById('maxPrice')?.addEventListener('input', (e) => {
        currentFilters.maxPrice = parseFloat(e.target.value) || Infinity;
        applyFilters();
    });

    document.getElementById('sortSelect')?.addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });

    // Close modals on overlay click
    document.getElementById('modalOverlay')?.addEventListener('click', closeModals);

    // Cart button
    document.getElementById('cartBtn').addEventListener('click', openCart);
}

// ============================================
// NAVIGATION
// ============================================

function navigateTo(page) {
    // Update active page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`${page}-page`).classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    currentPage = page;

    // Render page-specific content
    if (page === 'products') {
        renderProducts();
    } else if (page === 'checkout') {
        renderCheckoutSummary();
        closeCart();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// ============================================
// PRODUCT RENDERING
// ============================================

function renderFeaturedProducts() {
    const featured = products.slice(0, 3);
    const grid = document.getElementById('featuredGrid');
    grid.innerHTML = featured.map(product => createProductCard(product)).join('');
}

function renderProducts() {
    filteredProducts = filterProducts();
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = filteredProducts.length > 0
        ? filteredProducts.map(product => createProductCard(product)).join('')
        : '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found matching your filters.</p>';
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="btn btn-primary btn-small product-button" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// FILTERING & SORTING
// ============================================

function filterProducts() {
    return products.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(currentFilters.search) ||
                            product.description.toLowerCase().includes(currentFilters.search);

        // Category filter
        const matchesCategory = currentFilters.categories.length === 0 ||
                               currentFilters.categories.includes(product.category);

        // Price filter
        const matchesPrice = product.price >= currentFilters.minPrice &&
                           product.price <= currentFilters.maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });
}

function applyFilters() {
    renderProducts();
}

function sortProducts(sortType) {
    const sorted = [...filteredProducts];

    switch (sortType) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'featured':
        default:
            sorted.sort((a, b) => a.id - b.id);
    }

    filteredProducts = sorted;
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function resetFilters() {
    currentFilters = {
        search: '',
        categories: [],
        minPrice: 0,
        maxPrice: Infinity
    };

    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('sortSelect').value = 'featured';

    applyFilters();
}

function filterByCategory(category) {
    navigateTo('products');
    currentFilters.categories = [category];
    document.querySelector(`input[value="${category}"]`).checked = true;
    applyFilters();
}

// ============================================
// CART MANAGEMENT
// ============================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartCount();
    showAddToCartFeedback();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    renderCart();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCartToStorage();
        updateCartCount();
        renderCart();
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function showAddToCartFeedback() {
    // Visual feedback - could be enhanced with toast notification
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Added!';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 1500);
}

// ============================================
// CART DISPLAY
// ============================================

function openCart() {
    renderCart();
    document.getElementById('cartModal').classList.add('active');
    document.getElementById('modalOverlay').classList.add('active');
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

function closeModals() {
    document.getElementById('cartModal').classList.remove('active');
    document.getElementById('successModal').classList.remove('active');
    document.getElementById('modalOverlay').classList.remove('active');
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartEmpty.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }

    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'flex';

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-button" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-button" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-button" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    updateCartTotals();
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// ============================================
// CHECKOUT
// ============================================

function renderCheckoutSummary() {
    const summaryContainer = document.getElementById('checkoutSummary');
    
    if (cart.length === 0) {
        summaryContainer.innerHTML = '<p>Your cart is empty. <a href="#" onclick="navigateTo(\'products\')">Continue shopping</a></p>';
        document.getElementById('checkoutFormElement').style.display = 'none';
        return;
    }

    document.getElementById('checkoutFormElement').style.display = 'block';

    summaryContainer.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

// ============================================
// FORM VALIDATION
// ============================================

function validateForm() {
    const errors = {};

    // Full Name validation
    const fullName = document.getElementById('fullName').value.trim();
    if (!fullName) {
        errors.name = 'Full name is required';
    } else if (fullName.length < 3) {
        errors.name = 'Full name must be at least 3 characters';
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Address validation
    const address = document.getElementById('address').value.trim();
    if (!address) {
        errors.address = 'Street address is required';
    } else if (address.length < 5) {
        errors.address = 'Please enter a valid address';
    }

    // City validation
    const city = document.getElementById('city').value.trim();
    if (!city) {
        errors.city = 'City is required';
    }

    // State validation
    const state = document.getElementById('state').value.trim();
    if (!state) {
        errors.state = 'State is required';
    }

    // ZIP Code validation
    const zipCode = document.getElementById('zipCode').value.trim();
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipCode) {
        errors.zip = 'ZIP code is required';
    } else if (!zipRegex.test(zipCode)) {
        errors.zip = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
    }

    // Phone validation
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[\d\s\-\(\)\.]+$/;
    if (!phone) {
        errors.phone = 'Phone number is required';
    } else if (phone.length < 10 || !phoneRegex.test(phone)) {
        errors.phone = 'Please enter a valid phone number';
    }

    return errors;
}

function displayErrors(errors) {
    // Clear all errors first
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // Display new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });
}

function submitCheckout(event) {
    event.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        return;
    }

    // Clear errors
    displayErrors({});

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
        phone: document.getElementById('phone').value,
        orderItems: cart,
        orderTotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.1
    };

    // Save order to localStorage (for demo purposes)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
        ...formData,
        orderDate: new Date().toISOString(),
        orderId: 'ORD-' + Date.now()
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    // Show success modal
    showSuccessModal(formData);

    // Clear cart
    cart = [];
    saveCartToStorage();
    updateCartCount();

    // Reset form
    document.getElementById('checkoutFormElement').reset();
}

function showSuccessModal(orderData) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('successMessage').innerHTML = `
        <p>Thank you for your order, <strong>${orderData.fullName}</strong>!</p>
        <p>A confirmation email has been sent to <strong>${orderData.email}</strong></p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #5a5450;">
            Order Total: <strong>$${(subtotal + tax).toFixed(2)}</strong>
        </p>
    `;

    document.getElementById('successModal').classList.add('active');
    document.getElementById('modalOverlay').classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    document.getElementById('modalOverlay').classList.remove('active');
    navigateTo('home');
}

// ============================================
// LOCAL STORAGE
// ============================================

function saveCartToStorage() {
    localStorage.setItem('toolmasterCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('toolmasterCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}
