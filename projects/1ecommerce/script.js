/* ============================================
   TECHSTORE - E-COMMERCE WEBSITE
   Premium Tech Products Store
   Vanilla JavaScript Implementation
   ============================================ */

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
  cart: [],
  currentPage: 'home',
  filters: {
    category: [],
    brand: [],
    priceRange: []
  },
  searchQuery: '',
  isDarkMode: localStorage.getItem('darkMode') === 'true'
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
  // Navigation
  navbar: document.querySelector('.navbar'),
  navLinks: document.querySelectorAll('.nav-link'),
  themeToggle: document.getElementById('themeToggle'),
  cartButton: document.getElementById('cartButton'),
  cartCount: document.getElementById('cartCount'),

  // Pages
  pages: document.querySelectorAll('.page'),
  homePage: document.getElementById('homePage'),
  shopPage: document.getElementById('shopPage'),
  aboutPage: document.getElementById('aboutPage'),

  // Hero
  heroShopBtn: document.getElementById('heroShopBtn'),

  // Featured Carousel
  featuredCarousel: document.getElementById('featuredCarousel'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),

  // Categories
  categoriesGrid: document.getElementById('categoriesGrid'),

  // Shop
  productsGrid: document.getElementById('productsGrid'),
  searchInput: document.getElementById('searchInput'),
  categoryFilter: document.getElementById('categoryFilter'),
  brandFilter: document.getElementById('brandFilter'),
  priceFilter: document.getElementById('priceFilter'),
  clearFilters: document.getElementById('clearFilters'),
  noResults: document.getElementById('noResults'),

  // Modal
  productModal: document.getElementById('productModal'),
  modalOverlay: document.getElementById('modalOverlay'),
  modalClose: document.getElementById('modalClose'),
  modalProductImage: document.getElementById('modalProductImage'),
  modalProductName: document.getElementById('modalProductName'),
  modalProductPrice: document.getElementById('modalProductPrice'),
  modalSpecs: document.getElementById('modalSpecs'),
  modalRating: document.getElementById('modalRating'),
  modalReviews: document.getElementById('modalReviews'),
  modalAddToCart: document.getElementById('modalAddToCart'),

  // Cart
  cartDrawer: document.getElementById('cartDrawer'),
  cartClose: document.getElementById('cartClose'),
  cartItems: document.getElementById('cartItems'),
  cartEmpty: document.getElementById('cartEmpty'),
  cartTotal: document.getElementById('cartTotal'),
  checkoutBtn: document.getElementById('checkoutBtn'),

  // Checkout
  checkoutPage: document.getElementById('checkoutPage'),
  checkoutForm: document.getElementById('checkoutForm'),
  backToCart: document.getElementById('backToCart'),

  // Success
  successModal: document.getElementById('successModal'),
  successBtn: document.getElementById('successBtn')
};

let currentProduct = null;

// ============================================
// INITIALIZATION
// ============================================
function init() {
  // Apply saved theme
  if (state.isDarkMode) {
    document.body.classList.add('dark-mode');
    elements.themeToggle.textContent = '☀️';
  }

  // Load cart from localStorage
  loadCart();

  // Render initial content
  renderFeaturedCarousel();
  renderCategories();
  renderProducts();
  renderFilters();

  // Event listeners
  setupEventListeners();

  console.log('TechStore initialized successfully');
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
  // Navigation
  elements.themeToggle.addEventListener('click', toggleTheme);
  elements.cartButton.addEventListener('click', openCart);
  elements.cartClose.addEventListener('click', closeCart);
  elements.modalOverlay.addEventListener('click', closeAllModals);
  elements.modalClose.addEventListener('click', closeAllModals);

  // Page Navigation
  elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navigateToPage(page);
    });
  });

  // Hero
  elements.heroShopBtn.addEventListener('click', () => navigateToPage('shop'));

  // Carousel
  elements.prevBtn.addEventListener('click', () => scrollCarousel(-1));
  elements.nextBtn.addEventListener('click', () => scrollCarousel(1));

  // Search and Filters
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderProducts();
  });

  elements.clearFilters.addEventListener('click', clearAllFilters);

  // Checkout
  elements.checkoutBtn.addEventListener('click', openCheckout);
  elements.backToCart.addEventListener('click', closeCheckout);
  elements.checkoutForm.addEventListener('submit', handleCheckout);
  elements.successBtn.addEventListener('click', () => {
    closeAllModals();
    navigateToPage('home');
  });
}

// ============================================
// THEME MANAGEMENT
// ============================================
function toggleTheme() {
  state.isDarkMode = !state.isDarkMode;
  document.body.classList.toggle('dark-mode');
  elements.themeToggle.textContent = state.isDarkMode ? '☀️' : '🌙';
  localStorage.setItem('darkMode', state.isDarkMode);
}

// ============================================
// PAGE NAVIGATION
// ============================================
function navigateToPage(page) {
  // Update active page
  elements.pages.forEach(p => p.classList.remove('active'));
  document.getElementById(page + 'Page').classList.add('active');

  // Update nav links
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === page) {
      link.classList.add('active');
    }
  });

  state.currentPage = page;

  // Close cart and modals
  closeCart();
  closeAllModals();

  // Scroll to top
  window.scrollTo(0, 0);
}

