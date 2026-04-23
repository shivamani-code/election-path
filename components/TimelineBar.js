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
            <div class="timeline-wrapper">
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
                <div class="timeline-status-info">
                    <div class="status-group">
                        <span class="status-prefix">Current Phase:</span>
                        <span class="status-value status-${statusLabel.toLowerCase()}">${activePhaseLabel} (${statusLabel})</span>
                    </div>
                    ${nextPhaseLabel !== 'NONE' ? `
                        <div class="status-group">
                            <span class="status-prefix">Upcoming:</span>
                            <span class="status-value next-phase">${nextPhaseLabel}</span>
                        </div>
                    ` : `
                        <div class="status-group">
                            <span class="status-prefix">Finale:</span>
                            <span class="status-value finale">Ready for Election Day</span>
                        </div>
                    `}
                </div>
            </div>
        `;
    }
}

window.TimelineBar = TimelineBar;



