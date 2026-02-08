// ==================== SMOOTH SCROLLING ====================
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToPricing() {
    document.getElementById('pricing').scrollIntoView({
        behavior: 'smooth'
    });
}

// ==================== SCROLL REVEAL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));
});

// ==================== SERVICE CARD INTERACTIONS ====================
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.setProperty('--hover-scale', '1.02');
        });

        card.addEventListener('mouseleave', function () {
            this.style.setProperty('--hover-scale', '1');
        });
    });
});

// ==================== STRIPE PAYMENT INTEGRATION ====================
let stripe;

// Initialize Stripe when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Stripe with publishable key from config
    if (typeof STRIPE_CONFIG !== 'undefined' && STRIPE_CONFIG.publishableKey) {
        stripe = Stripe(STRIPE_CONFIG.publishableKey);
        console.log('✅ Stripe initialized');
    } else {
        console.warn('⚠️ Stripe config not found. Please update config.js with your Stripe keys.');
    }
});

// ==================== PRICING CARD INTERACTIONS ====================
document.addEventListener('DOMContentLoaded', () => {
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        const button = card.querySelector('.btn-primary');

        button.addEventListener('click', function () {
            const plan = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            const planName = card.querySelector('.plan-name').textContent;

            handleSubscription(plan, planName, price);
        });
    });
});

async function handleSubscription(plan, planName, price) {
    // Check if Stripe is initialized
    if (!stripe) {
        alert('Payment system is not configured. Please contact support.');
        console.error('Stripe not initialized. Check config.js');
        return;
    }

    // Check if price ID is configured
    if (!STRIPE_CONFIG.prices[plan] || STRIPE_CONFIG.prices[plan].includes('PRICE_ID')) {
        alert(`Payment not configured for ${planName} plan.\n\nTo enable payments:\n1. Create products in Stripe Dashboard\n2. Update config.js with Price IDs\n\nSee config.js for detailed instructions.`);
        console.error(`Price ID not configured for ${plan} plan`);
        return;
    }

    try {
        // Show loading state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price: STRIPE_CONFIG.prices[plan],
                quantity: 1
            }],
            mode: 'subscription',
            successUrl: STRIPE_CONFIG.successUrl,
            cancelUrl: STRIPE_CONFIG.cancelUrl,
            billingAddressCollection: 'required',
            customerEmail: '', // Optional: pre-fill if you have user email
        });

        if (error) {
            console.error('Stripe Checkout error:', error);
            alert('Payment failed. Please try again.');
            button.textContent = originalText;
            button.disabled = false;
        }
    } catch (err) {
        console.error('Subscription error:', err);
        alert('An error occurred. Please try again.');
    }
}

// ==================== HEADER SCROLL EFFECT ====================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }

    lastScroll = currentScroll;
});

// ==================== DYNAMIC GRADIENT ANIMATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;

        if (hero) {
            const xOffset = (mouseX - 0.5) * 20;
            const yOffset = (mouseY - 0.5) * 20;
            hero.style.setProperty('--mouse-x', `${xOffset}px`);
            hero.style.setProperty('--mouse-y', `${yOffset}px`);
        }
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== ANALYTICS & TRACKING ====================
// Track CTA button clicks
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();

            // Example: Send to analytics
            console.log('CTA Click:', buttonText);

            // In production, integrate with Google Analytics, Facebook Pixel, etc.
            // gtag('event', 'cta_click', { button_text: buttonText });
            // fbq('track', 'Lead', { button_text: buttonText });
        });
    });
});

// ==================== MOBILE MENU (if needed) ====================
// This can be expanded if you add a hamburger menu for mobile
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ==================== FORM VALIDATION ====================
// Add this when you create subscription forms
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.service-card, .pricing-card');

    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');

        card.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
});

// ==================== CONSOLE BRANDING ====================
console.log('%c📚 StudentSuccess Platform', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cBuilt with ❤️ for students', 'font-size: 12px; color: #8892a6;');