// ============================================
// FEATURED CAROUSEL
// ============================================
function renderFeaturedCarousel() {
  const featured = PRODUCTS.slice(0, 8);
  elements.featuredCarousel.innerHTML = featured.map(product => 
    createProductCard(product)
  ).join('');

  // Add click handlers
  elements.featuredCarousel.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = parseInt(card.dataset.productId);
      openProductModal(productId);
    });
  });
}

function scrollCarousel(direction) {
  const carousel = elements.featuredCarousel;
  const scrollAmount = 300;
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// ============================================
// CATEGORIES
// ============================================
function renderCategories() {
  elements.categoriesGrid.innerHTML = CATEGORIES.map(category => `
    <div class="category-card" data-category="${category.id}">
      <div class="category-icon">${category.icon}</div>
      <div class="category-name">${category.name}</div>
    </div>
  `).join('');

  // Add click handlers
  elements.categoriesGrid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const categoryId = card.dataset.category;
      navigateToPage('shop');
      // Clear other filters and select this category
      state.filters.category = [categoryId];
      state.filters.brand = [];
      state.filters.priceRange = [];
      renderFilters();
      renderProducts();
    });
  });
}

// ============================================
// FILTERS
// ============================================
function renderFilters() {
  // Category Filter
  elements.categoryFilter.innerHTML = CATEGORIES.map(category => `
    <div class="filter-option">
      <input 
        type="checkbox" 
        id="cat-${category.id}" 
        value="${category.id}"
        ${state.filters.category.includes(category.id) ? 'checked' : ''}
      >
      <label for="cat-${category.id}">${category.name}</label>
    </div>
  `).join('');

  // Brand Filter
  elements.brandFilter.innerHTML = BRANDS.map(brand => `
    <div class="filter-option">
      <input 
        type="checkbox" 
        id="brand-${brand}" 
        value="${brand}"
        ${state.filters.brand.includes(brand) ? 'checked' : ''}
      >
      <label for="brand-${brand}">${brand}</label>
    </div>
  `).join('');

  // Price Filter
  elements.priceFilter.innerHTML = PRICE_RANGES.map((range, index) => `
    <div class="filter-option">
      <input 
        type="checkbox" 
        id="price-${index}" 
        value="${index}"
        ${state.filters.priceRange.includes(index.toString()) ? 'checked' : ''}
      >
      <label for="price-${index}">${range.label}</label>
    </div>
  `).join('');

  // Add event listeners
  document.querySelectorAll('#categoryFilter input').forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        state.filters.category.push(e.target.value);
      } else {
        state.filters.category = state.filters.category.filter(c => c !== e.target.value);
      }
      renderProducts();
    });
  });

  document.querySelectorAll('#brandFilter input').forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        state.filters.brand.push(e.target.value);
      } else {
        state.filters.brand = state.filters.brand.filter(b => b !== e.target.value);
      }
      renderProducts();
    });
  });

  document.querySelectorAll('#priceFilter input').forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        state.filters.priceRange.push(e.target.value);
      } else {
        state.filters.priceRange = state.filters.priceRange.filter(p => p !== e.target.value);
      }
      renderProducts();
    });
  });
}

function clearAllFilters() {
  state.filters = {
    category: [],
    brand: [],
    priceRange: []
  };
  state.searchQuery = '';
  elements.searchInput.value = '';
  renderFilters();
  renderProducts();
}

// ============================================
// PRODUCTS
// ============================================
function renderProducts() {
  let filtered = PRODUCTS;

  // Search filter
  if (state.searchQuery) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(state.searchQuery) ||
      product.brand.toLowerCase().includes(state.searchQuery)
    );
  }

  // Category filter
  if (state.filters.category.length > 0) {
    filtered = filtered.filter(product =>
      state.filters.category.includes(product.category)
    );
  }

  // Brand filter
  if (state.filters.brand.length > 0) {
    filtered = filtered.filter(product =>
      state.filters.brand.includes(product.brand)
    );
  }

  // Price filter
  if (state.filters.priceRange.length > 0) {
    filtered = filtered.filter(product => {
      return state.filters.priceRange.some(rangeIndex => {
        const range = PRICE_RANGES[parseInt(rangeIndex)];
        return product.price >= range.min && product.price <= range.max;
      });
    });
  }

  // Render products
  if (filtered.length === 0) {
    elements.productsGrid.innerHTML = '';
    elements.noResults.style.display = 'block';
  } else {
    elements.productsGrid.innerHTML = filtered.map(product =>
      createProductCard(product)
    ).join('');
    elements.noResults.style.display = 'none';

    // Add click handlers
    elements.productsGrid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const productId = parseInt(card.dataset.productId);
        openProductModal(productId);
      });
    });
  }
}

