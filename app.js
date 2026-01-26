// Spotlight effect
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });

  // Add touch support for mobile
  card.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${touch.clientX - rect.left}px`);
    card.style.setProperty('--y', `${touch.clientY - rect.top}px`);
  });
});

// Projects
function openProject(id) {
  window.open(`projects/${id}ecommerce/index.html`, "_blank");
}

// Safe project modal handling
document.addEventListener('DOMContentLoaded', function() {
  const projectItems = document.querySelectorAll(".project-item");
  const closeModal = document.querySelector(".close-modal");
  const projectModal = document.getElementById("projectModal");
  const projectFrame = document.getElementById("projectFrame");

  if (projectItems.length > 0) {
    projectItems.forEach(item => {
      item.addEventListener("click", () => {
        const site = item.getAttribute("data-site");
        if (projectFrame) projectFrame.src = site;
        if (projectModal) projectModal.style.display = "flex";
      });
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      if (projectModal) projectModal.style.display = "none";
      if (projectFrame) projectFrame.src = "";
    });
  }

  if (projectModal) {
    window.addEventListener("click", e => {
      if (e.target === projectModal) {
        projectModal.style.display = "none";
        if (projectFrame) projectFrame.src = "";
      }
    });
  }
});

// ============================================
// QR SYSTEM PACKAGES
// ============================================

(function() {
  'use strict';
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQRSystem);
  } else {
    initQRSystem();
  }
  
  function initQRSystem() {
    console.log('🚀 Initializing QR System...');
    
    const cards = document.querySelectorAll(".package-card");
    const confirmBtn = document.getElementById("confirmBtn");
    
    // Validation
    if (!confirmBtn) {
      console.error('❌ Confirm button not found!');
      return;
    }
    
    if (cards.length === 0) {
      console.error('❌ No package cards found!');
      return;
    }
    
    console.log('✅ Found', cards.length, 'package cards');
    console.log('✅ Confirm button found');
    
    let selectedPackage = null;
    let receiptChoices = {}; // Store receipt choice for each package
    
    // Check and show/hide confirm button
    function updateConfirmButton() {
      console.log('📦 Selected Package:', selectedPackage);
      console.log('💳 Receipt Choices:', receiptChoices);
      
      // Show button ONLY if:
      // 1. A package is selected (card is clicked)
      // 2. That specific package has a receipt choice
      if (selectedPackage && receiptChoices[selectedPackage]) {
        confirmBtn.style.display = 'inline-block';
        console.log('✅ Button SHOWN');
      } else {
        confirmBtn.style.display = 'none';
        console.log('❌ Button HIDDEN');
      }
    }
    
    // Dropdown change handler - just store the value, don't show button yet
    const dropdowns = document.querySelectorAll('.receipt-select');
    dropdowns.forEach(function(select) {
      select.addEventListener('change', function(e) {
        const card = e.target.closest('.package-card');
        const pkgName = card.dataset.package;
        
        console.log('📋 Dropdown changed for', pkgName, ':', e.target.value);
        
        // Store the receipt choice for this package
        if (e.target.value && e.target.value !== '') {
          receiptChoices[pkgName] = e.target.value;
        } else {
          delete receiptChoices[pkgName];
        }
        
        // DON'T auto-select the card or show button here
        // Just update the button state in case this package was already selected
        updateConfirmButton();
      });
      
      // Stop propagation
      select.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
    
    // Card click handler - this is when we show the button
    cards.forEach(function(card) {
      card.addEventListener('click', function(e) {
        // Ignore clicks on select elements
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') {
          return;
        }
        
        const pkgName = card.dataset.package;
        console.log('👆 Card clicked:', pkgName);
        
        // Remove active from all
        cards.forEach(function(c) {
          c.classList.remove('active');
        });
        
        // Add active to clicked card
        card.classList.add('active');
        selectedPackage = pkgName;
        
        // Now check if we should show the button
        updateConfirmButton();
      });
    });
    
    // Confirm button handler
    confirmBtn.addEventListener('click', function() {
      if (selectedPackage && receiptChoices[selectedPackage]) {
        alert('Selected Package: ' + selectedPackage + '\nReceipt Payment: ' + receiptChoices[selectedPackage]);
      }
    });
    
    console.log('🎉 QR System initialized successfully!');
  }
})();


// ============================================
// QR SYSTEM PACKAGES WITH CART
// ============================================

(function() {
  'use strict';
  
  // Package features data
  const packageFeatures = {
    Basic: [
      'QR Code Scan System',
      'Receipt System',
      'Domain Name Included',
      'Server / Hosting Included',
      '1 Month Bug Fix Support'
    ],
    Premium: [
      'Advanced QR Code Scan System',
      'Receipt System',
      'Domain Name Included',
      'Server / Hosting Included',
      '3 Month Bug Fix Support',
      'Admin Panel'
    ],
    Pro: [
      'Advanced QR Code Scan System',
      'Receipt System',
      'Domain Name Included',
      'Server / Hosting Included',
      'Unlimited Bug Fix Support',
      'Admin Panel',
      'POS Printer Included & Programmed'
    ]
  };
  
  // Package prices
  const packagePrices = {
    Basic: 326.05,
    Premium: 586.89,
    Pro: 1304.19
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQRSystem);
  } else {
    initQRSystem();
  }
  
  function initQRSystem() {
    console.log('🚀 Initializing QR System...');
    
    const cards = document.querySelectorAll(".package-card");
    const confirmBtn = document.getElementById("confirmBtn");
    const packagesSection = document.querySelector(".packages-section");
    const cartSection = document.getElementById("cartSection");
    
    if (!confirmBtn || !packagesSection || !cartSection) {
      console.error('❌ Required elements not found!');
      return;
    }
    
    if (cards.length === 0) {
      console.error('❌ No package cards found!');
      return;
    }
    
    console.log('✅ QR System initialized');
    
    let selectedPackage = null;
    let receiptChoices = {};
    
    function updateConfirmButton() {
      if (selectedPackage && receiptChoices[selectedPackage]) {
        confirmBtn.style.display = 'inline-block';
      } else {
        confirmBtn.style.display = 'none';
      }
    }
    
    // Dropdown handlers
    document.querySelectorAll('.receipt-select').forEach(select => {
      select.addEventListener('change', e => {
        const card = e.target.closest('.package-card');
        const pkgName = card.dataset.package;
        
        if (e.target.value && e.target.value !== '') {
          receiptChoices[pkgName] = e.target.value;
        } else {
          delete receiptChoices[pkgName];
        }
        
        updateConfirmButton();
      });
      
      select.addEventListener('click', e => e.stopPropagation());
    });
    
    // Card click handlers
    cards.forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') {
          return;
        }
        
        const pkgName = card.dataset.package;
        
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedPackage = pkgName;
        
        updateConfirmButton();
      });
    });
    
    // Confirm button - Go to cart with smooth scroll animation
    confirmBtn.addEventListener('click', () => {
      if (selectedPackage && receiptChoices[selectedPackage]) {
        showCart(selectedPackage, receiptChoices[selectedPackage]);
      }
    });
    
    // Show cart function with smooth scroll
    function showCart(packageName, receiptType) {
      console.log('🛒 Opening cart...');
      
      // Step 1: Scroll to top
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
      
      // Step 2: After reaching top, switch content
      setTimeout(() => {
        packagesSection.style.display = 'none';
        cartSection.style.display = 'block';
        
        // Step 3: Scroll to cart section
        setTimeout(() => {
          const cartPosition = cartSection.offsetTop - 80;
          window.scrollTo({ 
            top: cartPosition, 
            behavior: 'smooth' 
          });
        }, 200);
        
      }, 700);
      
      // Get package features and price
      const features = packageFeatures[packageName] || [];
      const packagePrice = packagePrices[packageName] || 0;
      
      // Display package details
      const packageDisplay = `
        <div class="package-header">
          <div class="package-name">${packageName} Package</div>
          <div class="package-receipt">Receipt: ${receiptType}</div>
        </div>
        <div class="package-features">
          ${features.map(feature => `
            <div class="feature-item">${feature}</div>
          `).join('')}
        </div>
      `;
      
      document.getElementById('selectedPackageDisplay').innerHTML = packageDisplay;
      document.getElementById('packageBadge').textContent = `${packageName} Package`;
      document.getElementById('summaryPackageDetails').textContent = `Receipt Payment: ${receiptType}`;
      
      // Update package price in summary
      document.getElementById('summaryPackagePrice').textContent = `$${packagePrice.toFixed(2)}`;
      
      // Initialize cart calculations with package price
      setTimeout(() => {
        initCartCalculations(packagePrice);
      }, 900);
    }
  }
})();

// Back to packages
function backToPackages() {
  const packagesSection = document.querySelector('.packages-section');
  const cartSection = document.getElementById('cartSection');
  
  cartSection.style.display = 'none';
  packagesSection.style.display = 'block';
  
  // Reset selections
  document.querySelectorAll('input[name="domain"]').forEach(radio => radio.checked = false);
  document.querySelectorAll('input[name="hosting"]').forEach(radio => radio.checked = false);
  
  setTimeout(() => {
    const packagesPosition = packagesSection.offsetTop - 100;
    window.scrollTo({ 
      top: packagesPosition, 
      behavior: 'smooth' 
    });
  }, 100);
}

// Global variables for order data
let orderData = {};

// Cart calculations with package price
function initCartCalculations(packagePrice) {
  const domainRadios = document.querySelectorAll('input[name="domain"]');
  const hostingRadios = document.querySelectorAll('input[name="hosting"]');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  let domainPrice = 0;
  let domainOriginal = 0;
  let hostingPrice = 0;
  let hostingOriginal = 0;
  let selectedDomainText = '';
  let selectedHostingText = '';
  
  function updateSummary() {
    // Update domain summary
    const selectedDomain = document.querySelector('input[name="domain"]:checked');
    if (selectedDomain) {
      const years = selectedDomain.value.replace('year', '');
      domainPrice = parseFloat(selectedDomain.dataset.price);
      domainOriginal = parseFloat(selectedDomain.dataset.original);
      selectedDomainText = `${years} Year - $${domainPrice.toFixed(2)}`;
      
      document.getElementById('summaryDomain').innerHTML = `
        <span style="text-decoration: line-through; color: #7b7b7b; font-size: 0.9rem;">$${domainOriginal.toFixed(2)}</span>
        <span style="color: #7ce9e6; font-weight: 700; font-size: 1.1rem;">$${domainPrice.toFixed(2)}</span>
        <span style="color: #7b7b7b; font-size: 0.85rem;">(${years} Year)</span>
      `;
    } else {
      document.getElementById('summaryDomain').textContent = 'Not selected';
      domainPrice = 0;
      domainOriginal = 0;
      selectedDomainText = '';
    }
    
    // Update hosting summary
    const selectedHosting = document.querySelector('input[name="hosting"]:checked');
    if (selectedHosting) {
      const years = selectedHosting.value.replace('year', '');
      hostingPrice = parseFloat(selectedHosting.dataset.price);
      hostingOriginal = parseFloat(selectedHosting.dataset.original);
      selectedHostingText = `${years} Year - $${hostingPrice.toFixed(2)}`;
      
      document.getElementById('summaryHosting').innerHTML = `
        <span style="text-decoration: line-through; color: #7b7b7b; font-size: 0.9rem;">$${hostingOriginal.toFixed(2)}</span>
        <span style="color: #7ce9e6; font-weight: 700; font-size: 1.1rem;">$${hostingPrice.toFixed(2)}</span>
        <span style="color: #7b7b7b; font-size: 0.85rem;">(${years} Year)</span>
      `;
    } else {
      document.getElementById('summaryHosting').textContent = 'Not selected';
      hostingPrice = 0;
      hostingOriginal = 0;
      selectedHostingText = '';
    }
    
    // Calculate totals
    const subtotal = packagePrice + domainPrice + hostingPrice;
    const originalTotal = packagePrice + domainOriginal + hostingOriginal;
    const savings = originalTotal - subtotal;
    
    document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${subtotal.toFixed(2)}`;
    
    if (savings > 0 && (domainOriginal > 0 || hostingOriginal > 0)) {
      document.getElementById('summarySavings').style.display = 'flex';
      document.getElementById('savingsAmount').textContent = `-$${savings.toFixed(2)}`;
    } else {
      document.getElementById('summarySavings').style.display = 'none';
    }
    
    checkoutBtn.disabled = !(selectedDomain && selectedHosting);
    
    // Store order data
    orderData = {
      packageName: document.getElementById('packageBadge').textContent,
      packagePrice: packagePrice.toFixed(2),
      receiptPayment: document.getElementById('summaryPackageDetails').textContent.replace('Receipt Payment: ', ''),
      domain: selectedDomainText,
      domainPrice: domainPrice.toFixed(2),
      hosting: selectedHostingText,
      hostingPrice: hostingPrice.toFixed(2),
      subtotal: subtotal.toFixed(2),
      savings: savings > 0 ? savings.toFixed(2) : '0.00',
      total: subtotal.toFixed(2)
    };
  }
  
  domainRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  hostingRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  
  updateSummary();
  
  // Checkout button - Open custom modal
  checkoutBtn.addEventListener('click', openCheckoutModal);
}

