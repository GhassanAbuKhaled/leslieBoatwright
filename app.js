// ===== Modern JavaScript for Leslie Boatwright Real Estate =====

// ===== Utility Functions =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== Navigation Functionality =====
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveLink();
    }
    
    setupScrollEffect() {
        const handleScroll = throttle(() => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
    }
    
    setupMobileMenu() {
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            }
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        
        const handleScroll = throttle(() => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
    }
}

// ===== Scroll Animations =====
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-up');
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    // Remove class for re-animation when scrolling back up
                    entry.target.classList.remove('show');
                }
            });
        }, options);
        
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// ===== Property Cards Interactions =====
class PropertyCards {
    constructor() {
        this.propertyCards = document.querySelectorAll('.property-card');
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        this.setupClickHandlers();
    }
    
    setupHoverEffects() {
        this.propertyCards.forEach(card => {
            const overlay = card.querySelector('.property-overlay');
            const button = overlay?.querySelector('.btn');
            
            if (button) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showPropertyDetails(card);
                });
            }
        });
    }
    
    setupClickHandlers() {
        this.propertyCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showPropertyDetails(card);
            });
        });
    }
    
    showPropertyDetails(card) {
        const title = card.querySelector('.property-title').textContent;
        const features = Array.from(card.querySelectorAll('.property-features span'))
            .map(span => span.textContent).join(', ');
        
        // Simple alert for demo - in real app, this would open a modal or navigate to details page
        alert(`Property Details:\n${title}\n${features}\n\nFor more information, please contact me.`);
    }
}

// ===== Contact Form & Interactions =====
class ContactInteractions {
    constructor() {
        this.contactMethods = document.querySelectorAll('.contact-method');
        this.socialLinks = document.querySelectorAll('.social-link');
        this.buttons = document.querySelectorAll('.btn');
        
        this.init();
    }
    
    init() {
        this.setupContactMethods();
        this.setupSocialLinks();
        this.setupButtonInteractions();
    }
    
    setupContactMethods() {
        this.contactMethods.forEach(method => {
            method.addEventListener('click', () => {
                const icon = method.querySelector('i');
                const text = method.querySelector('p').textContent;
                
                if (icon.classList.contains('bi-telephone-fill')) {
                    window.location.href = `tel:${text}`;
                } else if (icon.classList.contains('bi-envelope-fill')) {
                    window.location.href = `mailto:${text}`;
                } else if (icon.classList.contains('bi-geo-alt-fill')) {
                    window.open(`https://maps.google.com/?q=${encodeURIComponent(text)}`, '_blank');
                }
            });
        });
    }
    
    setupSocialLinks() {
        this.socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // In a real application, these would link to actual social media profiles
                const platform = this.getSocialPlatform(link);
                alert(`You will be redirected to ${platform} soon`);
            });
        });
    }
    
    getSocialPlatform(link) {
        const icon = link.querySelector('i');
        if (icon.classList.contains('bi-facebook')) return 'Facebook';
        if (icon.classList.contains('bi-instagram')) return 'Instagram';
        if (icon.classList.contains('bi-linkedin')) return 'LinkedIn';
        if (icon.classList.contains('bi-twitter')) return 'Twitter';
        return 'Social Media';
    }
    
    setupButtonInteractions() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.trim().toLowerCase();
                
                if (buttonText.includes('contact')) {
                    scrollToSection('contact');
                } else if (buttonText.includes('sign')) {
                    this.showBookingForm();
                } else if (buttonText.includes('watch')) {
                    this.playVideoTour();
                } else if (buttonText.includes('browse') || buttonText.includes('properties')) {
                    scrollToSection('properties');
                }
            });
        });
    }
    
    showBookingForm() {
        alert('Booking form will open soon. Please contact me directly for now.');
    }
    
    playVideoTour() {
        alert('Virtual tour will start soon. Please contact me to get the tour link.');
    }
}

// ===== Performance Optimizations =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupLazyLoading();
        this.setupVideoOptimization();
        this.setupPreloadOptimization();
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    setupVideoOptimization() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Lazy load video when in viewport
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (video.preload === 'none') {
                            video.preload = 'metadata';
                            video.load();
                        }
                        video.play().catch(() => {
                            console.log('Video autoplay was prevented');
                        });
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.25 });
            
            videoObserver.observe(video);
        });
    }
    
    setupPreloadOptimization() {
        // Preload critical resources when user shows intent to navigate
        const criticalLinks = document.querySelectorAll('a[href^="#"]');
        
        criticalLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Preload resources for the target section
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const images = targetSection.querySelectorAll('img');
                    images.forEach(img => {
                        if (!img.complete) {
                            const preloadLink = document.createElement('link');
                            preloadLink.rel = 'preload';
                            preloadLink.as = 'image';
                            preloadLink.href = img.src;
                            document.head.appendChild(preloadLink);
                        }
                    });
                }
            });
        });
    }
}

// ===== Global Functions =====
window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize all components
        new Navigation();
        new ScrollAnimations();
        new PropertyCards();
        new ContactInteractions();
        new PerformanceOptimizer();
        
        console.log('Leslie Boatwright Real Estate website initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

// ===== Service Worker Registration (for PWA capabilities) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}