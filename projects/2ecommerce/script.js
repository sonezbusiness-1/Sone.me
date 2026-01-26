/**
 * FASHION E-COMMERCE STORE
 * Frontend-only application with localStorage cart management
 * Design Philosophy: Minimalist Luxury
 */

// ============================================
// PRODUCT DATABASE
// ============================================

const products = [
    // Men's Collection
    {
        id: 1,
        name: 'Classic Oxford Shirt',
        category: 'men',
        price: 89.99,
        description: 'Premium cotton oxford shirt with timeless style',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        trending: true
    },
    {
        id: 2,
        name: 'Slim Fit Jeans',
        category: 'men',
        price: 79.99,
        description: 'Modern slim fit jeans with stretch comfort',
        sizes: ['S', 'M', 'L', 'XL'],
        trending: true
    },
    {
        id: 3,
        name: 'Wool Blazer',
        category: 'men',
        price: 199.99,
        description: 'Elegant wool blazer for formal occasions',
        sizes: ['S', 'M', 'L', 'XL'],
        trending: false
    },
    {
        id: 4,
        name: 'Casual T-Shirt',
        category: 'men',
        price: 39.99,
        description: 'Comfortable everyday t-shirt',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        trending: true
    },
    {
        id: 5,
        name: 'Chino Pants',
        category: 'men',
        price: 69.99,
        description: 'Versatile chino pants in neutral colors',
        sizes: ['S', 'M', 'L', 'XL'],
        trending: false
    },

    // Women's Collection
    {
        id: 6,
        name: 'Elegant Dress',
        category: 'women',
        price: 129.99,
        description: 'Sophisticated evening dress for special occasions',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        trending: true
    },
    {
        id: 7,
        name: 'Silk Blouse',
        category: 'women',
        price: 99.99,
        description: 'Luxurious silk blouse with elegant drape',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        trending: true
    },
    {
        id: 8,
        name: 'High-Waist Jeans',
        category: 'women',
        price: 89.99,
        description: 'Flattering high-waist jeans with perfect fit',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        trending: false
    },
    {
        id: 9,
        name: 'Cashmere Sweater',
        category: 'women',
        price: 149.99,
        description: 'Soft and warm cashmere sweater',
        sizes: ['XS', 'S', 'M', 'L'],
        trending: true
    },
    {
        id: 10,
        name: 'Linen Pants',
        category: 'women',
        price: 79.99,
        description: 'Breathable linen pants for warm weather',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        trending: false
    },

    // Kids' Collection
    {
        id: 11,
        name: 'Kids Graphic T-Shirt',
        category: 'kids',
        price: 29.99,
        description: 'Fun and colorful t-shirt for kids',
        sizes: ['XS', 'S', 'M', 'L'],
        trending: true
    },
    {
        id: 12,
        name: 'Kids Hoodie',
        category: 'kids',
        price: 49.99,
        description: 'Cozy hoodie perfect for active kids',
        sizes: ['XS', 'S', 'M', 'L'],
        trending: true
    },
    {
        id: 13,
        name: 'Kids Shorts',
        category: 'kids',
        price: 34.99,
        description: 'Comfortable shorts for playtime',
        sizes: ['XS', 'S', 'M', 'L'],
        trending: false
    },
    {
        id: 14,
        name: 'Kids Jacket',
        category: 'kids',
        price: 59.99,
        description: 'Warm jacket for outdoor adventures',
        sizes: ['XS', 'S', 'M', 'L'],
        trending: false
    },
    {
        id: 15,
        name: 'Kids Dress',
        category: 'kids',
        price: 44.99,
        description: 'Cute and comfortable dress for girls',
        sizes: ['XS', 'S', 'M', 'L'],
        trending: true
    },

    // Shoes Collection
    {
        id: 16,
        name: 'Classic Sneakers',
        category: 'shoes',
        price: 99.99,
        description: 'Timeless white sneakers for everyday wear',
        sizes: ['S', 'M', 'L', 'XL'],
        trending: true
    },
    {
        id: 17,
        name: 'Leather Loafers',
        category: 'shoes',
        price: 129.99,
        description: 'Premium leather loafers for formal occasions',
        sizes: ['S', 'M', 'L', 'XL'],
        trending: true
    },
    {
        id: 18,
        name: 'Running Shoes',
        category: 'shoes',
        price: 119.99,
        description: 'High-performance running shoes',
        sizes: ['S', 'M', 'L', 'XL'],
        trending: false
    },
    {
        id: 19,
        name: 'Ankle Boots',
        category: 'shoes',
        price: 139.99,
        description: 'Stylish ankle boots for any season',
        sizes: ['S', 'M', 'L', 'XL'],
        trending: true
    },
    {
        id: 20,
        name: 'Casual Sandals',
        category: 'shoes',
        price: 59.99,
        description: 'Comfortable sandals for warm weather',
        sizes: ['S', 'M', 'L', 'XL'],
        trending: false
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================

let cart = [];
let currentPage = 'home';
let selectedProduct = null;
let filteredProducts = [...products];

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initializeEventListeners();
    renderTrendingProducts();
    updateCartUI();
});

// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    document.getElementById('shopNowBtn').addEventListener('click', () => {
        navigateToPage('shop');
    });

    // Cart Toggle
    document.getElementById('cartToggle').addEventListener('click', toggleCartPanel);
    document.getElementById('closeCart').addEventListener('click', toggleCartPanel);
    document.getElementById('cartOverlay').addEventListener('click', toggleCartPanel);

    // Shop Page - Filters
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    document.querySelectorAll('.size-filter').forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    document.getElementById('priceMin').addEventListener('input', applyFilters);
    document.getElementById('priceMax').addEventListener('input', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);

    // Search
    document.getElementById('searchInput').addEventListener('input', applyFilters);

    // Cart Page
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        navigateToPage('checkout');
    });

    document.getElementById('continueShopping').addEventListener('click', () => {
        navigateToPage('shop');
    });

    document.getElementById('checkoutPanelBtn').addEventListener('click', () => {
        toggleCartPanel();
        navigateToPage('checkout');
    });

    // Checkout Page
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
    document.getElementById('backToCart').addEventListener('click', () => {
        navigateToPage('cart');
    });

    // Featured Collections
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            navigateToPage('shop');
            setTimeout(() => {
                document.querySelector(`input[value="${category}"]`).checked = true;
                document.querySelector('input[value="all"]').checked = false;
                applyFilters();
            }, 100);
        });
    });

    // Modal
    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
    document.getElementById('modalOverlay').addEventListener('click', closeProductModal);
    document.getElementById('addToCartModal').addEventListener('click', addToCartFromModal);

    // Quantity Controls
    document.getElementById('increaseQty').addEventListener('click', () => {
        const input = document.getElementById('productQty');
        input.value = Math.min(parseInt(input.value) + 1, 10);
    });

    document.getElementById('decreaseQty').addEventListener('click', () => {
        const input = document.getElementById('productQty');
        input.value = Math.max(parseInt(input.value) - 1, 1);
    });

    // Success Modal
    document.getElementById('continueShoppingBtn').addEventListener('click', () => {
        closeSuccessModal();
        navigateToPage('home');
    });
}

// ============================================
// NAVIGATION
// ============================================

function handleNavigation(e) {
    e.preventDefault();
    const page = e.target.dataset.page;
    navigateToPage(page);
}

function navigateToPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show selected page
    document.getElementById(`${page}Page`).classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    currentPage = page;

    // Scroll to top
    window.scrollTo(0, 0);

    // Update page-specific content
    if (page === 'shop') {
        renderShopProducts();
    } else if (page === 'cart') {
        renderCartPage();
    } else if (page === 'checkout') {
        renderCheckoutPage();
    }
}

// ============================================
// PRODUCT RENDERING
// ============================================

function renderTrendingProducts() {
    const trendingProducts = products.filter(p => p.trending).slice(0, 8);
    const container = document.getElementById('trendingProducts');
    container.innerHTML = trendingProducts.map(product => createProductCard(product)).join('');
    attachProductCardListeners();
}

