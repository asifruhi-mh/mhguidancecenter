// ===================================
// Animation and Interactive Effects
// ===================================

(function() {
    'use strict';
    
    // ===================================
    // Counter Animation for Stats
    // ===================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        if (!counters.length) return;
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        // Use Intersection Observer to trigger animations when visible
        if ('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                        entry.target.classList.add('animated');
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    }
    
    // ===================================
    // Fade In Animation on Scroll
    // ===================================
    
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.service-card, .hero-content, .mission-text');
        
        if (!animateElements.length) return;
        
        // Add CSS for fade-in animation
        const style = document.createElement('style');
        style.textContent = `
            .fade-in-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .fade-in-element.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            @media (prefers-reduced-motion: reduce) {
                .fade-in-element {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add fade-in class to elements
        animateElements.forEach(element => {
            element.classList.add('fade-in-element');
        });
        
        // Animate on scroll
        if ('IntersectionObserver' in window) {
            const scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        scrollObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animateElements.forEach(element => {
                scrollObserver.observe(element);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            animateElements.forEach(element => {
                element.classList.add('animate');
            });
        }
    }
    
    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    
    function initParallaxEffect() {
        const heroSection = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-img');
        
        if (!heroSection || !heroImage) return;
        
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        };
        
        // Throttle the parallax effect for better performance
        let ticking = false;
        const parallaxThrottled = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', parallaxThrottled, { passive: true });
    }
    
    // ===================================
    // Smooth Reveal Animation for Cards
    // ===================================
    
    function initCardRevealAnimation() {
        const cards = document.querySelectorAll('.service-card');
        
        if (!cards.length) return;
        
        // Add staggered animation delays
        cards.forEach((card, index) => {
            card.style.setProperty('--animation-delay', `${index * 0.1}s`);
        });
        
        // Add CSS for staggered animations
        const style = document.createElement('style');
        style.textContent = `
            .service-card.fade-in-element {
                transition-delay: var(--animation-delay, 0s);
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===================================
    // Button Hover Effects Enhancement
    // ===================================
    
    function enhanceButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                // Check if user prefers reduced motion
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    return;
                }
                
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .ripple {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===================================
    // Loading Animation
    // ===================================
    
    function initLoadingAnimation() {
        // Add loading class to body initially
        document.body.classList.add('loading');
        
        // Create loading spinner if needed
        const createLoadingSpinner = () => {
            const loader = document.createElement('div');
            loader.className = 'page-loader';
            loader.innerHTML = `
                <div class="spinner"></div>
                <p>Loading...</p>
            `;
            document.body.appendChild(loader);
            
            return loader;
        };
        
        // Add CSS for loading animation
        const style = document.createElement('style');
        style.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.95);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.3s ease-out;
            }
            
            .page-loader.hidden {
                opacity: 0;
                pointer-events: none;
            }
            
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loading .page-loader {
                display: flex;
            }
            
            .loading .main-content {
                opacity: 0;
            }
            
            @media (prefers-reduced-motion: reduce) {
                .spinner {
                    animation: none;
                    border-top-color: transparent;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove loading state when page is ready
        const removeLoader = () => {
            const loader = document.querySelector('.page-loader');
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                }, 300);
            }
            document.body.classList.remove('loading');
        };
        
        // Remove loader after a short delay or when everything is loaded
        if (document.readyState === 'complete') {
            setTimeout(removeLoader, 500);
        } else {
            window.addEventListener('load', () => {
                setTimeout(removeLoader, 500);
            });
        }
    }
    
    // ===================================
    // Scroll Progress Indicator
    // ===================================
    
    function initScrollProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        // Add CSS for progress bar
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                z-index: 9999;
                transition: width 0.25s ease-out;
            }
        `;
        document.head.appendChild(style);
        
        // Update progress on scroll
        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = Math.min(progress, 100) + '%';
        };
        
        window.addEventListener('scroll', updateProgress, { passive: true });
    }
    
    // ===================================
    // Initialize All Animations
    // ===================================
    
    function initAnimations() {
        try {
            // Check if user prefers reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                console.log('Reduced motion preferred - skipping complex animations');
                animateCounters(); // Keep counter animation as it's informational
                return;
            }
            
            animateCounters();
            initScrollAnimations();
            initParallaxEffect();
            initCardRevealAnimation();
            enhanceButtonEffects();
            initLoadingAnimation();
            initScrollProgress();
            
            console.log('Animations initialized successfully');
        } catch (error) {
            console.error('Error initializing animations:', error);
        }
    }
    
    // ===================================
    // Initialize when DOM is ready
    // ===================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
    
})();