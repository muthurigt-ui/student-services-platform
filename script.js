// ==================== SMOOTH SCROLLING ====================
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
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

// ==================== LIVE CHAT INTEGRATION ====================

// Function to open live chat
function openLiveChat() {
    // Check if Tawk.to is loaded
    if (typeof Tawk_API !== 'undefined') {
        Tawk_API.maximize();
        return;
    }

    // Check if Crisp is loaded
    if (typeof $crisp !== 'undefined') {
        $crisp.push(["do", "chat:open"]);
        return;
    }

    // Check if Intercom is loaded
    if (typeof Intercom !== 'undefined') {
        Intercom('show');
        return;
    }

    // Fallback: redirect to WhatsApp
    alert('Live chat will be available soon! Redirecting you to WhatsApp...');
    window.open('https://wa.me/19547104610', '_blank');
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
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.service-card');

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
console.log('%cContact us to get started!', 'font-size: 10px; color: #f5576c;');
