// ===================================
// Contact Form Functionality
// ===================================

(function() {
    'use strict';
    
    // Form elements
    const contactForm = document.querySelector('.contact-form');
    const submitButton = document.querySelector('.form-submit');
    const submitText = document.querySelector('.submit-text');
    const submitSpinner = document.querySelector('.submit-spinner');
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // ===================================
    // Form Validation
    // ===================================
    
    function validateForm() {
        if (!contactForm) return false;
        
        let isValid = true;
        const formData = new FormData(contactForm);
        
        // Clear previous errors
        clearAllErrors();
        
        // Validate required fields
        const requiredFields = [
            { name: 'name', message: 'Please enter your full name' },
            { name: 'email', message: 'Please enter your email address' },
            { name: 'subject', message: 'Please select a subject' },
            { name: 'message', message: 'Please enter your message' }
        ];
        
        requiredFields.forEach(field => {
            const value = formData.get(field.name);
            if (!value || value.trim() === '') {
                showFieldError(field.name, field.message);
                isValid = false;
            }
        });
        
        // Validate email format
        const email = formData.get('email');
        if (email && !window.MHGuidanceCenter.validateEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone format (if provided)
        const phone = formData.get('phone');
        if (phone && phone.trim() !== '' && !window.MHGuidanceCenter.validatePhone(phone)) {
            showFieldError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate privacy agreement
        const privacy = formData.get('privacy');
        if (!privacy) {
            showFieldError('privacy', 'You must agree to the privacy policy');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const errorElement = document.querySelector(`#${fieldName}-error`);
        
        if (field && errorElement) {
            window.MHGuidanceCenter.showFormError(field, message);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearAllErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        errorMessages.forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
        
        inputs.forEach(input => {
            window.MHGuidanceCenter.clearFormError(input);
        });
    }
    
    // ===================================
    // Form Submission
    // ===================================
    
    function handleFormSubmit(event) {
        event.preventDefault();
        
        if (!validateForm()) {
            // Focus on first error field
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        setSubmitState(true);
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            handleFormSuccess();
        }, 2000);
    }
    
    function setSubmitState(isSubmitting) {
        if (!submitButton || !submitText || !submitSpinner) return;
        
        if (isSubmitting) {
            submitButton.disabled = true;
            submitText.style.display = 'none';
            submitSpinner.style.display = 'inline-block';
            submitButton.setAttribute('aria-busy', 'true');
        } else {
            submitButton.disabled = false;
            submitText.style.display = 'inline-block';
            submitSpinner.style.display = 'none';
            submitButton.removeAttribute('aria-busy');
        }
    }
    
    function handleFormSuccess() {
        setSubmitState(false);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
        // Clear any remaining errors
        clearAllErrors();
    }
    
    function handleFormError(error) {
        setSubmitState(false);
        
        console.error('Form submission error:', error);
        
        // Show error message
        showErrorMessage('There was a problem sending your message. Please try again or contact us directly.');
    }
    
    function showSuccessMessage() {
        const message = createAlertMessage(
            'success',
            'Message Sent Successfully!',
            'Thank you for contacting us. We\'ll get back to you within 24 hours.'
        );
        
        contactForm.parentNode.insertBefore(message, contactForm);
        message.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after 10 seconds
        setTimeout(() => {
            message.remove();
        }, 10000);
    }
    
    function showErrorMessage(text) {
        const message = createAlertMessage(
            'error',
            'Error Sending Message',
            text
        );
        
        contactForm.parentNode.insertBefore(message, contactForm);
        message.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after 10 seconds
        setTimeout(() => {
            message.remove();
        }, 10000);
    }
    
    function createAlertMessage(type, title, text) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.setAttribute('role', 'alert');
        alert.innerHTML = `
            <div class="alert-content">
                <h4 class="alert-title">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}" aria-hidden="true"></i>
                    ${title}
                </h4>
                <p class="alert-text">${text}</p>
                <button class="alert-close" aria-label="Close message">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        `;
        
        // Add close functionality
        const closeButton = alert.querySelector('.alert-close');
        closeButton.addEventListener('click', () => {
            alert.remove();
        });
        
        return alert;
    }
    
    // ===================================
    // Real-time Validation
    // ===================================
    
    function initRealTimeValidation() {
        const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error on input
                if (this.classList.contains('error')) {
                    window.MHGuidanceCenter.clearFormError(this);
                    const errorElement = document.querySelector(`#${this.name}-error`);
                    if (errorElement) {
                        errorElement.style.display = 'none';
                    }
                }
            });
        });
    }
    
    function validateField(field) {
        const name = field.name;
        const value = field.value.trim();
        
        // Clear previous error
        window.MHGuidanceCenter.clearFormError(field);
        const errorElement = document.querySelector(`#${name}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        // Check if required field is empty
        if (field.hasAttribute('required') && value === '') {
            const message = getRequiredMessage(name);
            showFieldError(name, message);
            return false;
        }
        
        // Specific validation based on field type
        switch (name) {
            case 'email':
                if (value && !window.MHGuidanceCenter.validateEmail(value)) {
                    showFieldError(name, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'phone':
                if (value && !window.MHGuidanceCenter.validatePhone(value)) {
                    showFieldError(name, 'Please enter a valid phone number');
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    function getRequiredMessage(fieldName) {
        const messages = {
            name: 'Please enter your full name',
            email: 'Please enter your email address',
            subject: 'Please select a subject',
            message: 'Please enter your message',
            privacy: 'You must agree to the privacy policy'
        };
        
        return messages[fieldName] || 'This field is required';
    }
    
    // ===================================
    // FAQ Functionality
    // ===================================
    
    function initFAQ() {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const isOpen = this.getAttribute('aria-expanded') === 'true';
                const answer = document.querySelector(this.getAttribute('aria-controls'));
                const icon = this.querySelector('i');
                
                if (isOpen) {
                    closeFAQ(this, answer, icon);
                } else {
                    openFAQ(this, answer, icon);
                }
            });
            
            question.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    function openFAQ(question, answer, icon) {
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
        icon.style.transform = 'rotate(180deg)';
    }
    
    function closeFAQ(question, answer, icon) {
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        icon.style.transform = 'rotate(0deg)';
    }
    
    // ===================================
    // Form Auto-save (Optional)
    // ===================================
    
    function initAutoSave() {
        const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        const STORAGE_KEY = 'mh-contact-form-draft';
        
        // Load saved data
        loadFormData();
        
        // Save data on input
        inputs.forEach(input => {
            input.addEventListener('input', window.MHGuidanceCenter.debounce(saveFormData, 1000));
        });
        
        // Clear saved data on successful submission
        if (contactForm) {
            contactForm.addEventListener('submit', function() {
                clearSavedData();
            });
        }
        
        function saveFormData() {
            const formData = new FormData(contactForm);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                if (key !== 'privacy') { // Don't save privacy checkbox
                    data[key] = value;
                }
            }
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        
        function loadFormData() {
            try {
                const savedData = localStorage.getItem(STORAGE_KEY);
                if (savedData) {
                    const data = JSON.parse(savedData);
                    
                    Object.entries(data).forEach(([key, value]) => {
                        const field = document.querySelector(`[name="${key}"]`);
                        if (field && value) {
                            field.value = value;
                        }
                    });
                }
            } catch (error) {
                console.error('Error loading saved form data:', error);
            }
        }
        
        function clearSavedData() {
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    
    // ===================================
    // Initialize Everything
    // ===================================
    
    function initContactPage() {
        try {
            if (contactForm) {
                contactForm.addEventListener('submit', handleFormSubmit);
                initRealTimeValidation();
                initAutoSave();
            }
            
            initFAQ();
            
            console.log('Contact page initialized successfully');
        } catch (error) {
            console.error('Error initializing contact page:', error);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactPage);
    } else {
        initContactPage();
    }
    
})();