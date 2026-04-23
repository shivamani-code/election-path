/**
 * Data Validator
 * Ensures application data structures are valid before usage.
 */
window.Validator = {
    /**
     * Validates election flow data.
     * @param {object} data - The data to validate.
     * @returns {boolean}
     */
    validateFlows(data) {
        if (!data || typeof data !== 'object') return false;
        
        const requiredRoles = ['voter', 'candidate', 'officer'];
        return requiredRoles.every(role => {
            const flow = data[role];
            return Array.isArray(flow) && flow.every(step => 
                step.id && step.title && step.description && step.deadline && step.missed
            );
        });
    },

    /**
     * Validates a step object.
     * @param {object} step 
     */
    isValidStep(step) {
        return step && typeof step === 'object' && step.id && step.title;
    }
};
