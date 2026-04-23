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

        const overlay = document.createElement('div');
        overlay.id = 'scenario-overlay';
        overlay.className = 'glass-overlay animate-fade-in';
        
        overlay.innerHTML = `
            <div class="scenario-card glass animate-scale-up">
                <div class="scenario-header">
                    <span class="warning-icon">⚠️</span>
                    <h2>Simulation: Deadline Missed</h2>
                </div>
                <div class="scenario-body">
                    <p class="scenario-context">You missed the deadline for: <strong>${this.currentStep.title}</strong></p>
                    <div class="scenario-impact">
                        <span class="impact-label danger">CONSEQUENCE:</span>
                        <p class="impact-text">${this.currentStep.missed}</p>
                    </div>
                    <div class="scenario-next-action">
                        <span class="impact-label accent">NEXT POSSIBLE ACTION:</span>
                        <p style="color: #fff; font-weight: 600;">${this.currentStep.nextAction || 'Contact support for guidance.'}</p>
                    </div>
                </div>
                <div class="scenario-footer">
                    <button class="btn-danger" id="btn-retry">Acknowledge & Return</button>
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