function renderShopProducts() {
    filteredProducts = [...products];
    applyFilters();
}

function createProductCard(product) {
    const sizes = product.sizes.slice(0, 3).map(size => `<span class="size-badge">${size}</span>`).join('');
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image"></div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h4 class="product-name">${product.name}</h4>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-sizes">${sizes}</div>
                <button class="btn-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
}

function attachProductCardListeners() {
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = parseInt(card.dataset.productId);
        const product = products.find(p => p.id === productId);

        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-to-cart')) {
                e.stopPropagation();
            } else {
                openProductModal(product);
            }
        });

        card.querySelector('.btn-add-to-cart').addEventListener('click', (e) => {
            e.stopPropagation();
            openProductModal(product);
        });
    });
}

// ============================================
// PRODUCT MODAL
// ============================================

function openProductModal(product) {
    selectedProduct = product;
    document.getElementById('productModalName').textContent = product.name;
    document.getElementById('productModalPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('productModalDescription').textContent = product.description;
    document.getElementById('productQty').value = 1;

    // Render size options
    const sizeContainer = document.getElementById('productModalSizes');
    sizeContainer.innerHTML = product.sizes.map(size => `
        <button type="button" class="size-option" data-size="${size}">${size}</button>
    `).join('');

    // Add event listeners to size options
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Select first size by default
    document.querySelector('.size-option').click();

    // Show modal
    document.getElementById('productModal').classList.add('open');
    document.getElementById('modalOverlay').classList.add('open');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('open');
    document.getElementById('modalOverlay').classList.remove('open');
    selectedProduct = null;
}

function addToCartFromModal() {
    if (!selectedProduct) return;

    const selectedSize = document.querySelector('.size-option.selected');
    const quantity = parseInt(document.getElementById('productQty').value);

    if (!selectedSize) {
        alert('Please select a size');
        return;
    }

    addToCart(selectedProduct, selectedSize.dataset.size, quantity);
    closeProductModal();
    showAddToCartNotification();
}

// ============================================
// CART MANAGEMENT
// ============================================

function addToCart(product, size, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: quantity,
            category: product.category
        });
    }

    saveCart();
    updateCartUI();
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart();
    updateCartUI();
}

function updateCartItemQuantity(productId, size, quantity) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('cart');
    cart = saved ? JSON.parse(saved) : [];
}

function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
    renderCartPanel();
}

// ============================================
// CART PANEL
// ============================================

function toggleCartPanel() {
    document.getElementById('cartPanel').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
}

