/**
 * State Manager for ElectionOS
 * Handles global state, role selection, and step progression.
 */
class StateManager {
    constructor() {
        const savedState = this._loadFromStorage();

        this.state = {
            // Always start on landing screen — role must be re-selected each session
            role: null,
            currentView: 'landing',
            currentStepId: 1,
            completedSteps: [],
            flows: {},
            history: [],
            isSimulating: false,
            hasCompletedJourney: false,
            // Carry over any saved non-role state if available
            ...(savedState ? {
                flows: savedState.flows || {}
            } : {})
        };

        this.prevState = null;
        this.listeners = [];
    }

    _loadFromStorage() {
        try {
            const data = localStorage.getItem('election_os_state');
            return data ? JSON.parse(data) : null;
        } catch (e) { return null; }
    }

    _saveToStorage() {
        try {
            // Save state but strip role so landing always shows on reload
            const toSave = { ...this.state, role: null, currentView: 'landing' };
            localStorage.setItem('election_os_state', JSON.stringify(toSave));
        } catch (e) {}
    }

    async loadFlows() {
        if (window.ELECTION_DATA) {
            this.updateState({ flows: window.ELECTION_DATA });
        } else {
            console.error('ELECTION_DATA not found');
        }
    }

    setRole(role) {
        this.updateState({
            role: role,
            currentView: 'dashboard',
            currentStepId: 1,
            completedSteps: [],
            isSimulating: false,
            hasCompletedJourney: false
        });
    }

    goToLanding() {
        this.updateState({
            role: null,
            currentView: 'landing'
        });
    }

    completeStep(stepId) {
        if (!this.state.completedSteps.includes(stepId)) {
            this.updateState({
                completedSteps: [...this.state.completedSteps, stepId]
            });
        }
    }

    updateState(newStateProps) {
        this.prevState = { ...this.state };
        this.state = { ...this.state, ...newStateProps };
        this._saveToStorage();
        this.notify();
    }

    subscribe(callback) {
        this.listeners.push(callback);
        // Immediately notify with current state
        callback(this.state, null);
    }

    notify() {
        this.listeners.forEach(callback => callback(this.state, this.prevState));
    }

    get currentState() {
        return this.state;
    }
}

// Global instance
window.stateManager = new StateManager();
