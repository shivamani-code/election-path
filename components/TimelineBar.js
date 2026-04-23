/**
 * TimelineBar Component
 * Renders the high-level election phases and tracks current progress.
 */
class TimelineBar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.phases = [
            { id: 'pre-election', label: 'Registration', minStep: 0, maxStep: 0.3 },
            { id: 'campaign', label: 'Campaigning', minStep: 0.3, maxStep: 0.6 },
            { id: 'voting', label: 'Voting Day', minStep: 0.6, maxStep: 0.9 },
            { id: 'post-election', label: 'Results', minStep: 0.9, maxStep: 1.0 }
        ];
        
        window.stateManager.subscribe((state, prevState) => this.render(state, prevState));
    }

    render(state, prevState) {
        if (!this.container) return;

        // Bail out if relevant state hasn't changed
        if (prevState && 
            prevState.role === state.role && 
            prevState.currentStepId === state.currentStepId) {
            return;
        }

        if (!state.role) {
            this.container.innerHTML = '<div class="timeline-placeholder">Select a role to see the election timeline.</div>';
            return;
        }

        const steps = state.flows[state.role] || [];
        const currentIndex = steps.findIndex(s => s.id === state.currentStepId);
        const progress = steps.length > 0 ? (currentIndex + 1) / steps.length : 0;

        let activePhaseLabel = 'PLANNING';
        let statusLabel = 'UPCOMING';
        let nextPhaseLabel = this.phases[0].label;

        this.container.innerHTML = `
            <div class="timeline-wrapper" style="width: 100%;">
                <div class="timeline-track">
                    <div class="timeline-progress" style="width: ${progress * 100}%"></div>
                </div>
                <div class="timeline-phases">
                    ${this.phases.map((phase, index) => {
                        const isActive = progress >= phase.minStep && progress < phase.maxStep;
                        const isCompleted = progress >= phase.maxStep;
                        
                        if (isActive) {
                            activePhaseLabel = phase.label;
                            statusLabel = 'ACTIVE';
                            nextPhaseLabel = this.phases[index + 1] ? this.phases[index + 1].label : 'NONE';
                        } else if (isCompleted && phase.id === 'post-election') {
                            activePhaseLabel = phase.label;
                            statusLabel = 'COMPLETED';
                            nextPhaseLabel = 'NONE';
                        }
                        
                        return `
                            <div class="phase-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
                                <div class="phase-node"></div>
                                <div class="phase-label">${phase.label}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="timeline-status" style="margin-top: 1.5rem; text-align: center; font-size: 0.85rem; letter-spacing: 0.05em; font-weight: 600;">
                    <span style="color: var(--text-secondary);">Phase: </span>
                    <span style="color: ${statusLabel === 'ACTIVE' ? 'var(--accent-primary)' : statusLabel === 'COMPLETED' ? 'var(--success)' : 'var(--text-primary)'}; margin-right: 1rem; text-transform: uppercase;">${activePhaseLabel} (${statusLabel})</span>
                    ${nextPhaseLabel !== 'NONE' ? `
                        <span style="color: var(--text-secondary);">| Next Phase: </span>
                        <span style="color: var(--text-secondary); text-transform: uppercase;">${nextPhaseLabel}</span>
                    ` : `
                        <span style="color: var(--text-secondary);">| Next Phase: </span>
                        <span style="color: var(--success); text-transform: uppercase;">AWAITING ELECTION DAY</span>
                    `}
                </div>
            </div>
        `;
    }
}

window.TimelineBar = TimelineBar;



