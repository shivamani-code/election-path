/**
 * SystemVoice Component
 * Provides high-level, intelligent system feedback based on user progress and actions.
 */
class SystemVoice {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        window.stateManager.subscribe((state) => this.render(state));
    }

    render(state) {
        if (!this.container) return;

        if (!state.role) {
            this.container.innerHTML = '';
            this.container.style.display = 'none';
            return;
        }

        const steps = state.flows[state.role] || [];
        const totalSteps = steps.length;
        const completedCount = state.completedSteps.length;
        const isComplete = completedCount === totalSteps && totalSteps > 0;
        
        let message = '';
        let type = 'info'; // info, success, warning

        if (isComplete) {
            message = 'You have successfully completed all requirements for this election cycle.';
            type = 'success';
        } else if (completedCount === 0) {
            message = 'Welcome to your election journey. Please review and complete your first step.';
            type = 'info';
        } else {
            // Check if behind
            const currentStepIndex = steps.findIndex(s => s.id === state.currentStepId);
            if (currentStepIndex > completedCount) {
                message = 'Warning: You have skipped a required step. Please return and complete it to ensure eligibility.';
                type = 'warning';
            } else {
                message = 'Good progress — you are on track. Continue to the next step.';
                type = 'success';
            }
        }

        // Check if simulation is active (Phase 2 integration)
        if (state.isSimulating) {
            message = 'CRITICAL ALERT: Analyzing consequences of missed deadline.';
            type = 'warning';
        }

        this.container.style.display = 'block';
        this.container.innerHTML = `
            <div class="system-voice-message type-${type} animate-fade-in">
                <span class="voice-icon">${type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span>
                <span class="voice-text"><strong>System:</strong> ${message}</span>
            </div>
        `;
    }
}

window.SystemVoice = SystemVoice;
