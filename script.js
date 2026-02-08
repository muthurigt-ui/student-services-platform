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

// ==================== FLUTTERWAVE PAYMENT INTEGRATION ====================

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

function handleSubscription(plan, planName, price) {
    // Check if Flutterwave config is loaded
    if (typeof PAYMENT_CONFIG === 'undefined') {
        alert('Payment system is not configured. Please contact support.');
        console.error('Payment config not found. Check config.js');
        return;
    }

    // Check if public key is configured
    if (!PAYMENT_CONFIG.publicKey || PAYMENT_CONFIG.publicKey.includes('YOUR_PUBLIC_KEY_HERE')) {
        alert(`Payment not configured yet.\n\nTo enable payments:\n1. Create Flutterwave account at flutterwave.com\n2. Get your Public Key from dashboard\n3. Update config.js with your key\n\nSee config.js for detailed instructions.`);
        console.error('Flutterwave public key not configured');
        return;
    }

    // Get plan details from config
    const planDetails = PAYMENT_CONFIG.plans[plan];
    if (!planDetails) {
        alert('Invalid plan selected. Please try again.');
        return;
    }

    // Generate unique transaction reference
    const txRef = 'SS-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);

    // Configure Flutterwave payment
    const paymentData = {
        public_key: PAYMENT_CONFIG.publicKey,
        tx_ref: txRef,
        amount: planDetails.amount,
        currency: planDetails.currency,
        payment_options: 'card,ussd,banktransfer',
        redirect_url: PAYMENT_CONFIG.redirectUrl,
        customer: {
            email: '', // Will be collected by Flutterwave
            name: '', // Will be collected by Flutterwave
        },
        customizations: {
            title: PAYMENT_CONFIG.businessName,
            description: `${planName} - ${planDetails.description}`,
            logo: PAYMENT_CONFIG.businessLogo || '',
        },
        meta: {
            plan: plan,
            plan_name: planName,
            subscription_type: planDetails.interval,
        },
    };

    // Initialize Flutterwave payment modal
    try {
        FlutterwaveCheckout(paymentData);
    } catch (error) {
        console.error('Flutterwave initialization error:', error);
        alert('Payment system error. Please try again or contact support.');
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
console.log('%cPowered by Flutterwave', 'font-size: 10px; color: #f5576c;');