// Open checkout modal
function openCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Populate order summary in modal
  const summaryHtml = `
    <div class="order-summary-item">
      <span class="order-summary-label">Package:</span>
      <span class="order-summary-value">${orderData.packageName}</span>
    </div>
    <div class="order-summary-item">
      <span class="order-summary-label">Receipt Payment:</span>
      <span class="order-summary-value">${orderData.receiptPayment}</span>
    </div>
    <div class="order-summary-item">
      <span class="order-summary-label">Package Price:</span>
      <span class="order-summary-value">$${orderData.packagePrice}</span>
    </div>
    <div class="order-summary-item">
      <span class="order-summary-label">Domain (${orderData.domain}):</span>
      <span class="order-summary-value">$${orderData.domainPrice}</span>
    </div>
    <div class="order-summary-item">
      <span class="order-summary-label">Hosting (${orderData.hosting}):</span>
      <span class="order-summary-value">$${orderData.hostingPrice}</span>
    </div>
    ${orderData.savings > 0 ? `
    <div class="order-summary-item" style="color: #8b5cf6;">
      <span class="order-summary-label" style="color: #8b5cf6;">You Save:</span>
      <span class="order-summary-value" style="color: #8b5cf6;">-$${orderData.savings}</span>
    </div>
    ` : ''}
    <div class="order-summary-total">
      <span>Total:</span>
      <span>$${orderData.total}</span>
    </div>
  `;
  
  document.getElementById('modalOrderSummary').innerHTML = summaryHtml;
}

