// Awesome OpenClaw - Interactive Features

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.feature-card, .path-card, .stat-card, .category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Dynamic year in footer
const footerNote = document.querySelector('.footer-note');
if (footerNote) {
    const currentYear = new Date().getFullYear();
    footerNote.innerHTML = footerNote.innerHTML.replace('2026', currentYear);
}

// Badge click tracking (optional analytics)
document.querySelectorAll('.badges img').forEach(badge => {
    badge.addEventListener('click', function() {
        console.log('Badge clicked:', this.alt);
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 300);
    });
});

// Console welcome message
console.log('%c🦞 Welcome to Awesome OpenClaw!', 'font-size: 20px; color: #ff6b35; font-weight: bold;');
console.log('%cExplore our resources: https://github.com/earyantLe/awesome-openclaw', 'font-size: 14px; color: #004e89;');
