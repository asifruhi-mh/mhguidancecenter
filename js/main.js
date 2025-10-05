// ===================================
// Main JavaScript for MH Guidance Center Website
// ===================================

(function() {
    'use strict';
    
    // DOM elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    
    function initMobileNav() {
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('active');
            
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
        
        // Close mobile nav when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                closeMobileNav();
            }
        });
        
        // Close mobile nav on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileNav();
            }
        });
    }
    
    function openMobileNav() {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        
        // Prevent body scroll when mobile nav is open
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const firstNavLink = navMenu.querySelector('.nav-link');
        if (firstNavLink) {
            firstNavLink.focus();
        }
    }
    
    function closeMobileNav() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // ===================================
    // Smooth Scrolling for Internal Links
    // ===================================
    
    function initSmoothScrolling() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile nav if open
                    closeMobileNav();
                    
                    // Update focus for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                    targetElement.addEventListener('blur', function() {
                        targetElement.removeAttribute('tabindex');
                    }, { once: true });
                }
            });
        });
    }
    
    // ===================================
    // Header Scroll Effect
    // ===================================
    
    function initHeaderScrollEffect() {
        if (!header) return;
        
        let lastScrollTop = 0;
        let isScrolling = false;
        
        function handleScroll() {
            if (isScrolling) return;
            
            isScrolling = true;
            
            requestAnimationFrame(() => {
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }
                
                // Add shadow when scrolled
                if (currentScrollTop > 10) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
                isScrolling = false;
            });
        }
        
        // Throttle scroll events
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
                setTimeout(() => { ticking = false; }, 10);
            }
        }, { passive: true });
    }
    
    // ===================================
    // Active Navigation Link Highlighting
    // ===================================
    
    function initActiveNavigation() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Remove existing active class
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            // Add active class to current page link
            if (linkPath === currentPage || 
                (currentPage === '' && linkPath === 'index.html') ||
                (currentPath === '/' && linkPath === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    
    // ===================================
    // Form Validation Helpers
    // ===================================
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone);
    }
    
    function showFormError(input, message) {
        const errorElement = input.parentNode.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }
    
    function clearFormError(input) {
        const errorElement = input.parentNode.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        input.classList.remove('error');
        input.removeAttribute('aria-invalid');
    }
    
    // ===================================
    // Accessibility Enhancements
    // ===================================
    
    function initAccessibility() {
        // Add focus outline for keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(event) {
                event.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.addEventListener('blur', function() {
                        target.removeAttribute('tabindex');
                    }, { once: true });
                }
            });
        }
    }
    
    // ===================================
    // Performance Optimizations
    // ===================================
    
    function initLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }
    
    // ===================================
    // Error Handling
    // ===================================
    
    function handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        
        // In production, you might want to send errors to a logging service
        // Example: sendErrorToLoggingService(error, context);
    }
    
    // ===================================
    // Utility Functions
    // ===================================
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function throttle(func, limit) {
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
    }
    
    // ===================================
    // Initialize Everything
    // ===================================
    
    function init() {
        try {
            initMobileNav();
            initSmoothScrolling();
            initHeaderScrollEffect();
            initActiveNavigation();
            initAccessibility();
            initLazyLoading();
            
            // Add CSS class for enhanced styling when JS is enabled
            document.documentElement.classList.add('js-enabled');
            
            console.log('MH Guidance Center website initialized successfully');
        } catch (error) {
            handleError(error, 'initialization');
        }
    }
    
    // ===================================
    // DOM Ready and Load Events
    // ===================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Additional setup after everything is loaded
    window.addEventListener('load', function() {
        try {
            // Remove any loading states
            document.body.classList.remove('loading');
            
            // Initialize any features that need full page load
            console.log('Page fully loaded');
        } catch (error) {
            handleError(error, 'window load');
        }
    });
    
    // ===================================
    // Public API (if needed by other scripts)
    // ===================================
    
    window.MHGuidanceCenter = {
        validateEmail: validateEmail,
        validatePhone: validatePhone,
        showFormError: showFormError,
        clearFormError: clearFormError,
        debounce: debounce,
        throttle: throttle
    };
    
})();