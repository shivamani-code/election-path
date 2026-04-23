/**
 * ProgressTracker Component
 * Displays a global progress bar and task completion stats in the footer.
 */
class ProgressTracker {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        window.stateManager.subscribe((state, prevState) => this.render(state, prevState));
    }

    render(state, prevState) {
        if (!this.container) return;

        // Bail out if relevant state hasn't changed
        if (prevState && 
            prevState.role === state.role && 
            prevState.currentStepId === state.currentStepId &&
            prevState.completedSteps.length === state.completedSteps.length &&
            prevState.isSimulating === state.isSimulating) {
            return;
        }

        if (!state.role) {
            this.container.innerHTML = '<div class="progress-placeholder">Select a role to track your journey progress.</div>';
            return;
        }

        const steps = state.flows[state.role] || [];
        const totalSteps = steps.length;
        const completedCount = state.completedSteps.length;
        const progressPercent = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;
        const isComplete = progressPercent === 100;

        // Calculate if user is behind (if they advanced to a step without completing prior ones)
        const currentStepIndex = steps.findIndex(s => s.id === state.currentStepId);
        const isBehind = currentStepIndex > completedCount;
        
        let statusText = isComplete ? 'Completed ✨' : (isBehind ? 'Behind ❌' : 'On Track ✅');
        if (state.isSimulating) {
            statusText = 'At Risk ⚠️';
        }

        this.container.innerHTML = `
            <div class="progress-tracker">
                <div class="progress-stats">
                    <div class="progress-info">
                        <span class="progress-count">${completedCount} of ${totalSteps} milestones achieved</span>
                        <span class="progress-status status-${statusText.split(' ')[0].toLowerCase()}">Status: ${statusText}</span>
                    </div>
                    <span class="progress-percentage">${Math.round(progressPercent)}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>
        `;
    }
}

window.ProgressTracker = ProgressTracker;



