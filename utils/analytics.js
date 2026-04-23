class AnalyticsTracker {
    constructor() {
        this.gaInitialized = typeof window.gtag === 'function';
        this.fbService = window.FirebaseService;
        
        if (this.fbService) this.fbService.init();
    }

    /**
     * Safely dispatches an event to GA and Firebase.
     * @param {string} eventName 
     * @param {object} params 
     */
    trackEvent(eventName, params = {}) {
        // Track to Google Analytics
        if (this.gaInitialized) {
            window.gtag('event', eventName, params);
        }
        
        // Track to Firebase
        if (this.fbService) {
            this.fbService.logEvent(eventName, params);
        }

        if (!this.gaInitialized && !this.fbService.initialized) {
            console.log(`[Mock Analytics] Event: ${eventName}`, params);
        }
    }

    trackRoleSelection(role) {
        this.trackEvent(window.CONFIG.EVENTS.ROLE_SELECT, {
            role: role
        });
    }

    trackStepCompletion(stepId) {
        this.trackEvent(window.CONFIG.EVENTS.STEP_COMPLETE, {
            step_id: stepId,
            role: window.stateManager.state.role || 'unknown'
        });
    }

    trackScenarioTrigger(stepTitle) {
        this.trackEvent(window.CONFIG.EVENTS.SCENARIO_TRIGGER, {
            step_title: stepTitle
        });
    }

    trackAssistantUsage(promptId) {
        this.trackEvent(window.CONFIG.EVENTS.ASSISTANT_ASK, {
            prompt_id: promptId
        });
    }
}

window.AnalyticsTracker = AnalyticsTracker;