function renderCartPanel() {
    const container = document.getElementById('cartPanelItems');
    const total = calculateTotal();

    if (cart.length === 0) {
        container.innerHTML = '<p style="padding: 2rem; text-align: center; color: #6b6b6b;">Your cart is empty</p>';
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-panel-item">
                <div class="cart-panel-item-image"></div>
                <div class="cart-panel-item-details">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>Qty: ${item.quantity}</p>
                    <p class="cart-panel-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('cartPanelTotal').textContent = `$${total.toFixed(2)}`;
}

// ============================================
// CART PAGE
// ============================================

function renderCartPage() {
    const container = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');

    if (cart.length === 0) {
        container.style.display = 'none';
        emptyCart.style.display = 'block';
    } else {
        container.style.display = 'flex';
        emptyCart.style.display = 'none';
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image"></div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="product-category">${item.category}</p>
                    <p>Size: <strong>${item.size}</strong></p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" data-action="decrease" data-product-id="${item.id}" data-size="${item.size}">−</button>
                    <input type="number" class="cart-item-qty" value="${item.quantity}" min="1" data-product-id="${item.id}" data-size="${item.size}">
                    <button class="qty-btn" data-action="increase" data-product-id="${item.id}" data-size="${item.size}">+</button>
                    <button class="remove-btn" data-product-id="${item.id}" data-size="${item.size}">Remove</button>
                </div>
            </div>
        `).join('');

        // Attach event listeners
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(btn.dataset.productId);
                const size = btn.dataset.size;
                const item = cart.find(i => i.id === productId && i.size === size);
                if (item) {
                    if (btn.dataset.action === 'increase') {
                        updateCartItemQuantity(productId, size, item.quantity + 1);
                    } else {
                        updateCartItemQuantity(productId, size, item.quantity - 1);
                    }
                }
            });
        });

        document.querySelectorAll('.cart-item-qty').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(input.dataset.productId);
                const size = input.dataset.size;
                updateCartItemQuantity(productId, size, parseInt(input.value));
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = parseInt(btn.dataset.productId);
                const size = btn.dataset.size;
                removeFromCart(productId, size);
                renderCartPage();
            });
        });
    }

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = calculateSubtotal();
    const shipping = cart.length > 0 ? 10 : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// ============================================
// CHECKOUT PAGE
// ============================================

function renderCheckoutPage() {
    const itemsContainer = document.getElementById('checkoutItems');
    itemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} (${item.size}) x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    const subtotal = calculateSubtotal();
    const shipping = cart.length > 0 ? 10 : 0;
    const total = subtotal + shipping;

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

function handleCheckout(e) {
    e.preventDefault();

    // Validate form
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
    }

    // Get form data
    const formData = new FormData(form);
    const orderData = {
        customer: {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip'),
            country: formData.get('country')
        },
        items: cart,
        total: calculateTotal(),
        timestamp: new Date().toISOString()
    };

    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();

    // Show success modal
    showSuccessModal(orderData);
}

function showSuccessModal(orderData) {
    const orderDetails = `
        Order #${Math.floor(Math.random() * 100000)}<br>
        Customer: ${orderData.customer.fullName}<br>
        Total: $${orderData.total.toFixed(2)}<br>
        Items: ${orderData.items.length}
    `;
    document.getElementById('orderDetails').innerHTML = orderDetails;
    document.getElementById('successModal').classList.add('open');
    document.getElementById('modalOverlay').classList.add('open');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('open');
    document.getElementById('modalOverlay').classList.remove('open');
}

// ============================================
// FILTERING & SEARCH
// ============================================

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(c => c.value);
    const selectedSizes = Array.from(document.querySelectorAll('.size-filter:checked')).map(s => s.value);
    const priceMin = parseInt(document.getElementById('priceMin').value);
    const priceMax = parseInt(document.getElementById('priceMax').value);
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    // Update price display
    document.getElementById('priceMinDisplay').textContent = `$${priceMin}`;
    document.getElementById('priceMaxDisplay').textContent = `$${priceMax}`;

    // Filter products
    filteredProducts = products.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
            if (!selectedCategories.includes(product.category)) return false;
        }

        // Price filter
        if (product.price < priceMin || product.price > priceMax) return false;

        // Size filter
        if (selectedSizes.length > 0 && !selectedSizes.includes('all')) {
            const hasSize = selectedSizes.some(size => product.sizes.includes(size));
            if (!hasSize) return false;
        }

        // Search filter
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery)) return false;

        return true;
    });

    renderFilteredProducts();
}

function renderFilteredProducts() {
    const container = document.getElementById('shopProducts');
    const noResults = document.getElementById('noResults');

    if (filteredProducts.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        noResults.style.display = 'none';
        attachProductCardListeners();
    }
}

function resetFilters() {
    // Reset checkboxes
    document.querySelectorAll('.category-filter').forEach(c => {
        c.checked = c.value === 'all';
    });

    document.querySelectorAll('.size-filter').forEach(s => {
        s.checked = s.value === 'all';
    });

    // Reset price range
    document.getElementById('priceMin').value = 0;
    document.getElementById('priceMax').value = 500;

    // Clear search
    document.getElementById('searchInput').value = '';

    // Apply filters
    applyFilters();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateTotal() {
    const subtotal = calculateSubtotal();
    const shipping = cart.length > 0 ? 10 : 0;
    return subtotal + shipping;
}

function showAddToCartNotification() {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #2e7d32;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = 'Added to cart!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Add animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