function createProductCard(product) {
  const specs = Object.values(product.specs).slice(0, 2).join(', ');
  return `
    <div class="product-card" data-product-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22280%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22280%22 height=%22280%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23999%22%3EProduct Image%3C/text%3E%3C/svg%3E'">
      <div class="product-info">
        <div class="product-brand">${product.brand}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-specs">
          <span>${specs}</span>
        </div>
        <div class="product-price">$${product.price.toLocaleString()}</div>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `;
}

// ============================================
// PRODUCT MODAL
// ============================================
function openProductModal(productId) {
  currentProduct = PRODUCTS.find(p => p.id === productId);
  if (!currentProduct) return;

  elements.modalProductImage.src = currentProduct.image;
  elements.modalProductImage.onerror = function() {
    this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2232%22 fill=%22%23999%22%3EProduct Image%3C/text%3E%3C/svg%3E';
  };
  elements.modalProductName.textContent = currentProduct.name;
  elements.modalProductPrice.textContent = `$${currentProduct.price.toLocaleString()}`;
  elements.modalRating.textContent = '★'.repeat(Math.floor(currentProduct.rating)) + '☆'.repeat(5 - Math.floor(currentProduct.rating));
  elements.modalReviews.textContent = `(${currentProduct.reviews} reviews)`;

  // Specs
  elements.modalSpecs.innerHTML = Object.entries(currentProduct.specs).map(([key, value]) => `
    <div class="spec-item">
      <span class="spec-label">${key.replace(/_/g, ' ').toUpperCase()}</span>
      <span class="spec-value">${value}</span>
    </div>
  `).join('');

  elements.modalAddToCart.onclick = () => {
    addToCart(productId);
    closeAllModals();
  };

  elements.productModal.classList.add('active');
  elements.modalOverlay.classList.add('active');
}

function closeAllModals() {
  elements.productModal.classList.remove('active');
  elements.successModal.classList.remove('active');
  elements.modalOverlay.classList.remove('active');
}

// ============================================
// CART MANAGEMENT
// ============================================
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();

  // Show feedback
  showCartNotification();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateCartQuantity(productId, quantity) {
  const item = state.cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

function loadCart() {
  const saved = localStorage.getItem('cart');
  if (saved) {
    state.cart = JSON.parse(saved);
  }
  updateCartUI();
}

function updateCartUI() {
  // Update cart count
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCount.textContent = totalItems;

  // Update cart items display
  if (state.cart.length === 0) {
    elements.cartItems.innerHTML = '';
    elements.cartEmpty.style.display = 'flex';
  } else {
    elements.cartEmpty.style.display = 'none';
    elements.cartItems.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22%3E%3Crect fill=%22%23f0f0f0%22 width=%2280%22 height=%2280%22/%3E%3C/svg%3E'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toLocaleString()}</div>
          <div class="cart-item-quantity">
            <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <input type="text" class="qty-input" value="${item.quantity}" readonly>
            <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `).join('');
  }

  // Update total
  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  elements.cartTotal.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function openCart() {
  elements.cartDrawer.classList.add('active');
  elements.modalOverlay.classList.add('active');
}

function closeCart() {
  elements.cartDrawer.classList.remove('active');
  if (!elements.productModal.classList.contains('active') && 
      !elements.successModal.classList.contains('active')) {
    elements.modalOverlay.classList.remove('active');
  }
}

function showCartNotification() {
  // Simple visual feedback - you can enhance this with a toast notification
  const cartBtn = elements.cartButton;
  cartBtn.style.transform = 'scale(1.2)';
  setTimeout(() => {
    cartBtn.style.transform = 'scale(1)';
  }, 200);
}

// ============================================
// CHECKOUT
// ============================================
function openCheckout() {
  if (state.cart.length === 0) {
    alert('Your cart is empty');
    return;
  }
  elements.checkoutPage.classList.add('active');
  closeCart();
}

function closeCheckout() {
  elements.checkoutPage.classList.remove('active');
}

function handleCheckout(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(elements.checkoutForm);
  const data = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value
  };

  // Validate
  if (!data.fullName || !data.email || !data.phone || !data.address) {
    alert('Please fill in all fields');
    return;
  }

  // Save order to localStorage (for offline functionality)
  const order = {
    id: 'ORD-' + Date.now(),
    date: new Date().toISOString(),
    customer: data,
    items: state.cart,
    total: state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };

  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear cart
  state.cart = [];
  saveCart();
  updateCartUI();

  // Close checkout and show success
  closeCheckout();
  elements.checkoutForm.reset();
  elements.successModal.classList.add('active');
  elements.modalOverlay.classList.add('active');
}

// ============================================
// INITIALIZATION ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', init);

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
  // Escape key closes modals and cart
  if (e.key === 'Escape') {
    closeAllModals();
    closeCart();
    closeCheckout();
  }

  // Ctrl/Cmd + K opens search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (state.currentPage === 'shop') {
      elements.searchInput.focus();
    }
  }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll on anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Prevent layout shift on scroll
document.addEventListener('wheel', (e) => {
  if (e.deltaY !== 0) {
    // Smooth scrolling is handled by CSS
  }
}, { passive: true });

console.log('TechStore Script Loaded');