// Close checkout modal
function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Handle checkout form submission
document.addEventListener('DOMContentLoaded', function() {
  const checkoutForm = document.getElementById('checkoutForm');
  
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('orderConfirmBtn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      // Show loading state
      btnText.style.display = 'none';
      btnLoading.style.display = 'flex';
      submitBtn.disabled = true;
      
      // Get form data
      const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address1: document.getElementById('address1').value,
        address2: document.getElementById('address2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
        postalCode: document.getElementById('postalCode').value,
        message: document.getElementById('message').value,
        ...orderData
      };
      
      // Send email via EmailJS
      sendOrderEmail(formData, submitBtn, btnText, btnLoading);
    });
  }
});

// Send order email
function sendOrderEmail(data, submitBtn, btnText, btnLoading) {
  // EmailJS template parameters
  const templateParams = {
    to_email: 'npvsgroup@gmail.com',
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    address: `${data.address1}${data.address2 ? ', ' + data.address2 : ''}, ${data.city}, ${data.state}, ${data.country} ${data.postalCode}`,
    package_name: data.packageName,
    package_price: data.packagePrice,
    receipt_payment: data.receiptPayment,
    domain_plan: data.domain,
    domain_price: data.domainPrice,
    hosting_plan: data.hosting,
    hosting_price: data.hostingPrice,
    subtotal: data.subtotal,
    savings: data.savings,
    total: data.total,
    message: data.message || 'No additional message',
    order_date: new Date().toLocaleString()
  };
  
  // Send via EmailJS
  emailjs.send('service_najgbhk', 'template_fop2dpi', templateParams)
    .then(function(response) {
      console.log('✅ Email sent!', response.status);
      
      // Show success message
      alert('🎉 Order confirmed successfully!\n\nWe have received your order and will contact you shortly at:\n' + data.email);
      
      // Close modal and reset
      closeCheckoutModal();
      document.getElementById('checkoutForm').reset();
      
      // Reset button
      btnText.style.display = 'block';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
      
    }, function(error) {
      console.log('❌ Email failed:', error);
      
      // Show error message
      alert('❌ Something went wrong. Please try again or contact us directly at npvsgroup@gmail.com');
      
      // Reset button
      btnText.style.display = 'block';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    });
}


