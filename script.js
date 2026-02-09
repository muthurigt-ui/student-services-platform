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

// ==================== CONTACT FORM HANDLING WITH EMAILJS ====================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value || 'Not specified',
                message: document.getElementById('message').value
            };

            // Get submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Check if EmailJS is configured
            if (typeof emailjs === 'undefined') {
                console.warn('EmailJS not loaded. Using mailto fallback.');
                sendViaMailto(formData, submitButton, originalButtonText);
                return;
            }

            // Send email using EmailJS
            // Replace 'service_id' and 'template_id' with your actual IDs from EmailJS dashboard
            emailjs.send('service_id', 'template_id', {
                from_name: formData.name,
                from_email: formData.email,
                service_interested: formData.service,
                message: formData.message,
                to_email: 'cathleenmillertutor@gmail.com'
            })
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);

                    // Show success message
                    alert(`Thank you, ${formData.name}! We've received your message and will get back to you soon at ${formData.email}.`);

                    // Reset form
                    contactForm.reset();

                    // Reset button
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                })
                .catch(function (error) {
                    console.error('EmailJS FAILED...', error);

                    // Fallback to mailto
                    sendViaMailto(formData, submitButton, originalButtonText);
                });
        });
    }
});

// Fallback function to open mailto link
function sendViaMailto(formData, button, originalText) {
    const mailtoLink = `mailto:cathleenmillertutor@gmail.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`)}`;

    alert('Opening your email client to send the message...');
    window.location.href = mailtoLink;

    // Reset button
    button.textContent = originalText;
    button.disabled = false;
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
