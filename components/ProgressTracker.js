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
            <div class="progress-tracker ${isComplete ? 'journey-complete' : ''}">
                <div class="progress-stats">
                    <div>
                        <span class="progress-count">${completedCount} of ${totalSteps} milestones achieved</span>
                        <span style="margin-left: 1rem; color: ${state.isSimulating ? 'var(--warning)' : isBehind ? 'var(--danger)' : 'var(--success)'}; font-size: 0.8rem; font-weight: 700; transition: color 0.3s ease;">Status: ${statusText}</span>
                    </div>
                    <span class="progress-percentage">${Math.round(progressPercent)}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${progressPercent}%; background: ${state.isSimulating ? 'var(--warning)' : isBehind ? 'linear-gradient(to right, var(--warning), var(--danger))' : ''};"></div>
                </div>
                ${isComplete && !document.getElementById('celebration-overlay')?.style.display.includes('flex') ? `
                    <div class="completion-badge animate-scale-up">
                        ✨ Journey Completed! You are ready for Election Day.
                    </div>
                ` : ''}
            </div>
        `;
    }
}

window.ProgressTracker = ProgressTracker;



