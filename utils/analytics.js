/**
 * AnalyticsTracker
 * Wrapper service for tracking user interactions via Google Analytics (gtag.js).
 */
class AnalyticsTracker {
    constructor() {
        this.initialized = typeof window.gtag === 'function';
        if (!this.initialized) {
            console.warn('AnalyticsTracker: Google Analytics (gtag) is not loaded.');
        } else {
            console.log('AnalyticsTracker: Initialized successfully.');
        }
    }

    /**
     * Safely dispatches an event to Google Analytics.
     * @param {string} eventName 
     * @param {object} params 
     */
    trackEvent(eventName, params = {}) {
        if (this.initialized) {
            window.gtag('event', eventName, params);
        } else {
            // Mock output for testing/validation without real GA
            console.log(`[Mock Analytics] Event: ${eventName}`, params);
        }
    }

    trackRoleSelection(role) {
        this.trackEvent('select_content', {
            content_type: 'role',
            item_id: role
        });
    }

    trackStepCompletion(stepId) {
        this.trackEvent('level_up', {
            level: stepId,
            character: window.stateManager.state.role || 'unknown'
        });
    }

    trackScenarioTrigger(stepTitle) {
        this.trackEvent('select_promotion', {
            promoted_id: 'scenario_missed_deadline',
            promoted_name: stepTitle
        });
    }

    trackAssistantUsage(promptId) {
        this.trackEvent('search', {
            search_term: promptId
        });
    }
}

window.AnalyticsTracker = AnalyticsTracker;
