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

// Cart calculations with package price
function initCartCalculations(packagePrice) {
  const domainRadios = document.querySelectorAll('input[name="domain"]');
  const hostingRadios = document.querySelectorAll('input[name="hosting"]');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  let domainPrice = 0;
  let domainOriginal = 0;
  let hostingPrice = 0;
  let hostingOriginal = 0;
  
  function updateSummary() {
    // Update domain summary
    const selectedDomain = document.querySelector('input[name="domain"]:checked');
    if (selectedDomain) {
      const years = selectedDomain.value.replace('year', '');
      domainPrice = parseFloat(selectedDomain.dataset.price);
      domainOriginal = parseFloat(selectedDomain.dataset.original);
      document.getElementById('summaryDomain').innerHTML = `
        <span style="text-decoration: line-through; color: #7b7b7b; font-size: 0.9rem;">$${domainOriginal.toFixed(2)}</span>
        <span style="color: #7ce9e6; font-weight: 700; font-size: 1.1rem;">$${domainPrice.toFixed(2)}</span>
        <span style="color: #7b7b7b; font-size: 0.85rem;">(${years} Year)</span>
      `;
    } else {
      document.getElementById('summaryDomain').textContent = 'Not selected';
      domainPrice = 0;
      domainOriginal = 0;
    }
    
    // Update hosting summary
    const selectedHosting = document.querySelector('input[name="hosting"]:checked');
    if (selectedHosting) {
      const years = selectedHosting.value.replace('year', '');
      hostingPrice = parseFloat(selectedHosting.dataset.price);
      hostingOriginal = parseFloat(selectedHosting.dataset.original);
      document.getElementById('summaryHosting').innerHTML = `
        <span style="text-decoration: line-through; color: #7b7b7b; font-size: 0.9rem;">$${hostingOriginal.toFixed(2)}</span>
        <span style="color: #7ce9e6; font-weight: 700; font-size: 1.1rem;">$${hostingPrice.toFixed(2)}</span>
        <span style="color: #7b7b7b; font-size: 0.85rem;">(${years} Year)</span>
      `;
    } else {
      document.getElementById('summaryHosting').textContent = 'Not selected';
      hostingPrice = 0;
      hostingOriginal = 0;
    }
    
    // Calculate totals INCLUDING package price
    const subtotal = packagePrice + domainPrice + hostingPrice;
    const originalTotal = packagePrice + domainOriginal + hostingOriginal;
    const savings = originalTotal - subtotal;
    
    // Update subtotal display
    document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
    
    // Update total
    document.getElementById('summaryTotal').textContent = `$${subtotal.toFixed(2)}`;
    
    // Show savings if any
    if (savings > 0 && (domainOriginal > 0 || hostingOriginal > 0)) {
      document.getElementById('summarySavings').style.display = 'flex';
      document.getElementById('savingsAmount').textContent = `-$${savings.toFixed(2)}`;
    } else {
      document.getElementById('summarySavings').style.display = 'none';
    }
    
    // Enable checkout if both domain and hosting selected
    checkoutBtn.disabled = !(selectedDomain && selectedHosting);
  }
  
  domainRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  hostingRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  
  // Initial update to show package price
  updateSummary();
  
  // Checkout button
  checkoutBtn.addEventListener('click', () => {
    const packageName = document.getElementById('packageBadge').textContent;
    const total = document.getElementById('summaryTotal').textContent;
    const savings = document.getElementById('savingsAmount')?.textContent || '$0.00';
    
    alert(`🎉 Order Confirmed!\n\n${packageName}\nTotal: ${total}\nYou Saved: ${savings}\n\nProceeding to secure checkout...`);
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