/**
 * StepEngine Component
 * Handles the rendering and progression of election journey steps.
 */
class StepEngine {
    constructor(listContainerId, cardContainerId) {
        this.listContainer = document.getElementById(listContainerId);
        this.cardContainer = document.getElementById(cardContainerId);
        
        window.stateManager.subscribe((state) => this.render(state));
    }

    render(state) {
        if (!state.role || !state.flows[state.role]) {
            this.clearContent();
            return;
        }

        const steps = state.flows[state.role];
        const currentStep = steps.find(s => s.id === state.currentStepId) || steps[0];

        this.renderStepList(steps, state);
        this.renderActiveStep(currentStep, state);
    }

    clearContent() {
        if (this.listContainer) this.listContainer.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Select a role to see steps.</p>';
        window.domHelpers.clearContainer(this.cardContainer);
    }

    // --- UI Generators ---

    _generateStepItemHTML(step, index, isActive, isCompleted) {
        return `
            <div class="step-item animate-stagger ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                 style="animation-delay: ${index * 0.1}s"
                 data-id="${step.id}"
                 role="button"
                 tabindex="0"
                 aria-label="View step: ${step.title}">
                <div class="step-indicator">${isCompleted ? '✓' : step.id}</div>
                <div class="step-info">
                    <div class="step-item-title">${step.title}</div>
                    <div class="step-item-deadline">${step.deadline}</div>
                </div>
            </div>
        `;
    }

    _generateCardHTML(step, state, isCompleted, hasNext, hasPrev) {
        const riskClass = state.isSimulating ? 'failed-state pulse-warning' : '';
        const badgeStyle = state.isSimulating ? 'background: var(--danger);' : '';
        const badgeText = state.isSimulating ? '⚠️ At Risk' : isCompleted ? 'Completed' : 'Active Stage';

        return `
            <div class="glass card ${riskClass}">
                <div class="step-detail animate-fade-in">
                    <div class="step-header">
                        <span class="step-badge" style="${badgeStyle}">${badgeText}</span>
                        <h2 class="step-title">${step.title}</h2>
                    </div>
                    <p class="step-description">${step.description}</p>
                    <div class="step-meta">
                        <div class="meta-item">
                            <span class="meta-label">Deadline:</span>
                            <span class="meta-value">${step.deadline}</span>
                        </div>
                        <div class="meta-item danger">
                            <span class="meta-label">If missed:</span>
                            <span class="meta-value">${step.missed}</span>
                        </div>
                    </div>
                    <div class="step-actions">
                        ${hasPrev ? `<button class="btn-secondary" id="btn-prev" aria-label="Go to previous step">Back</button>` : ''}
                        ${!isCompleted ? `
                            <button class="btn-simulate" id="btn-simulate" aria-label="Simulate missing this deadline">What if I miss this?</button>
                            <button class="btn-primary" id="btn-complete" aria-label="Mark this step as complete">Complete Step</button>
                        ` : ''}
                        ${hasNext && isCompleted ? `<button class="btn-secondary" id="btn-next" aria-label="Proceed to next step">Next Step</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // --- Renderers ---

    renderStepList(steps, state) {
        if (!this.listContainer) return;

        this.listContainer.innerHTML = steps.map((step, index) => {
            const isCompleted = state.completedSteps.includes(step.id);
            const isActive = state.currentStepId === step.id;
            return this._generateStepItemHTML(step, index, isActive, isCompleted);
        }).join('');

        this.listContainer.querySelectorAll('.step-item').forEach(item => {
            item.addEventListener('click', () => this.jumpToStep(parseInt(item.getAttribute('data-id'))));
            item.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.jumpToStep(parseInt(item.getAttribute('data-id')));
                }
            });
        });
    }

    renderActiveStep(step, state) {
        if (!this.cardContainer) return;

        const isCompleted = state.completedSteps.includes(step.id);
        const steps = state.flows[state.role];
        const stepIndex = steps.findIndex(s => s.id === step.id);
        
        // Use outerHTML replacement for cleaner DOM update
        this.cardContainer.outerHTML = `<div id="${this.cardContainer.id}">${this._generateCardHTML(step, state, isCompleted, stepIndex < steps.length - 1, stepIndex > 0)}</div>`;
        this.cardContainer = document.getElementById(this.cardContainer.id); // Re-select after replacement

        this._attachActionListeners(step, steps, stepIndex, stepIndex < steps.length - 1);
    }

    _attachActionListeners(step, steps, stepIndex, hasNext) {
        const simulateBtn = this.cardContainer.querySelector('#btn-simulate');
        if (simulateBtn) {
            simulateBtn.addEventListener('click', () => {
                if (window.analytics) window.analytics.trackScenarioTrigger(step.title);
                window.dispatchEvent(new CustomEvent('trigger_simulation', { detail: { step: step } }));
            });
        }

        const completeBtn = this.cardContainer.querySelector('#btn-complete');
        if (completeBtn) {
            completeBtn.addEventListener('click', () => {
                window.domHelpers.showToast('Great! You’ve successfully completed this step. 🎉');
                if (window.analytics) window.analytics.trackStepCompletion(step.id);
                
                const cardInner = this.cardContainer.firstElementChild;
                if (cardInner) cardInner.classList.add('pulse-glow');
                
                window.stateManager.completeStep(step.id);
                
                setTimeout(() => {
                    if (cardInner) cardInner.classList.remove('pulse-glow');
                    if (hasNext) this.jumpToStep(steps[stepIndex + 1].id);
                }, 1500);
            });
        }

        const nextBtn = this.cardContainer.querySelector('#btn-next');
        if (nextBtn) nextBtn.addEventListener('click', () => this.jumpToStep(steps[stepIndex + 1].id));

        const prevBtn = this.cardContainer.querySelector('#btn-prev');
        if (prevBtn) prevBtn.addEventListener('click', () => this.jumpToStep(steps[stepIndex - 1].id));
    }

    jumpToStep(id) {
        window.stateManager.state.currentStepId = id;
        window.stateManager.notify();
    }
}

window.StepEngine = StepEngine;



