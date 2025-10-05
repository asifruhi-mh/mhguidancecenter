// Events page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Event filtering functionality
    const categoryFilter = document.getElementById('event-category');
    const monthFilter = document.getElementById('event-month');
    const resetButton = document.querySelector('.filter-reset');
    const eventCards = document.querySelectorAll('.event-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    // Filter events based on selected criteria
    function filterEvents() {
        const selectedCategory = categoryFilter.value;
        const selectedMonth = monthFilter.value;

        eventCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardMonth = card.dataset.month;

            const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
            const monthMatch = selectedMonth === 'all' || cardMonth === selectedMonth;

            if (categoryMatch && monthMatch) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });

        // Update visible event count
        updateEventCount();
    }

    // Update event count display
    function updateEventCount() {
        const visibleEvents = document.querySelectorAll('.event-card[style*="display: block"], .event-card:not([style*="display: none"])');
        const totalEvents = eventCards.length;
        
        // You can add a counter display here if needed
        console.log(`Showing ${visibleEvents.length} of ${totalEvents} events`);
    }

    // Reset all filters
    function resetFilters() {
        categoryFilter.value = 'all';
        monthFilter.value = 'all';
        
        eventCards.forEach(card => {
            card.style.display = 'block';
            card.classList.add('fade-in');
        });

        updateEventCount();
    }

    // Event listeners
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterEvents);
    }

    if (monthFilter) {
        monthFilter.addEventListener('change', filterEvents);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }

    // Event details modal functionality
    const detailButtons = document.querySelectorAll('.event-details-btn');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.dataset.event;
            showEventDetails(eventId);
        });
    });

    function showEventDetails(eventId) {
        // This would typically show a modal with more event details
        // For now, we'll just scroll to the event or show an alert
        console.log(`Showing details for event: ${eventId}`);
        
        // Simple implementation - you could enhance this with a proper modal
        alert('Event details would be displayed in a modal. This feature can be enhanced with more detailed information.');
    }

    // Load more events functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more events from a server
            // For demo purposes, we'll just hide the button
            this.style.display = 'none';
            
            // You could add logic here to:
            // 1. Fetch more events from an API
            // 2. Add them to the events grid
            // 3. Show/hide the load more button based on availability
            
            console.log('Loading more events...');
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your newsletter service
                console.log('Newsletter signup:', email);
                
                // Show success message
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                
                // Clear the form
                emailInput.value = '';
            }
        });
    }

    // Utility function to show notifications
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : '#0c5460'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#bee5eb'};
            border-radius: 8px;
            padding: 12px 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add CSS animations for notifications
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .fade-in {
                animation: fadeIn 0.5s ease-in;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }

    // Initialize filters
    updateEventCount();
});

// Export functions for potential use in other scripts
window.EventsPage = {
    filterEvents: function(category, month) {
        const categoryFilter = document.getElementById('event-category');
        const monthFilter = document.getElementById('event-month');
        
        if (categoryFilter && category) categoryFilter.value = category;
        if (monthFilter && month) monthFilter.value = month;
        
        // Trigger filter event
        if (categoryFilter) categoryFilter.dispatchEvent(new Event('change'));
    }
};