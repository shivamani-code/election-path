class AnalyticsTracker {
    constructor() {
        // Note: GA script loads async — do NOT cache gtag availability at construction time.
        // Each trackEvent call checks live so late-loading scripts are handled correctly.
        this.fbService = window.FirebaseService;
        if (this.fbService) this.fbService.init();
    }

    /**
     * Safely dispatches an event to GA and Firebase.
     * @param {string} eventName 
     * @param {object} params 
     */
    trackEvent(eventName, params = {}) {
        // Live check — handles async GA script load delay
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
            console.log('GA Event Fired:', eventName, params);
        }

        // Track to Firebase
        if (this.fbService) {
            this.fbService.logEvent(eventName, params);
        }
    }

    trackRoleSelection(role) {
        this.trackEvent('role_selected', { role });
    }

    trackStepCompletion(stepTitle) {
        this.trackEvent('step_completed', { step: stepTitle });
    }

    trackScenarioTrigger(stepTitle) {
        this.trackEvent('scenario_triggered', { step: stepTitle });
    }

    trackAssistantUsage(action) {
        this.trackEvent('assistant_used', { action });
    }

    trackJourneyCompletion() {
        this.trackEvent('journey_completed', { status: 'success' });
    }
}

window.AnalyticsTracker = AnalyticsTracker;
