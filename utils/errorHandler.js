/**
 * Centralized Error Handler
 * Manages runtime errors and provides user-friendly feedback.
 */
window.ErrorHandler = {
    /**
     * Handles an error by logging it and optionally showing a toast.
     * @param {Error|string} error - The error to handle.
     * @param {boolean} notifyUser - Whether to show a UI notification.
     */
    handle(error, notifyUser = true) {
        console.error(`[ElectionOS Error] ${error.message || error}`);
        
        if (notifyUser && window.domHelpers) {
            window.domHelpers.showToast(window.CONFIG?.STRINGS?.ERROR_GENERIC || 'An error occurred.');
        }
    },

    /**
     * Validates if a condition is met, otherwise throws/handles error.
     */
    assert(condition, message) {
        if (!condition) {
            this.handle(new Error(message));
            return false;
        }
        return true;
    }
};

// Global error listener
window.addEventListener('error', (event) => {
    window.ErrorHandler.handle(event.error || event.message);
});
