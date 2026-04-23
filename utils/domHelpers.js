/**
 * DOM Helper Utilities
 * Provides reusable functions for common UI interactions to reduce duplication.
 */
window.domHelpers = {
    /**
     * Displays a temporary toast notification.
     * @param {string} message - The message to display.
     * @param {number} duration - Time in milliseconds before hiding.
     */
    showToast(message, duration = 2500) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification animate-slide-up';
        toast.innerHTML = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * Safely clears the content of a container element.
     * @param {HTMLElement} container - The DOM element to clear.
     */
    clearContainer(container) {
        if (container) {
            container.innerHTML = '';
        }
    }
};
