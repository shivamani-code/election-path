/**
 * AssistantPanel Component
 * Handles the smart prompts and displays AI-style responses.
 */
class AssistantPanel {
    constructor(promptsContainerId, responseContainerId) {
        this.promptsContainer = document.getElementById(promptsContainerId);
        this.responseContainer = document.getElementById(responseContainerId);
        this.currentStep = null;
        
        window.stateManager.subscribe((state) => this.handleStateChange(state));
    }

    handleStateChange(state) {
        if (!state.role) return;

        const steps = state.flows[state.role] || [];
        const newStep = steps.find(s => s.id === state.currentStepId);

        // If step changed, clear response
        if (this.currentStep?.id !== newStep?.id) {
            if (this.responseContainer) {
                this.responseContainer.style.display = 'none';
                this.responseContainer.innerHTML = '';
            }
        }

        this.currentStep = newStep;
        this.renderPrompts();
    }

    renderPrompts() {
        if (!this.promptsContainer) return;

        this.promptsContainer.innerHTML = `
            <div class="prompt-chips">
                ${window.promptEngine.prompts.map(p => `
                    <button class="prompt-chip" data-id="${p.id}">${p.label}</button>
                `).join('')}
            </div>
        `;

        this.promptsContainer.querySelectorAll('.prompt-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const promptId = chip.getAttribute('data-id');
                this.showResponse(promptId);
            });
        });
    }

    async showResponse(promptId) {
        if (!this.responseContainer || !this.currentStep) return;

        const text = window.promptEngine.generateResponse(promptId, this.currentStep);
        this.responseContainer.style.display = 'block';
        this.responseContainer.innerHTML = '';
        
        await this.typeEffect(text);
    }

    async typeEffect(text) {
        const speed = 25; // ms per char
        for (let i = 0; i < text.length; i++) {
            this.responseContainer.innerHTML += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, speed));
            // Scroll to bottom of panel
            const panel = document.getElementById('assistant-panel');
            if (panel) panel.scrollTop = panel.scrollHeight;
        }
    }
}

window.AssistantPanel = AssistantPanel;

