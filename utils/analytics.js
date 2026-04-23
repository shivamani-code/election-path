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
    }

    trackRoleSelection(role) {
        this.trackEvent('role_selected', { 
            role: role 
        });
    }

    trackStepCompletion(stepTitle) {
        this.trackEvent('step_completed', { 
            step: stepTitle 
        });
    }

    trackScenarioTrigger(stepTitle) {
        this.trackEvent('scenario_triggered', { 
            step: stepTitle 
        });
    }

    trackAssistantUsage(action) {
        this.trackEvent('assistant_used', { 
            action: action 
        });
    }

    trackJourneyCompletion() {
        this.trackEvent('journey_completed', { 
            status: 'success' 
        });
    }
}

window.AnalyticsTracker = AnalyticsTracker;
