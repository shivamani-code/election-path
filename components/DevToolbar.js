/**
 * DevToolbar Component
 * Debugging tool for simulation and testing.
 */
class DevToolbar {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'glass dev-toolbar animate-fade-in';
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="dev-toolbar-header">Dev Debug Tools</div>
            <div class="dev-actions">
                <button id="dev-reset">Reset Progress</button>
                <button id="dev-simulate-error">Force Simulation</button>
                <button id="dev-complete-all">Fast Forward</button>
            </div>
            <div class="dev-footer">ElectionOS v1.0.0-dev</div>
        `;

        document.body.appendChild(this.container);

        this.container.querySelector('#dev-reset').addEventListener('click', () => {
            window.stateManager.setRole(window.stateManager.state.role);
        });

        this.container.querySelector('#dev-simulate-error').addEventListener('click', () => {
            const role = window.stateManager.state.role;
            if (role) {
                const steps = window.stateManager.state.flows[role];
                const event = new CustomEvent('trigger_simulation', { detail: { step: steps[0] } });
                window.dispatchEvent(event);
            }
        });

        this.container.querySelector('#dev-complete-all').addEventListener('click', () => {
            const role = window.stateManager.state.role;
            if (role) {
                const steps = window.stateManager.state.flows[role];
                steps.forEach(s => window.stateManager.completeStep(s.id));
            }
        });
    }
}

window.DevToolbar = DevToolbar;
