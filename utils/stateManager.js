/**
 * State Manager for ElectionOS
 * Handles global state, role selection, and step progression.
 */
class StateManager {
    constructor() {
        this.state = {
            role: null, // 'voter', 'candidate', 'officer'
            currentStepId: 1,
            completedSteps: [],
            flows: {},
            history: []
        };
        this.listeners = [];
    }

    async loadFlows() {
        // Use global ELECTION_DATA instead of fetch to avoid CORS
        if (window.ELECTION_DATA) {
            this.state.flows = window.ELECTION_DATA;
            this.notify();
        } else {
            console.error('ELECTION_DATA not found');
        }
    }

    setRole(role) {
        this.state.role = role;
        this.state.currentStepId = 1;
        this.state.completedSteps = [];
        this.notify();
    }

    completeStep(stepId) {
        if (!this.state.completedSteps.includes(stepId)) {
            this.state.completedSteps.push(stepId);
        }
        this.notify();
    }

    subscribe(callback) {
        this.listeners.push(callback);
        // Immediately notify with current state
        callback(this.state);
    }

    notify() {
        this.listeners.forEach(callback => callback(this.state));
    }

    get currentState() {
        return this.state;
    }
}

// Global instance
window.stateManager = new StateManager();