// ============================================
// CONTACT FUNCTIONS
// ============================================

// Header Contact button - scroll to Send Message section
function scrollToContact() {
  const contactSection = document.getElementById('contactSection');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// CONTACT ME button in bento card - open email client with devilw985@gmail.com
// CONTACT ME button - open Gmail compose directly
function openEmailClient() {
  const email = 'devilw985@gmail.com';
  const subject = encodeURIComponent('Website Contact Request');
  const body = encodeURIComponent('Hello,\n\nI am reaching out through your website.\n\nBest regards,');
  
  // Gmail compose URL
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  
  // Open in new tab
  window.open(gmailUrl, '_blank');
}

// Event listeners for contact buttons
document.addEventListener('DOMContentLoaded', function() {
  
  // Header contact button
  const headerContactBtn = document.querySelector('.contact-btn');
  if (headerContactBtn) {
    headerContactBtn.addEventListener('click', scrollToContact);
  }

  // Main contact form submission - sends to sonezbusiness@gmail.com
  const mainContactForm = document.getElementById('contactForm');
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const successMessage = document.getElementById('successMessage');
      
      // Show loading state
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      // Try to send via EmailJS first
      if (typeof emailjs !== 'undefined') {
        // EmailJS send - will arrive at sonezbusiness@gmail.com
        emailjs.sendForm('service_a1ixihw', 'template_u60dvel', mainContactForm)
          .then(function(response) {
            console.log('✅ Email sent successfully!', response.status);
            
            // Show success message
            if (successMessage) {
              successMessage.style.display = 'block';
            }
            
            // Reset form
            mainContactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
              if (successMessage) {
                successMessage.style.display = 'none';
              }
            }, 5000);
            
          }, function(error) {
            console.log('❌ EmailJS failed:', error);
            
            // Fallback to mailto with sonezbusiness@gmail.com
            sendViaMailto();
          })
          .finally(function() {
            // Reset button state
            if (submitBtn) {
              submitBtn.textContent = 'Send Message';
              submitBtn.disabled = false;
            }
          });
      } else {
        // If EmailJS not loaded, use mailto directly
        sendViaMailto();
        
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }
      }
      
      // Mailto fallback function for Send Message form
      function sendViaMailto() {
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const subject = document.getElementById('subject')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        const mailtoSubject = encodeURIComponent(`Website Contact: ${subject}`);
        const mailtoBody = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        
        // Send Message form goes to sonezbusiness@gmail.com
        window.location.href = `mailto:sonezbusiness@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }
    });
  }
});
