/**
 * ScenarioEngine Component
 * Handles the "What If" simulation overlays to show consequences of missed steps.
 */
class ScenarioEngine {
    constructor() {
        this.container = document.body; // Render as overlay on body
        this.isSimulating = false;
        this.currentStep = null;
        
        // Listen for simulation triggers via a custom event
        window.addEventListener('trigger_simulation', (e) => {
            this.startSimulation(e.detail.step);
        });
    }

    startSimulation(step) {
        // Guard: prevent duplicate overlays from rapid clicks
        if (this.isSimulating) return;
        
        if (!window.Validator.isValidStep(step)) {
            console.warn('ScenarioEngine: Attempted to start simulation with invalid step.');
            return;
        }

        this.isSimulating = true;
        this.currentStep = step;
        window.stateManager.updateState({ isSimulating: true });
        this.render();
    }

    stopSimulation() {
        this.isSimulating = false;
        this.currentStep = null;
        window.stateManager.updateState({ isSimulating: false });
        const overlay = document.getElementById('scenario-overlay');
        if (overlay) overlay.remove();
    }

    render() {
        if (!this.isSimulating || !this.currentStep) return;

        // Remove any existing overlay before creating a new one (idempotent)
        const existing = document.getElementById('scenario-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'scenario-overlay';
        overlay.className = 'glass-overlay animate-fade-in';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Scenario Simulation');

        overlay.innerHTML = `
            <div class="scenario-card glass animate-slide-up">
                <div class="scenario-header">
                    <span class="warning-icon">⚠️</span>
                    <h2>Simulation: Deadline Missed</h2>
                </div>
                <div class="scenario-body">
                    <p class="scenario-context">You missed the deadline for: <strong>${this.currentStep.title}</strong></p>
                    <div class="scenario-impact">
                        <span class="impact-label danger">Consequence:</span>
                        <p class="impact-text">${this.currentStep.missed}</p>
                    </div>
                    <div class="scenario-next-action">
                        <span class="impact-label accent">Next Possible Action:</span>
                        <p class="impact-text">${this.currentStep.nextAction || 'Contact support for guidance.'}</p>
                    </div>
                </div>
                <div class="scenario-footer">
                    <button class="btn-danger" id="btn-retry">Acknowledge &amp; Return</button>
                </div>
            </div>
        `;

        this.container.appendChild(overlay);

        overlay.querySelector('#btn-retry').addEventListener('click', () => {
            this.stopSimulation();
        });
    }
}

window.ScenarioEngine = ScenarioEngine;



