/**
 * ElectionOS Configuration Constants
 * Centralized store for application settings and UI strings.
 */
window.CONFIG = {
    APP_NAME: 'ElectionOS',
    VERSION: '2.0.0',
    
    // Roles
    ROLES: {
        VOTER: 'voter',
        CANDIDATE: 'candidate',
        OFFICER: 'officer'
    },

    // UI Strings
    STRINGS: {
        WELCOME_TITLE: 'Welcome to ElectionOS',
        WELCOME_SUBTITLE: 'Please select a role above to begin your interactive election journey.',
        COMPLETE_STEP_TOAST: 'Great! You’ve successfully completed this step. 🎉',
        ERROR_GENERIC: 'Something went wrong. Please try again.',
        DATA_MISSING: 'Election data is missing or corrupted.'
    },

    // Analytics Events
    EVENTS: {
        ROLE_SELECT: 'role_selection',
        STEP_COMPLETE: 'step_completion',
        SCENARIO_TRIGGER: 'scenario_trigger',
        ASSISTANT_ASK: 'assistant_usage'
    },

    // Performance
    DEBOUNCE_DELAY: 300
};
