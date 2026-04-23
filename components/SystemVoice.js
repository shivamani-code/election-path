/**
 * SystemVoice Component
 * Provides high-level, intelligent system feedback based on user progress and actions.
 */
class SystemVoice {
    /**
     * @param {string} containerId - The ID of the container element.
     */
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        window.stateManager.subscribe((state) => this.render(state));
    }

    /**
     * Renders the system voice panel based on the current state.
     * @param {object} state 
     */
    render(state) {
        if (!this.container) return;

        if (!state.role) {
            this.container.innerHTML = '';
            this.container.style.display = 'none';
            return;
        }

        const { message, type } = this._getVoiceStatus(state);

        this.container.style.display = 'block';
        this.container.innerHTML = `
            <div class="system-voice-message type-${type} animate-fade-in" role="alert">
                <span class="voice-icon" aria-hidden="true">${this._getIcon(type)}</span>
                <span class="voice-text"><strong>System:</strong> ${message}</span>
            </div>
        `;
    }

    /**
     * Determines the status message and type based on journey progress.
     * @private
     */
    _getVoiceStatus(state) {
        const steps = state.flows[state.role] || [];
        const totalSteps = steps.length;
        const completedCount = state.completedSteps.length;
        const isComplete = completedCount === totalSteps && totalSteps > 0;
        
        if (state.isSimulating) {
            return { message: 'CRITICAL ALERT: Analyzing consequences of missed deadline.', type: 'warning' };
        }

        if (isComplete) {
            return { message: 'You have successfully completed all requirements for this election cycle.', type: 'success' };
        }

        if (completedCount === 0) {
            return { message: 'Welcome to your election journey. Please review and complete your first step.', type: 'info' };
        }

        const currentStepIndex = steps.findIndex(s => s.id === state.currentStepId);
        if (currentStepIndex > completedCount) {
            return { message: 'Warning: You have skipped a required step. Please return and complete it.', type: 'warning' };
        }

        return { message: 'Good progress — you are on track. Continue to the next step.', type: 'success' };
    }

    _getIcon(type) {
        switch (type) {
            case 'warning': return '⚠️';
            case 'success': return '✅';
            default: return 'ℹ️';
        }
    }
}

window.SystemVoice = SystemVoice;
