// Volunteer form functionality
document.addEventListener('DOMContentLoaded', function() {
    const volunteerForm = document.getElementById('volunteer-form');
    const infoButtons = document.querySelectorAll('.info-btn');
    
    // Form validation and submission
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
    }

    // Form validation
    function validateForm() {
        const requiredFields = volunteerForm.querySelectorAll('[required]');
        let isValid = true;
        
        // Clear previous error states
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            } else if (field.type === 'tel' && !isValidPhone(field.value)) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        });

        // Check if at least one interest is selected
        const interests = volunteerForm.querySelectorAll('input[name="interests"]:checked');
        if (interests.length === 0) {
            const interestGroup = volunteerForm.querySelector('.checkbox-group');
            showGroupError(interestGroup, 'Please select at least one volunteer opportunity');
            isValid = false;
        }

        // Check if at least one availability option is selected
        const availability = volunteerForm.querySelectorAll('input[name="availability"]:checked');
        if (availability.length === 0) {
            const availabilityGroup = volunteerForm.querySelectorAll('.checkbox-group')[1];
            showGroupError(availabilityGroup, 'Please select at least one availability option');
            isValid = false;
        }

        return isValid;
    }

    // Show error for individual field
    function showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    // Show error for checkbox groups
    function showGroupError(group, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        
        group.parentNode.appendChild(errorElement);
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation (basic)
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
        return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone);
    }

    // Submit form
    function submitForm() {
        // Show loading state
        const submitButton = volunteerForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Collect form data
        const formData = new FormData(volunteerForm);
        const data = {};
        
        // Convert FormData to regular object
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Simulate API call
        setTimeout(() => {
            console.log('Volunteer application submitted:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            volunteerForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
        }, 2000);
    }

    // Show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Application Submitted Successfully!</h3>
                <p>Thank you for your interest in volunteering with us. We will contact you within 48 hours to discuss next steps.</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        successMessage.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        document.body.appendChild(successMessage);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Opportunity info buttons
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const infoType = this.dataset.info;
            showOpportunityInfo(infoType);
        });
    });

    // Show opportunity information
    function showOpportunityInfo(type) {
        const info = {
            'direct-service': {
                title: 'Direct Service Volunteer',
                content: `
                    <h4>Detailed Information:</h4>
                    <ul>
                        <li><strong>Training:</strong> 16-hour comprehensive training program covering client interaction, boundaries, and safety protocols</li>
                        <li><strong>Supervision:</strong> Regular check-ins with volunteer coordinator and program staff</li>
                        <li><strong>Support:</strong> Access to counseling resources and volunteer support groups</li>
                        <li><strong>Growth:</strong> Opportunities for advanced training and leadership roles</li>
                    </ul>
                    <p>This role is perfect for individuals who want to make a direct impact on clients' lives while developing valuable interpersonal skills.</p>
                `
            },
            'admin-support': {
                title: 'Administrative Support',
                content: `
                    <h4>Detailed Information:</h4>
                    <ul>
                        <li><strong>Tasks:</strong> Filing, data entry, phone support, event setup, and general office assistance</li>
                        <li><strong>Training:</strong> Basic orientation plus software training as needed</li>
                        <li><strong>Environment:</strong> Professional office setting with friendly, supportive team</li>
                        <li><strong>Skills:</strong> Perfect for developing administrative and organizational skills</li>
                    </ul>
                    <p>Great opportunity for students, retirees, or anyone looking to support our mission behind the scenes.</p>
                `
            },
            'event-support': {
                title: 'Event Support Volunteer',
                content: `
                    <h4>Detailed Information:</h4>
                    <ul>
                        <li><strong>Events:</strong> Fundraisers, community education, workshops, and social events</li>
                        <li><strong>Flexibility:</strong> Choose which events fit your schedule</li>
                        <li><strong>Roles:</strong> Setup/breakdown, registration, hospitality, and crowd management</li>
                        <li><strong>Team:</strong> Work with energetic team of staff and volunteers</li>
                    </ul>
                    <p>Perfect for social individuals who enjoy meeting new people and contributing to memorable community events.</p>
                `
            },
            'fundraising': {
                title: 'Fundraising Support',
                content: `
                    <h4>Detailed Information:</h4>
                    <ul>
                        <li><strong>Activities:</strong> Grant research, donor database management, event planning, and social media</li>
                        <li><strong>Training:</strong> Fundraising basics and donor relations training provided</li>
                        <li><strong>Impact:</strong> Directly contribute to securing resources for programs</li>
                        <li><strong>Skills:</strong> Develop valuable nonprofit fundraising experience</li>
                    </ul>
                    <p>Ideal for individuals interested in nonprofit development and resource mobilization.</p>
                `
            },
            'professional': {
                title: 'Professional Services',
                content: `
                    <h4>Detailed Information:</h4>
                    <ul>
                        <li><strong>Areas:</strong> Legal, accounting, IT, marketing, HR, and other professional services</li>
                        <li><strong>Commitment:</strong> Project-based work fitting your expertise and schedule</li>
                        <li><strong>Impact:</strong> Use your professional skills to strengthen our organization</li>
                        <li><strong>Recognition:</strong> Professional service hours for continuing education credits</li>
                    </ul>
                    <p>Share your expertise while giving back to the community and supporting our mission.</p>
                `
            },
            'board-member': {
                title: 'Board Member',
                content: `
                    <h4>Detailed Information:</h4>
                    <ul>
                        <li><strong>Governance:</strong> Strategic planning, policy development, and organizational oversight</li>
                        <li><strong>Commitment:</strong> 3-year term with monthly meetings and committee work</li>
                        <li><strong>Responsibilities:</strong> Fiduciary oversight, fundraising, and community representation</li>
                        <li><strong>Requirements:</strong> Leadership experience and commitment to our mission</li>
                    </ul>
                    <p>Leadership opportunity for experienced professionals committed to advancing our mission and impact.</p>
                `
            }
        };

        const opportunityInfo = info[type];
        
        if (opportunityInfo) {
            showModal(opportunityInfo.title, opportunityInfo.content);
        }
    }

    // Show modal
    function showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'info-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closest('.info-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <a href="#volunteer-form" class="btn btn-primary" onclick="this.closest('.info-modal').remove()">Apply for This Role</a>
                    <button class="btn btn-outline" onclick="this.closest('.info-modal').remove()">Close</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Form field enhancements
    const formInputs = volunteerForm.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Remove error styling when user starts typing
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorElement = this.parentNode.querySelector('.form-error');
            if (errorElement) {
                errorElement.remove();
            }
        });
        
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });

    // Character counter for textarea fields
    const textareas = volunteerForm.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        if (maxLength) {
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.textContent = `0/${maxLength}`;
            textarea.parentNode.appendChild(counter);
            
            textarea.addEventListener('input', function() {
                const currentLength = this.value.length;
                counter.textContent = `${currentLength}/${maxLength}`;
                
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = '#e74c3c';
                } else {
                    counter.style.color = '#666';
                }
            });
        }
    });
});

// Add CSS for form enhancements
if (!document.getElementById('volunteer-form-styles')) {
    const styles = document.createElement('style');
    styles.id = 'volunteer-form-styles';
    styles.textContent = `
        .form-error {
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .error {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
        }
        
        .focused {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
        }
        
        .character-counter {
            font-size: 0.75rem;
            color: #666;
            text-align: right;
            margin-top: 0.25rem;
        }
        
        .success-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 500px;
        }
        
        .success-content i {
            font-size: 3rem;
            color: #27ae60;
            margin-bottom: 1rem;
        }
        
        .success-content h3 {
            color: #27ae60;
            margin-bottom: 1rem;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid #eee;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }
    `;
    document.head.appendChild(styles);
}