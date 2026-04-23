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
            history: [],
            isSimulating: false
        };
        this.prevState = null;
        this.listeners = [];
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
            currentStepId: 1,
            completedSteps: [],
            isSimulating: false
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

